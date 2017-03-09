import { combineReducers } from 'redux'
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE,
  PROPERTY_TIMELINE_REQUEST, PROPERTY_TIMELINE_SUCCESS, PROPERTY_TIMELINE_FAILURE,
  PROPERTY_DETAIL_REQUEST, PROPERTY_DETAIL_SUCCESS, PROPERTY_DETAIL_FAILURE,
  RADIUS_LISTED_REQUEST, RADIUS_LISTED_SUCCESS, RADIUS_LISTED_FAILURE
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    //isAuthenticated: localStorage.getItem('id_token') ? true : false
    isAuthenticated:false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
    }
}

// The token reducer
function token(state = {
    isFetching: false,
    authenticated: false
  }, action) {
  switch (action.type) {
    case TOKEN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        accessToken: action.access_token,
        authenticated: action.authenticated || false
      })
    case TOKEN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

// The property timeline reducer
function propertyTimeline(state = {
    isFetching: false,
    timeline: {},
    authenticated: false
  }, action) {
  switch (action.type) {
    case PROPERTY_TIMELINE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PROPERTY_TIMELINE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        timeline: action.response,
        authenticated: action.authenticated || false
      })
    case PROPERTY_TIMELINE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

// The property detail reducer
function propertyDetail(state = {
    isFetching: false,
    propertyDetailInfo: {},
    authenticated: false
  }, action) {
  switch (action.type) {
    case PROPERTY_DETAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PROPERTY_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        propertyDetailInfo: action.response,
        authenticated: action.authenticated || false
      })
    case PROPERTY_DETAIL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

// The radius listed reducer
function radiusListed(state = {
    isFetching: false,
    radiusListed: {},
    authenticated: false
  }, action) {
  switch (action.type) {
    case RADIUS_LISTED_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RADIUS_LISTED_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        radiusListed: action.response,
        authenticated: action.authenticated || false
      })
    case RADIUS_LISTED_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}
// The quotes reducer
// function quotes(state = {
//     isFetching: false,
//     quote: '',
//     authenticated: false
//   }, action) {
//   switch (action.type) {
//     case QUOTE_REQUEST:
//       return Object.assign({}, state, {
//         isFetching: true
//       })
//     case QUOTE_SUCCESS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         quote: action.response,
//         authenticated: action.authenticated || false
//       })
//     case QUOTE_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false
//       })
//     default:
//       return state
//   }
// }

// We combine the reducers here so that they
// can be left split apart above
const quotesApp = combineReducers({
  auth,
  token,
  propertyTimeline,
  propertyDetail,
  radiusListed
})

export default quotesApp