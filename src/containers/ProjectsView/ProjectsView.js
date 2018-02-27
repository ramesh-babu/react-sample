import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import * as resourceActions from 'redux/modules/resource';
import ProjectDetailsView from 'containers/ProjectDetailsView/ProjectDetailsView';
import { isEmpty, orderBy } from 'lodash';
import styles from './ProjectsView.scss';

class ProjectsView extends Component {

  static propTypes = {
    projectsLoaded: PropTypes.bool,
    projectsData: PropTypes.array,
    getProjectList: PropTypes.func,
    getProjectDetails: PropTypes.func,
    projectDetailsData: PropTypes.object,
    projectDetailsLoaded: PropTypes.boll,
  };

  state = {
    selectedProject: {
      project_id: null,
    },
  };

  componentWillMount() {
    if (!this.props.projectsLoaded) {
      this.props.getProjectList().then((projects) => {
        this.setState({
          selectedProject: orderBy(projects, ['project_name'], ['asc'])[0],
        });
        if (!isEmpty(projects)) {
          this.props.getProjectDetails(orderBy(projects, ['project_name'], ['asc'])[0].project_id);
        }
      });
    }
  }

  viewProjectDetails = (projectData) => {
    this.setState({
      selectedProject: projectData,
    });
    this.props.getProjectDetails(projectData.project_id);
  };
  render() {
    if (this.props.projectsLoaded && isEmpty(this.props.projectsData)) {
      return <div>No projects found...</div>;
    } else if (!this.props.projectsLoaded) {
      return <LoadingIndicator />;
    }
    const projectsListData = orderBy(this.props.projectsData, ['project_name'], ['asc']).map((project) => (
        <tr className={project.project_id === this.state.selectedProject.project_id ? 'bg-primary' : null} key={project.project_id}>
          <td onClick={() => this.viewProjectDetails(project)}>{project.project_name}</td>
        </tr>
    ));
    return (
      <div className={styles.home}>
        <div className="container">
          <div className="row">
            <div className={styles.leftLidebar + ' col-sm-3'}>
            <Table responsive className="table-hover">
              <thead>
                <tr>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
                {projectsListData}
              </tbody>
            </Table>
            </div>
            <div className="col-sm-9">
              <ProjectDetailsView
                selectedProject={this.state.selectedProject}
                projectDetailsData={this.props.projectDetailsData}
                projectDetailsLoaded={this.props.projectDetailsLoaded}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projectsData: state.resource.projectsData,
    projectsLoaded: state.resource.projectsLoaded,
    projectDetailsLoaded: state.resource.projectDetailsLoaded,
    projectDetailsData: state.resource.projectDetailsData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(resourceActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsView);
