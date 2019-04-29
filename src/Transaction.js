import React, { Component } from 'react'

const wocApi = require('./wocApi')

class Transaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tx: null
    }
  }

  async componentWillMount () {
    let initialTxid = 'b9c724a761109b4da754fb68bbc4b85108cd1c67278797daf2c62ae738f819a2'

    this.getTx(initialTxid)
  }

  async getTx (txid) {
    let tx = await wocApi.getTransaction(txid)
    console.log('tx:', tx)
    if (tx) {
      this.setState({ tx })
    }
  }
  render () {
    return (this.state.tx ? <div>
      <h1 className='h3'>Transaction</h1>
      The transaction header is constructed from the following fields
      <div className='card transactionFields'>
        <div className='card-body'>
          <span className='version'>Version</span>

        </div>
      </div>
      <div className='card blockValues'>
        <div className='card-body'>
          <h4 className='card-title'>Original values from bitcoin node</h4>
          <span className='version'>0{this.state.tx.version}000000</span>
          <span className='hex'>{this.state.tx.hex}</span>

        </div>
      </div>
    </div> : null)
  }
}

export default Transaction
