import React, { Component } from 'react'
import './Stack.css'

import StackItem from './StackItem'

class Stack extends Component {
  render () {
    return (
      <div className='card stack h-100'>
        <div className='card-body'>
          <h3 className='card-title'>stack</h3>
          <div className='holder'>
            <div className='mask' />
            {this.props.currentStack ? this.props.currentStack.stack.reverse().map((value, index) => {
              return <StackItem value={value} />
            }) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Stack
