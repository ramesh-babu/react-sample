import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button } from 'react-bootstrap';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import * as attendanceActions from 'redux/modules/attendance';
import dateFormat from 'dateformat';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import { map, uniq, filter } from 'lodash';
import styles from './AttendanceView.scss';

const todayDate = new Date();
const initialState = {
  team_name: null,
  emp_id: null,
  from_date: todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-01',
  to_date: todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate(),
  selectedTeamResources: []
};

class AttendanceView extends Component {

  static propTypes = {
    attendanceLoading: PropTypes.bool,
    attendanceLoaded: PropTypes.bool,
    attendanceData: PropTypes.array,
    getAttendanceData: PropTypes.func,
    employeesData: PropTypes.array,
    getEmpAttendanceReport: PropTypes.func,
    empAttendanceLoading: PropTypes.bool,
    empAttendanceLoaded: PropTypes.bool,
    empAttendanceData: PropTypes.object,
  };

  state = initialState;

  componentWillMount() {
    if (!this.props.attendanceLoaded) {
      this.props.getAttendanceData({emp_id: this.state.emp_id, from_date: this.state.from_date, to_date: this.state.to_date});
    }
  }

  handleFieldChange = (event, key) => {
    this.setState({
      ...this.state,
      [key]: event.target.value,
    });
  }

  handleTeamChange = (event, key) => {
    const tempResources = filter(this.props.employeesData, (item ) => item.team_name === event.target.value);
    this.setState({
      ...this.state,
      [key]: event.target.value,
      selectedTeamResources: tempResources,
    });
  }

  handleFromDateChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ from_date: selectedDate });
  }

  handleToDateChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ to_date: selectedDate });
  }

  handleSubmitFilter = () => {
    this.props.getAttendanceData({team_name: this.state.team_name, emp_id: this.state.emp_id, from_date: this.state.from_date, to_date: this.state.to_date});
    if (this.state.emp_id) {
      this.props.getEmpAttendanceReport({team_name: this.state.team_name, emp_id: this.state.emp_id, from_date: this.state.from_date, to_date: this.state.to_date});
    }
  }

  handleClearFilter = () => {
    this.setState({
      ...initialState
    });
    this.props.getAttendanceData(initialState);
    this.props.getEmpAttendanceReport(initialState);
  }

  render() {
    if (!this.props.attendanceLoaded) {
      return <LoadingIndicator />;
    }
    const attendanceContent = this.props.attendanceData.map((item, index) => (
        <tr key={index} className={`${item.attendance_inTime === '00:00:00' ? styles.list_absent : ''} ${item.attendance_inTime > '10:30:00' ? styles.list_late : ''}`}>
          <td>{item.employee_id}</td>
          <td>{item.emp_firstname} {item.emp_lastname}</td>
          <td>{item.attendance_date && item.attendance_date !== '0000-00-00' ? dateFormat(item.attendance_date, 'mmm dd, yyyy') : ''}</td>
          <td>{item.attendance_inTime}</td>
          <td>{item.attendance_outTime}</td>
          <td>{item.attendance_totalDuration}</td>
        </tr>
    ));
    const teamNames = uniq(map(this.props.employeesData, 'team_name'));
    const teamNameOptions = teamNames.map(item => {
      return <option value={item} key={item}>{item}</option>;
    });
    const reportingToOptions = this.state.selectedTeamResources.map(item => {
      return <option value={item.emp_number} key={item.emp_number}>{item.emp_firstname} {item.emp_lastname}</option>;
    });
    return (
      <div className={styles.home}>
        <div className={styles.attendanceView}>
          <div className="row topFilters">
            <form>
              <div className="col-lg-2">
                <label>From date:</label>
                <MuiThemeProvider>
                  <DatePicker
                    hintText="Choose a date"
                    mode="landscape"
                    textFieldStyle={{width: '100%'}}
                    className={styles.datePicker}
                    value={this.state.from_date ? new Date(this.state.from_date) : new Date()}
                    onChange={this.handleFromDateChange}
                    maxDate={new Date()}
                  />
                </MuiThemeProvider>
              </div>
              <div className="col-lg-2">
                <label>To date:</label>
                <MuiThemeProvider>
                  <DatePicker
                    hintText="Choose a date"
                    mode="landscape"
                    textFieldStyle={{width: '100%'}}
                    className={styles.datePicker}
                    value={this.state.to_date ? new Date(this.state.to_date) : new Date()}
                    onChange={this.handleToDateChange}
                    maxDate={new Date()}
                  />
                </MuiThemeProvider>
              </div>
              <div className="col-lg-3">
                <label>Select team:</label>
                <select onChange={(event) => this.handleTeamChange(event, 'team_name')} value={this.state.team_name}>
                  <option value="">--Select team--</option>
                  {teamNameOptions}
                </select>
              </div>
              <div className="col-lg-3">
                <label>Select employee:</label>
                <select onChange={(event) => this.handleFieldChange(event, 'emp_id')} value={this.state.emp_id}>
                  <option value="">--Select employee--</option>
                  {reportingToOptions}
                </select>
              </div>
              <div className="col-lg-1">
                <label>&nbsp;</label>
                <Button bsStyle="primary" onClick={this.handleSubmitFilter} >Filter</Button>
              </div>
              <div className="col-lg-1">
                <label>&nbsp;</label>
                <Button bsStyle="primary" onClick={this.handleClearFilter} >Clear</Button>
              </div>
            </form>
          </div>
          { this.props.empAttendanceData.employee_id !== null ?
            <div className="row">
              <div className="col-sm-3 widget widget-shadow">
                <h4 className="centered">Total days: {this.props.empAttendanceData.days}</h4>
              </div>
              <div className="col-sm-3 widget widget-shadow">
                <h4 className="centered">Worked days: {this.props.empAttendanceData.workingDays}</h4>
              </div>
              <div className="col-sm-3 widget widget-shadow">
                <h4 className="centered">Absent days: {this.props.empAttendanceData.absentDays}</h4>
              </div>
              <div className="col-sm-3 widget widget-shadow">
                <h4 className="centered">Late comings: {this.props.empAttendanceData.lateComings}<sub>(> 10.30 AM)</sub></h4>
              </div>
              <div className="col-sm-4 widget widget-shadow">
                <h4 className="centered">Total Work Duration: {this.props.empAttendanceData.workDuration}<sub>(HH:MM:SS)</sub></h4>
              </div>
              <div className="col-sm-4 widget widget-shadow">
                <h4 className="centered">Total Over Time: {this.props.empAttendanceData.overTime}<sub>(HH:MM:SS)</sub></h4>
              </div>
              <div className="col-sm-4 widget widget-shadow">
                <h4 className="centered">Total Duration: {this.props.empAttendanceData.totalDuration}<sub>(HH:MM:SS)</sub></h4>
              </div>
            </div> : null }
          <div className="row">
            <div className="col-sm-12">
            <Table responsive className="table-hover">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Total Duration</th>
                </tr>
              </thead>
              <tbody>
                {attendanceContent}
              </tbody>
            </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    attendanceData: state.attendance.attendanceData,
    attendanceLoaded: state.attendance.attendanceLoaded,
    attendanceLoading: state.attendance.attendanceLoading,
    employeesData: state.home.employeesData,
    empAttendanceData: state.attendance.empAttendanceData,
    empAttendanceLoaded: state.attendance.empAttendanceLoaded,
    empAttendanceLoading: state.attendance.empAttendanceLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(attendanceActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceView);
