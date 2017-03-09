import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser, getToken, fetchPropertyTimeline, fetchPropertyDetail } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Quotes from '../components/Quotes'
import PropertyDetails from '../containers/PropertyDetails'

class App extends Component {
  
  render() {
    const { dispatch, accessToken, timeline, propertyDetailInfo, isAuthenticated, errorMessage, isSecretQuote } = this.props
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
        <div className='container'>
          <PropertyDetails
            onTokenClick={() => dispatch(getToken())}
            onSecretQuoteClick={() => dispatch(fetchSecretQuote())}
            onPropertyTimelineClick={() => dispatch(fetchPropertyTimeline())}
            onPropertyDetailClick={() => dispatch(fetchPropertyDetail())}
            isAuthenticated={isAuthenticated}
            accessToken={accessToken}
            timeline={timeline}
            propertyDetailInfo={propertyDetailInfo}
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
  
  const { token, auth, propertyTimeline, propertyDetail } = state;
  const { accessToken, authenticated } = token;
  const { isAuthenticated, errorMessage } = auth;
  const { timeline } = propertyTimeline;
  const { propertyDetailInfo } = propertyDetail;
  debugger;
  return {
    accessToken,
    timeline,
    propertyDetailInfo,
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)

