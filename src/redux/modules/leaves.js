const RESET_MY_LEAVES = 'touchpoint/leaves/RESET_MY_LEAVES';
const LOAD_MY_LEAVES = 'touchpoint/leaves/LOAD_MY_LEAVES';
const LOAD_MY_LEAVES_SUCCESS = 'touchpoint/leaves/LOAD_MY_LEAVES_SUCCESS';
const LOAD_MY_LEAVES_FAIL = 'touchpoint/leaves/LOAD_MY_LEAVES_FAIL';
const LOAD_LEAVE_TYPES = 'touchpoint/leaves/LOAD_LEAVE_TYPES';
const LOAD_LEAVE_TYPES_SUCCESS = 'touchpoint/leaves/LOAD_LEAVE_TYPES_SUCCESS';
const LOAD_LEAVE_TYPES_FAIL = 'touchpoint/leaves/LOAD_LEAVE_TYPES_FAIL';

const LOAD_MY_LEAVE_BALANCE = 'touchpoint/leaves/LOAD_MY_LEAVE_BALANCE';
const LOAD_MY_LEAVE_BALANCE_SUCCESS = 'touchpoint/leaves/LOAD_MY_LEAVE_BALANCE_SUCCESS';
const LOAD_MY_LEAVE_BALANCE_FAIL = 'touchpoint/leaves/LOAD_MY_LEAVE_BALANCE_FAIL';

const LOAD_TEAM_LEAVES = 'touchpoint/leaves/LOAD_TEAM_LEAVES';
const LOAD_TEAM_LEAVES_SUCCESS = 'touchpoint/leaves/LOAD_TEAM_LEAVES_SUCCESS';
const LOAD_TEAM_LEAVES_FAIL = 'touchpoint/leaves/LOAD_TEAM_LEAVES_FAIL';
const LOAD_APPLY_LEAVE = 'touchpoint/leaves/LOAD_APPLY_LEAVE';
const LOAD_APPLY_LEAVE_SUCCESS = 'touchpoint/leaves/LOAD_APPLY_LEAVE_SUCCESS';
const LOAD_APPLY_LEAVE_FAIL = 'touchpoint/leaves/LOAD_APPLY_LEAVE_FAIL';
const UPDATE_LEAVE = 'touchpoint/leaves/UPDATE_LEAVE';
const UPDATE_LEAVE_SUCCESS = 'touchpoint/leaves/UPDATE_LEAVE_SUCCESS';
const UPDATE_LEAVE_FAIL = 'touchpoint/leaves/UPDATE_LEAVE_FAIL';

const DELETE_LEAVE = 'touchpoint/leaves/DELETE_LEAVE';
const DELETE_LEAVE_SUCCESS = 'touchpoint/leaves/DELETE_LEAVE_SUCCESS';
const DELETE_LEAVE_FAIL = 'touchpoint/leaves/DELETE_LEAVE_FAIL';

const TEAM_LEAVES_REPORT = 'touchpoint/leaves/TEAM_LEAVES_REPORT';
const TEAM_LEAVES_REPORT_SUCCESS = 'touchpoint/leaves/TEAM_LEAVES_REPORT_SUCCESS';
const TEAM_LEAVES_REPORT_FAIL = 'touchpoint/leaves/TEAM_LEAVES_REPORT_FAIL';


const initialState = {
  myLeavesLoading: false,
  myLeavesLoaded: false,
  myLeavesData: [],
  myLeaveBalanceLoading: false,
  myLeaveBalanceLoaded: false,
  myLeaveBalanceData: {
    leave_types: []
  },
  leaveTypesLoading: false,
  leaveTypesLoaded: false,
  leaveTypesData: [{'leave_count': 0}, {'leave_count': 0}, {'leave_count': 0}],
  teamLeavesLoading: false,
  teamLeavesLoaded: false,
  teamLeavesData: [],
  applyLeaveLoading: false,
  applyLeaveLoaded: false,
  applyLeaveData: [],
  deleteLeaveLoading: false,
  deleteLeaveLoaded: false,
  deleteLeaveStatus: null,
  teamLeavesReportLoading: false,
  teamLeavesReportLoaded: false,
  teamLeavesReportData: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_MY_LEAVES:
      return {
        ...state,
        myLeavesLoading: false,
        myLeavesLoaded: false,
        myLeaveBalanceLoading: false,
        myLeaveBalanceLoaded: false,
      };
    case LOAD_MY_LEAVES:
      return {
        ...state,
        myLeavesLoading: true,
        myLeavesLoaded: false,
        ...action.result,
      };
    case LOAD_MY_LEAVES_SUCCESS:
      return {
        ...state,
        myLeavesLoading: false,
        myLeavesLoaded: true,
        myLeavesData: action.result
      };
    case LOAD_MY_LEAVES_FAIL:
      return {
        ...state,
        myLeavesLoading: false,
        myLeavesLoaded: true,
        ...action.result
      };
    case LOAD_LEAVE_TYPES:
      return {
        ...state,
        leaveTypesLoading: true,
        leaveTypesLoaded: false
      };
    case LOAD_LEAVE_TYPES_SUCCESS:
      return {
        ...state,
        leaveTypesLoading: false,
        leaveTypesLoaded: true,
        leaveTypesData: action.result
      };
    case LOAD_LEAVE_TYPES_FAIL:
      return {
        ...state,
        leaveTypesLoading: false,
        leaveTypesLoaded: true,
        ...action.result
      };
    case LOAD_MY_LEAVE_BALANCE:
      return {
        ...state,
        myLeaveBalanceLoading: true,
        myLeaveBalanceLoaded: false
      };
    case LOAD_MY_LEAVE_BALANCE_SUCCESS:
      return {
        ...state,
        myLeaveBalanceLoading: false,
        myLeaveBalanceLoaded: true,
        myLeaveBalanceData: action.result
      };
    case LOAD_MY_LEAVE_BALANCE_FAIL:
      return {
        ...state,
        myLeaveBalanceLoading: false,
        myLeaveBalanceLoaded: true,
        ...action.result
      };
    case LOAD_TEAM_LEAVES:
      return {
        ...state,
        teamLeavesLoading: true,
        teanLeavesLoaded: false,
        ...action.result,
      };
    case LOAD_TEAM_LEAVES_SUCCESS:
      return {
        ...state,
        teamLeavesLoading: false,
        teamLeavesLoaded: true,
        teamLeavesData: action.result
      };
    case LOAD_TEAM_LEAVES_FAIL:
      return {
        ...state,
        teamLeavesLoading: false,
        teamLeavesLoaded: true,
        ...action.result
      };
    case LOAD_APPLY_LEAVE:
      return {
        ...state,
        applyLeaveLoading: true,
        applyLeaveLoaded: false
      };
    case LOAD_APPLY_LEAVE_SUCCESS:
      return {
        ...state,
        applyLeaveLoading: false,
        applyLeaveLoaded: true,
        applyLeaveData: action.result,
        myLeaveBalanceLoaded: false
      };
    case LOAD_APPLY_LEAVE_FAIL:
      return {
        ...state,
        applyLeaveLoading: false,
        applyLeaveLoaded: true,
        ...action.result
      };
    case UPDATE_LEAVE:
      return {
        ...state,
        updateLeaveLoading: true,
        updateLeaveLoaded: false
      };
    case UPDATE_LEAVE_SUCCESS:
      return {
        ...state,
        updateLeaveLoading: false,
        updateLeaveLoaded: true,
        updateLeaveData: action.result
      };
    case UPDATE_LEAVE_FAIL:
      return {
        ...state,
        updateLeaveLoading: false,
        updateLeaveLoaded: true,
        ...action.result
      };
    case DELETE_LEAVE:
      return {
        ...state,
        deleteLeaveLoading: true,
        deleteLeaveLoaded: false
      };
    case DELETE_LEAVE_SUCCESS:
      return {
        ...state,
        deleteLeaveLoading: false,
        deleteLeaveLoaded: true,
        deleteLeaveStatus: action.result,
        myLeaveBalanceLoaded: false
      };
    case DELETE_LEAVE_FAIL:
      return {
        ...state,
        deleteLeaveLoading: false,
        deleteLeaveLoaded: true,
        ...action.result
      };
    case TEAM_LEAVES_REPORT:
      return {
        ...state,
        teamLeavesReportLoading: true,
        teamLeavesReportLoaded: false,
      };
    case TEAM_LEAVES_REPORT_SUCCESS:
      return {
        ...state,
        teamLeavesReportLoading: false,
        teamLeavesReportLoaded: true,
        teamLeavesReportData: action.result
      };
    case TEAM_LEAVES_REPORT_FAIL:
      return {
        ...state,
        teamLeavesReportLoading: false,
        teamLeavesReportLoaded: false,
        ...action.result
      };
    default:
      return state;
  }
}

export function getMyLeaves() {
  return {
    types: [LOAD_MY_LEAVES, LOAD_MY_LEAVES_SUCCESS, LOAD_MY_LEAVES_FAIL],
    promise: (client) => client.get('/getMyLeaves')
  };
}

export function resetMyLeaves() {
  return { type: RESET_MY_LEAVES };
}

export function getTeamLeaves() {
  return {
    types: [LOAD_TEAM_LEAVES, LOAD_TEAM_LEAVES_SUCCESS, LOAD_TEAM_LEAVES_FAIL],
    promise: (client) => client.get('/getTeamLeaves')
  };
}

export function getLeaveTypes() {
  return {
    types: [LOAD_LEAVE_TYPES, LOAD_LEAVE_TYPES_SUCCESS, LOAD_LEAVE_TYPES_FAIL],
    promise: (client) => client.get('/getLeaveTypes')
  };
}

export function getMyLeaveBalance() {
  return {
    types: [LOAD_MY_LEAVE_BALANCE, LOAD_MY_LEAVE_BALANCE_SUCCESS, LOAD_MY_LEAVE_BALANCE_FAIL],
    promise: (client) => client.get('/getMyLeaveBalance')
  };
}

export function applyLeave(leaveData) {
  return {
    types: [LOAD_APPLY_LEAVE, LOAD_APPLY_LEAVE_SUCCESS, LOAD_APPLY_LEAVE_FAIL],
    promise: (client) => client.post('/submitLeaveRequest', { data: leaveData })
  };
}

export function updateLeaveStatus(leaveDataStatus) {
  return {
    types: [UPDATE_LEAVE, UPDATE_LEAVE_SUCCESS, UPDATE_LEAVE_FAIL],
    promise: (client) => client.post('/updateLeaveStatus', { data: leaveDataStatus })
  };
}

export function deleteLeaveRequest(deleteLeaveData) {
  return {
    types: [DELETE_LEAVE, DELETE_LEAVE_SUCCESS, DELETE_LEAVE_FAIL],
    promise: (client) => client.post('/deleteLeaveRequest', { data: deleteLeaveData })
  };
}

export function getTeamLeavesReport() {
  return {
    types: [TEAM_LEAVES_REPORT, TEAM_LEAVES_REPORT_SUCCESS, TEAM_LEAVES_REPORT_FAIL],
    promise: (client) => client.get('/getTeamLeavesReport')
  };
}
