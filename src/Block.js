import React, { Component } from 'react'
import './Block.css'
const wocApi = require('./wocApi')
const shajs = require('sha.js')
const crypto = require('crypto')

class Block extends Component {
  constructor (props) {
    super(props)
    this.state = {
      block: null
    }
    console.log('props.block', props.block)
  }
  async componentWillMount () {
    // get latest block height
    let height = 123456

    let block = await wocApi.getBlockByHeight(height)
    console.log('block:', block)
    this.setState({ block })
  }

  swapBytes (str) {
    const result = []
    let len = str.length - 2
    while (len >= 0) {
      result.push(str.substr(len, 2))
      len -= 2
    }
    // https://en.bitcoin.it/wiki/Block_hashing_algorithm
    return result.join('')
  }

  sha256 (buffer) {
    var hash1 = crypto.createHash('sha256')
    hash1.update(buffer)
    return hash1.digest()
  }

  sha256d (str) {
    let buffer = Buffer.from(str, 'hex')
    let res = this.sha256(this.sha256(buffer))
    let resStr = res.toString('hex')
    return this.swapBytes(resStr)
  }
  render () {
    return (this.state.block ? <div>
      <h1 className='h3'>Block</h1>

      Block number <b>{this.state.block.height}</b> has a hash of <b>{this.state.block.hash}</b><br />
      The block header is constructed from the following six fields
      <div className='blockFields'>
        <span className='version'>Version</span>
        <span className='prevBlockHash'>Previous Block Hash</span>
        <span className='merkleRoot'>Merkle Root</span>
        <span className='timestamp'>Timestamp</span>
        <span className='target'>Target</span>
        <span className='nonce'>Nonce</span>
      </div>
      <div className='blockValues'>
        <h4>Original values from bitcoin node</h4>
        <span className='version'>{this.state.block.versionHex}</span>
        <span className='prevBlockHash'>{this.state.block.previousblockhash}</span>
        <span className='merkleRoot'>{this.state.block.merkleroot}</span>
        <span className='timestamp'>{this.state.block.time}</span>
        <span className='target'>{this.state.block.bits}</span>
        <span className='nonce'>{this.state.block.nonce}</span>
      </div>
      <div className='blockValues'>
        <h4>Changed to little-endian and ready for double sha256</h4>
        <span className='version'>{this.swapBytes(this.state.block.versionHex)}<small>(little-endian)</small></span>
        <span className='prevBlockHash'>{this.swapBytes(this.state.block.previousblockhash)}<small>(little-endian)</small></span>
        <span className='merkleRoot'>{this.swapBytes(this.state.block.merkleroot)}<small>(little-endian)</small></span>
        <span className='timestamp'>{this.swapBytes(parseInt(this.state.block.time).toString(16))}<small>(hex encoded and little-endian)</small></span>
        <span className='target'>{this.swapBytes(this.state.block.bits)}<small>(little-endian)</small></span>
        <span className='nonce'>{this.swapBytes(parseInt(this.state.block.nonce).toString(16))}<small>(hex encoded and little-endian)</small></span>
      </div>
      <div>
        <h4>Hash of the header reversed</h4>
        {this.sha256d('010000009500c43a25c624520b5100adf82cb9f9da72fd2447a496bc600b0000000000006cd862370395dedf1da2841ccda0fc489e3039de5f1ccddef0e834991a65600ea6c8cb4db3936a1ae3143991')}
      </div>
    </div> : null)
  }
}

export default Block
