import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import dateFormat from 'dateformat';
import { bindActionCreators } from 'redux';
import * as resourceActions from 'redux/modules/resource';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Table } from 'react-bootstrap';
import { orderBy } from 'lodash';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import AddProjectDetails from 'containers/AddProjectDetails/AddProjectDetails';
import EditProjectDetails from 'containers/EditProjectDetails/EditProjectDetails';
import styles from './ProjectManagement.scss';

class ProjectManagement extends Component {
  static propTypes = {
    user: PropTypes.object,
    projectsLoaded: PropTypes.bool,
    projectsData: PropTypes.array,
    getProjectList: PropTypes.func,
    getProjectDetails: PropTypes.func,
    deleteProjectDetails: PropTypes.func,
  };

  state = {
    addProjectDetailsFlag: false,
    editProjectDetailsFlag: false,
    editProjectDetailsData: null,
  };

  componentWillMount() {
    if (!this.props.projectsLoaded) {
      this.props.getProjectList();
    }
  }

  addProjectDetails = () => {
    this.setState({
      addProjectDetailsFlag: !this.state.addProjectDetailsFlag,
    });
  };

  handleEditProjectDetails = (projectData) => {
    this.props.getProjectDetails(projectData.project_id).then(response => {
      const tempResources = response[0].resourceDetails.map((item) => {
        return {
          resource_id: item.resource_id,
          emp_id: item.hr_employee_id,
          work_percentage: item.resource_percentage,
          start_date: item.start_date,
          end_date: item.end_date,
          resource_type: item.resource_type,
          resource_role: item.resource_role
        };
      });
      const estimationTempResources = response[0].estimatedResources.map((item) => {
        return {
          resource_id: item.resource_id,
          emp_id: item.hr_employee_id,
          work_percentage: item.resource_percentage,
          start_date: item.start_date,
          end_date: item.end_date,
          resource_type: item.resource_type,
          resource_role: item.resource_role
        };
      });
      const tempMilestones = response[0].milestoneDetails.map((item) => {
        return {
          milestone_id: item.milestone_id,
          milestone_title: item.milestone_title,
          start_date: item.start_date,
          milestone_status: item.milestone_status,
          milestone_comments: item.milestone_comments,
          milestone_type: item.milestone_type
        };
      });
      const estimationTempMilestones = response[0].estimatedMilestones.map((item) => {
        return {
          milestone_id: item.milestone_id,
          milestone_title: item.milestone_title,
          start_date: item.start_date,
          milestone_status: item.milestone_status,
          milestone_comments: item.milestone_comments,
          milestone_type: item.milestone_type
        };
      });
      this.setState({
        editProjectDetailsFlag: true,
        editProjectDetailsData: {
          project_id: response[0].projectDetails[0].project_id,
          project_name: response[0].projectDetails[0].project_name,
          project_type: response[0].projectDetails[0].project_type,
          start_date: response[0].projectDetails[0].start_date,
          end_date: response[0].projectDetails[0].end_date,
          est_start_date: response[0].projectDetails[0].est_start_date,
          est_end_date: response[0].projectDetails[0].est_end_date,
          resources: tempResources,
          estimationresources: estimationTempResources,
          milestones: tempMilestones,
          estimationmilestones: estimationTempMilestones,
        }
      });
    });
  };

  handleEditProjectDetailModelClose = () => {
    this.setState({ editProjectDetailsFlag: false });
  }

  handleDeleteProject = (projectData) => {
    this.props.deleteProjectDetails(projectData.project_id).then(() => {
      this.props.getProjectList();
    });
  }

  render() {
    const projectsContent = orderBy(this.props.projectsData, ['project_name'], ['asc']).map((projectData, index) => (
      <tr key={projectData.project_id}>
        <td>{index + 1}</td>
        <td>{projectData.project_name}</td>
        <td className="centered">{projectData.resource_count}</td>
        <td className="centered">{projectData.start_date && projectData.start_date !== '0000-00-00' ? dateFormat(projectData.start_date, 'mmm dd, yyyy') : '-'}</td>
        <td className="centered">{projectData.end_date && projectData.end_date !== '0000-00-00' ? dateFormat(projectData.end_date, 'mmm dd, yyyy') : '-'}</td>
        <td className="centered">{projectData.project_type ? projectData.project_type : '-'}</td>
        <td>
          <Button
            bsStyle="primary"
            className="pull-right"
            onClick={() => this.handleEditProjectDetails(projectData)}>
              <Glyphicon glyph="pencil" />
          </Button>
        </td>
        <td>
          <Button
            bsStyle="primary"
            onClick={() => {
              if (confirm('Delete the project?')) {
                this.handleDeleteProject(projectData);
              }
            }}>
            <Glyphicon glyph="trash" />
          </Button>
        </td>
      </tr>
    ));
    return (
      <div className={styles.home}>
        <div className="container">
          { !this.props.projectsLoaded ? <LoadingIndicator /> :
            <div>
              <div className="row">
                <div className="col-lg-12">
                  <Button bsStyle="primary" className={styles.addProjectBtn + ' pull-right'} onClick={this.addProjectDetails}>
                    <Glyphicon glyph="plus" /> Add Project
                  </Button>
                </div>
              </div>
              <Table responsive className="table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th className="centered"># Resources</th>
                    <th className="centered">Start date</th>
                    <th className="centered">End date</th>
                    <th className="centered">Project type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                { projectsContent.length ?
                    projectsContent :
                    <tr>
                      <td colSpan="7">No projects found.</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </div>
          }
        </div>
        {
          this.state.addProjectDetailsFlag ?
          <AddProjectDetails
            title="Add Project Details"
            onHide={this.addProjectDetails}
            show
          /> : null
        }
        {
          this.state.editProjectDetailsFlag ?
          <EditProjectDetails
            title="Update Project Details"
            onHide={this.handleEditProjectDetailModelClose}
            show
            editProjectDetailsData={this.state.editProjectDetailsData}
          /> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projectsData: state.resource.projectsData,
    projectsLoaded: state.resource.projectsLoaded,
    user: state.home.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(resourceActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagement);
