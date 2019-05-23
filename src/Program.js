import React, { Component } from 'react'
import './Program.css'

class Program extends Component {
  constructor (props) {
    super(props)
    this.state = {
      script: props.asm,
      pointer: props.pointer,
      asmIndex: null
    }
  }

  static getDerivedStateFromProps (props, currentState) {
    // clear the state if there's no script or it's changed
    if (!currentState.script || JSON.stringify(currentState.script) !== JSON.stringify(props.asm)) {
      return {
        script: props.asm,
        pointer: null,
        asmIndex: null
      }
    }
    if (currentState.pointer !== props.pointer) {
      return {
        pointer: props.pointer,
        asmIndex: currentState.asmIndex !== null ? currentState.asmIndex + 1 : 0
      }
      // for back and forward movement - not working
      // if (currentState.pointer < props.pointer) {
      //   return {
      //     pointer: props.pointer,
      //     asmIndex: currentState.asmIndex !== null ? currentState.asmIndex + 1 : 0
      //   }
      // } else if (currentState.pointer > props.pointer) {
      //   return {
      //     pointer: props.pointer,
      //     asmIndex: currentState.asmIndex !== null ? currentState.asmIndex - 1 : 0
      //   }
      // }
    }
    return null
  }

  render () {
    return (
      (this.state.script
        ? <div className='card program h-100'>
          <div className='card-body'>
            <h2 className='card-title'>program</h2>
            <div className='ops text-wrap' />
            {this.state.script.map((value, index) => {
              return <span className={'op' + (this.state.asmIndex === index ? ' current' : '')} key={index} >{value}</span>
            })}
          </div>
        </div> : null)
    )
  }
}

export default Program
