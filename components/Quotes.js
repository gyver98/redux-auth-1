import React, { Component, PropTypes } from 'react'

export default class Quotes extends Component {
  
  render() {
    const { onQuoteClick, onSecretQuoteClick, isAuthenticated, accessToken,quote, isSecretQuote } = this.props
    
    return (
      <div>
        <div className='col-sm-3'>
          <button onClick={onQuoteClick} className="btn btn-primary">
            Get Token
          </button>
        </div>
        
        { isAuthenticated &&
          <div className='col-sm-3'>
            <button onClick={onSecretQuoteClick} className="btn btn-warning">
              Get Property Timeline
            </button>
          </div>
        }
        
        <div className='col-sm-6'>
          { accessToken &&
            <div>
              <blockquote>{accessToken}</blockquote>
            </div>
          }
          
          { quote && isAuthenticated && isSecretQuote &&
            <div>
              <span className="label label-danger">Secret Quote</span>
              <hr/>
              <blockquote>
                {quote}
              </blockquote>
            </div>
          }
        </div>
      </div>
    )
  }
}

Quotes.propTypes = {
  onQuoteClick: PropTypes.func.isRequired,
  onSecretQuoteClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  quote: PropTypes.string,
  isSecretQuote: PropTypes.bool.isRequired
 }