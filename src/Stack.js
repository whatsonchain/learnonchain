import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './Stack.css'

import StackItem from './StackItem'

function toHexString (byteArray) {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2)
  }).join('')
}

class Stack extends Component {
  render () {
    let indexedStack = []

    if (this.props.currentStack && this.props.currentStack.stack.length > 0) {
      indexedStack = this.props.currentStack.stack.map((value, index) => {
        return {
          value: toHexString(value),
          index: this.props.currentStack.stack.length - index
        }
      })
    }

    return (
      <div className='card stack h-100'>
        <div className='card-body'>
          <h3 className='card-title'>stack</h3>
          <div className='holder'>
            <div className='mask' />
            <ReactCSSTransitionGroup
              transitionName='arrival'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {indexedStack.map(item => {
                return <StackItem key={item.index} value={item.value} />
              })}
            </ReactCSSTransitionGroup>

          </div>
        </div>
      </div>
    )
  }
}

export default Stack
