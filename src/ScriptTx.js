import React, { Component } from 'react'
import './ScriptTx.css'

class ScriptTx extends Component {
  toHexString (byteArray) {
    return Array.from(byteArray, function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2)
    }).join('')
  }

  render () {
    return (
      this.props.tx ? (
        <div className='card'>
          <div className='scriptTx'>
            A transaction has been created.
            {/* <div><label>hash:</label>{this.props.tx.hash}</div>
            <div ><label>version:</label>{this.props.tx.version}</div>
            <div><label>inputs:</label>[{this.props.tx.inputs.length}]</div>
            {this.props.tx.inputs ? this.props.tx.inputs.map((value, index) => {
              return <div key={'i_' + index}>
                <span>{JSON.stringify(value)}</span>
              </div>
            }) : ''}
            <div><label>outputs:</label>[{this.props.tx.outputs.length}]</div>
            {this.props.tx.outputs ? this.props.tx.outputs.map((value, index) => {
              return <div key={'i_' + index}>
                <span>{JSON.stringify(value)}</span>
              </div>
            }) : ''}
            <div ><label>nLockTime:</label>{this.props.tx.nLockTime}</div> */}
            <div><label>scriptSig:</label>{this.props.scriptSig.toString()}</div>
            <div><label>pubKey:</label>{this.props.publicKey.toString()}</div>
          </div>
        </div>
      ) : ''
    )
  }
}

export default ScriptTx
