import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

class Navbar extends Component {
  render () {
    return (
      <span>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <a className='navbar-brand pl-4' href='/'>
            <span>
              <img className='header-image mr-2' width='55' src={process.env.PUBLIC_URL + '/loc-db.png'} alt='logo' />
              <span>LearnOnChain.com</span>
            </span>
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent,#navbarSupportedContent2'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>home</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/hash'>hash</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/block'>block</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/transaction'>transaction</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/script'>script</Link>
              </li>

            </ul>
          </div>
        </nav>
      </span>
    )
  }
}

export default Navbar
