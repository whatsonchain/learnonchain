import React, { Component } from 'react'
import Program from './Program.js'
import Stack from './Stack.js'
import ScriptTx from './ScriptTx.js'
import './Debugger.css'

let bsv = require('bsv')
class Debugger extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStack: null,
      scriptEnded: false,
      tx: null,
      publicKey: null,
      scriptSig: null
    }
    this.debugScript = this.debugScript.bind(this)
    this.loadScript = this.loadScript.bind(this)
    this.next = this.next.bind(this)
    this.createP2PKH = this.createP2PKH.bind(this)
    // this.back = this.back.bind(this)
    this.lockingASM = []
    this.unlockingASM = []
    this.opPointer = null
    this.stepNo = null
    this.previousOpPointer = null
    this.tx = null
  }

  createP2PKH () {
    console.log('createP2PKH')
    // first we create a transaction
    let privateKey = new bsv.PrivateKey('cSBnVM4xvxarwGQuAfQFwqDg9k5tErHUHzgWsEfD4zdwUasvqRVY')
    let publicKey = privateKey.publicKey
    console.log('publicKey:' + JSON.stringify(publicKey))
    let fromAddress = publicKey.toAddress()
    let toAddress = 'mrU9pEmAx26HcbKVrABvgL7AwA5fjNFoDc'
    let scriptPubkey = bsv.Script.buildPublicKeyHashOut(fromAddress)
    let utxo = {
      address: fromAddress,
      txId: 'a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458',
      outputIndex: 0,
      script: scriptPubkey,
      satoshis: 100000
    }
    let tx = new bsv.Transaction().from(utxo).to(toAddress, 100000).sign(privateKey, 1)

    // we then extract the signature from the first input
    let inputIndex = 0
    let signature = tx.getSignatures(privateKey, 1)[inputIndex].signature

    let scriptSig = bsv.Script.buildPublicKeyHashIn(publicKey, signature)
    const Interpreter = bsv.Script.Interpreter
    let flags = Interpreter.SCRIPT_VERIFY_P2SH | Interpreter.SCRIPT_VERIFY_STRICTENC
    let verified = Interpreter().verify(scriptSig, scriptPubkey, tx, inputIndex, flags)
    this.setState({
      tx: tx,
      publicKey: publicKey,
      scriptSig: scriptSig
    })
    console.log('p2pks verified: ' + verified)
    console.log('this.tx: ' + this.tx)
  }

  debugScript (step, stack, altstack) {
    console.log('step: ', step)
    console.log('stack: ', stack)
    let stackItems = this.localStackItems
    stack.reverse().forEach(element => {
      let stackItem = {}
      stackItem.pc = step.pc
      stackItem.stack = stack
      stackItems.push(stackItem)
    })
    this.localStackItems = stackItems
  }

  resetState () {
    this.opPointer = null
    this.stepNo = null
    this.previousOpPointer = null
    this.setState({
      currentStack: null,
      scriptEnded: false
    })
  }

  concatScript () {
    if (this.unlockingASM) {
      return this.unlockingASM.concat(this.lockingASM)
    }
    return this.lockingASM
  }

  loadScript () {
    this.localStackItems = []
    this.lockingASM = null
    this.unlockingASM = null
    const lockingScriptStr = (document.getElementById('lockingScript').value)
    const unlockingScriptStr = (document.getElementById('unlockingScript').value)
    // split the script for the program component
    if (lockingScriptStr) {
      this.lockingASM = lockingScriptStr.split(' ')
    }
    if (unlockingScriptStr) {
      this.unlockingASM = unlockingScriptStr.split(' ')
    }

    this.resetState()

    const Interpreter = bsv.Script.Interpreter

    let si = new Interpreter()
    const flags = Interpreter.SCRIPT_VERIFY_P2SH |
    Interpreter.SCRIPT_ENABLE_MAGNETIC_OPCODES | Interpreter.SCRIPT_ENABLE_MONOLITH_OPCODES
    si.stepListener = this.debugScript
    let u, l
    try {
      if (unlockingScriptStr) {
        u = bsv.Script.fromASM(unlockingScriptStr)
      }
      if (lockingScriptStr) {
        l = bsv.Script.fromASM(lockingScriptStr)
      }
      let tx; let txIndex = null
      if (this.state.tx) {
        tx = this.state.tx
        txIndex = 0
        // l = this.state.scriptSig
      }
      let verified = si.verify(u, l, tx, txIndex, flags)
      this.setState({ verified })
    } catch (e) {
      console.log('Error: Invalid script: ', e)
      return
    }
    // console.log('this.localStackItems')
    // console.log(this.localStackItems)
    si = null
    // unlocking    OP_1 OP_2 OP_ADD
    // locking      OP_3 OP_EQUAL

    // unlocking    OP_1 022afc20bf379bc96a2f4e9e63ffceb8652b2b6a097f63fbee6ecec2a49a48010e 03a767c7221e9f15f870f1ad9311f5ab937d79fcaeee15bb2c722bca515581b4c0 OP_2 OP_CHECKMULTISIG
    // locking      OP_HASH160 OP_PUSHDATA1 0x16 0x748284390f9e263a4b766a75d0633c50426eb875 OP_EQUAL
  }

  next () {
    console.log('next: this.stepNo: ' + this.stepNo)
    this.stepNo += 1
    let currentState = this.localStackItems[this.stepNo - 1]
    let previousPc = null
    if (this.stepNo > 1) {
      previousPc = this.localStackItems[this.stepNo - 2] ? this.localStackItems[this.stepNo - 2].pc : null
    }
    // if there's a current state and the pc is 0 and it's not the first script then add the previous pc to the current one
    if (currentState) {
      if (currentState.pc !== previousPc) { // pc hasn't changed
        this.opPointer += 1
      }
    }

    if (this.stepNo !== null) {
      let currentStack = this.localStackItems[this.stepNo - 1]
      this.setState({ currentStack: currentStack })
    }
    this.previousOpPointer = this.opPointer

    let lockingASMLength; let unlockingASMLength = 0
    if (this.lockingASM) {
      lockingASMLength = this.lockingASM.length
    }
    if (this.unlockingASM) {
      unlockingASMLength = this.unlockingASM.length
    }
    if (this.stepNo - 1 > lockingASMLength + unlockingASMLength || this.stepNo > this.localStackItems.length) {
      this.setState({ scriptEnded: true })
    }
  }

  render () {
    return (
      <div>
        <h3>Debugger</h3>
        <div className='pb-4'>
          <p>This is a debugger that will allow you to step through trivial scripts and view the stack.</p>
          <p>Paste in a lock and unlock script and press load.</p>
          <h4>An example script</h4>
          unlocking    <code>OP_1 OP_2 OP_ADD</code><br />
          locking     <code>OP_3 OP_EQUAL</code><br />
          Create a transaction to use in the script, eg, for <code>OP_CHECKSIG</code>
          <button className='btn btn-primary' onClick={this.createP2PKH}>create</button>
          <ScriptTx tx={this.state.tx} scriptSig={this.state.scriptSig} publicKey={this.state.publicKey} />
        </div>
        <div className='row'>
          <div className='col'>
            <label htmlFor='unlockingScript'>Unlocking Script <input className='script' id='unlockingScript' /></label>
          </div>
          <div className='col'>
            <label htmlFor='lockingScript'>Locking Script <input className='script' id='lockingScript' /></label>
          </div>
          <div className='col'>
            <button className='btn btn-primary' onClick={this.loadScript}>load</button>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm'>
            <Program className='' asm={this.concatScript()} pointer={this.stepNo} />
          </div>
          <div>
            <button className='btn btn-primary' disabled={this.state.scriptEnded} onClick={this.next}>next</button>
            {
              this.state.scriptEnded ? this.state.verified ? <div className='verified'>verified &#10003;</div> : <div className='notVerified'>did not verify &#10005;</div> : null
            }
          </div>
          <div className='col-sm'>
            <Stack currentStack={this.state.currentStack} />
          </div>
        </div>
      </div>
    )
  }
}

export default Debugger
