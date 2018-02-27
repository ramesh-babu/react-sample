// import axios from 'axios';

const LOAD = 'touchpoint/auth/LOAD';
const LOAD_SUCCESS = 'touchpoint/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'touchpoint/auth/LOAD_FAIL';
const LOGIN = 'touchpoint/auth/LOGIN';
const LOGIN_SUCCESS = 'touchpoint/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'touchpoint/auth/LOGIN_FAIL';
const LOGOUT = 'touchpoint/auth/LOGOUT';
const LOGOUT_SUCCESS = 'touchpoint/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'touchpoint/auth/LOGOUT_FAIL';
const LOGIN_USER = 'touchpoint/auth/LOGIN_USER';
const LOGIN_USER_SUCCESS = 'touchpoint/auth/LOGIN_USER_SUCCESS';
const LOGIN_USER_FAIL = 'touchpoint/auth/LOGIN_USER_FAIL';
const GRAPHDATA = 'touchpoint/auth/GRAPHDATA';
const GRAPHDATA_SUCCESS = 'touchpoint/auth/GRAPHDATA_SUCCESS';
const GRAPHDATA_FAIL = 'touchpoint/auth/GRAPHDATA_FAIL';
const RESET_GRAPHDATA = 'touchpoint/auth/RESET_GRAPHDATA';


const initialState = {
  loaded: false,
  loginLoading: false,
  loginLoaded: false,
  user: null,
  graphLoading: false,
  graphLoaded: true,
  graph: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        graph: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case LOGIN_USER:
      return {
        ...state,
        loginLoading: true,
        loginLoaded: false,
        ...action.result,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginLoaded: true,
        user: action.result
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loginLoading: false,
        loginLoaded: true,
        ...action.result
      };
    case GRAPHDATA:
      return {
        ...state,
        graphLoading: true,
        graphLoaded: false,
      };
    case GRAPHDATA_SUCCESS:
      return {
        ...state,
        graphLoading: false,
        graphLoaded: true,
        graph: action.result
      };
    case GRAPHDATA_FAIL:
      return {
        ...state,
        graphLoading: false,
        graphLoaded: true,
        graph: action.result
      };
    case RESET_GRAPHDATA:
      return {
        ...state,
        graphLoading: false,
        graphLoaded: false,
        graph: null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(authrizedToken) {
  return {
    types: [LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL],
    promise: (client) => client.post('/login', { data: { authrizedToken: authrizedToken } })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}

export function getGraphUserData(accessToken) {
  return {
    types: [GRAPHDATA, GRAPHDATA_SUCCESS, GRAPHDATA_FAIL],
    promise: (client) => client.post('/graphData', { data: {access_token: accessToken} })
  };
}

export function resetGraphUserData() {
  return { type: RESET_GRAPHDATA };
}
