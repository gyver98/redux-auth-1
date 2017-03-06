import { combineReducers } from 'redux'
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE,
  QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE
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
  token
})

export default quotesApp