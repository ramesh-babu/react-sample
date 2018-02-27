import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import * as leaveActions from 'redux/modules/leaves';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import Select from 'react-select';
import { isEmpty, orderBy } from 'lodash';
import styles from './ApplyLeave.scss';

class ApplyLeave extends Component {
  static propTypes = {
    leaveTypesLoaded: PropTypes.bool,
    leaveTypesData: PropTypes.array,
    getLeaveTypes: PropTypes.func,
    applyLeave: PropTypes.func,
    access_token: PropTypes.string,
    reporting_to_id: PropTypes.string,
    successMsg: PropTypes.string,
    resetMyLeaves: PropTypes.func,
    employeesData: PropTypes.array,
    user: PropTypes.object,
  }

  state = {
    errorAlertVisible: false,
    submitBtnStatus: true,
    successflag: false,
    ErrorMsg: '',
    past_date: '',
    from_date: '',
    to_date: '',
    selectedEmployeeOption: {value: this.props.user.emp_number, label: this.props.user.emp_firstname + ' ' + this.props.user.emp_lastname },
    formData: {
      leave_type_id: '',
      from_date: '',
      to_date: '',
      reason: '',
      leave_id: '0',
      subject: 'Submit_leave_request',
      access_token: this.props.access_token,
      reporting_to_id: this.props.reporting_to_id,
      selectedEmployee: this.props.user.emp_number,
    },
  };
  componentWillMount() {
    if (!this.props.leaveTypesLoaded) {
      // Loading leave types data
      this.props.getLeaveTypes();
    }
  }

  handleFieldChange = (event, key) => {
    // Storing form data in state on field change
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.buildFormData(key, value);
  }


  handleSubmit = (event) => {
    // handling apply leave form data submit
    event.preventDefault();
    const stateData = this.state;
    stateData.formData.selectedEmployee = this.state.selectedEmployeeOption.value;
    if (isEmpty('' + this.state.formData.leave_type_id)) {
      this.setState({errorAlertVisible: true, ErrorMsg: 'Leave type shoulde not be empty'});
      this.LeavetypeInput.focus();
    } else if (isEmpty(this.state.from_date)) {
      this.FromdateInput.focus();
      this.setState({errorAlertVisible: true, ErrorMsg: 'From date shoulde not be empty'});
    } else if (isEmpty(this.state.to_date)) {
      this.TodateInput.focus();
      this.setState({errorAlertVisible: true, ErrorMsg: 'To date shoulde not be empty'});
    } else if (isEmpty(this.state.formData.reason)) {
      this.reason.focus();
      this.setState({errorAlertVisible: true, ErrorMsg: 'Reason shoulde not be empty'});
    } else {
      this.setState({submitBtnStatus: false});
      this.props.applyLeave(stateData.formData).then((res) => {
        if (res.message === 'Leave request submitted successfully') {
          this.setState({
            formData: {
              leave_type_id: '',
              from_date: null,
              to_date: null,
              reason: '',
              leave_id: '0',
              subject: 'Submit_leave_request',
              access_token: this.props.access_token,
              reporting_to_id: this.props.reporting_to_id,
            },
            from_date: '',
            to_date: '',
            errorAlertVisible: false,
            successflag: true,
            submitBtnStatus: false
          });
          this.props.resetMyLeaves();
        } else {
          this.setState({
            errorAlertVisible: false,
            successflag: true,
            submitBtnStatus: true,
          });
        }
      });
    }
  }

  buildFormData = (key, value) => {
    // building form data and storing in state
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: !isEmpty(value) ? value : '',
      },
    });
  }
  handleFDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({from_date: selectedDate});
    this.buildFormData('from_date', selectedDate);
  }
  handleFDCacel = () => {
    const selectedDate = '';
    this.setState({from_date: selectedDate});
    this.buildFormData('from_date', selectedDate);
  }
  handleTDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({to_date: selectedDate});
    this.buildFormData('to_date', selectedDate);
  }
  handleTDCacel = () => {
    const selectedDate = '';
    this.setState({to_date: selectedDate});
    this.buildFormData('to_date', selectedDate);
  }
  handleAlertDismiss = () => {
    // to close success alert message
    this.setState({errorAlertVisible: false, successflag: false});
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedEmployeeOption: selectedOption });
  }

  render() {
    const { leaveTypesData, successMsg } = this.props;
    // mapping leave types data to render as select
    // const leaveOptions = this.props.user.status !== 'Probation' ? leaveTypesData.map(type => {
    //   if (type.leave_type !== 'UNA') {
    //     return <option value={type.leave_type} key={type.leave_type_id}>{type.leave_type}</option>;
    //   }
    // }) : <option value="LOP" key="LOP">LOP</option>;
    const leaveOptions = leaveTypesData.map(type => {
      if (type.leave_type !== 'UNA') {
        return <option value={type.leave_type} key={type.leave_type_id}>{type.leave_type}</option>;
      }
    });
    // mapping employeesData data to render as select
    let employeesOptions = this.props.employeesData.filter(emp => {
      return (emp.status === 'Live' || emp.status === 'Probation');
    });
    employeesOptions = orderBy(employeesOptions, ['emp_firstname'], ['asc']).map(emp => {
      return { value: emp.emp_number, label: emp.emp_firstname + ' ' + emp.emp_lastname };
    });

    return (
      <div className={styles.myleaves}>
        <Helmet title="Home"/>
        <div className={styles.myleavesForm}>
          <form onSubmit={this.handleSubmit}>
             { successMsg && this.state.successflag ?
            <div className="row">
              <div className="col-lg-12">
                <Alert bsStyle={successMsg === 'Leave request submitted successfully' ? 'success' : 'danger' } onDismiss={this.handleAlertDismiss}>
                  <strong>{successMsg}.</strong>
                </Alert>
              </div>
            </div> : null}
            { this.state.errorAlertVisible ?
            <div className="row">
              <div className="col-lg-12">
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                  <strong>{this.state.ErrorMsg}.</strong>
                </Alert>
              </div>
            </div> : null}
            { this.props.user.team_name === 'HR & Admin' ?
              <div className="row">
                <div className="col-lg-12 form-group">
                  <label> Select employee:</label>
                  <div className={styles.employeesOptions}>
                    <Select
                      name="form-field-name"
                      value={this.state.selectedEmployeeOption}
                      onChange={this.handleChange}
                      options={employeesOptions}
                    />
                  </div>
                </div>
              </div> : null }
            <div className="row">
              <div className="col-lg-12 form-group">
                <label> Leave type:</label>
                <select ref={(input) => { this.LeavetypeInput = input; }} onChange={(event) => this.handleFieldChange(event, 'leave_type_id')} value={this.state.formData.leave_type_id}>
                  <option value="">Select type</option>
                  {leaveOptions}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 form-group">
                <label>From date:</label>
                <MuiThemeProvider>
                  <DatePicker
                    hintText="Choose a date"
                    mode="landscape"
                    textFieldStyle={{width: '100%'}}
                    className={styles.datePicker}
                    formatDate={this.formatDate}
                    ref={(input) => { this.FromdateInput = input; }}
                    value={this.state.from_date ? new Date(this.state.from_date) : null}
                    onChange={this.handleFDChange}
                    onDismiss={this.handleFDCacel}
                    minDate={this.props.user.team_name === 'HR & Admin' ? new Date(this.state.past_date) : new Date()}
                  />
                </MuiThemeProvider>
              </div>
              <div className="col-lg-6 form-group">
                <label>To date:</label>
                <MuiThemeProvider>
                  <DatePicker
                    hintText="Choose a date"
                    mode="landscape"
                    textFieldStyle={{width: '100%'}}
                    className={styles.datePicker}
                    formatDate={this.formatDate}
                    ref={(input) => { this.TodateInput = input; }}
                    value={this.state.to_date ? new Date(this.state.to_date) : null}
                    onChange={this.handleTDChange}
                    onDismiss={this.handleTDCacel}
                    dateFormat="YYYY-MM-DD"
                    minDate={new Date(this.state.from_date)}
                  />
                </MuiThemeProvider>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 form-group">
                <label>Reason:</label>
                <textarea
                  rows="3"
                  ref={(input) => { this.reason = input; }}
                  placeholder="Reason"
                  className="form-control"
                  onChange={(event) => this.handleFieldChange(event, 'reason')}
                  value={this.state.formData.reason}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <label />
                <Button bsStyle="primary" className="pull-right" onClick={this.handleSubmit} disabled={!this.state.submitBtnStatus}>Apply</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    leaveTypesLoaded: state.leaves.leaveTypesLoaded,
    leaveTypesData: state.leaves.leaveTypesData,
    access_token: state.home.user.access_token,
    reporting_to_id: state.home.user.reporting_to,
    successMsg: state.leaves.applyLeaveData.message,
    employeesData: state.home.employeesData,
    user: state.home.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(leaveActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyLeave);
