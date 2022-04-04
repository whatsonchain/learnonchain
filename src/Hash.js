import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { sha256 } from './sha256.js'

import './Hash.css'
const bsv = require('bsv')

class Hash extends Component {
  constructor (props) {
    super(props)
    this.sha256 = this.sha256.bind(this)
    this.hash256 = this.hash256.bind(this)
    this.ripemd160 = this.ripemd160.bind(this)
    this.hash160 = this.hash160.bind(this)
  }

  hash256 () {
    var data = document.getElementById('data').value
    var hash = bsv.crypto.Hash.sha256sha256(Buffer.from(data)).toString('hex')
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> = ${data} using SHA256d</p>`
    document.getElementById('results').innerHTML = results
  }

  sha256 () {
    var data = document.getElementById('data').value
    var hash = bsv.crypto.Hash.sha256(Buffer.from(data)).toString('hex')
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> = ${data} using SHA256</p>`
    document.getElementById('results').innerHTML = results
  }

  ripemd160 () {
    var data = document.getElementById('data').value
    var hash = bsv.crypto.Hash.ripemd160(Buffer.from(data)).toString('hex')
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> = ${data} using RIPEMD160</p>`
    document.getElementById('results').innerHTML = results
  }

  hash160 () {
    var data = document.getElementById('data').value
    var hash = bsv.crypto.Hash.sha256ripemd160(Buffer.from(data)).toString('hex')
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> = ${data} using SHA256 + RIPEMD160</p>`
    document.getElementById('results').innerHTML = results
  }

  render () {
    return (
      <div>
        <div>
          <script src='%PUBLIC_URL%/sha256.js' />

          <h2>SHA-256 & RIPEMD-160 hash</h2>
          <p>You can input some text and hash it using SHA256, double SHA256 (HASH256), RIPEMD160 or SHA256 + RIPEMD160 (HASH160).<br/>The text will be converted into binary in order to create the same hash as Bitcoin would.</p>
          <div className='form-group'>
            <label htmlFor='dataArea'>Data:
              <textarea className='dataArea' id='data' placeholder='something to hash' rows='5' />
            </label>
            <button className='btn btn-primary' onClick={this.sha256}>SHA256</button>
            <button className='btn btn-primary' onClick={this.hash256}>HASH256</button>
            <button className='btn btn-primary' onClick={this.ripemd160}>RIPEMD160</button>
            <button className='btn btn-primary' onClick={this.hash160}>HASH160</button>
          </div>
        </div>
        <div id='hash'>&nbsp;</div>

        <div className='card' id='results' />

      </div>

    )
  }
}

export default Hash
