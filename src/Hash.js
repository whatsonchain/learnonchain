import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { sha256 } from './sha256.js'
import './Hash.css'

class Hash extends Component {
  key (e) {
    var data = document.getElementById('data').value
    var hash = sha256(data)
    document.getElementById('hash').innerText = hash
    if (e.code === 'Enter') {
      this.go()
    }
  }

  go () {
    var data = document.getElementById('data').value
    var hash = sha256(data)
    var results = document.getElementById('results').innerHTML
    results += `<p><span class='answer'>${hash}</span> =${data}</p>`
    document.getElementById('results').innerHTML = results
  }

  render () {
    return (
      <div>
        <div>
          <script src='%PUBLIC_URL%/sha256.js' />

          <h2>SHA-256 hash</h2>
          <label>data:</label>
          <input id='data' placeholder='data' onKeyDown={this.key} />
          <button onClick={this.go}>Hash</button>
        </div>
        <div id='hash'>&nbsp;</div>

        <div id='results' />

      </div>

    )
  }
}

export default Hash
