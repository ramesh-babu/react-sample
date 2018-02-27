const GET_TIMESHEET = 'touchpoint/timesheet/GET_TIMESHEET';
const GET_TIMESHEET_SUCCESS = 'touchpoint/timesheet/GET_TIMESHEET_SUCCESS';
const GET_TIMESHEET_FAIL = 'touchpoint/timesheet/GET_TIMESHEET_FAIL';

const GET_PROJECTS_LIST = 'touchpoint/timesheet/GET_PROJECTS_LIST';
const GET_PROJECTS_LIST_SUCCESS = 'touchpoint/timesheet/GET_PROJECTS_LIST_SUCCESS';
const GET_PROJECTS_LIST_FAIL = 'touchpoint/timesheet/GET_PROJECTS_LIST_FAIL';

const SUBMIT_TIMESHEET = 'touchpoint/timesheet/SUBMIT_TIMESHEET';
const SUBMIT_TIMESHEET_SUCCESS = 'touchpoint/timesheet/SUBMIT_TIMESHEET_SUCCESS';
const SUBMIT_TIMESHEET_FAIL = 'touchpoint/timesheet/SUBMIT_TIMESHEET_FAIL';

const initialState = {
  timesheetLoading: false,
  timesheetLoaded: false,
  timesheetData: [],
  projectsListLoading: false,
  projectsListLoaded: false,
  projectsListData: [],
  submitTimesheetLoading: false,
  submitTimesheetLoaded: false,
  submitTimesheetResponse: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_TIMESHEET:
      return {
        ...state,
        timesheetLoading: true,
        timesheetLoaded: false,
      };
    case GET_TIMESHEET_SUCCESS:
      return {
        ...state,
        timesheetLoading: false,
        timesheetLoaded: true,
        timesheetData: action.result === 'Invalid employee id' ? [] : action.result
      };
    case GET_TIMESHEET_FAIL:
      return {
        ...state,
        timesheetLoading: false,
        timesheetLoaded: false,
        ...action.result
      };
    case GET_PROJECTS_LIST:
      return {
        ...state,
        projectsListLoading: true,
        projectsListLoaded: false,
      };
    case GET_PROJECTS_LIST_SUCCESS:
      return {
        ...state,
        projectsListLoading: false,
        projectsListLoaded: true,
        projectsListData: action.result
      };
    case GET_PROJECTS_LIST_FAIL:
      return {
        ...state,
        projectsListLoading: false,
        projectsListLoaded: false,
        ...action.result
      };
    case SUBMIT_TIMESHEET:
      return {
        ...state,
        submitTimesheetLoading: true,
        submitTimesheetLoaded: false,
      };
    case SUBMIT_TIMESHEET_SUCCESS:
      return {
        ...state,
        submitTimesheetLoading: false,
        submitTimesheetLoaded: true,
        submitTimesheetResponse: action.result
      };
    case SUBMIT_TIMESHEET_FAIL:
      return {
        ...state,
        submitTimesheetLoading: false,
        submitTimesheetLoaded: false,
        ...action.result
      };
    default:
      return state;
  }
}

export function getTimesheet(employeeId) {
  return {
    types: [GET_TIMESHEET, GET_TIMESHEET_SUCCESS, GET_TIMESHEET_FAIL],
    promise: (client) => client.post('/getTimesheet', { data: {employeeId: employeeId} })
  };
}

export function getProjectsList() {
  return {
    types: [GET_PROJECTS_LIST, GET_PROJECTS_LIST_SUCCESS, GET_PROJECTS_LIST_FAIL],
    promise: (client) => client.get('/getProjectsList')
  };
}

export function submitTimesheet(timesheetData) {
  return {
    types: [SUBMIT_TIMESHEET, SUBMIT_TIMESHEET_SUCCESS, SUBMIT_TIMESHEET_FAIL],
    promise: (client) => client.post('/submitTimesheet', { data: timesheetData })
  };
}
