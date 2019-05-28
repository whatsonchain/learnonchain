import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class Home extends Component {
  render () {
    return (
      <div>
        <h2>Home</h2>
        The aim of learnonchain is to teach about the Bitcoin blockchain using the <a href='http://www.whatsonchain.com'>whatsonchain explorer</a> to provide real world data.

        <div className='alert alert-info' role='alert'>
          learnonchain is a work in progress.
        </div>

      </div>
    )
  }
}

export default Home
