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
    this.go = this.go.bind(this)
  }

  key (e) {
    var data = document.getElementById('data').value
    var hash = this.sha256(data)
    document.getElementById('hash').innerText = hash
    if (e.code === 'Enter') {
      this.go()
    }
  }

  go () {
    var data = document.getElementById('data').value
    var hash = this.sha256(data)
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> =${data}</p>`
    document.getElementById('results').innerHTML = results
  }

  sha256 (buffer) {
    var hash1 = crypto.createHash('sha256')
    hash1.update(buffer)
    return hash1.digest().toString('hex')
  }

  render () {
    return (
      <div>
        <div>
          <script src='%PUBLIC_URL%/sha256.js' />

          <h2>SHA-256 hash</h2>
          <label>data:</label>
          <input id='data' placeholder='something to hash' onKeyDown={this.key} />
          <button className='btn btn-primary' onClick={this.go}>Hash</button>
        </div>
        <div id='hash'>&nbsp;</div>

        <div className='card' id='results' />

      </div>

    )
  }
}

export default Hash
