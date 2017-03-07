// The middleware to call the API for quotes
import { CALL_API } from './middleware/api'

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch('http://localhost:3001/sessions/create', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}


// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';

function requestToken(creds) {
  return {
    type: TOKEN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveToken(token) {
  return {
    type: TOKEN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    access_token: token.access_token
  }
}

function tokenError(message) {
  return {
    type: TOKEN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function getToken() {
  //debugger;
  const client_id = '8dddf18c';
  const client_secret = '6fc919ac9fee7f9390a824722e7ef205';
  const grant_type = 'client_credentials';

  const config = {
    method: 'GET'
    //headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    //params: `client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}`
  }
  const params = `client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}`;
  
  return dispatch => {
    // We dispatch requestToken to kickoff the call to the API
    dispatch(requestToken())
    //debugger;
    return fetch('https://access-api.corelogic.asia/access/oauth/token?'+ params, config)
    //return fetch('https://access-api.corelogic.asia/access/oauth/token?client_id=8dddf18c&client_secret=6fc919ac9fee7f9390a824722e7ef205&grant_type=client_credentials', config)
      .then(response =>
        response.json()
        .then(token => ({ token, response }))
      ).then(({ token, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(tokenError(token.message))
          return Promise.reject(token)
        }
        else {
          // If getToken was successful, set the token in local storage
          localStorage.setItem('access_token', token.access_token)
          
          // Dispatch the success action
          dispatch(receiveToken(token))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export const QUOTE_REQUEST = 'QUOTE_REQUEST'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'
export const QUOTE_FAILURE = 'QUOTE_FAILURE'

// Uses the API middlware to get a quote
export function fetchQuote() {
  return {
    [CALL_API]: {
      endpoint: 'random-quote',
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}

// Same API middlware is used to get a 
// secret quote, but we set authenticated
// to true so that the auth header is sent
export function fetchSecretQuote() {
  return {
    [CALL_API]: {
      endpoint: 'protected/random-quote',
      authenticated: true,
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}