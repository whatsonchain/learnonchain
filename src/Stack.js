import React, { Component } from 'react'
import './Stack.css'

class Stack extends Component {
  toHexString (byteArray) {
    return Array.from(byteArray, function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2)
    }).join('')
  }

  render () {
    return (
      <div className='card stack h-100'>
        <div className='card-body'>
          <h2 className='card-title'>stack</h2>
          <div>
            {this.props.currentStack ? this.props.currentStack.stack.map((value, index) => {
              return <span className='item' key={index} >{this.toHexString(value)}</span>
            }) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Stack
