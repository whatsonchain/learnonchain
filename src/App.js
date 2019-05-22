import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import Navbar from './Navbar.js'
import Footer from './Footer.js'
import Home from './Home.js'
import Block from './Block.js'
import Hash from './Hash.js'
import Transaction from './Transaction.js'
import Script from './Script.js'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <div className='main'>
            <Switch>
              <Route path={'/'} exact component={Home} />
              <Route path={'/hash'} exact component={Hash} />
              <Route path={'/block'} exact component={Block} />
              <Route path={'/transaction'} exact component={Transaction} />
              <Route path={'/script'} exact component={Script} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
