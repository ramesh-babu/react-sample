// import axios from 'axios';

const USER_DATA = 'touchpoint/user/USER_DATA';
const USER_DATA_SUCCESS = 'touchpoint/user/USER_DATA_SUCCESS';
const USER_DATA_FAIL = 'touchpoint/user/USER_DATA_FAIL';


const initialState = {
  userLoading: false,
  userLoaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userLoading: true,
        userLoaded: false,
        ...action.result,
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        userLoading: false,
        userLoaded: true,
        user: action.result
      };
    case USER_DATA_FAIL:
      return {
        ...state,
        userLoading: false,
        userLoaded: true,
        ...action.result
      };
    default:
      return state;
  }
}

export function employeedetails() {
  return {
    types: [USER_DATA, USER_DATA_SUCCESS, USER_DATA_FAIL],
    promise: (client) => client.post('/employeedetails')
  };
}
