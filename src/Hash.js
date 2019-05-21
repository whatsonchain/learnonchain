import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { sha256 } from './sha256.js'

import './Hash.css'
const crypto = require('crypto')

class Hash extends Component {
  constructor (props) {
    super(props)
    this.sha256 = this.sha256.bind(this)
    this.sha256d = this.sha256d.bind(this)
    this.hash256 = this.hash256.bind(this)
    this.hash256d = this.hash256d.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.state = {
      convertToBinary: false
    }
  }

  hash256 () {
    var data = document.getElementById('data').value
    let buffer = data
    if (this.state.convertToBinary) {
      buffer = Buffer.from(buffer, 'hex')
    }
    var hash = (this.sha256(buffer, true))
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> = ${data} using SHA256</p>`
    document.getElementById('results').innerHTML = results
  }

  hash256d () {
    var data = document.getElementById('data').value
    var hash = this.sha256d(data)
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> = ${data} using SHA256d</p>`
    document.getElementById('results').innerHTML = results
  }

  sha256 (buffer, tohex = false) {
    var hash1 = crypto.createHash('sha256')
    hash1.update(buffer)
    let d = hash1.digest()
    if (tohex) {
      return d.toString('hex')
    } else {
      return d
    }
  }

  sha256d (str) {
    let buffer, res
    if (this.state.convertToBinary) {
      buffer = Buffer.from(str, 'hex')
      res = this.sha256(this.sha256(buffer))
    } else {
      buffer = Buffer.from(str)
      res = this.sha256(this.sha256(buffer).toString('hex'))
    }
    return res.toString('hex')
  }

  handleCheckboxChange (event) {
    const target = this.target = event.target
    this.setState({
      convertToBinary: target.checked
    })
  }

  render () {
    return (
      <div>
        <div>
          <script src='%PUBLIC_URL%/sha256.js' />

          <h2>SHA-256 hash</h2>
          <p>You can input some text and hash it using SHA256 or double SHA256. You should choose convert the hex to binary if you want to hash like bitcoin does.</p>
          <div className='form-group'>
            <label htmlFor='dataArea'>Data:
              <textarea className='dataArea' id='data' placeholder='something to hash' rows='5' />
            </label>
            <button className='btn btn-primary' onClick={this.hash256}>SHA256</button>
            <button className='btn btn-primary' onClick={this.hash256d}>SHA256d</button>
            <label>Convert to binary before encoding <input type='checkbox' name='binary' checked={this.state.convertToBinary} onChange={this.handleCheckboxChange} /></label>
          </div>
        </div>
        <div id='hash'>&nbsp;</div>

        <div className='card' id='results' />

      </div>

    )
  }
}

export default Hash
