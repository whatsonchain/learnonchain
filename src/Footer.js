import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <footer style={{ marginTop: 50 }} className='footer fixed-bottom bg-dark text-light pt-3 px-3'>
        <div className='container'>
          <div className='text-center'>
            <dl id='footer.support'>Support Development of LearnOnChain.com<dd>
              <div className='text-center'>
                <div className='text-center'>
                  <br />
                  <span className='text-center'>BSV Address: </span>
                  <a href='https://whatsonchain.com/address/bitcoincash:qq7su5mghkkamjss3g87g3eejxf8f3excuekujtlev'>
                        QR
                  </a>
                </div>
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
