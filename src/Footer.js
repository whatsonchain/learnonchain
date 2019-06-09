import React, { Component } from 'react'
import './Footer.css'
let MoneyButton = require('@moneybutton/react-money-button').default
class Footer extends Component {
  render () {
    return (
      <footer className='footer bg-dark text-light pt-3 pb-1 px-3'>
        <div className='container'>
          <div className='row footer-row'>
            <div className='col-md-5' >
              <dt> Ask devs </dt>
              <dd >
                <i className='fab fa-telegram' />
                <a href='https://t.me/joinchat/FfE6-EjZhoTHwhDhZH6F-w' target='_blank' rel='noopener noreferrer'> Join Group</a>
              </dd>
              <dd>
                <i className='fab fa-twitter' />
                <a href='https://twitter.com/WhatsOnChain' target='_blank' rel='noopener noreferrer'> Follow Us</a>
              </dd>

            </div>
            <div className='col-md-7 text-right' >
              <dt>Support Development of LearnOnChain.com</dt>
              <dd>

                <div className='text-right'>

                Paymail: loc@moneybutton.com |
                  <a href='https://whatsonchain.com/address/16ZqP5Tb22KJuvSAbjNkoiZs13mmRmexZA'>
                        Address
                  </a> |
                  <a href='https://whatsonchain.com/address/16ZqP5Tb22KJuvSAbjNkoiZs13mmRmexZA'>
                        QR
                  </a>
                  <br />
                  <div className='mbDiv'>
                    <MoneyButton
                      to='1353'
                      amount='1'
                      currency='USD'
                      successMessage='Thank you!'
                    />  </div><br />
                </div>

              </dd>
            </div>
          </div>
        </div>

      </footer>
    )
  }
}

export default Footer
