import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

class HexPart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      highlight: false,
      id: '' + Math.floor(Math.random() * 100000000)
    }
  }

  render () {
    const style = {
      backgroundColor: this.props.backgroundColor
    }

    if (this.state.highlight) {
      style.outline = '2px solid black'
    }

    return (
      <span>
        <a
          style={style}
          onMouseEnter={() => { this.setState({ highlight: true }) }}
          onMouseLeave={() => { this.setState({ highlight: false }) }}
          data-tip
          data-for={this.state.id}
        >
          {this.props.data}
        </a>
        <ReactTooltip id={this.state.id} type='error'>
          <span>{this.props.info}</span>
        </ReactTooltip>
      </span>
    )
  }
}

HexPart.propTypes = {
  backgroundColor: PropTypes.string,
  data: PropTypes.string.isRequired,
  info: PropTypes.string
}

export default HexPart
