import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import { Alert, Button } from 'react-bootstrap';
import { isEmpty, filter, uniqueId } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import * as resourceActions from 'redux/modules/resource';
import AddResourceToProject from 'components/AddResourceToProject/AddResourceToProject';
import EstimationAddResourceToProject from 'components/EstimationAddResourceToProject/EstimationAddResourceToProject';
import AddMilestoneToProject from 'components/AddMilestoneToProject/AddMilestoneToProject';
import EstimationAddMilestoneToProject from 'components/EstimationAddMilestoneToProject/EstimationAddMilestoneToProject';
import styles from './EditProjectDetails.scss';

class EditProjectDetails extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    employeesData: PropTypes.array,
    editProjectDetailsData: PropTypes.array,
    updateProjectDetails: PropTypes.func,
    getProjectList: PropTypes.func,
  }

  state = {
    updateProjectDetailsSuccess: null,
    project_id: this.props.editProjectDetailsData.project_id,
    project_name: this.props.editProjectDetailsData.project_name,
    project_type: this.props.editProjectDetailsData.project_type,
    start_date: this.props.editProjectDetailsData.start_date,
    end_date: this.props.editProjectDetailsData.end_date,
    est_start_date: this.props.editProjectDetailsData.est_start_date,
    est_end_date: this.props.editProjectDetailsData.est_end_date,
    resources: [
      ...this.props.editProjectDetailsData.resources,
      {id: uniqueId(), resource_id: null, emp_id: null, work_percentage: null, start_date: null, end_date: null, resource_type: 'real', resource_role: null}
    ],
    estimationresources: [
      ...this.props.editProjectDetailsData.estimationresources,
      {id: uniqueId(), resource_id: null, emp_id: null, work_percentage: null, start_date: null, end_date: null, resource_type: 'estimated', resource_role: null}
    ],
    editProjectDetailsSuccess: null,
    milestones: [
      ...this.props.editProjectDetailsData.milestones,
      {
        id: uniqueId(),
        milestone_id: null,
        milestone_title: null,
        start_date: null,
        milestone_status: null,
        milestone_comments: null,
        milestone_type: 'real'
      }
    ],
    estimationmilestones: [
      ...this.props.editProjectDetailsData.estimationmilestones,
      {
        id: uniqueId(),
        milestone_id: null,
        milestone_title: null,
        start_date: null,
        milestone_status: null,
        milestone_comments: null,
        milestone_type: 'estimated'
      }
    ],
    btn_flag: 'aa',
  };
  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : null,
    });
  }
  handleSDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ start_date: selectedDate });
  }
  handleSDCacel = () => {
    this.setState({ start_date: null });
  }
  handleEDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ end_date: selectedDate });
  }
  handleEDCacel = () => {
    this.setState({ end_date: null });
  }
  handleESDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ est_start_date: selectedDate });
  }
  handleESDCacel = () => {
    this.setState({ est_start_date: null });
  }
  handleEEDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ est_end_date: selectedDate });
  }
  handleEEDCacel = () => {
    this.setState({ est_end_date: null });
  }
  appendNewResource = () => {
    this.setState({
      resources: [ ...this.state.resources, {id: uniqueId(), resource_id: null, emp_id: null, work_percentage: null, start_date: null, end_date: null, resource_type: 'real', resource_role: null} ]
    });
  };
  removeCurrentResource = (itemIndex) => {
    let resources = this.state.resources;
    resources = filter(resources, (resource, index) => {
      return itemIndex !== index;
    });
    this.setState({
      resources: [ ...resources]
    });
  };
  handleResourceData = (itemIndex, resourceData) => {
    const resources = this.state.resources;
    resources[itemIndex] = resourceData;
    this.setState({ resources });
  };

  estimationAppendNewResource = () => {
    this.setState({
      estimationresources: [ ...this.state.estimationresources, {id: uniqueId(), resource_id: null, emp_id: null, work_percentage: null, role: null, resource_type: 'estimated', resource_role: null} ]
    });
  };

  estimationRemoveCurrentResource = (itemIndex) => {
    let estimationresources = this.state.estimationresources;
    estimationresources = filter(estimationresources, (estimationresource, index) => {
      return index !== itemIndex;
    });
    this.setState({ estimationresources });
  };
  estimationHandleResourceData = (itemIndex, resourceData) => {
    const estimationresources = this.state.estimationresources;
    estimationresources[itemIndex] = resourceData;
    this.setState({ estimationresources });
  };
  appendNewMilestone = () => {
    this.setState({
      milestones: [ ...this.state.milestones, {id: uniqueId(), milestone_id: null, milestone_title: null, start_date: null,
          milestone_status: null, milestone_comments: null, milestone_type: 'real'
      } ]
    });
  };
  removeCurrentMilestone = (itemIndex) => {
    let milestones = this.state.milestones;
    milestones = filter(milestones, (milestone, index) => {
      return index !== itemIndex;
    });
    this.setState({ milestones });
  };
  handleMilestoneData = (itemIndex, milestoneData) => {
    const milestones = this.state.milestones;
    milestones[itemIndex] = milestoneData;
    this.setState({ milestones });
  };
  estimationAppendNewMilestone = () => {
    this.setState({
      estimationmilestones: [ ...this.state.estimationmilestones, {id: uniqueId(), milestone_id: null, milestone_title: null, start_date: null, milestone_status: null, milestone_comments: null, milestone_type: 'estimated'} ]
    });
  };
  estimationRemoveCurrentMilestone = (itemIndex) => {
    let estimationmilestones = this.state.estimationmilestones;
    estimationmilestones = filter(estimationmilestones, (estimationmilestone, index) => {
      return index !== itemIndex;
    });
    this.setState({ estimationmilestones });
  };
  estimationHandleMilestoneData = (itemIndex, estimationmilestonesmilestoneData) => {
    const estimationmilestones = this.state.estimationmilestones;
    estimationmilestones[itemIndex] = estimationmilestonesmilestoneData;
    this.setState({ estimationmilestones });
  };
  handleSubmit = () => {
    const tempResources = this.state.resources.filter((item) => (item.emp_id !== null && item.work_percentage !== null));
    const tempMilestones = this.state.milestones.filter((item) => (item.milestone_title !== null));
    const estimationtempResources = this.state.estimationresources.filter((item) => (item.emp_id !== null && item.work_percentage !== null));
    const estimationtempMilestones = this.state.estimationmilestones.filter((item) => (item.milestone_title !== null));
    this.props.updateProjectDetails({
      project_id: this.state.project_id,
      project_name: this.state.project_name,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      project_type: this.state.project_type,
      resourceDetails: tempResources,
      milestoneDetails: tempMilestones,
      estimationResourceDetails: estimationtempResources,
      estimationMilestoneDetails: estimationtempMilestones,
      est_start_date: this.state.est_start_date,
      est_end_date: this.state.est_end_date,
    }).then(res => {
      console.log(res);
      if (res.message === 'Project with same name already exists') {
        this.setState({
          editProjectDetailsSuccess: res.message,
        });
      } else {
        this.props.getProjectList();
        this.setState({
          editProjectDetailsSuccess: res.message,
          btn_flag: null
        });
      }
    });
  }
  render() {
    const { title, onHide, show } = this.props;
    const projectResourceContent = this.state.resources.map((resource, index) => {
      return (<AddResourceToProject
        itemIndex={index}
        resources={this.state.resources}
        resourceData={this.state.resources[index]}
        key={resource.id}
        appendNewResource={this.appendNewResource}
        removeCurrentResource={this.removeCurrentResource}
        handleResourceData={this.handleResourceData}
        employeesData={this.props.employeesData}
        projectStartDate={this.state.start_date}
        projectEndDate={this.state.end_date}
      />);
    });
    const estimationprojectResourceContent = this.state.estimationresources.map((estimationresources, index) => {
      return (<EstimationAddResourceToProject
        itemIndex={index}
        resources={this.state.estimationresources}
        resourceData={this.state.estimationresources[index]}
        key={estimationresources.id}
        estimationAppendNewResource={this.estimationAppendNewResource}
        estimationRemoveCurrentResource={this.estimationRemoveCurrentResource}
        estimationHandleResourceData={this.estimationHandleResourceData}
        employeesData={this.props.employeesData}
        projectStartDate={this.state.est_start_date}
        projectEndDate={this.state.est_end_date}
      />);
    });
    const projectMilestoneContent = this.state.milestones.map((milestone, index) => {
      return (<AddMilestoneToProject
        itemIndex={index}
        milestones={this.state.milestones}
        milestoneData={this.state.milestones[index]}
        key={milestone.id}
        appendNewMilestone={this.appendNewMilestone}
        removeCurrentMilestone={this.removeCurrentMilestone}
        handleMilestoneData={this.handleMilestoneData}
        projectStartDate={this.state.start_date}
        projectEndDate={this.state.end_date}
      />);
    });
    const estimationProjectMilestoneContent = this.state.estimationmilestones.map((estimationmilestones, index) => {
      return (<EstimationAddMilestoneToProject
        itemIndex={index}
        milestones={this.state.estimationmilestones}
        milestoneData={this.state.estimationmilestones[index]}
        key={estimationmilestones.id}
        appendNewMilestone={this.estimationAppendNewMilestone}
        removeCurrentMilestone={this.estimationRemoveCurrentMilestone}
        handleMilestoneData={this.estimationHandleMilestoneData}
        projectStartDate={this.state.estimation_start_date}
        projectEndDate={this.state.estimation_end_date}
      />);
    });
    return (
      <Modal bsSize="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton className={styles.modelHeader}>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
         <Modal.Body className={styles.modelBody}>
          <form onSubmit={this.handleSubmit}>
            { this.state.editProjectDetailsSuccess ?
            <div className="row">
              <div className="col-lg-12">
                <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                  <strong>{this.state.editProjectDetailsSuccess}</strong>
                </Alert>
              </div>
            </div> : null
            }
            <Row>
              <Col md={3} lg={3} sm={3}>
                <div className="form-group">
                  <label><span className="error">*</span> Project Name </label>
                  <input
                   className="form-control"
                   placeholder="Project name"
                   value={this.state.project_name ? this.state.project_name : ''}
                   onChange={(event) => this.handleFieldChange(event, 'project_name')}
                  />
                </div>
              </Col>
              <Col md={3} lg={3} sm={3}>
                <label>Start date:</label>
                <MuiThemeProvider>
                  <DatePicker
                    hintText="Choose a date"
                    mode="landscape"
                    textFieldStyle={{width: '100%'}}
                    formatDate={this.formatDate}
                    value={this.state.start_date ? new Date(this.state.start_date) : null}
                    onChange={this.handleSDChange}
                    onDismiss={this.handleSDCacel}
                  />
                </MuiThemeProvider>
              </Col>
              <Col md={3} lg={3} sm={3}>
                <label>End date:</label>
                <MuiThemeProvider>
                  <DatePicker
                    hintText="Choose a date"
                    mode="landscape"
                    textFieldStyle={{width: '100%'}}
                    formatDate={this.formatDate}
                    value={this.state.end_date ? new Date(this.state.end_date) : null}
                    onChange={this.handleEDChange}
                    onDismiss={this.handleEDCacel}
                    minDate={this.state.start_date ? new Date(this.state.start_date) : null}
                  />
                </MuiThemeProvider>
              </Col>
              <Col md={3} lg={3} sm={3}>
                <label>Project type</label>
                  <select
                    ref={(select) => { this.appliedTo = select; }}
                    value={this.state.project_type || '0'}
                    onChange={event => this.handleFieldChange(event, 'project_type') }>
                    <option value="">--Select--</option>
                    <option value="Client">Client</option>
                    <option value="Innovation">Innovation</option>
                  </select>
              </Col>
            </Row>
            <Row className={styles.addstyle}>
              <Col md={12} lg={12} sm={12}>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Select resource</label>
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <label>Role</label>
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <label>% to work</label>
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <label>Start date</label>
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <label>End date</label>
                  </Col>
                </Row>
                {projectResourceContent}
              </Col>
            </Row>
            <Row>
              <Col md={12} lg={12} sm={12}>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Milestone title</label>
                  </Col>
                  <Col md={3} lg={3} sm={3}>
                    <label>Start date</label>
                  </Col>
                  <Col md={3} lg={3} sm={3}>
                    <label>Status</label>
                  </Col>
                  <Col md={3} lg={3} sm={3}>
                    <label>Comments</label>
                  </Col>
                </Row>
                {projectMilestoneContent}
              </Col>
            </Row>
             <hr/>
            <Row>
              <Col md={3} lg={3} sm={3}>
                <label>Estimation Details:</label>
              </Col>
            </Row>
            <Row>
              <Col md={3} lg={3} sm={3}>
                <label>Estimation Start date:</label>
                <MuiThemeProvider>
                  <DatePicker
                    hintText="Choose a date"
                    mode="landscape"
                    textFieldStyle={{width: '100%'}}
                    formatDate={this.formatDate}
                    value={this.state.est_start_date ? new Date(this.state.est_start_date) : null}
                    onChange={this.handleESDChange}
                    onDismiss={this.handleESDCacel}
                  />
                </MuiThemeProvider>
              </Col>
              <Col md={3} lg={3} sm={3}>
                <label>Estimation End date:</label>
                <MuiThemeProvider>
                  <DatePicker
                    hintText="Choose a date"
                    mode="landscape"
                    textFieldStyle={{width: '100%'}}
                    formatDate={this.formatDate}
                    value={this.state.est_end_date ? new Date(this.state.est_end_date) : null}
                    onChange={this.handleEEDChange}
                    onDismiss={this.handleEEDCacel}
                    minDate={this.state.est_start_date ? new Date(this.state.est_start_date) : null}
                  />
                </MuiThemeProvider>
              </Col>
            </Row>
            <Row>
              <Col md={12} lg={12} sm={12}>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Select resource</label>
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <label>Role</label>
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <label>% to work</label>
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <label>Start date</label>
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <label>End date</label>
                  </Col>
                </Row>
                {estimationprojectResourceContent}
              </Col>
            </Row>
            <Row>
              <Col md={12} lg={12} sm={12}>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Milestone title</label>
                  </Col>
                  <Col md={3} lg={3} sm={3}>
                    <label>Start date</label>
                  </Col>
                  <Col md={3} lg={3} sm={3}>
                    <label>Status</label>
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <label>Comments</label>
                  </Col>
                </Row>
                {estimationProjectMilestoneContent}
              </Col>
            </Row>
            <div className="row">
              <div className="col-lg-12">
                <label />
                <Button bsStyle="primary" className="pull-right" onClick={this.handleSubmit}
                  disabled={ isEmpty(this.state.project_name) || isEmpty(this.state.btn_flag)}
                >Update</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    access_token: state.home.user.access_token,
    employeesData: state.home.employeesData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(resourceActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectDetails);
