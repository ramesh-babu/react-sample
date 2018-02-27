const LOAD_ALL_IT_REQUESTS = 'touchpoint/itrequests/LOAD_ALL_IT_REQUESTS';
const LOAD_ALL_IT_REQUESTS_SUCCESS = 'touchpoint/itrequests/LOAD_ALL_IT_REQUESTS_SUCCESS';
const LOAD_ALL_IT_REQUESTS_FAIL = 'touchpoint/itrequests/LOAD_ALL_IT_REQUESTS_FAIL';

const LOAD_ASSIGNED_IT_REQUESTS = 'touchpoint/itrequests/LOAD_ASSIGNED_IT_REQUESTS';
const LOAD_ASSIGNED_IT_REQUESTS_SUCCESS = 'touchpoint/itrequests/LOAD_ASSIGNED_IT_REQUESTS_SUCCESS';
const LOAD_ASSIGNED_IT_REQUESTS_FAIL = 'touchpoint/itrequests/LOAD_ASSIGNED_IT_REQUESTS_FAIL';

const LOAD_REQUEST_TYPES = 'touchpoint/itrequests/LOAD_REQUEST_TYPES';
const LOAD_REQUEST_TYPES_SUCCESS = 'touchpoint/itrequests/LOAD_REQUEST_TYPES_SUCCESS';
const LOAD_REQUEST_TYPES_FAIL = 'touchpoint/itrequests/LOAD_REQUEST_TYPES_FAIL';

const LOAD_REQUEST_PRIORITIES = 'touchpoint/itrequests/LOAD_REQUEST_PRIORITIES';
const LOAD_REQUEST_PRIORITIES_SUCCESS = 'touchpoint/itrequests/LOAD_REQUEST_PRIORITIES_SUCCESS';
const LOAD_REQUEST_PRIORITIES_FAIL = 'touchpoint/itrequests/LOAD_REQUEST_PRIORITIES_FAIL';

const SUBMIT_IT_REQUEST = 'touchpoint/itrequests/SUBMIT_IT_REQUEST';
const SUBMIT_IT_REQUEST_SUCCESS = 'touchpoint/itrequests/SUBMIT_IT_REQUEST_SUCCESS';
const SUBMIT_IT_REQUEST_FAIL = 'touchpoint/itrequests/SUBMIT_IT_REQUEST_FAIL';

const REPLY_IT_REQUEST = 'touchpoint/itrequests/REPLY_IT_REQUEST';
const REPLY_IT_REQUEST_SUCCESS = 'touchpoint/itrequests/REPLY_IT_REQUEST_SUCCESS';
const REPLY_IT_REQUEST_FAIL = 'touchpoint/itrequests/REPLY_IT_REQUEST_FAIL';

const DELETE_IT_REQUEST = 'touchpoint/itrequests/DELETE_IT_REQUEST';
const DELETE_IT_REQUEST_SUCCESS = 'touchpoint/itrequests/DELETE_IT_REQUEST_SUCCESS';
const DELETE_IT_REQUEST_FAIL = 'touchpoint/itrequests/DELETE_IT_REQUEST_FAIL';

const LOAD_GETITREQUESTTYPESMANAGERS_TYPES = 'touchpoint/itrequests/LOAD_GETITREQUESTTYPESMANAGERS_TYPES';
const LOAD_GETITREQUESTTYPESMANAGERS_TYPES_SUCCESS = 'touchpoint/itrequests/LOAD_GETITREQUESTTYPESMANAGERS_TYPES_SUCCESS';
const LOAD_GETITREQUESTTYPESMANAGERS_TYPES_FAIL = 'touchpoint/itrequests/LOAD_GETITREQUESTTYPESMANAGERS_TYPES_FAIL';

const initialState = {
  allItRequestsLoading: false,
  allItRequestsLoaded: false,
  allItRequestsData: [],
  assignedItRequestsLoading: false,
  assignedItRequestsLoaded: false,
  assignedItRequestsData: [],
  requestTypesLoading: false,
  requestTypesLoaded: false,
  requestTypesData: [],
  requestPrioritiesLoading: false,
  requestPrioritiesLoaded: false,
  requestPrioritiesData: [],
  submitItRequestLoading: false,
  submitItRequestLoaded: false,
  submitItRequestResponse: {
    message: null,
  },
  replyItRequestLoading: false,
  replyItRequestLoaded: false,
  replyItRequestResponse: {
    message: null,
  },
  deleteItRequestLoading: false,
  deleteItRequestLoaded: false,
  deleteItRequestResponse: {
    message: null,
  },
  getItRequestTypesManagersLoading: false,
  getItRequestTypesManagersLoaded: false,
  getItRequestTypesManagersData: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ALL_IT_REQUESTS:
      return {
        ...state,
        allItRequestsLoading: true,
        allItRequestsLoaded: false,
      };
    case LOAD_ALL_IT_REQUESTS_SUCCESS:
      return {
        ...state,
        allItRequestsLoading: false,
        allItRequestsLoaded: true,
        allItRequestsData: action.result
      };
    case LOAD_ALL_IT_REQUESTS_FAIL:
      return {
        ...state,
        allItRequestsLoading: false,
        allItRequestsLoaded: true,
        ...action.result
      };
    case LOAD_ASSIGNED_IT_REQUESTS:
      return {
        ...state,
        assignedItRequestsLoading: true,
        assignedItRequestsLoaded: false,
      };
    case LOAD_ASSIGNED_IT_REQUESTS_SUCCESS:
      return {
        ...state,
        assignedItRequestsLoading: false,
        assignedItRequestsLoaded: true,
        assignedItRequestsData: action.result
      };
    case LOAD_ASSIGNED_IT_REQUESTS_FAIL:
      return {
        ...state,
        assignedItRequestsLoading: false,
        assignedItRequestsLoaded: true,
        ...action.result
      };
    case LOAD_REQUEST_TYPES:
      return {
        ...state,
        requestTypesLoading: true,
        requestTypesLoaded: false,
      };
    case LOAD_REQUEST_TYPES_SUCCESS:
      return {
        ...state,
        requestTypesLoading: false,
        requestTypesLoaded: true,
        requestTypesData: action.result
      };
    case LOAD_REQUEST_TYPES_FAIL:
      return {
        ...state,
        requestTypesLoading: false,
        requestTypesLoaded: true,
        ...action.result
      };
    case LOAD_REQUEST_PRIORITIES:
      return {
        ...state,
        requestPrioritiesLoading: true,
        requestPrioritiesLoaded: false,
      };
    case LOAD_REQUEST_PRIORITIES_SUCCESS:
      return {
        ...state,
        requestPrioritiesLoading: false,
        requestPrioritiesLoaded: true,
        requestPrioritiesData: action.result
      };
    case LOAD_REQUEST_PRIORITIES_FAIL:
      return {
        ...state,
        requestPrioritiesLoading: false,
        requestPrioritiesLoaded: true,
        ...action.result
      };
    case SUBMIT_IT_REQUEST:
      return {
        ...state,
        submitItRequestLoading: true,
        submitItRequestLoaded: false,
      };
    case SUBMIT_IT_REQUEST_SUCCESS:
      return {
        ...state,
        submitItRequestLoading: false,
        submitItRequestLoaded: true,
        submitItRequestResponse: action.result
      };
    case SUBMIT_IT_REQUEST_FAIL:
      return {
        ...state,
        submitItRequestLoaded: false,
        submitItRequestLoading: true,
        ...action.result
      };
    case REPLY_IT_REQUEST:
      return {
        ...state,
        replyItRequestLoading: true,
        replyItRequestLoaded: false,
      };
    case REPLY_IT_REQUEST_SUCCESS:
      return {
        ...state,
        replyItRequestLoading: false,
        replyItRequestLoaded: true,
        replyItRequestResponse: action.result
      };
    case REPLY_IT_REQUEST_FAIL:
      return {
        ...state,
        replyItRequestLoaded: false,
        replyItRequestLoading: true,
        ...action.result
      };
    case DELETE_IT_REQUEST:
      return {
        ...state,
        deleteItRequestLoading: true,
        deleteItRequestLoaded: false,
      };
    case DELETE_IT_REQUEST_SUCCESS:
      return {
        ...state,
        deleteItRequestLoading: false,
        deleteItRequestLoaded: true,
        deleteItRequestResponse: action.result
      };
    case DELETE_IT_REQUEST_FAIL:
      return {
        ...state,
        deleteItRequestLoaded: false,
        deleteItRequestLoading: true,
        ...action.result
      };
    case LOAD_GETITREQUESTTYPESMANAGERS_TYPES:
      return {
        ...state,
        getItRequestTypesManagersLoading: true,
        getItRequestTypesManagersLoaded: false,
      };
    case LOAD_GETITREQUESTTYPESMANAGERS_TYPES_SUCCESS:
      return {
        ...state,
        getItRequestTypesManagersLoading: false,
        getItRequestTypesManagersLoaded: true,
        getItRequestTypesManagersData: action.result
      };
    case LOAD_GETITREQUESTTYPESMANAGERS_TYPES_FAIL:
      return {
        ...state,
        getItRequestTypesManagersLoading: false,
        getItRequestTypesManagersLoaded: true,
        ...action.result
      };
    default:
      return state;
  }
}

export function getAllItRequests() {
  return {
    types: [LOAD_ALL_IT_REQUESTS, LOAD_ALL_IT_REQUESTS_SUCCESS, LOAD_ALL_IT_REQUESTS_FAIL],
    promise: (client) => client.get('/getAllItRequests')
  };
}

export function getAssignedItRequests() {
  return {
    types: [LOAD_ASSIGNED_IT_REQUESTS, LOAD_ASSIGNED_IT_REQUESTS_SUCCESS, LOAD_ASSIGNED_IT_REQUESTS_FAIL],
    promise: (client) => client.get('/getAssignedRequests')
  };
}

export function getRequestTypes() {
  return {
    types: [LOAD_REQUEST_TYPES, LOAD_REQUEST_TYPES_SUCCESS, LOAD_REQUEST_TYPES_FAIL],
    promise: (client) => client.get('/getRequestTypes')
  };
}

export function getRequestPriorities() {
  return {
    types: [LOAD_REQUEST_PRIORITIES, LOAD_REQUEST_PRIORITIES_SUCCESS, LOAD_REQUEST_PRIORITIES_FAIL],
    promise: (client) => client.get('/getRequestPriorities')
  };
}

export function submitItRequest(itRequestData) {
  return {
    types: [SUBMIT_IT_REQUEST, SUBMIT_IT_REQUEST_SUCCESS, SUBMIT_IT_REQUEST_FAIL],
    promise: (client) => client.post('/submitItRequest', { data: itRequestData })
  };
}

export function replyItRequest(itRequestData) {
  return {
    types: [REPLY_IT_REQUEST, REPLY_IT_REQUEST_SUCCESS, REPLY_IT_REQUEST_FAIL],
    promise: (client) => client.post('/replyItRequest', { data: itRequestData })
  };
}

export function deleteItRequest(itRequestid) {
  return {
    types: [DELETE_IT_REQUEST, DELETE_IT_REQUEST_SUCCESS, DELETE_IT_REQUEST_FAIL],
    promise: (client) => client.post('/deleteItRequest', { data: {it_request_id: itRequestid} })
  };
}
export function getItRequestTypesManagers() {
  return {
    types: [LOAD_GETITREQUESTTYPESMANAGERS_TYPES, LOAD_GETITREQUESTTYPESMANAGERS_TYPES_SUCCESS, LOAD_GETITREQUESTTYPESMANAGERS_TYPES_FAIL],
    promise: (client) => client.get('/getItRequestTypesManagers')
  };
}
