import React, { Component } from 'react'
import Program from './Program.js'
import Stack from './Stack.js'
import './Debugger.css'

let bsv = require('bsv')
class Debugger extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lockingASM: [],
      unlockingASM: [],
      stackItems: [],
      stepNo: null,
      opPointer: null,
      currentStack: null,
      scriptEnded: false
    }
    this.debugScript = this.debugScript.bind(this)
    this.handleScript = this.handleScript.bind(this)
    this.next = this.next.bind(this)
    // this.back = this.back.bind(this)
  }

  debugScript (step, stack, altstack) {
    let si = this.state.stackItems
    for (let item in stack.reverse()) {
      let stackItem = {}
      stackItem.pc = step.pc
      console.log('item ' + item)
      stackItem.stack = stack
      si.push(stackItem)
    }
    this.setState({ stackItems: si })
  }

  resetState () {
    this.setState({
      lockingASM: [],
      unlockingASM: [],
      stackItems: [],
      stepNo: null,
      opPointer: null,
      previousOpPointer: null,
      currentStack: null,
      scriptEnded: false
    })
  }
  handleScript () {
    let lockingScriptStr = (document.getElementById('lockingScript').value).toUpperCase()
    let unlockingScriptStr = (document.getElementById('unlockingScript').value).toUpperCase()
    let lockingASM = lockingScriptStr.split(' ')
    let unlockingASM = unlockingScriptStr.split(' ')
    this.resetState()

    var Interpreter = bsv.Script.Interpreter

    var si = Interpreter()
    si.flags = Interpreter.SCRIPT_VERIFY_P2SH |
    Interpreter.SCRIPT_ENABLE_MAGNETIC_OPCODES | Interpreter.SCRIPT_ENABLE_MONOLITH_OPCODES
    si.stepListener = this.debugScript
    // let script1 = bsv.Script(unlockingScriptStr)
    // console.log(script1)
    try {
      si.verify(bsv.Script(unlockingScriptStr), bsv.Script(lockingScriptStr))
    } catch (e) {
      console.log('invalid script')
      return
    }

    this.setState({
      lockingASM,
      unlockingASM
    })
    // si.verify(bsv.Script(unlockingScriptStr),bsv.Script(lockingScriptStr), Interpreter.SCRIPT_ENABLE_MAGNETIC_OPCODES)
    // unlocking    OP_1 OP_2 OP_ADD
    // locking      OP_3 OP_EQUAL
  }

  next () {
    let step = 1
    if (this.state.stepNo !== null) {
      step = this.state.stepNo + 1
    }

    this.setState({ stepNo: step })
    let currentState = this.state.stackItems[step]
    if (currentState && currentState.pc === 0 && this.state.previousOpPointer === this.state.opPointer && this.state.stepNo > 0) {
      this.setState({ opPointer: this.state.opPointer + 1 })
    } else {
      this.setState({ opPointer: (currentState && currentState.pc != null ? this.state.opPointer + currentState.pc : 1) })
    }
    if (step >= 0) {
      let currentStack = this.state.stackItems[step - 1]
      this.setState({ currentStack: currentStack })
    }
    this.setState({ previousOpPointer: this.state.opPointer })

    if (this.state.opPointer > this.state.lockingASM.length + this.state.unlockingASM.length) {
      this.setState({ scriptEnded: true })
    }
  }

  // back () {
  //   let step = this.state.stepNo
  //   if (step >= 0) {
  //     step = this.state.stepNo - 1
  //   }
  //   if (step === 0) {
  //     console.log('no previous steps')
  //     return
  //   }
  //   this.setState({ stepNo: step })
  //   let currentState = this.state.stackItems[step]
  //   this.setState({ opPointer: currentState.pc })
  //   let currentStack = this.state.stackItems[step]
  //   this.setState({ currentStack: currentStack })
  // }

  render () {
    return (
      <div>
        <h3>Debugger</h3>
        <div className='row'>
          <div className='col'>
            <label htmlFor='unlockingScript'>Unlocking Script <input className='script' id='unlockingScript' placeholder='unlocking script' /></label>
          </div>
          <div className='col'>
            <label htmlFor='lockingScript'>Locking Script <input className='script' id='lockingScript' placeholder='locking script' /></label>
          </div>
          <div className='col'>
            <button className='btn btn-primary' onClick={this.handleScript}>load</button>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm'>
            <Program className='' lockingASM={this.state.lockingASM} unlockingASM={this.state.unlockingASM} pointer={this.state.opPointer} />
          </div>
          <div>
            <button className='btn btn-primary' disabled={this.state.scriptEnded} onClick={this.next}>next</button>
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
