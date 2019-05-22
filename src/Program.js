import React, { Component } from 'react'
import './Program.css'

class Program extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lockingASM: props.lockingASM,
      unlockingASM: props.unlockingASM,
      pointer: props.pointer,
      asmIndex: null
    }
  }

  static getDerivedStateFromProps (props, currentState) {
    if (currentState.lockingASM !== props.lockingASM) {
      return {
        lockingASM: props.lockingASM,
        unlockingASM: props.unlockingASM,
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
      (this.state.lockingASM
        ? <div className='card program h-100'>
          <div className='card-body'>
            <h2 className='card-title'>program</h2>
            <div className='ops text-wrap' />
            {(this.state.unlockingASM.length > 0 ? 'unlocking' : null
            )}
            {this.state.unlockingASM.map((value, index) => {
              return <span className={'op' + (this.state.asmIndex === index ? ' current' : '')} key={index} >{value}</span>
            })}
            {(this.state.lockingASM.length > 0 ? 'locking' : null
            )}

            {this.state.lockingASM.map((value, index) => {
              return <span className={'op' + (this.state.asmIndex === index + this.state.unlockingASM.length ? ' current' : '')} key={index} >{value}</span>
            })}
          </div>

        </div> : null)
    )
  }
}

export default Program
