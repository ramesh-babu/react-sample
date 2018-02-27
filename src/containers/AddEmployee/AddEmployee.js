import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import { LinkContainer } from 'react-router-bootstrap';
import * as homeActions from 'redux/modules/home';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import styles from './AddEmployee.scss';

class AddEmployee extends Component {
  static propTypes = {
    user: PropTypes.object,
    addEmployee: PropTypes.func,
    access_token: PropTypes.string,
    reportingEmployeesData: PropTypes.array,
    teamsEmployeesData: PropTypes.array,
    rolesEmployeesData: PropTypes.array,
    getAllEmployees: PropTypes.func,
    getEmployeeRegion: PropTypes.func,
    getEmployeeRegionData: PropTypes.array,
    getReportingEmployees: PropTypes.func,
    getTeamsEmployees: PropTypes.func,
    getRolesEmployees: PropTypes.func,
    reportingEmployeesLoaded: PropTypes.bool,
    teamsEmployeesLoaded: PropTypes.bool,
    rolesEmployeesLoaded: PropTypes.bool,
    getEmployeeRegionLoaded: PropTypes.bool,
  }
  state = {
    alertVisible: false,
    successMsg: 'Employee details added successfully.',
    emp_firstname: '',
    emp_middle_name: '',
    emp_lastname: '',
    city_code: '',
    emp_birthday: moment(),
    emp_zipcode: '',
    coun_code: '',
    joined_date: moment(),
    emp_marital_status: '',
    emp_mobile: '',
    job_title: '',
    emp_blood_group: '',
    emp_street1: '',
    emp_street2: '',
    employee_id: '',
    emp_work_email: '',
    emp_gender: '',
    skype_id: '',
    skype_business_id: '',
    reporting_to: '',
    emp_status: 'Live',
    role_id: '',
    emp_team: '',
    emp_number: '0',
    access_token: this.props.access_token,
    check: 'ABC',
    emp_hm_telephone: '',
    flag: false,
  };
  componentWillMount() {
    if (this.props.user.team_name === 'HR & Admin') {
      if (!this.props.reportingEmployeesLoaded) {
        this.props.getReportingEmployees();
      }
      if (!this.props.teamsEmployeesLoaded) {
        this.props.getTeamsEmployees();
      }
      if (!this.props.rolesEmployeesLoaded) {
        this.props.getRolesEmployees();
      }
      if (!this.props.getEmployeeRegionLoaded) {
        this.props.getEmployeeRegion();
      }
    }
  }
  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : '',
    });
  }
  formatDate = (date) => {
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
  }
  handleSubmit = (event) => {
    // handling apply leave form data submit
    const atpos = this.state.emp_work_email.indexOf('@');
    const dotpos = this.state.emp_work_email.lastIndexOf('.');
    const re = /^[a-zA-Z0-9]*$/;
    if (isEmpty(this.state.employee_id)) {
      this.setState({alertVisible: true, successMsg: 'Eployee Id shoulde not be empty'});
      this.EmployeeIdInput.focus();
    } else if (!re.test(this.state.employee_id) || isEmpty(this.state.employee_id)) {
      this.setState({alertVisible: true, successMsg: 'Invalid Employee Id'});
      this.EmployeeIdInput.focus();
    } else if (isEmpty(this.state.emp_work_email)) {
      this.setState({alertVisible: true, successMsg: 'Work email shoulde not be empty'});
      this.emailInput.focus();
    } else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= this.state.emp_work_email.length) {
      this.setState({alertVisible: true, successMsg: 'Not a valid e-mail address'});
      this.emailInput.focus();
    } else if (isEmpty(this.state.emp_firstname)) {
      this.setState({alertVisible: true, successMsg: 'First name shoulde not be empty'});
      this.FirstnameInput.focus();
    } else if (isEmpty(this.state.emp_lastname)) {
      this.setState({alertVisible: true, successMsg: 'Last name shoulde not be empty'});
      this.LastnameInput.focus();
    } else if (isEmpty(this.state.emp_birthday)) {
      this.setState({alertVisible: true, successMsg: 'Birth date shoulde not be empty'});
      this.DateofbirthInput.focus();
    } else if (isEmpty(this.state.emp_marital_status)) {
      this.setState({alertVisible: true, successMsg: 'Marital status shoulde not be empty'});
      this.MaritalstatusInput.focus();
    } else if (isEmpty(this.state.emp_mobile)) {
      this.setState({alertVisible: true, successMsg: 'Mobile number shoulde not be empty'});
      this.MobilenumberInput.focus();
    } else if (isEmpty(this.state.job_title)) {
      this.setState({alertVisible: true, successMsg: 'Designation shoulde not be empty'});
      this.DesignationInput.focus();
    } else if (isEmpty(this.state.emp_blood_group)) {
      this.setState({alertVisible: true, successMsg: 'Blood group shoulde not be empty'});
      this.BloodgroupInput.focus();
    } else if (isEmpty(this.state.coun_code)) {
      this.setState({alertVisible: true, successMsg: 'Country shoulde not be empty'});
      this.CountryInput.focus();
    } else if (isEmpty(this.state.joined_date)) {
      this.setState({alertVisible: true, successMsg: 'Joined date shoulde not be empty'});
      this.JoineddateInput.focus();
    } else if (isEmpty(this.state.emp_gender)) {
      this.setState({alertVisible: true, successMsg: 'Gender shoulde not be empty'});
      this.GenderInput.focus();
    } else if (isEmpty(this.state.emp_zipcode)) {
      this.setState({alertVisible: true, successMsg: 'Zip code shoulde not be empty'});
      this.ZipcodeInput.focus();
    } else if (isEmpty(this.state.emp_team)) {
      this.setState({alertVisible: true, successMsg: 'Team name shoulde not be empty'});
      this.TeamnameInput.focus();
    } else if (isEmpty(this.state.reporting_to)) {
      this.setState({alertVisible: true, successMsg: 'Reporting shoulde not be empty'});
      this.ReportingInput.focus();
    } else if (isEmpty(this.state.role_id)) {
      this.setState({alertVisible: true, successMsg: 'Role shoulde not be empty'});
      this.RoleInput.focus();
    } else if (isEmpty(this.state.emp_street1)) {
      this.setState({alertVisible: true, successMsg: 'Address shoulde not be empty'});
      this.PresentaddressInput.focus();
    } else if (isEmpty(this.state.emp_status)) {
      this.setState({alertVisible: true, successMsg: 'Status shoulde not be empty'});
      this.StatusInput.focus();
    } else if (isNaN(this.state.emp_mobile)) {
      this.setState({alertVisible: true, successMsg: 'Invalid Mobile Number'});
      this.MobilenumberInput.focus();
    } else if (isNaN(this.state.emp_zipcode)) {
      this.setState({alertVisible: true, successMsg: 'Invalid Zip Code'});
      this.ZipcodeInput.focus();
    } else {
      const empData = this.state;
      empData.skype_business_id = this.state.emp_work_email;
      this.props.addEmployee(empData).then((res) => {
        this.setState({alertVisible: true, successMsg: res.message});
        if (res.message === 'Employee details added successfully') {
          this.setState({
            flag: true,
            emp_firstname: '',
            emp_middle_name: '',
            emp_lastname: '',
            city_code: '',
            emp_birthday: moment(),
            emp_zipcode: '',
            coun_code: '',
            joined_date: moment(),
            emp_marital_status: '',
            emp_mobile: '',
            job_title: '',
            emp_blood_group: '',
            emp_street1: '',
            emp_street2: '',
            employee_id: '',
            emp_work_email: '',
            emp_gender: '',
            skype_id: '',
            skype_business_id: '',
            reporting_to: '',
            emp_status: 'Live',
            role_id: '',
            emp_team: '',
            emp_number: '',
            check: '',
            nation_id: '',
          });
          this.props.getAllEmployees();
        }
      });
      event.preventDefault();
    }
  }
  validateEmployeeId = (event) => {
    const re = /[\sa-zA-Z0-9]+/g;
    if (!re.test(event.key)) {
      event.preventDefault();
    }
  }
  validateMethod = (event) => {
    const re = /[\sa-zA-Z']+/g;
    if (!re.test(event.key)) {
      event.preventDefault();
    }
  }
  validateNumberMethod = (event) => {
    const re = /[0-9]+/g;
    if (!re.test(event.key)) {
      event.preventDefault();
    }
  }
  validateMobileNumberMethod = (event) => {
    const re = /[+0-9]+/g;
    if (!re.test(event.key)) {
      event.preventDefault();
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
  handleDOBChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ emp_birthday: selectedDate });
  }
  handleDOJChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ joined_date: selectedDate });
  }
  handleDateChange = (date, key) => {
    const value = !isEmpty(date) ? moment(date).format('YYYY-MM-DD') : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : '',
    });
  }
  handleAlertDismiss = () => {
    // to close success alert message
    this.setState({alertVisible: false});
  }
  render() {
    const { reportingEmployeesData, teamsEmployeesData, rolesEmployeesData, getEmployeeRegionData } = this.props;
    const reportingToOptions = reportingEmployeesData.map(item => {
      return <option value={item.employee_id} key={item.emp_number}>{item.emp_firstname} {item.emp_lastname}</option>;
    });

    const teamsToOptions = teamsEmployeesData.map(item => {
      return <option value={item.team_name} key={item.team_name}>{item.team_name}</option>;
    });
    const rolesToOptions = rolesEmployeesData.map(item => {
      return <option value={item.role_id} key={item.role_name}>{item.role_name}</option>;
    });
    const regionToOptions = getEmployeeRegionData.map(item => {
      return <option value={item.nation_id} key={item.nation_name}>{item.nation_name}</option>;
    });
    // mapping leave types data to render as select
    return (
      <div className={styles.addEmp}>
      <div className="container">
      <div className="row addEmpTitle">
        <div className="col-lg-12">
          <h4>Add Employee Details</h4>
        </div>
      </div>
      <div className={styles.addEmpForm}>
      <form onSubmit={this.handleSubmit}>
        { this.state.alertVisible ?
        <div className="row">
          <div className="col-lg-12">
            <Alert bsStyle={this.state.flag ? 'success' : 'danger'} onDismiss={this.handleAlertDismiss}>
              <strong>{this.state.successMsg}.</strong>
            </Alert>
          </div>
        </div> : null
        }
        <div className="row">
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Employee id:</label>
           <input
            type="text"
            maxLength="10"
            placeholder="Employee id"
            value={this.state.employee_id}
            onKeyPress={(event) => this.validateEmployeeId(event)}
            onChange={(event) => this.handleFieldChange(event, 'employee_id')}
            ref={(input) => { this.EmployeeIdInput = input; }}
           />
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Work email:</label>
           <input
             className="form-control"
             placeholder="Work email"
             value={this.state.emp_work_email}
             onChange={(event) => this.handleFieldChange(event, 'emp_work_email')}
             ref={(input) => { this.emailInput = input; }}
            />
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> First name:</label>
           <input
              type="text"
              maxLength="60"
              data-validation="alphanumeric"
              placeholder="First name"
              value={this.state.emp_firstname}
              onKeyPress={(event) => this.validateMethod(event)}
              min="2"
              onChange={(event) => this.handleFieldChange(event, 'emp_firstname')}
              ref={(input) => { this.FirstnameInput = input; }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 form-group">
            <label>Middle name:</label>
           <input
            type="text"
            maxLength="60"
            value={this.state.emp_middle_name}
            placeholder="Middle name"
            onKeyPress={(event) => this.validateMethod(event)}
            onChange={(event) => this.handleFieldChange(event, 'emp_middle_name')}
           />
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Last name:</label>
             <input
              type="text"
              maxLength="60"
              value={this.state.emp_lastname}
              placeholder="Last name"
              onKeyPress={(event) => this.validateMethod(event)}
              onChange={(event) => this.handleFieldChange(event, 'emp_lastname')}
              ref={(input) => { this.LastnameInput = input; }}
             />
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Date of birth:</label>
            <MuiThemeProvider>
              <DatePicker
                hintText="Choose a date"
                mode="landscape"
                textFieldStyle={{width: '100%'}}
                className={styles.datePicker}
                formatDate={this.formatDate}
                value={this.state.emp_birthday ? new Date(this.state.emp_birthday) : new Date()}
                onChange={this.handleDOBChange}
                maxDate={new Date()}
                ref={(input) => { this.DateofbirthInput = input; }}
              />
            </MuiThemeProvider>
            {/* <DatePicker
              dateFormat="YYYY-MM-DD" name="emp_birthday"
              onChange={(date) => this.handleDateChange(date, 'emp_birthday')}
              maxDate={moment()}
              value={moment(this.state.emp_birthday).format('MM-DD-YYYY') === 'Invalid date' ? '' :
                moment(this.state.emp_birthday).format('MM-DD-YYYY')
              }
            /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Marital status:</label>
            <select ref={(input) => { this.MaritalstatusInput = input; }} onChange={(event) => this.handleFieldChange(event, 'emp_marital_status')} value={this.state.emp_marital_status}>
              <option value="">--Select--</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Mobile number:</label>
           <input
             className="form-control"
             placeholder="Mobile number"
             value={this.state.emp_mobile}
             maxLength="13"
             type="text"
             onKeyPress={(event) => this.validateMobileNumberMethod(event)}
             onChange={(event) => this.handleFieldChange(event, 'emp_mobile')}
             ref={(input) => { this.MobilenumberInput = input; }}
            />
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Designation:</label>
           <input
            type="text"
            placeholder="Designation"
            value={this.state.job_title}
            onChange={(event) => this.handleFieldChange(event, 'job_title')}
            ref={(input) => { this.DesignationInput = input; }}
           />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Blood group:</label>
           <select ref={(input) => { this.BloodgroupInput = input; }} onChange={(event) => this.handleFieldChange(event, 'emp_blood_group')} value={this.state.emp_blood_group}>
              <option value="">--Select--</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="A1+">A1+</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
           </select>
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span>Country:</label>
           <input
            type="text"
            maxLength="20"
            placeholder="Country"
            value={this.state.coun_code}
            onChange={(event) => this.handleFieldChange(event, 'coun_code')}
            ref={(input) => { this.CountryInput = input; }}
           />
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Joined date:</label>
            <MuiThemeProvider>
              <DatePicker
                hintText="Choose a date"
                mode="landscape"
                textFieldStyle={{width: '100%'}}
                className={styles.datePicker}
                formatDate={this.formatDate}
                value={this.state.joined_date ? new Date(this.state.joined_date) : new Date()}
                onChange={this.handleDOJChange}
                minDate={new Date(this.state.emp_birthday)}
                maxDate={new Date()}
                ref={(input) => { this.JoineddateInput = input; }}
              />
            </MuiThemeProvider>
            {/* <DatePicker
              dateFormat="YYYY-MM-DD"
              name="joined_date"
              onChange={(date) => this.handleDateChange(date, 'joined_date')}
              maxDate={moment()}
              value={moment(this.state.joined_date).format('MM-DD-YYYY') === 'Invalid date' ? '' :
                moment(this.state.joined_date).format('MM-DD-YYYY')}
            /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Status:</label>
            <select ref={(input) => { this.StatusInput = input; }} onChange={(event) => this.handleFieldChange(event, 'emp_status')} value={this.state.emp_status}>
              <option value="">--Status--</option>
              <option value="Live">Live</option>
              <option value="Resigned">Resigned</option>
              <option value="Terminated">Terminated</option>
              <option value="Absconded">Absconded</option>
              <option value="Probation">Probation</option>
            </select>
          </div>
          <div className="col-lg-4 form-group">
            <label>City:</label>
           <input
            type="text"
            placeholder="City"
            value={this.state.city_code}
            onKeyPress={(event) => this.validateMethod(event)}
            onChange={(event) => this.handleFieldChange(event, 'city_code')}
            />
          </div>
          <div className="col-lg-4 form-group">
            <label>Home telephone:</label>
             <input
              className="form-control"
              value={this.state.emp_hm_telephone}
              placeholder="Home telephone"
              maxLength="13"
              type="text"
              onKeyPress={(event) => this.validateMobileNumberMethod(event)}
              onChange={(event) => this.handleFieldChange(event, 'emp_hm_telephone')}
             />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Gender:</label>
             <select ref={(input) => { this.GenderInput = input; }} onChange={(event) => this.handleFieldChange(event, 'emp_gender')} value={this.state.emp_gender}>
              <option value="">--Select--</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Zip code:</label>
             <input
              className="form-control"
              ref={(input) => { this.ZipcodeInput = input; }}
              value={this.state.emp_zipcode}
              placeholder="Zip code"
              type="text"
              maxLength="6"
              onKeyPress={(event) => this.validateNumberMethod(event)}
              onChange={(event) => this.handleFieldChange(event, 'emp_zipcode')}
             />
          </div>
          <div className="col-lg-4 form-group">
            <label>Skype id:</label>
           <input
             className="form-control"
             placeholder="Skype id"
             value={this.state.skype_id}
             onChange={(event) => this.handleFieldChange(event, 'skype_id')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Team name:</label>
             <select ref={(input) => { this.TeamnameInput = input; }} onChange={(event) => this.handleFieldChange(event, 'emp_team')} value={this.state.emp_team}>
              <option value="">--Select teams--</option>
              {teamsToOptions}
            </select>
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Reporting to:</label>
            <select ref={(input) => { this.ReportingInput = input; }} onChange={(event) => this.handleFieldChange(event, 'reporting_to')} value={this.state.reporting_to}>
              <option value="">--Select reporting person--</option>
              {reportingToOptions}
            </select>
          </div>
          <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Role id:</label>
             <select ref={(input) => { this.RoleInput = input; }} onChange={(event) => this.handleFieldChange(event, 'role_id')} value={this.state.role_id}>
              <option value="">--Select roles--</option>
              {rolesToOptions}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 form-group">
            <label>Skype bussiness id:</label>
             <input
              className="form-control"
              value={this.state.emp_work_email}
              placeholder="Skype bussiness id"
             />
          </div>
           <div className="col-lg-4 form-group">
            <label><span className="error">*</span> Region:</label>
             <select onChange={(event) => this.handleFieldChange(event, 'nation_id')} value={this.state.nation_id}>
              <option value="">--Select region--</option>
              {regionToOptions}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 form-group">
            <label><span className="error">*</span> Present address:</label>
            <textarea
              rows="3"
              ref="Present_Address"
              placeholder="Present address"
              className="form-control"
              onChange={(event) => this.handleFieldChange(event, 'emp_street1')}
              value={this.state.emp_street1}
              ref={(input) => { this.PresentaddressInput = input; }}
            />
          </div>
        </div><br/>
        { this.state.alertVisible ?
        <div className="row">
          <div className="col-lg-12">
            <Alert bsStyle={this.state.flag ? 'success' : 'danger'} onDismiss={this.handleAlertDismiss}>
              <strong>{this.state.successMsg}.</strong>
            </Alert>
          </div>
        </div> : null
        }
        <div className="row">
          <div className="col-lg-6">
            <label />
            <LinkContainer to="/directory">
              <Button bsStyle="primary" className="pull-left">Cancel</Button>
            </LinkContainer>
          </div>
          <div className="col-lg-6">
            <label />
            <Button bsStyle="primary" className="pull-right" onClick={this.handleSubmit} disabled={isEmpty(this.state.check)}>Add</Button>
          </div>
        </div>
      </form>
      </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    access_token: state.home.user.access_token,
    reportingEmployeesData: state.home.reportingEmployeesData,
    teamsEmployeesData: state.home.teamsEmployeesData,
    rolesEmployeesData: state.home.rolesEmployeesData,
    getEmployeeRegionData: state.home.getEmployeeRegionData,
    user: state.home.user,
    reportingEmployeesLoaded: state.home.reportingEmployeesLoaded,
    teamsEmployeesLoaded: state.home.teamsEmployeesLoaded,
    rolesEmployeesLoaded: state.home.rolesEmployeesLoaded,
    getEmployeeRegionLoaded: state.home.getEmployeeRegionLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(homeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);
