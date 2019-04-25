import React, { Component } from "react";
// import { Link } from 'react-router-dom'

import "./Navbar.css"

class Navbar extends Component {
  

  render() {
    return (
      <span>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand pl-4" href="/">
              <span>
                <img className="header-image mr-2" width="55" height="55" src={process.env.PUBLIC_URL + '/WOC-GY-10.png'} alt="logo" />
                <span>LearnOnChain.com</span>
              </span>
            </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent,#navbarSupportedContent2"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                    <span id='nav.foo'>Foo</span>
                </li>
                <li className="nav-item">
                    <span id='nav.about'>About</span>
                </li>
    
              </ul>
              </div>
        </nav>
      </span>
    );
  }
}

export default Navbar