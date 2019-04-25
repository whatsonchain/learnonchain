import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <footer style={{ marginTop: 50 }} className='footer bg-dark text-light pt-3 pb-1 px-3'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7 text-md-right'>
              <dl id='footer.support'>Support Development of LearnOnChain.com<dd>
                <div className='text-md-right text-center'>
                  <div
                    style={{ display: 'inline-block', maxWidth: 150 }}
                    className='text-center mb-3 word-wrap monospace'
                  >
                    <br />
                    <span>BSV Address: </span>
                    <a href='https://whatsonchain.com/address/bitcoincash:qq7su5mghkkamjss3g87g3eejxf8f3excuekujtlev'>
                        QR
                    </a>
                  </div>
                </div>
              </dd>
              </dl>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
