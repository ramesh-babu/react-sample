const LOAD_ATTENDANCE_DATA = 'touchpoint/attendance/LOAD_ATTENDANCE_DATA';
const LOAD_ATTENDANCE_DATA_SUCCESS = 'touchpoint/attendance/LOAD_ATTENDANCE_DATA_SUCCESS';
const LOAD_ATTENDANCE_DATA_FAIL = 'touchpoint/attendance/LOAD_ATTENDANCE_DATA_FAIL';

const LOAD_EMP_ATTENDANCE_DATA = 'touchpoint/attendance/LOAD_EMP_ATTENDANCE_DATA';
const LOAD_EMP_ATTENDANCE_DATA_SUCCESS = 'touchpoint/attendance/LOAD_EMP_ATTENDANCE_DATA_SUCCESS';
const LOAD_EMP_ATTENDANCE_DATA_FAIL = 'touchpoint/attendance/LOAD_EMP_ATTENDANCE_DATA_FAIL';

const initialState = {
  attendanceLoading: false,
  attendanceLoaded: false,
  attendanceData: [],
  empAttendanceLoading: false,
  empAttendanceLoaded: false,
  empAttendanceData: {
    employee_id: null
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ATTENDANCE_DATA:
      return {
        ...state,
        attendanceLoading: true,
        attendanceLoaded: false,
        ...action.result,
      };
    case LOAD_ATTENDANCE_DATA_SUCCESS:
      return {
        ...state,
        attendanceLoading: false,
        attendanceLoaded: true,
        attendanceData: action.result
      };
    case LOAD_ATTENDANCE_DATA_FAIL:
      return {
        ...state,
        attendanceLoading: false,
        attendanceLoaded: true,
        ...action.result
      };
    case LOAD_EMP_ATTENDANCE_DATA:
      return {
        ...state,
        empAttendanceLoading: true,
        empAttendanceLoaded: false,
        ...action.result,
      };
    case LOAD_EMP_ATTENDANCE_DATA_SUCCESS:
      return {
        ...state,
        empAttendanceLoading: false,
        empAttendanceLoaded: true,
        empAttendanceData: action.result
      };
    case LOAD_EMP_ATTENDANCE_DATA_FAIL:
      return {
        ...state,
        empAttendanceLoading: false,
        empAttendanceLoaded: true,
        empAttendanceData: {
          employee_id: null
        }
      };
    default:
      return state;
  }
}

export function getAttendanceData(filterData = {}) {
  return {
    types: [LOAD_ATTENDANCE_DATA, LOAD_ATTENDANCE_DATA_SUCCESS, LOAD_ATTENDANCE_DATA_FAIL],
    promise: (client) => client.post('/getAttendanceData', { data: filterData })
  };
}

export function getEmpAttendanceReport(filterData = {}) {
  return {
    types: [LOAD_EMP_ATTENDANCE_DATA, LOAD_EMP_ATTENDANCE_DATA_SUCCESS, LOAD_EMP_ATTENDANCE_DATA_FAIL],
    promise: (client) => client.post('/getEmpAttendanceReport', { data: filterData })
  };
}


