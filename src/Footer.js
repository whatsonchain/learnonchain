import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <footer style={{ marginTop: 50 }} className='footer fixed-bottom bg-dark text-light pt-3 px-3'>
        <div className='container'>
          <div className='text-center'>
            <dl id='footer.support'>Support Development of LearnOnChain.com<dd>
              <div className='text-center'>
                <span className='text-center'>BSV Address: </span>
                <a href='https://whatsonchain.com/address/bitcoincash:qq7su5mghkkamjss3g87g3eejxf8f3excuekujtlev'>
                        QR
                </a><br />

                <i class='fab fa-telegram' />
                <a href='https://t.me/learnonchain' target='_blank'>Join Telegram Group</a>
              </div>
            </dd>
            </dl>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
