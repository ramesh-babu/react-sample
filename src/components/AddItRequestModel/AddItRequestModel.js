import React, { PropTypes, Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { isEmpty, filter } from 'lodash';
import styles from './AddItRequestModel.scss';

class AddItRequestModel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    requestTypesLoaded: PropTypes.bool,
    getRequestTypes: PropTypes.func,
    requestTypesData: PropTypes.array,
    requestPrioritiesLoaded: PropTypes.bool,
    getRequestPriorities: PropTypes.func,
    requestPrioritiesData: PropTypes.array,
    employeesData: PropTypes.array,
    submitItRequest: PropTypes.func,
    submitItRequestResponse: PropTypes.object,
    user: PropTypes.object,
    getItRequestTypesManagers: PropTypes.func,
    getItRequestTypesManagersLoaded: PropTypes.bool,
  }

  state = {
    request_type_id: '',
    priority_id: '',
    reporting_to_id: '',
    subject: '',
    message: '',
    alertVisible: false,
    submitBtnStatus: true,
    Managers: [],
  };

  componentWillMount() {
    if (!this.props.requestTypesLoaded) {
      this.props.getRequestTypes();
    }
    if (!this.props.requestPrioritiesLoaded) {
      this.props.getRequestPriorities();
    }
    if (!this.props.getItRequestTypesManagersLoaded) {
      this.props.getItRequestTypesManagers().then(res => {
        this.setState({Managers: res });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submitItRequestResponse.message === 'Your request has been submitted successfully') {
      this.setState({
        alertVisible: true,
        request_type_id: '',
        priority_id: '',
        reporting_to_id: '',
        subject: '',
        message: '',
        submitBtnStatus: true
      });
    }
    if (nextProps.submitItRequestResponse.message) {
      this.setState({ alertVisible: true, submitBtnStatus: true });
    }
  }

  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const requestObj = {
      request_type_id: this.state.request_type_id,
      priority_id: this.state.priority_id,
      reporting_to_id: this.state.reporting_to_id,
      subject: this.state.subject,
      message: this.state.message
    };
    this.props.submitItRequest(requestObj);
    this.setState({submitBtnStatus: false});
  }

  handleAlertDismiss = () => {
    this.setState({alertVisible: false});
  }

  render() {
    const { title, onHide, show, requestTypesData, requestPrioritiesData } = this.props;
    const typeOptions = requestTypesData.map(item => {
      return <option value={item.request_type_id} key={item.request_type_id}>{item.request_type}</option>;
    });
    const priorityOptions = requestPrioritiesData.map(item => {
      return <option value={item.priority_id} key={item.priority_id}>{item.priority}</option>;
    });
    const managersData = this.state.request_type_id ? filter(this.state.Managers, (Managers) => {
      return parseInt(Managers.request_type_id, 10) === parseInt(this.state.request_type_id, 10);
    }) : null;
    const reportingToOptions = managersData ? managersData[0].managers.map((item) => {
      return <option value={item.emp_number} key={item.emp_number}>{item.emp_firstname} {item.emp_lastname}</option>;
    }) : null;
    return (
      <Modal bsSize="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton className={styles.modelHeader}>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modelBody}>
          <div>
            {(this.props.submitItRequestResponse.message === 'Your request has been submitted successfully' && this.state.alertVisible) &&
              <div className="row">
                <div className="col-lg-12">
                  <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                    <strong>{this.props.submitItRequestResponse.message}</strong>
                  </Alert>
                </div>
              </div>}
            {(this.props.submitItRequestResponse.message === 'Failed to submit request' && this.state.alertVisible) &&
              <div className="row">
                <div className="col-lg-12">
                  <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                    <strong>{this.props.submitItRequestResponse.message}</strong>
                  </Alert>
                </div>
              </div>}
            <form>
              <div className="row">
                <div className="col-lg-6">
                  <label>Type:</label>
                  <select onChange={(event) => this.handleFieldChange(event, 'request_type_id')} value={this.state.request_type_id}>
                    <option value="">--Select type--</option>
                    {typeOptions}
                  </select>
                </div>
                <div className="col-lg-6">
                  <label>Priority:</label>
                  <select onChange={(event) => this.handleFieldChange(event, 'priority_id')} value={this.state.priority_id}>
                    <option value="">--Select priority--</option>
                    {priorityOptions}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label>Reporitng to:</label>
                  <select onChange={(event) => this.handleFieldChange(event, 'reporting_to_id')} value={this.state.reporting_to_id}>
                    <option value="">--Select reporting person--</option>
                    {reportingToOptions}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label>Subject:</label>
                  <input
                    className="form-control"
                    type="text"
                    ref="subject"
                    placeholder="Subject"
                    onChange={(event) => this.handleFieldChange(event, 'subject')}
                    value={this.state.subject}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label>Description:</label>
                  <textarea
                    rows="3"
                    ref="message"
                    placeholder="Reason for IT Request"
                    className="form-control"
                    onChange={(event) => this.handleFieldChange(event, 'message')}
                    value={this.state.message}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label />
                  <Button bsStyle="primary" className="pull-right" onClick={this.handleSubmit} disabled={isEmpty(this.state.request_type_id) || isEmpty(this.state.priority_id) || isEmpty(this.state.reporting_to_id) || isEmpty(this.state.subject) || isEmpty(this.state.message) || !this.state.submitBtnStatus}>Send Request</Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddItRequestModel;
