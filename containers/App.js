import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser, getToken, fetchQuote, fetchSecretQuote } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Quotes from '../components/Quotes'

class App extends Component {
  
  render() {
    const { dispatch, quote, isAuthenticated, errorMessage, isSecretQuote } = this.props
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
        <div className='container'>
          <Quotes
            onQuoteClick={() => dispatch(getToken())}
            onSecretQuoteClick={() => dispatch(fetchSecretQuote())}
            isAuthenticated={isAuthenticated}
            quote={quote}
            isSecretQuote={isSecretQuote}
          />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  quote: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  isSecretQuote: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  
  const { token, auth } = state
  const { accessToken, authenticated } = token
  const { isAuthenticated, errorMessage } = auth
  
  return {
    token,
    isSecretQuote: authenticated,
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)

