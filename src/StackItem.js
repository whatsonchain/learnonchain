import React, { Component } from 'react'
import './Stack.css'

const style = {
  background: 'pink',
  borderRadius: 10,
  padding: 5,
  paddingLeft: 10,
  margin: 5,
  zIndex: 1
}

class StackItem extends Component {
  toHexString (byteArray) {
    return Array.from(byteArray, function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2)
    }).join('')
  }

  render () {
    return (
      (this.props.value
        ? <span style={style} className='item' >{this.toHexString(this.props.value)}</span>
        : null)
    )
  }
}

export default StackItem
