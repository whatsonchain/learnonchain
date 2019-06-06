import React, { Component } from 'react'

import PropTypes from 'prop-types'
import './Stack.css'

class StackItem extends Component {
  render () {
    let val = this.props.value
    // if (val.length > 15) {
    //   val = val.slice(0, 6) + '...' + val.slice(-6)
    // }

    return (
      <span className='item'>{val}</span>
    )
  }
}

StackItem.propTypes = {
  value: PropTypes.string.isRequired
}

export default StackItem
