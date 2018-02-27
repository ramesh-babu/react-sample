const USER_DATA = 'touchpoint/touch/USER_DATA';
const USER_DATA_SUCCESS = 'touchpoint/touch/USER_DATA_SUCCESS';
const USER_DATA_FAIL = 'touchpoint/touch/USER_DATA_FAIL';

const GET_ALL = 'touchpoint/home/GET_ALL';
const GET_ALL_SUCCESS = 'touchpoint/home/GET_ALL_SUCCESS';
const GET_ALL_FAIL = 'touchpoint/home/GET_ALL_FAIL';

const GET_REPORTING_EMPLOYEES = 'touchpoint/home/GET_REPORTING_EMPLOYEES';
const GET_REPORTING_EMPLOYEES_SUCCESS = 'touchpoint/home/GET_REPORTING_EMPLOYEES_SUCCESS';
const GET_REPORTING_EMPLOYEES_FAIL = 'touchpoint/home/GET_REPORTING_EMPLOYEES_FAIL';

const GET_TEAMS_EMPLOYEES = 'touchpoint/home/GET_TEAMS_EMPLOYEES';
const GET_TEAMS_EMPLOYEES_SUCCESS = 'touchpoint/home/GET_TEAMS_EMPLOYEES_SUCCESS';
const GET_TEAMS_EMPLOYEES_FAIL = 'touchpoint/home/GET_TEAMS_EMPLOYEES_FAIL';

const GET_ROLES_EMPLOYEES = 'touchpoint/home/GET_ROLES_EMPLOYEES';
const GET_ROLES_EMPLOYEES_SUCCESS = 'touchpoint/home/GET_ROLES_EMPLOYEES_SUCCESS';
const GET_ROLES_EMPLOYEES_FAIL = 'touchpoint/home/GET_ROLES_EMPLOYEES_FAIL';


const GET_DEVICE_DETAILS = 'touchpoint/home/GET_DEVICE_DETAILS';
const GET_DEVICE_DETAILS_SUCCESS = 'touchpoint/home/GET_DEVICE_DETAILS_SUCCESS';
const GET_DEVICE_DETAILS_FAIL = 'touchpoint/home/GET_DEVICE_DETAILS_FAIL';

const GET_TEAM_COUNT = 'touchpoint/home/GET_TEAM_COUNT';
const GET_TEAM_COUNT_SUCCESS = 'touchpoint/home/GET_TEAM_COUNT_SUCCESS';
const GET_TEAM_COUNT_FAIL = 'touchpoint/home/GET_TEAM_COUNT_FAIL';

const GET_BLOOD_GROUPS = 'touchpoint/home/GET_BLOOD_GROUPS';
const GET_BLOOD_GROUPS_SUCCESS = 'touchpoint/home/GET_BLOOD_GROUPS_SUCCESS';
const GET_BLOOD_GROUPS_FAIL = 'touchpoint/home/GET_BLOOD_GROUPS_FAIL';

const GET_MONTH_JOINEES = 'touchpoint/home/GET_MONTH_JOINEES';
const GET_MONTH_JOINEES_SUCCESS = 'touchpoint/home/GET_MONTH_JOINEES_SUCCESS';
const GET_MONTH_JOINEES_FAIL = 'touchpoint/home/GET_MONTH_JOINEES_FAIL';

const LOAD_UPDATE_EMPLOYEE = 'touchpoint/home/LOAD_UPDATE_EMPLOYEE';
const LOAD_UPDATE_EMPLOYEE_SUCCESS = 'touchpoint/home/LOAD_UPDATE_EMPLOYEE_SUCCESS';
const LOAD_UPDATE_EMPLOYEE_FAIL = 'touchpoint/home/LOAD_UPDATE_EMPLOYEE_FAIL';

const LOAD_ADD_EMPLOYEE = 'touchpoint/home/LOAD_ADD_EMPLOYEE';
const LOAD_ADD_EMPLOYEE_SUCCESS = 'touchpoint/home/LOAD_ADD_EMPLOYEE_SUCCESS';
const LOAD_ADD_EMPLOYEE_FAIL = 'touchpoint/home/LOAD_ADD_EMPLOYEE_FAIL';

const LOAD_GET_EMPLOYEE = 'touchpoint/home/LOAD_GE_EMPLOYEE';
const LOAD_GET_EMPLOYEE_SUCCESS = 'touchpoint/home/LOAD_GET_EMPLOYEE_SUCCESS';
const LOAD_GET_EMPLOYEE_FAIL = 'touchpoint/home/LOAD_GET_EMPLOYEE_FAIL';

const GET_EMPLOYEES_REGION = 'touchpoint/home/GET_EMPLOYEES_REGION';
const GET_EMPLOYEES_REGION_SUCCESS = 'touchpoint/home/GET_EMPLOYEES_REGION_SUCCESS';
const GET_EMPLOYEES_REGION_FAIL = 'touchpoint/home/GET_EMPLOYEES_REGION_FAIL';

const initialState = {
  userLoading: false,
  userLoaded: false,
  employeesData: [],
  user: {
    emp_firstname: '',
    job_title: '',
    team_name: '',
    status: '',
  },
  deviceDetailsLoading: false,
  deviceDetailsLoaded: false,
  deviceDetails: [],
  teamCountLoading: false,
  teamCountLoaded: false,
  teamCount: [],
  bloodGroupsLoading: false,
  bloodGroupsLoaded: false,
  bloodGroups: [],
  monthJoineesLoading: false,
  monthJoineesLoaded: false,
  monthJoinees: [],
  updateEmployeeLoading: false,
  updateEmployeeLoaded: false,
  updatedEmployeeData: {},
  addEmployeeLoading: false,
  addEmployeeLoaded: false,
  addEmployeeData: [],
  getEmployeeLoading: false,
  getEmployeeLoaded: false,
  getEmployeeData: [],
  reportingEmployeesLoading: false,
  reportingEmployeesLoaded: false,
  reportingEmployeesData: [],
  teamsEmployeesLoading: false,
  teamsEmployeesLoaded: false,
  teamsEmployeesData: [],
  rolesEmployeesLoading: false,
  rolesEmployeesLoaded: false,
  rolesEmployeesData: [],
  getEmployeeRegionLoading: false,
  getEmployeeRegionLoaded: false,
  getEmployeeRegionData: [],
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
    case GET_ALL:
      return {
        ...state,
        employeesLoading: true,
        employeesLoaded: false,
        employeesData: [],
        ...action.result,
      };
    case GET_ALL_SUCCESS:
      return {
        ...state,
        employeesLoading: false,
        employeesLoaded: true,
        employeesData: action.result
      };
    case GET_ALL_FAIL:
      return {
        ...state,
        employeesLoading: false,
        employeesLoaded: true,
        ...action.result
      };

    case GET_REPORTING_EMPLOYEES:
      return {
        ...state,
        reportingEmployeesLoading: true,
        reportingEmployeesLoaded: false,
        ...action.result,
      };
    case GET_REPORTING_EMPLOYEES_SUCCESS:
      return {
        ...state,
        reportingEmployeesLoading: false,
        reportingEmployeesLoaded: true,
        reportingEmployeesData: action.result
      };
    case GET_REPORTING_EMPLOYEES_FAIL:
      return {
        ...state,
        reportingEmployeesLoading: false,
        reportingEmployeesLoaded: true,
        ...action.result
      };

    case GET_TEAMS_EMPLOYEES:
      return {
        ...state,
        teamsEmployeesLoading: true,
        teamsEmployeesLoaded: false,
        ...action.result,
      };
    case GET_TEAMS_EMPLOYEES_SUCCESS:
      return {
        ...state,
        teamsEmployeesLoading: false,
        teamsEmployeesLoaded: true,
        teamsEmployeesData: action.result
      };
    case GET_TEAMS_EMPLOYEES_FAIL:
      return {
        ...state,
        teamsEmployeesLoading: false,
        teamsEmployeesLoaded: true,
        ...action.result
      };
    case GET_ROLES_EMPLOYEES:
      return {
        ...state,
        rolesEmployeesLoading: true,
        rolesEmployeesLoaded: false,
        ...action.result,
      };
    case GET_ROLES_EMPLOYEES_SUCCESS:
      return {
        ...state,
        rolesEmployeesLoading: false,
        rolesEmployeesLoaded: true,
        rolesEmployeesData: action.result
      };
    case GET_ROLES_EMPLOYEES_FAIL:
      return {
        ...state,
        rolesEmployeesLoading: false,
        rolesEmployeesLoaded: true,
        ...action.result
      };
    case GET_DEVICE_DETAILS:
      return {
        ...state,
        deviceDetailsLoading: true,
        deviceDetailsLoaded: false,
      };
    case GET_DEVICE_DETAILS_SUCCESS:
      return {
        ...state,
        deviceDetailsLoading: false,
        deviceDetailsLoaded: true,
        deviceDetails: action.result
      };
    case GET_DEVICE_DETAILS_FAIL:
      return {
        ...state,
        deviceDetailsLoading: false,
        deviceDetailsLoaded: true,
        ...action.result
      };
    case GET_TEAM_COUNT:
      return {
        ...state,
        teamCountLoading: true,
        teamCountLoaded: false,
      };
    case GET_TEAM_COUNT_SUCCESS:
      return {
        ...state,
        teamCountLoading: false,
        teamCountLoaded: true,
        teamCount: action.result
      };
    case GET_TEAM_COUNT_FAIL:
      return {
        ...state,
        teamCountLoading: false,
        teamCountLoaded: true,
        ...action.result
      };
    case GET_BLOOD_GROUPS:
      return {
        ...state,
        bloodGroupsLoading: true,
        bloodGroupsLoaded: false,
      };
    case GET_BLOOD_GROUPS_SUCCESS:
      return {
        ...state,
        bloodGroupsLoading: false,
        bloodGroupsLoaded: true,
        bloodGroups: action.result
      };
    case GET_BLOOD_GROUPS_FAIL:
      return {
        ...state,
        bloodGroupsLoading: false,
        bloodGroupsLoaded: true,
        ...action.result
      };
    case GET_MONTH_JOINEES:
      return {
        ...state,
        monthJoineesLoading: true,
        monthJoineesLoaded: false,
      };
    case GET_MONTH_JOINEES_SUCCESS:
      return {
        ...state,
        monthJoineesLoading: false,
        monthJoineesLoaded: true,
        monthJoinees: action.result
      };
    case GET_MONTH_JOINEES_FAIL:
      return {
        ...state,
        monthJoineesLoading: false,
        monthJoineesLoaded: true,
        ...action.result
      };
    case LOAD_UPDATE_EMPLOYEE:
      return {
        ...state,
        updateEmployeeLoading: true,
        updateEmployeeLoaded: false
      };
    case LOAD_UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        updateEmployeeLoading: false,
        updateEmployeeLoaded: true,
        updatedEmployeeData: action.result
      };
    case LOAD_UPDATE_EMPLOYEE_FAIL:
      return {
        ...state,
        updateEmployeeLoading: false,
        updateEmployeeLoaded: true,
        ...action.result
      };
    case LOAD_ADD_EMPLOYEE:
      return {
        ...state,
        addEmployeeLoading: true,
        addEmployeeLoaded: false
      };
    case LOAD_ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        addEmployeeLoading: false,
        addEmployeeLoaded: true,
        addEmployeeData: action.result
      };
    case LOAD_ADD_EMPLOYEE_FAIL:
      return {
        ...state,
        addEmployeeLoading: false,
        addEmployeeLoaded: true,
        ...action.result
      };
    case LOAD_GET_EMPLOYEE:
      return {
        ...state,
        getEmployeeLoading: true,
        getEmployeeLoaded: false
      };
    case LOAD_GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        getEmployeeLoading: false,
        getEmployeeLoaded: true,
        getEmployeeData: action.result
      };
    case LOAD_GET_EMPLOYEE_FAIL:
      return {
        ...state,
        getEmployeeLoading: false,
        getEmployeeLoaded: true,
        ...action.result
      };
    case GET_EMPLOYEES_REGION:
      return {
        ...state,
        getEmployeeRegionLoading: true,
        getEmployeeRegionLoaded: false
      };
    case GET_EMPLOYEES_REGION_SUCCESS:
      return {
        ...state,
        getEmployeeRegionLoading: false,
        getEmployeeRegionLoaded: true,
        getEmployeeRegionData: action.result
      };
    case GET_EMPLOYEES_REGION_FAIL:
      return {
        ...state,
        getEmployeeRegionLoading: false,
        getEmployeeRegionLoaded: true,
        ...action.result
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.touch && globalState.touch.loaded;
}

export function employeedetails() {
  return {
    types: [USER_DATA, USER_DATA_SUCCESS, USER_DATA_FAIL],
    promise: (client) => client.get('/employeedetails')
  };
}

export function getAllEmployees() {
  return {
    types: [GET_ALL, GET_ALL_SUCCESS, GET_ALL_FAIL],
    promise: (client) => client.get('/getAllEmployees')
  };
}

export function getReportingEmployees() {
  return {
    types: [GET_REPORTING_EMPLOYEES, GET_REPORTING_EMPLOYEES_SUCCESS, GET_REPORTING_EMPLOYEES_FAIL],
    promise: (client) => client.get('/getReportingEmployees')
  };
}
export function getTeamsEmployees() {
  return {
    types: [GET_TEAMS_EMPLOYEES, GET_TEAMS_EMPLOYEES_SUCCESS, GET_TEAMS_EMPLOYEES_FAIL],
    promise: (client) => client.get('/getTeamsEmployees')
  };
}
export function getRolesEmployees() {
  return {
    types: [GET_ROLES_EMPLOYEES, GET_ROLES_EMPLOYEES_SUCCESS, GET_ROLES_EMPLOYEES_FAIL],
    promise: (client) => client.get('/getRolesEmployees')
  };
}
export function getDeviceDetails() {
  return {
    types: [GET_DEVICE_DETAILS, GET_DEVICE_DETAILS_SUCCESS, GET_DEVICE_DETAILS_FAIL],
    promise: (client) => client.get('/getDeviceDetails')
  };
}

export function getTeamCount() {
  return {
    types: [GET_TEAM_COUNT, GET_TEAM_COUNT_SUCCESS, GET_TEAM_COUNT_FAIL],
    promise: (client) => client.get('/getTeamCount')
  };
}

export function getBloodGroups() {
  return {
    types: [GET_BLOOD_GROUPS, GET_BLOOD_GROUPS_SUCCESS, GET_BLOOD_GROUPS_FAIL],
    promise: (client) => client.get('/getBloodGroups')
  };
}

export function getMonthJoinees() {
  return {
    types: [GET_MONTH_JOINEES, GET_MONTH_JOINEES_SUCCESS, GET_MONTH_JOINEES_FAIL],
    promise: (client) => client.get('/getMonthJoinees')
  };
}

export function updateEmployee(updatedData) {
  return {
    types: [LOAD_UPDATE_EMPLOYEE, LOAD_UPDATE_EMPLOYEE_SUCCESS, LOAD_UPDATE_EMPLOYEE_FAIL],
    promise: (client) => client.post('/submitUpdateEmloyeeRequest', { data: updatedData })
  };
}

export function addEmployee(addData) {
  return {
    types: [LOAD_ADD_EMPLOYEE, LOAD_ADD_EMPLOYEE_SUCCESS, LOAD_ADD_EMPLOYEE_FAIL],
    promise: (client) => client.post('/submitAddEmloyeeRequest', { data: addData })
  };
}
export function getEmployeeDetails(Employeenumber) {
  return {
    types: [LOAD_GET_EMPLOYEE, LOAD_GET_EMPLOYEE_SUCCESS, LOAD_GET_EMPLOYEE_FAIL],
    promise: (client) => client.post('/getEmployeeDetails', { data: {employee_number: Employeenumber}})
  };
}
export function getEmployeeRegion() {
  return {
    types: [GET_EMPLOYEES_REGION, GET_EMPLOYEES_REGION_SUCCESS, GET_EMPLOYEES_REGION_FAIL],
    promise: (client) => client.get('/getEmployeeRegion')
  };
}
