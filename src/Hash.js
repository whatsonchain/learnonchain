import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { sha256 } from './sha256.js'

import './Hash.css'
const crypto = require('crypto')

class Hash extends Component {
  constructor (props) {
    super(props)
    this.sha256 = this.sha256.bind(this)
    this.key = this.key.bind(this)
    this.hash256 = this.hash256.bind(this)
    this.hash256d = this.hash256d.bind(this)
  }

  key (e) {
    var data = document.getElementById('data').value
    var hash = this.sha256(data)
    document.getElementById('hash').innerText = hash
    if (e.code === 'Enter') {
      this.go()
    }
  }

  hash256 () {
    var data = document.getElementById('data').value
    var hash = this.sha256(data)
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> =${data} using SHA256</p>`
    document.getElementById('results').innerHTML = results
  }

  hash256d () {
    var data = document.getElementById('data').value
    var hash = this.sha256d(data)
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> = ${data} using SHA256d</p>`
    document.getElementById('results').innerHTML = results
  }

  sha256 (buffer) {
    var hash1 = crypto.createHash('sha256')
    hash1.update(buffer)
    return hash1.digest().toString('hex')
  }

  sha256d (str) {
    let buffer = Buffer.from(str)
    let res = this.sha256(this.sha256(buffer))
    return res
  }

  render () {
    return (
      <div>
        <div>
          <script src='%PUBLIC_URL%/sha256.js' />

          <h2>SHA-256 hash</h2>
          <p>You can input some text and hash it using SHA256 or double SHA256. You should convert the hex to binary if you want to hash like bitcoin does.</p>
          <label>data:</label>
          <input id='data' placeholder='something to hash' onKeyDown={this.key} />
          <button className='btn btn-primary' onClick={this.hash256}>SHA256</button>
          <button className='btn btn-primary' onClick={this.hash256d}>SHA256d</button>
        </div>
        <div id='hash'>&nbsp;</div>

        <div className='card' id='results' />

      </div>

    )
  }
}

export default Hash
