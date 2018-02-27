import React, { PropTypes, Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styles from './AddTimesheetModal.scss';

class AddTimesheetModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    projectsListLoaded: PropTypes.bool,
    getProjectsList: PropTypes.func,
    projectsListData: PropTypes.array,
    submitTimesheetRequest: PropTypes.func,
    submitTimesheetLoaded: PropTypes.bool,
  }

  state = {
    project_id: null,
    no_of_hours: '',
    task_date: moment().format('YYYY-MM-DD'),
    description: '',
    task_next_day: '',
    alertVisible: true,
  };

  componentWillMount() {
    if (!this.props.projectsListLoaded) {
      this.props.getProjectsList();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.submitTimesheetLoaded && nextProps.submitTimesheetLoaded) {
      this.setState({
        project_id: null,
        no_of_hours: '',
        task_date: moment().format('YYYY-MM-DD'),
        description: '',
        task_next_day: '',
        alertVisible: true,
      });
    }
  }

  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : '',
    });
  }

  handleDateChange = (date, key) => {
    this.setState({
      ...this.state,
      [key]: !isEmpty(date) ? moment(date).format('YYYY-MM-DD') : '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const requestObj = {
      project_id: this.state.project_id,
      no_of_hours: this.state.no_of_hours,
      task: 'task',
      task_date: this.state.task_date,
      description: this.state.description,
      task_next_day: this.state.task_next_day
    };
    this.props.submitTimesheetRequest(requestObj);
  }

  handleAlertDismiss = () => {
    this.setState({alertVisible: false});
  }

  render() {
    const { title, onHide, show, projectsListData } = this.props;
    const typeOptions = projectsListData.map(item => {
      return <option value={item.project_id} key={item.project_id}>{item.project_name}</option>;
    });
    return (
      <Modal bsSize="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton className={styles.modelHeader}>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modelBody}>
          <div>
            {(this.props.submitTimesheetLoaded && this.state.alertVisible) &&
              <div className="row">
                <div className="col-lg-12">
                  <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                    <strong>You have submitted activity successfully.</strong>
                  </Alert>
                </div>
              </div>}
            <form>
              <div className="row">
                <div className="col-lg-6">
                  <label>Date:</label>
                  <DatePicker dateFormat="YYYY-MM-DD" name="task_date" selected={moment(this.state.task_date)} onChange={(date) => this.handleDateChange(date, 'task_date')} />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label>Project:</label>
                  <select onChange={(event) => this.handleFieldChange(event, 'project_id')} value={this.state.project_id}>
                    <option value="">--Select project--</option>
                    {typeOptions}
                  </select>
                </div>
                <div className="col-lg-6">
                  <label>No of hours:</label>
                  <input
                    className="form-control"
                    type="number"
                    ref="no_of_hours"
                    min="1"
                    max="24"
                    placeholder="No of hours"
                    onChange={(event) => this.handleFieldChange(event, 'no_of_hours')}
                    value={this.state.no_of_hours}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label>Description:</label>
                  <textarea
                    rows="3"
                    ref="description"
                    placeholder="Task description"
                    className="form-control"
                    onChange={(event) => this.handleFieldChange(event, 'description')}
                    value={this.state.description}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label>Activity planned for next day:</label>
                  <textarea
                    rows="3"
                    ref="task_next_day"
                    placeholder="Task description"
                    className="form-control"
                    onChange={(event) => this.handleFieldChange(event, 'task_next_day')}
                    value={this.state.task_next_day}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label />
                  <Button bsStyle="primary" className="pull-right" onClick={this.handleSubmit} disabled={isEmpty(this.state.project_id) || isEmpty(this.state.no_of_hours) || isEmpty(this.state.task_date) || isEmpty(this.state.description) || isEmpty(this.state.task_next_day)}>Submit Timesheet</Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddTimesheetModal;
