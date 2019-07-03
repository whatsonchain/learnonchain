import React, { Component } from 'react'
import Program from './Program.js'
import Stack from './Stack.js'
import ScriptTx from './ScriptTx.js'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './Debugger.css'

let bsv = require('bsv')

const Interpreter = bsv.Script.Interpreter

class Debugger extends Component {
  constructor (props) {
    super(props)
    this.state = {
      localStackItems: [],
      currentStack: null,
      opPointer: 0,
      scriptEnded: false,
      tx: null,
      publicKey: null,
      scriptSig: null,
      lockingScriptInputValue: '',
      unlockingScriptInputValue: ''
    }
    this.lockingASM = []
    this.unlockingASM = []
    this.totalASMLength = []
    this.opPointer = null
    this.tx = null
    this.handleLockingScriptInputChange = this.handleLockingScriptInputChange.bind(this)
    this.handleUnlockingScriptInputChange = this.handleUnlockingScriptInputChange.bind(this)
    this.debugScript = this.debugScript.bind(this)
    this.loadScript = this.loadScript.bind(this)
    this.resetStateAndLoadScript = this.resetStateAndLoadScript.bind(this)
    this.next = this.next.bind(this)
    this.createP2PKH = this.createP2PKH.bind(this)
    // this.back = this.back.bind(this)
    this.lockingASM = []
    this.unlockingASM = []
    this.totalASMLength = []
    this.opPointer = null
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

  debugScript (step, stack) {
    console.log(step)
    console.log(stack)

    let stackItems = []
    stack.reverse().forEach(element => {
      let stackItem = {}
      stackItem.pc = step.pc
      stackItem.stack = stack
      stackItems.push(stackItem)
    })
    let tempStack = this.state.localStackItems
    tempStack.push(stackItems)
    this.setState({ localStackItems: tempStack })
  }

  concatScript () {
    if (this.unlockingASM) {
      return this.unlockingASM.concat(this.lockingASM)
    }
    return this.lockingASM
  }

  tryScript (example) {
    const lockingScriptStr = (document.getElementById(example + '-locking').textContent)
    const unlockingScriptStr = (document.getElementById(example + '-unlocking').textContent)
    this.setState({ lockingScriptInputValue: lockingScriptStr })
    this.setState({ unlockingScriptInputValue: unlockingScriptStr })
    // window.scrollTo(0, '#collapseExample')
  }

  handleLockingScriptInputChange (event) {
    this.setState({ lockingScriptInputValue: event.target.value })
  }

  handleUnlockingScriptInputChange (event) {
    this.setState({ unlockingScriptInputValue: event.target.value })
  }

  resetStateAndLoadScript () {
    this.lockingASM = []
    this.unlockingASM = []
    this.totalASMLength = []
    this.opPointer = null
    this.tx = null
    this.setState({
      localStackItems: [],
      currentStack: null,
      opPointer: 0,
      scriptEnded: false
    }, () => {
      this.loadScript()
    })
  }

  loadScript () {
    console.log('Stack Length: ' + this.state.localStackItems.length)
    this.lockingASM = null
    this.unlockingASM = null
    const lockingScriptStr = this.state.lockingScriptInputValue.trim()
    const unlockingScriptStr = this.state.unlockingScriptInputValue.trim()

    if (lockingScriptStr.length === 0 || unlockingScriptStr.length === 0) return

    // split the script for the program component
    if (lockingScriptStr) {
      this.lockingASM = lockingScriptStr.split(' ')
    }
    if (unlockingScriptStr) {
      this.unlockingASM = unlockingScriptStr.split(' ')
    }

    this.totalASMLength = 0 // length of both ASM scripts
    if (this.lockingASM) {
      this.totalASMLength += this.lockingASM.length
    }
    if (this.unlockingASM) {
      this.totalASMLength += this.unlockingASM.length
    }

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
      }
      let verified = si.verify(u, l, tx, txIndex, flags)
      this.setState({ verified })
    } catch (e) {
      console.log('Error: Invalid script: ', e)
      return
    }
    si = null
    // unlocking    OP_1 OP_2 OP_ADD
    // locking      OP_3 OP_EQUAL

    // unlocking    OP_1 022afc20bf379bc96a2f4e9e63ffceb8652b2b6a097f63fbee6ecec2a49a48010e 03a767c7221e9f15f870f1ad9311f5ab937d79fcaeee15bb2c722bca515581b4c0 OP_2 OP_CHECKMULTISIG
    // locking      OP_HASH160 OP_PUSHDATA1 0x16 0x748284390f9e263a4b766a75d0633c50426eb875 OP_EQUAL
  }

  next () {
    this.opPointer += 1
    let tempCurrentStack = null

    if (this.state.localStackItems) {
      tempCurrentStack = this.state.localStackItems[this.opPointer - 1]
    }

    this.setState({
      currentStack: tempCurrentStack ? tempCurrentStack[0] : null,
      opPointer: this.opPointer
    })

    if (this.opPointer > this.totalASMLength) {
      this.setState({ scriptEnded: true })
    }
  }

  render () {
    return (
      <div className='mb-6'>
        <h3>Debugger</h3>
        <div className='pb-4'>
          <p>This is a debugger that will allow you to step through trivial scripts and view the stack.</p>
          <p>Paste in a lock and unlock script and press load.</p>

          Create a transaction to use in the script, eg, for <code>OP_CHECKSIG</code>
          <button className='btn btn-primary' onClick={this.createP2PKH}>create</button>
          <ScriptTx tx={this.state.tx} scriptSig={this.state.scriptSig} publicKey={this.state.publicKey} />
        </div>
        <Card id='loadScript'>
          <Card.Header>Enter Scripts</Card.Header>
          <Card.Body ref='enterScripts'>
            <div className='mb-3'>
              <InputGroup size='sm'>
                <InputGroup.Prepend>
                  <InputGroup.Text >Unlocking Script</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id='unlockingScript' as='textarea' aria-label='Unlocking Script' value={this.state.unlockingScriptInputValue} onChange={this.handleUnlockingScriptInputChange} />
              </InputGroup>
              <br />
              <InputGroup size='sm'>
                <InputGroup.Prepend>
                  <InputGroup.Text >Locking Script</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id='lockingScript' as='textarea' aria-label='Locking Script' value={this.state.lockingScriptInputValue} onChange={this.handleLockingScriptInputChange} />
              </InputGroup>
              <Button className='float-right' variant='primary' onClick={this.resetStateAndLoadScript} >Load</Button>
              <div >
                <a className='btn btn-info' data-toggle='collapse' href='#collapseExample' role='button' aria-expanded='false' aria-controls='collapseExample'>
    Examples </a>

                <div className='collapse' id='collapseExample' style={{ width: '100%' }}>
                  <Card style={{ width: '100%' }}>
                    <Card.Body>

                      {/* <h4>Example scripts</h4> */}
                      <dl className='row'>
                        <dt className='col-sm-3'>
                          <a className='btn btn-success btn-sm' data-toggle='collapse' href='#collapseExample' role='button' aria-expanded='false' aria-controls='collapseExample' onClick={() => this.tryScript('simple')}> Try </a>
                          Simple
                        </dt>
                        <dd className='col-sm-9'>unlocking    <code id='simple-unlocking'>OP_1 OP_2 OP_ADD</code><br />
                                 locking     <code id='simple-locking'>OP_3 OP_EQUAL</code><br /><hr /></dd>
                        <dt className='col-sm-3'>
                          <a className='btn btn-success btn-sm' data-toggle='collapse' href='#collapseExample' role='button' aria-expanded='false' aria-controls='collapseExample' onClick={() => this.tryScript('hash')}> Try </a>
                          Hash Puzzle
                        </dt>
                        <dd className='col-sm-9'>unlocking    <code id='hash-unlocking'>0223078d2942df62c45621d209fab84ea9a7a23346201b7727b9b45a29c4e76f5e</code><br />
                                 locking     <code id='hash-locking'>OP_HASH160 88d9931ea73d60eaf7e5671efc0552b912911f2a OP_EQUAL</code><br /><hr /></dd>
                        <dt className='col-sm-3'>
                          <a className='btn btn-success btn-sm' data-toggle='collapse' href='#collapseExample' role='button' aria-expanded='false' aria-controls='collapseExample' onClick={() => this.tryScript('checksig')}> Try </a>
                          Checksig
                        </dt>
                        <dd className='col-sm-9'><strong>requires a transaction</strong><br />
                                 unlocking    <code id='checksig-unlocking'>3045022100948c67a95f856ae875a48a2d104df9d232189897a811178a715617d4b090a7e90220616f6ced5ab219fe1bfcf9802994b3ce72afbb2db0c4b653a74c9f03fb99323f01 0223078d2942df62c45621d209fab84ea9a7a23346201b7727b9b45a29c4e76f5e</code><br />
                                 locking     <code id='checksig-locking'>OP_DUP OP_HASH160 88d9931ea73d60eaf7e5671efc0552b912911f2a OP_EQUALVERIFY OP_CHECKSIG</code><br /><hr /></dd>
                        <dt className='col-sm-3'>
                          <a className='btn btn-success btn-sm' data-toggle='collapse' href='#collapseExample' role='button' aria-expanded='false' aria-controls='collapseExample' onClick={() => this.tryScript('r-puzzle')}> Try </a>
                          r Puzzle
                        </dt>
                        <dd className='col-sm-9'>unlocking    <code id='r-puzzle-unlocking'>3045022100948c67a95f856ae875a48a2d104df9d232189897a811178a715617d4b090a7e90220616f6ced5ab219fe1bfcf9802994b3ce72afbb2db0c4b653a74c9f03fb99323f01</code><br />
                                 locking     <code id='r-puzzle-locking'>OP_3 OP_SPLIT OP_NIP OP_1 OP_SPLIT OP_SWAP OP_SPLIT OP_DROP 00948c67a95f856ae875a48a2d104df9d232189897a811178a715617d4b090a7e9 OP_EQUAL</code><br /><hr /></dd>
                        <dt className='col-sm-3'>
                          <a className='btn btn-success btn-sm' data-toggle='collapse' href='#collapseExample' role='button' aria-expanded='false' aria-controls='collapseExample' onClick={() => this.tryScript('r-puzzle-hash')}> Try </a>
                          r Puzzle Hash
                        </dt>
                        <dd className='col-sm-9'>unlocking    <code id='r-puzzle-hash-unlocking'>3045022100948c67a95f856ae875a48a2d104df9d232189897a811178a715617d4b090a7e90220616f6ced5ab219fe1bfcf9802994b3ce72afbb2db0c4b653a74c9f03fb99323f01</code><br />
                                 locking     <code id='r-puzzle-hash-locking'>OP_3 OP_SPLIT OP_NIP OP_1 OP_SPLIT OP_SWAP OP_SPLIT OP_DROP OP_HASH160 40dfe2f5712253fa6bb2e3923278bd077bf03668 OP_EQUAL</code><br /></dd>
                      </dl>
                    </Card.Body>
                  </Card>

                </div>

              </div>
            </div>
          </Card.Body>
        </Card>
        <br />
        <div className='row'>
          <div className='col-sm'>
            <Program className='' asm={this.concatScript()} pointer={this.state.opPointer} />
          </div>
          <div>
            <button className='btn btn-primary' disabled={this.state.scriptEnded} onClick={this.next}>Execute</button>
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
