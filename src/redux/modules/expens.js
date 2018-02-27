const ADD_EXPENS_DETAILS = 'touchpoint/expens/ADD_EXPENS_DETAILS';
const ADD_EXPENS_DETAILS_SUCCESS = 'touchpoint/expens/ADD_EXPENS_DETAILS_SUCCESS';
const ADD_EXPENS_DETAILS_FAIL = 'touchpoint/expens/ADD_EXPENS_DETAILS_FAIL';

const VIEW_LOAD_EXPENS = 'touchpoint/expens/VIEW_LOAD_EXPENS';
const VIEW_LOAD_EXPENS_SUCCESS = 'touchpoint/expens/VIEW_LOAD_EXPENS_SUCCESS';
const VIEW_LOAD_EXPENS_FAIL = 'touchpoint/expens/VIEW_LOAD_EXPENS_FAIL';

const GET_LOAD_BILLTYPE = 'touchpoint/expens/GET_LOAD_BILLTYPE';
const GET_LOAD_BILLTYPE_SUCCESS = 'touchpoint/expens/GET_LOAD_BILLTYPE_SUCCESS';
const GET_LOAD_BILLTYPE_FAIL = 'touchpoint/expens/GET_LOAD_BILLTYPE_FAIL';

const GET_EXPENS_DETAILS = 'touchpoint/expens/GET_EXPENS_DETAILS';
const GET_EXPENS_DETAILS_SUCCESS = 'touchpoint/expens/GET_EXPENS_DETAILS_SUCCESS';
const GET_EXPENS_DETAILS_FAIL = 'touchpoint/expens/GET_EXPENS_DETAILS_FAIL';

const UPDATE_EXPENS_DETAILS = 'touchpoint/expens/UPDATE_EXPENS_DETAILS';
const UPDATE_EXPENS_DETAILS_SUCCESS = 'touchpoint/expens/UPDATE_EXPENS_DETAILS_SUCCESS';
const UPDATE_EXPENS_DETAILS_FAIL = 'touchpoint/expens/UPDATE_EXPENS_DETAILS_FAIL';

const DELETE_EXPENS_DETAILS = 'touchpoint/expens/DELETE_EXPENS_DETAILS';
const DELETE_EXPENS_DETAILS_SUCCESS = 'touchpoint/expens/DELETE_EXPENS_DETAILS_SUCCESS';
const DELETE_EXPENS_DETAILS_FAIL = 'touchpoint/expens/DELETE_EXPENS_DETAILS_FAIL';

const BILL_APPROVAL_DETAILS = 'touchpoint/expens/BILL_APPROVAL_DETAILS';
const BILL_APPROVAL_DETAILS_SUCCESS = 'touchpoint/expens/BILL_APPROVAL_DETAILS_SUCCESS';
const BILL_APPROVAL_DETAILS_FAIL = 'touchpoint/expens/BILL_APPROVAL_DETAILS_FAIL';

const initialState = {
  expensLoading: false,
  expensLoaded: false,
  addexpensData: [],

  viewExpensLoading: false,
  viewExpensLoaded: false,
  viewExpensData: [],

  getBillTypeLoading: false,
  getBillTypeLoaded: false,
  billTypeData: [],

  getExpensLoading: false,
  getExpensLoaded: false,
  getExpensData: [],

  updateExpensLoading: false,
  updateExpensLoaded: false,
  updateExpensData: [],

  deleteExpensDetailsLoading: false,
  deleteExpensDetailsLoaded: false,
  deleteExpensDetailsSuccess: null,

  billApprovalLoading: false,
  billApprovalLoaded: false,
  billApprovalData: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_EXPENS_DETAILS:
      return {
        ...state,
        expensLoading: true,
        expensLoaded: false,
        ...action.result,
      };
    case ADD_EXPENS_DETAILS_SUCCESS:
      return {
        ...state,
        expensLoading: false,
        expensLoaded: true,
        addexpensData: action.result
      };
    case ADD_EXPENS_DETAILS_FAIL:
      return {
        ...state,
        expensLoading: false,
        expensLoaded: true,
        ...action.result
      };
    case VIEW_LOAD_EXPENS:
      return {
        ...state,
        viewExpensLoading: true,
        viewExpensLoaded: false,
        ...action.result,
      };
    case VIEW_LOAD_EXPENS_SUCCESS:
      return {
        ...state,
        viewExpensLoading: false,
        viewExpensLoaded: true,
        viewExpensData: action.result
      };
    case VIEW_LOAD_EXPENS_FAIL:
      return {
        ...state,
        viewExpensLoading: false,
        viewExpensLoaded: true,
        ...action.result
      };
    case GET_LOAD_BILLTYPE:
      return {
        ...state,
        getBillTypeLoading: true,
        getBillTypeLoaded: false,
        ...action.result,
      };
    case GET_LOAD_BILLTYPE_SUCCESS:
      return {
        ...state,
        getBillTypeLoading: false,
        getBillTypeLoaded: true,
        billTypeData: action.result
      };
    case GET_LOAD_BILLTYPE_FAIL:
      return {
        ...state,
        getBillTypeLoading: false,
        getBillTypeLoaded: true,
        ...action.result
      };
    case GET_EXPENS_DETAILS:
      return {
        ...state,
        getExpensLoading: true,
        getExpensLoaded: false,
        ...action.result,
      };
    case GET_EXPENS_DETAILS_SUCCESS:
      return {
        ...state,
        getExpensLoading: false,
        getExpensLoaded: true,
        getExpensData: action.result
      };
    case GET_EXPENS_DETAILS_FAIL:
      return {
        ...state,
        getExpensLoading: false,
        getExpensLoaded: true,
        ...action.result
      };
    case UPDATE_EXPENS_DETAILS:
      return {
        ...state,
        updateExpensLoading: true,
        updateExpensLoaded: false,
        ...action.result,
      };
    case UPDATE_EXPENS_DETAILS_SUCCESS:
      return {
        ...state,
        updateExpensLoading: false,
        updateExpensLoaded: true,
        updateExpensData: action.result
      };
    case UPDATE_EXPENS_DETAILS_FAIL:
      return {
        ...state,
        updateExpensLoading: false,
        updateExpensLoaded: true,
        ...action.result
      };
    case DELETE_EXPENS_DETAILS:
      return {
        ...state,
        deleteExpensDetailsLoading: true,
        deleteExpensDetailsLoaded: false,
        ...action.result,
      };
    case DELETE_EXPENS_DETAILS_SUCCESS:
      return {
        ...state,
        deleteExpensDetailsLoading: false,
        deleteExpensDetailsLoaded: true,
        deleteExpensDetailsSuccess: action.result
      };
    case DELETE_EXPENS_DETAILS_FAIL:
      return {
        ...state,
        deleteExpensDetailsLoading: false,
        deleteExpensDetailsLoaded: true,
        ...action.result
      };
    case BILL_APPROVAL_DETAILS:
      return {
        ...state,
        billApprovalLoading: true,
        billApprovalLoaded: false,
        ...action.result,
      };
    case BILL_APPROVAL_DETAILS_SUCCESS:
      return {
        ...state,
        billApprovalLoading: false,
        billApprovalLoaded: true,
        billApprovalData: action.result
      };
    case BILL_APPROVAL_DETAILS_FAIL:
      return {
        ...state,
        billApprovalLoading: false,
        billApprovalLoaded: true,
        ...action.result
      };
    default:
      return state;
  }
}

export function addExpensDetails(addData) {
  return {
    types: [ADD_EXPENS_DETAILS, ADD_EXPENS_DETAILS_SUCCESS, ADD_EXPENS_DETAILS_FAIL],
    promise: (client) => client.post('/addExpensDetails', { data: addData })
  };
}
export function viewExpensList() {
  return {
    types: [VIEW_LOAD_EXPENS, VIEW_LOAD_EXPENS_SUCCESS, VIEW_LOAD_EXPENS_FAIL],
    promise: (client) => client.get('/viewExpensList')
  };
}
export function getBillType() {
  return {
    types: [GET_LOAD_BILLTYPE, GET_LOAD_BILLTYPE_SUCCESS, GET_LOAD_BILLTYPE_FAIL],
    promise: (client) => client.get('/getBillType')
  };
}

export function getExpensDetails(expensData) {
  return {
    types: [GET_EXPENS_DETAILS, GET_EXPENS_DETAILS_SUCCESS, GET_EXPENS_DETAILS_FAIL],
    promise: (client) => client.post('/getExpensDetails', { data: expensData })
  };
}

export function updateExpensDetails(updateData) {
  return {
    types: [UPDATE_EXPENS_DETAILS, UPDATE_EXPENS_DETAILS_SUCCESS, UPDATE_EXPENS_DETAILS_FAIL],
    promise: (client) => client.put('/updateExpensDetails', { data: updateData })
  };
}

export function deleteExpensDetails(expensId) {
  return {
    types: [DELETE_EXPENS_DETAILS, DELETE_EXPENS_DETAILS_SUCCESS, DELETE_EXPENS_DETAILS_FAIL],
    promise: (client) => client.post('/deleteExpensDetails', { data: {expense_id: '' + expensId} })
  };
}

export function billApproval(approvalData) {
  return {
    types: [BILL_APPROVAL_DETAILS, BILL_APPROVAL_DETAILS_SUCCESS, BILL_APPROVAL_DETAILS_FAIL],
    promise: (client) => client.post('/submitBillApproval', { data: approvalData })
  };
}
