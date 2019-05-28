import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

// import HexPart from './HexPart'
import './Transaction.css'
import { swapBytes } from './utils'
// let bsv = require('bsv')

const wocApi = require('./wocApi')

class Transaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tx: null
    }
    this.vinCount = null
  }

  async componentWillMount () {
    let initialTxid = 'b9c724a761109b4da754fb68bbc4b85108cd1c67278797daf2c62ae738f819a2'

    this.getTx(initialTxid)
  }

  async getTx (txid) {
    let tx = await wocApi.getTransaction(txid)
    console.log('tx:', tx)
    console.log('first slice:', tx.hex.slice(0, 8))
    console.log('2nd slice:', tx.hex.slice(-8))

    if (tx) {
      this.setState({ tx })
    }
    let vinVarint = tx.hex.slice(9, 10)
    if (vinVarint === 'fd') {
      // next 2 bytes are number
    } else if (vinVarint === 'fe') {
      // next 4 bytes are number
    } else if (vinVarint === 'ff') {
      // next 8 bytes are number
    } else {
      // just use integer
      this.vinCount = vinVarint
    }
  }
  render () {
    return (this.state.tx ? <div>
      <h1 className='h3'>Transaction</h1>
      We shall examine transaction <a href={`https://whatsonchain.com/tx/${this.state.tx.txid}`}>{this.state.tx.txid}</a><br />

      The transaction header is constructed from the following fields
      <div className='card transactionFields'>
        <div className='card-body'>
          <span className='version'>Version</span>
          <span className='inputs'>Inputs</span>
          <span className='outputs'>Outputs</span>
          <span className='locktime'>Locktime</span>
        </div>
      </div>

      <div className='card transactionValues'>
        <div className='card-body'>
          <h4 className='card-title'>Original values from bitcoin node</h4>
          <span className='version' data-tip='version'>{this.state.tx.version}</span>
          <span className='inputs' data-tip='inputs'>
            {this.state.tx.vin.map((value, index) => {
              return <span key={index} >{value.txid ? swapBytes(value.txid) : null}</span>
            })}
          </span>
          <span className='outputs' data-tip='outputs'>
            {this.state.tx.vout.map((value, index) => {
              return <span key={index} >{value.scriptPubKey.hex}</span>
            })}
          </span>
          <span className='locktime' data-tip='locktime'>{this.state.tx.locktime}</span>
        </div>
      </div>
      <ReactTooltip />

      {/* <div className='card transactionValues'>
        <div className='card-body'>
          <h4 className='card-title'>Transaction Details</h4>
          <HexPart className='version' backgroundColor='red' info='This is the version' data={'0' + this.state.tx.version + '000000'} />
          <HexPart className='inputs' backgroundColor='orange' info='inputs' data={bsv.encoding.Varint().fromNumber(this.state.tx.vin.length).toString()} />
          <HexPart className='outputs' backgroundColor='rgb(224, 224, 70)' info='outputs' data={this.state.tx.hex.slice(10, -8)} />
          <HexPart className='locktime' backgroundColor='green' info='locktime' data={this.state.tx.hex.slice(-8)} />
        </div>
      </div> */}
    </div> : null)
  }
}

export default Transaction
