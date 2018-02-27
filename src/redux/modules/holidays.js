const LOAD_HOLIDAYS = 'touchpoint/holidays/LOAD_HOLIDAYS';
const LOAD_HOLIDAYS_SUCCESS = 'touchpoint/holidays/LOAD_HOLIDAYS_SUCCESS';
const LOAD_HOLIDAYS_FAIL = 'touchpoint/holidays/LOAD_HOLIDAYS_FAIL';

const ADD_HOLIDAYS_DETAILS = 'touchpoint/holidays/ADD_HOLIDAYS_DETAILS';
const ADD_HOLIDAYS_DETAILS_SUCCESS = 'touchpoint/holidays/ADD_HOLIDAYS_DETAILS_SUCCESS';
const ADD_HOLIDAYS_DETAILS_FAIL = 'touchpoint/holidays/ADD_HOLIDAYS_DETAILS_FAIL';

const UPDATE_HOLIDAYS_DETAILS = 'touchpoint/holidays/UPDATE_HOLIDAYS_DETAILS';
const UPDATE_HOLIDAYS_DETAILS_SUCCESS = 'touchpoint/holidays/UPDATE_HOLIDAYS_DETAILS_SUCCESS';
const UPDATE_HOLIDAYS_DETAILS_FAIL = 'touchpoint/holidays/UPDATE_HOLIDAYS_DETAILS_FAIL';

const DELETE_HOLIDAYS_DETAILS = 'touchpoint/resource/DELETE_HOLIDAYS_DETAILS';
const DELETE_HOLIDAYS_DETAILS_SUCCESS = 'touchpoint/resource/DELETE_HOLIDAYS_DETAILS_SUCCESS';
const DELETE_HOLIDAYS_DETAILS_FAIL = 'touchpoint/resource/DELETE_HOLIDAYS_DETAILS_FAIL';

const initialState = {
  holidaysLoading: false,
  holidaysLoaded: false,
  holidaysData: [],

  addHolidaysLoading: false,
  addHolidaysLoaded: false,
  addHolidaysData: [],

  updateHolidaysDetailsLoading: false,
  updateHolidaysDetailsLoaded: false,
  updateHolidaysDetailsSuccess: null,

  deleteHolidaysDetailsLoading: false,
  deleteHolidaysDetailsLoaded: false,
  deleteHolidaysDetailsSuccess: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_HOLIDAYS:
      return {
        ...state,
        holidaysLoading: true,
        holidaysLoaded: false,
      };
    case LOAD_HOLIDAYS_SUCCESS:
      return {
        ...state,
        holidaysLoading: false,
        holidaysLoaded: true,
        holidaysData: action.result
      };
    case LOAD_HOLIDAYS_FAIL:
      return {
        ...state,
        holidaysLoading: false,
        holidaysLoaded: true,
        ...action.result
      };
    case ADD_HOLIDAYS_DETAILS:
      return {
        ...state,
        addHolidaysLoading: true,
        addHolidaysLoaded: false,
      };
    case ADD_HOLIDAYS_DETAILS_SUCCESS:
      return {
        ...state,
        addHolidaysLoading: false,
        addHolidaysLoaded: true,
        addHolidaysData: action.result
      };
    case ADD_HOLIDAYS_DETAILS_FAIL:
      return {
        ...state,
        addHolidaysLoading: false,
        addHolidaysLoaded: true,
        ...action.result
      };
    case UPDATE_HOLIDAYS_DETAILS:
      return {
        ...state,
        updateHolidaysDetailsLoading: true,
        updateHolidaysDetailsLoaded: false
      };
    case UPDATE_HOLIDAYS_DETAILS_SUCCESS:
      return {
        ...state,
        updateHolidaysDetailsLoading: false,
        updateHolidaysDetailsLoaded: true,
        updateHolidaysDetailsSuccess: action.result
      };
    case UPDATE_HOLIDAYS_DETAILS_FAIL:
      return {
        ...state,
        updateHolidaysDetailsLoading: false,
        updateHolidaysDetailsLoaded: true,
        ...action.result
      };
    case DELETE_HOLIDAYS_DETAILS:
      return {
        ...state,
        deleteHolidaysDetailsLoading: true,
        deleteHolidaysDetailsLoaded: false,
      };
    case DELETE_HOLIDAYS_DETAILS_SUCCESS:
      return {
        ...state,
        deleteHolidaysDetailsLoading: false,
        deleteHolidaysDetailsLoaded: true,
        deleteHolidaysDetailsSuccess: action.result
      };
    case DELETE_HOLIDAYS_DETAILS_FAIL:
      return {
        ...state,
        deleteHolidaysDetailsLoading: false,
        deleteHolidaysDetailsLoaded: true,
        ...action.result
      };
    default:
      return state;
  }
}

export function getHolidays(year) {
  return {
    types: [LOAD_HOLIDAYS, LOAD_HOLIDAYS_SUCCESS, LOAD_HOLIDAYS_FAIL],
    promise: (client) => client.post('/getHolidays', { data: {year: year}})
  };
}

export function addHolidaysDetails(addData) {
  return {
    types: [ADD_HOLIDAYS_DETAILS, ADD_HOLIDAYS_DETAILS_SUCCESS, ADD_HOLIDAYS_DETAILS_FAIL],
    promise: (client) => client.post('/addHolidaysDetails', { data: addData })
  };
}

export function updateHolidaysDetails(editData) {
  return {
    types: [UPDATE_HOLIDAYS_DETAILS, UPDATE_HOLIDAYS_DETAILS_SUCCESS, UPDATE_HOLIDAYS_DETAILS_FAIL],
    promise: (client) => client.post('/updateHolidaysDetails', { data: editData })
  };
}

export function deleteHolidaysDetails(holidayId) {
  return {
    types: [DELETE_HOLIDAYS_DETAILS, DELETE_HOLIDAYS_DETAILS_SUCCESS, DELETE_HOLIDAYS_DETAILS_FAIL],
    promise: (client) => client.post('/deleteHolidaysDetails', { data: {holiday_id: holidayId} })
  };
}
