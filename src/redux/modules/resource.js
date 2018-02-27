const LOAD_PROJECTS = 'touchpoint/resource/LOAD_PROJECTS';
const LOAD_PROJECTS_SUCCESS = 'touchpoint/resource/LOAD_PROJECTS_SUCCESS';
const LOAD_PROJECTS_FAIL = 'touchpoint/resource/LOAD_PROJECTS_FAIL';

const LOAD_RESOURCE_DETAILS = 'touchpoint/resource/LOAD_RESOURCE_DETAILS';
const LOAD_RESOURCE_DETAILS_SUCCESS = 'touchpoint/resource/LOAD_RESOURCE_DETAILS_SUCCESS';
const LOAD_RESOURCE_DETAILS_FAIL = 'touchpoint/resource/LOAD_RESOURCE_DETAILS_FAIL';

const LOAD_TEAM_PROJECT_DETAILS = 'touchpoint/resource/LOAD_TEAM_PROJECT_DETAILS';
const LOAD_TEAM_PROJECT_DETAILS_SUCCESS = 'touchpoint/resource/LOAD_TEAM_PROJECT_DETAILS_SUCCESS';
const LOAD_TEAM_PROJECT_DETAILS_FAIL = 'touchpoint/resource/LOAD_PROJECT_DETAILS_FAIL';

const LOAD_PROJECT_DETAILS = 'touchpoint/resource/LOAD_PROJECT_DETAILS';
const LOAD_PROJECT_DETAILS_SUCCESS = 'touchpoint/resource/LOAD_PROJECT_DETAILS_SUCCESS';
const LOAD_PROJECT_DETAILS_FAIL = 'touchpoint/resource/LOAD_PROJECT_DETAILS_FAIL';

const ADD_PROJECT_DETAILS = 'touchpoint/resource/ADD_PROJECT_DETAILS';
const ADD_PROJECT_DETAILS_SUCCESS = 'touchpoint/resource/ADD_PROJECT_DETAILS_SUCCESS';
const ADD_PROJECT_DETAILS_FAIL = 'touchpoint/resource/ADD_PROJECT_DETAILS_FAIL';

const UPDATE_PROJECT_DETAILS = 'touchpoint/resource/UPDATE_PROJECT_DETAILS';
const UPDATE_PROJECT_DETAILS_SUCCESS = 'touchpoint/resource/UPDATE_PROJECT_DETAILS_SUCCESS';
const UPDATE_PROJECT_DETAILS_FAIL = 'touchpoint/resource/UPDATE_PROJECT_DETAILS_FAIL';

const DELETE_PROJECT_DETAILS = 'touchpoint/resource/DELETE_PROJECT_DETAILS';
const DELETE_PROJECT_DETAILS_SUCCESS = 'touchpoint/resource/DELETE_PROJECT_DETAILS_SUCCESS';
const DELETE_PROJECT_DETAILS_FAIL = 'touchpoint/resource/DELETE_PROJECT_DETAILS_FAIL';

const initialState = {
  projectsLoading: false,
  projectsLoaded: false,
  projectsData: [],
  resourceDetailsLoading: false,
  resourceDetailsLoaded: false,
  resourceDetailsData: [],
  teamProjectDetailsLoading: false,
  teamProjectDetailsLoaded: false,
  teamProjectDetailsData: [
    {
      employeeDetails: [],
      projectDetails: []
    }
  ],
  projectDetailsLoading: false,
  projectDetailsLoaded: false,
  projectDetailsData: {
    resourceDetails: [],
    milestoneDetails: []
  },
  addProjectDetailsLoading: false,
  addProjectDetailsLoaded: false,
  addProjectDetailsSuccess: null,
  updateProjectDetailsLoading: false,
  updateProjectDetailsLoaded: false,
  updateProjectDetailsSuccess: null,
  deleteProjectDetailsLoading: false,
  deleteProjectDetailsLoaded: false,
  deleteProjectDetailsSuccess: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        projectsLoading: true,
        projectsLoaded: false,
        ...action.result,
      };
    case LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projectsLoading: false,
        projectsLoaded: true,
        projectsData: action.result
      };
    case LOAD_PROJECTS_FAIL:
      return {
        ...state,
        projectsLoading: false,
        projectsLoaded: true,
        ...action.result
      };
    case LOAD_RESOURCE_DETAILS:
      return {
        ...state,
        resourceDetailsLoading: true,
        resourceDetailsLoaded: false,
      };
    case LOAD_RESOURCE_DETAILS_SUCCESS:
      return {
        ...state,
        resourceDetailsLoading: false,
        resourceDetailsLoaded: true,
        resourceDetailsData: action.result
      };
    case LOAD_RESOURCE_DETAILS_FAIL:
      return {
        ...state,
        resourceDetailsLoading: false,
        resourceDetailsLoaded: true,
        ...action.result
      };
    case LOAD_TEAM_PROJECT_DETAILS:
      return {
        ...state,
        teamProjectDetailsLoading: true,
        teamProjectDetailsLoaded: false,
      };
    case LOAD_TEAM_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        teamProjectDetailsLoading: false,
        teamProjectDetailsLoaded: true,
        teamProjectDetailsData: action.result
      };
    case LOAD_TEAM_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        teamProjectDetailsLoading: false,
        teamProjectDetailsLoaded: true,
        ...action.result
      };
    case LOAD_PROJECT_DETAILS:
      return {
        ...state,
        projectDetailsLoading: true,
        projectDetailsLoaded: false,
      };
    case LOAD_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        projectDetailsLoading: false,
        projectDetailsLoaded: true,
        projectDetailsData: action.result[0]
      };
    case LOAD_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        projectDetailsLoading: false,
        projectDetailsLoaded: true,
        ...action.result
      };
    case ADD_PROJECT_DETAILS:
      return {
        ...state,
        addProjectDetailsLoading: true,
        addProjectDetailsLoaded: false
      };
    case ADD_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        addProjectDetailsLoading: false,
        addProjectDetailsLoaded: true,
        addProjectDetailsSuccess: action.result
      };
    case ADD_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        addProjectDetailsLoading: false,
        addProjectDetailsLoaded: true,
        ...action.result
      };
    case UPDATE_PROJECT_DETAILS:
      return {
        ...state,
        updateProjectDetailsLoading: true,
        updateProjectDetailsLoaded: false
      };
    case UPDATE_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        updateProjectDetailsLoading: false,
        updateProjectDetailsLoaded: true,
        updateProjectDetailsSuccess: action.result
      };
    case UPDATE_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        updateProjectDetailsLoading: false,
        updateProjectDetailsLoaded: true,
        ...action.result
      };
    case DELETE_PROJECT_DETAILS:
      return {
        ...state,
        deelteProjectDetailsLoading: true,
        deleteProjectDetailsLoaded: false,
      };
    case DELETE_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        deleteProjectDetailsLoading: false,
        deleteProjectDetailsLoaded: true,
        deleteProjectDetailsSuccess: action.result
      };
    case DELETE_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        deleteProjectDetailsLoading: false,
        deleteProjectDetailsLoaded: true,
        ...action.result
      };
    default:
      return state;
  }
}

export function getProjectList() {
  return {
    types: [LOAD_PROJECTS, LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_FAIL],
    promise: (client) => client.get('/getProjectList')
  };
}

export function getProjectDetails(projectId) {
  return {
    types: [LOAD_PROJECT_DETAILS, LOAD_PROJECT_DETAILS_SUCCESS, LOAD_PROJECT_DETAILS_FAIL],
    promise: (client) => client.post('/viewProjectDetails', { data: {project_id: projectId} })
  };
}

export function getResourceDetails(resourceId) {
  return {
    types: [LOAD_RESOURCE_DETAILS, LOAD_RESOURCE_DETAILS_SUCCESS, LOAD_RESOURCE_DETAILS_FAIL],
    promise: (client) => client.post('/viewResourceDetails', { data: {employee_id: resourceId} })
  };
}

export function addProjectDetails(addData) {
  return {
    types: [ADD_PROJECT_DETAILS, ADD_PROJECT_DETAILS_SUCCESS, ADD_PROJECT_DETAILS_FAIL],
    promise: (client) => client.post('/addProjectDetails', { data: addData })
  };
}

export function updateProjectDetails(editData) {
  return {
    types: [UPDATE_PROJECT_DETAILS, UPDATE_PROJECT_DETAILS_SUCCESS, UPDATE_PROJECT_DETAILS_FAIL],
    promise: (client) => client.post('/updateProjectDetails', { data: editData })
  };
}

export function deleteProjectDetails(projectId) {
  return {
    types: [DELETE_PROJECT_DETAILS, DELETE_PROJECT_DETAILS_SUCCESS, DELETE_PROJECT_DETAILS_FAIL],
    promise: (client) => client.post('/deleteProjectDetails', { data: {project_id: projectId} })
  };
}

export function getTeamProjectsDetails(teamName, startDate, endDate, projectType) {
  return {
    types: [LOAD_TEAM_PROJECT_DETAILS, LOAD_TEAM_PROJECT_DETAILS_SUCCESS, LOAD_TEAM_PROJECT_DETAILS_FAIL],
    promise: (client) => client.post('/viewTeamProjectDetails', { data: {teamName: teamName, from_date: startDate, to_date: endDate, project_type: projectType }})
  };
}
