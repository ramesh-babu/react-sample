import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Alert } from 'react-bootstrap';
import styles from './Home.scss';
import * as homeActions from 'redux/modules/home';
import * as leaveActions from 'redux/modules/leaves';
import * as holidaysActions from 'redux/modules/holidays';
import { bindActionCreators } from 'redux';
import { flattenDeep, concat, map, toUpper } from 'lodash';
import CircularProgressbar from 'react-circular-progressbar';
import { LeaveDetailModel, TodayBirthdays, ThisMonthBirthdays, LoadingIndicator } from 'components';
import { Doughnut, HorizontalBar, Pie } from 'react-chartjs-2';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class Home extends Component {
  static propTypes = {
    access_token: PropTypes.string,
    user: PropTypes.object,
    userLoaded: PropTypes.bool,
    employeedetails: PropTypes.func,
    myLeavesLoading: PropTypes.bool,
    myLeavesLoaded: PropTypes.bool,
    myLeavesData: PropTypes.array,
    getMyLeaves: PropTypes.func,
    myLeaveBalanceLoaded: PropTypes.bool,
    myLeaveBalanceData: PropTypes.object,
    getMyLeaveBalance: PropTypes.func,
    holidaysLoaded: PropTypes.bool,
    holidaysData: PropTypes.array,
    getHolidays: PropTypes.func,
    employeesLoaded: PropTypes.bool,
    employeesData: PropTypes.array,
    getAllEmployees: PropTypes.func,
    teamLeavesLoaded: PropTypes.bool,
    getTeamLeaves: PropTypes.func,
    teamLeavesData: PropTypes.array,
    leaveTypesLoaded: PropTypes.bool,
    getLeaveTypes: PropTypes.func,
    leaveTypesData: PropTypes.array,
    deviceDetailsLoaded: PropTypes.bool,
    getDeviceDetails: PropTypes.func,
    deviceDetails: PropTypes.array,
    teamCountLoaded: PropTypes.bool,
    getTeamCount: PropTypes.func,
    teamCount: PropTypes.array,
    bloodGroupsLoaded: PropTypes.bool,
    getBloodGroups: PropTypes.func,
    bloodGroups: PropTypes.array,
    monthJoineesLoaded: PropTypes.bool,
    getMonthJoinees: PropTypes.func,
    monthJoinees: PropTypes.array,
    deleteLeaveRequest: PropTypes.func,
  }

  state = {
    viewLeaveInfoFlag: false,
    selectedLeaveData: null,
    successMsg: null,
    alertVisible: false,
  };

  componentWillMount() {
    if (!this.props.userLoaded) {
      this.props.employeedetails();
    }
    if (!this.props.myLeavesLoaded) {
      this.props.getMyLeaves();
    }
    if (!this.props.teamLeavesLoaded && this.props.user.job_role === 'Admin') {
      this.props.getTeamLeaves();
    }
    if (!this.props.myLeaveBalanceLoaded && this.props.user.status === 'Live') {
      this.props.getMyLeaveBalance();
    }
    if (!this.props.holidaysLoaded) {
      this.props.getHolidays();
    }
    if (!this.props.employeesLoaded) {
      this.props.getAllEmployees();
    }
    if (!this.props.leaveTypesLoaded) {
      this.props.getLeaveTypes();
    }
    if (!this.props.deviceDetailsLoaded) {
      this.props.getDeviceDetails();
    }
    if (!this.props.teamCountLoaded) {
      this.props.getTeamCount();
    }
    if (!this.props.bloodGroupsLoaded) {
      this.props.getBloodGroups();
    }
    if (!this.props.monthJoineesLoaded) {
      this.props.getMonthJoinees();
    }
  }

  handleEvent = (event) => {
    if (event.type === 'leave') {
      this.viewLeaveInfo(event.obj);
    }
  };

  viewLeaveInfo = (leave) => {
    this.setState({
      viewLeaveInfoFlag: true,
      selectedLeaveData: leave,
    });
  };

  handleLeaveModelClose = () => {
    this.setState({ viewLeaveInfoFlag: false });
  };

  eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.bgColor,
      color: '#FFFFFF'
    };
    if (event.obj) {
      if (toUpper(event.obj.leave_type) === 'CASUAL') {
        style.backgroundColor = '#5058b9';
      } else if (toUpper(event.obj.leave_type) === 'SICK') {
        style.backgroundColor = '#e06a67';
      } else if (toUpper(event.obj.leave_type) === 'EARNED') {
        style.backgroundColor = '#6fb950';
      } else if (toUpper(event.obj.leave_type) === 'UNA') {
        style.backgroundColor = '#f25454';
      }
    }
    return {
      style: style
    };
  };
  deleteLeave = (leaveId) => {
    const data = {
      leave_id: '' + leaveId,
      access_token: this.props.access_token
    };
    this.props.deleteLeaveRequest(data).then((response) => {
      this.setState({
        viewLeaveInfoFlag: false,
        successMsg: response.message,
        alertVisible: true,
      });
      this.props.getMyLeaves();
    });
  }
  handleAlertDismiss = () => {
    this.setState({successMsg: null, alertVisible: false});
  }
  render() {
    if (!this.props.myLeavesLoaded) {
      return <LoadingIndicator />;
    }
    const show = false;
    const date = new Date();
    const todayBirthdays = this.props.employeesData.filter(employee => {
      const employeeBirthday = new Date(employee.emp_birthday);
      return (date.getMonth() === employeeBirthday.getMonth() && date.getDate() === employeeBirthday.getDate() && (employee.status === 'Live' || employee.status === 'Probation'));
    });
    const thisMonthBirthdays = this.props.employeesData.filter(employee => {
      const employeeBirthday = new Date(employee.emp_birthday);
      return (date.getMonth() === employeeBirthday.getMonth() && date.getDate() < employeeBirthday.getDate() && (employee.status === 'Live' || employee.status === 'Probation'));
    });
    const myLeaves = this.props.myLeavesData.map(leave => {
      const start = new Date(leave.from_date);
      const end = new Date(leave.to_date);
      return {
        'title': leave.leave_description,
        'start': new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0),
        'end': new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59),
        'bgColor': '#f28954',
        'type': 'leave',
        'obj': leave
      };
    });
    const teamLeaves = this.props.teamLeavesData.map(leave => {
      const start = new Date(leave.from_date);
      const end = new Date(leave.to_date);
      return {
        'title': leave.emp_firstname + ' ' + leave.emp_lastname,
        'start': new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0),
        'end': new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59),
        'bgColor': '#f28954',
        'type': 'leave',
        'obj': leave
      };
    });
    const myHolidays = this.props.holidaysData.map(nHolidays => {
      return nHolidays.holidays.map(holiday => {
        const hDate = new Date(holiday.holiday_date);
        return {
          'title': holiday.holiday_name,
          'start': new Date(hDate.getFullYear(), hDate.getMonth(), hDate.getDate()),
          'end': new Date(hDate.getFullYear(), hDate.getMonth(), hDate.getDate()),
          'bgColor': '#417ac8',
          'type': 'holiday'
        };
      });
    });
    const eventsData = concat(myLeaves, teamLeaves, flattenDeep(myHolidays));
    const backgroundColor = ['#FF6384', '#36A2EB', '#FFCE56', '#5058b9', '#e06a67', '#6fb950'];
    const deviceDetailsData = {
      labels: map(this.props.deviceDetails, 'os'),
      datasets: [{
        data: map(this.props.deviceDetails, 'count'),
        backgroundColor: backgroundColor,
        hoverBackgroundColor: backgroundColor
      }]
    };

    const teamCountData = {
      labels: map(this.props.teamCount, 'team_name'),
      datasets: [
        {
          label: 'Team Count',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: map(this.props.teamCount, 'team_count')
        }
      ]
    };
    const bloodGroupsData = {
      labels: map(this.props.bloodGroups, 'blood_group'),
      datasets: [{
        data: map(this.props.bloodGroups, 'count'),
        backgroundColor: backgroundColor,
        hoverBackgroundColor: backgroundColor
      }]
    };

    const monthJoineesData = {
      labels: map(this.props.monthJoinees, 'joined_month'),
      datasets: [
        {
          label: 'Joinees Count',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: map(this.props.monthJoinees, 'employee_count')
        }
      ]
    };

    const leaveBalanceTotal = this.props.myLeaveBalanceData.leave_types.map((item, index) => {
      return (<li key={index}>
        {item.type}
        <span className="totalCount">{item.total || 0}</span>
      </li>);
    });
    const leaveBalance = this.props.myLeaveBalanceData.leave_types.map((item, index) => {
      return (<li key={index} className="row">
        {item.type}
        <span className="totalCount">{item.remaining || 0}</span>
      </li>);
    });
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          {(!isEmpty(this.state.successMsg) && this.state.alertVisible) &&
            <div className="row">
              <div className="col-lg-12">
                <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                  <strong>{this.state.successMsg}</strong>
                </Alert>
              </div>
            </div>}
          <div className="row top-buffer">
            <div className="col-lg-9 col-md-9">
              <BigCalendar
                events={eventsData}
                popup
                popupOffset={{x: 30, y: 20}}
                selectable
                onSelectEvent={event => this.handleEvent(event)}
                eventPropGetter={(this.eventStyleGetter)}
                views={['month', 'week', 'day']}
              />
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="row height-full" data-plugin="matchHeight">
                { this.props.user.status === 'Live' ?
                  <div className="col-lg-12">
                    <div className="widget">
                      <div className="widget-header">
                        <h4>Leave Summary</h4>
                      </div>
                      <div className="widget-content">
                        <ul>
                          <li className="headTotal"><b>Total Leaves</b>
                            <span className="totalCount">
                              {this.props.myLeaveBalanceData.totalleaves || 0}
                            </span>
                          </li>
                          {leaveBalanceTotal}
                        </ul>
                        <ul>
                          <li className="headTotal"><b>Leave Balance</b>
                            <span className="totalCount">
                              {this.props.myLeaveBalanceData.totalleavesRemaining || 0}
                            </span>
                          </li>
                          {leaveBalance}
                          <li className="lossTotal">Loss of Pay
                            <span className="totalCount">{this.props.myLeaveBalanceData.lossOfPay ? '-' + this.props.myLeaveBalanceData.lossOfPay : 0}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> : null }
                { todayBirthdays.length || thisMonthBirthdays.length ?
                  <div className="col-lg-12">
                      {
                        todayBirthdays.length ?
                        <TodayBirthdays birthdays={todayBirthdays} /> : null
                      }
                      {
                        !todayBirthdays.length && thisMonthBirthdays.length ?
                        <ThisMonthBirthdays birthdays={thisMonthBirthdays} /> : null
                      }
                  </div> : null }
                { show ? <div className="col-lg-12">
                  <div className="widget widget-shadow widget-completed-options">
                    <div className="widget-content padding-20">
                      <div className="row">
                        <div className="col-xs-6">
                          <div className="counter text-left blue-grey-700">
                            <h4 className="counter-label margin-top-10">Casual Leaves
                            </h4>
                            <div className="counter-number font-size-40 margin-top-10">
                              {this.props.leaveTypesData[0].leave_count}
                              <small>/{this.props.leaveTypesData[0].leave_count}</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <CircularProgressbar percentage={(this.props.leaveTypesData[0].leave_count / this.props.leaveTypesData[0].leave_count) * 100} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> : null }
                { show ? <div className="col-lg-12">
                  <div className="widget widget-shadow widget-completed-options">
                    <div className="widget-content padding-20">
                      <div className="row">
                        <div className="col-xs-6">
                          <div className="counter text-left blue-grey-700">
                            <h4 className="counter-label margin-top-10">Sick Leaves
                            </h4>
                            <div className="counter-number font-size-40 margin-top-10">
                              {this.props.leaveTypesData[1].leave_count}
                              <small>/{this.props.leaveTypesData[1].leave_count}</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-6 text-danger">
                          <CircularProgressbar percentage={(this.props.leaveTypesData[1].leave_count / this.props.leaveTypesData[1].leave_count) * 100} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> : null }
                { show ? <div className="col-lg-12">
                  <div className="widget widget-shadow widget-completed-options">
                    <div className="widget-content padding-20">
                      <div className="row">
                        <div className="col-xs-6">
                          <div className="counter text-left blue-grey-700">
                            <h4 className="counter-label margin-top-10">Earned Leaves
                            </h4>
                            <div className="counter-number font-size-40 margin-top-10">
                              {this.props.leaveTypesData[2].leave_count}
                              <small>/{this.props.leaveTypesData[2].leave_count}</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-6 text-success">
                          <CircularProgressbar percentage={(this.props.leaveTypesData[2].leave_count / this.props.leaveTypesData[2].leave_count) * 100} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> : null }
              </div>
            </div>
          </div>
          {this.props.user.job_role === 'Admin' ?
          <div className="pieChatGroup">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="widget">
                  <div className="widget-header">
                    <h4>Installed Devices</h4>
                  </div>
                  <div className="widget-content">
                    <Doughnut data={deviceDetailsData} />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="widget">
                  <div className="widget-header">
                    <h4>Team Count</h4>
                  </div>
                  <div className="widget-content">
                    <HorizontalBar
                      data={teamCountData}
                      height={300}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row top-buffer">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="widget">
                  <div className="widget-header">
                    <h4>Joiness Count</h4>
                  </div>
                  <div className="widget-content">
                    <HorizontalBar
                      data={monthJoineesData}
                      height={300}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="widget">
                  <div className="widget-header">
                    <h4>Blood Groups</h4>
                  </div>
                  <div className="widget-content">
                    <Pie data={bloodGroupsData} />
                  </div>
                </div>
              </div>
            </div>
          </div> : null }
          {
            this.state.viewLeaveInfoFlag ?
            <LeaveDetailModel
              title="Leave Details"
              onHide={this.handleLeaveModelClose}
              show
              leaveDetails={this.state.selectedLeaveData}
              deleteLeave={this.deleteLeave}
            /> : null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    access_token: state.home.user.access_token,
    user: state.home.user,
    userLoaded: state.home.userLoaded,
    employeesData: state.home.employeesData,
    myLeavesLoading: state.leaves.myLeavesLoading,
    myLeavesLoaded: state.leaves.myLeavesLoaded,
    myLeavesData: state.leaves.myLeavesData,
    myLeaveBalanceLoaded: state.leaves.myLeaveBalanceLoaded,
    myLeaveBalanceData: state.leaves.myLeaveBalanceData,
    holidaysData: state.holidays.holidaysData,
    holidaysLoaded: state.holidays.holidaysLoaded,
    employeesLoaded: state.home.employeesLoaded,
    teamLeavesLoaded: state.leaves.teamLeavesLoaded,
    teamLeavesData: state.leaves.teamLeavesData,
    leaveTypesLoaded: state.leaves.leaveTypesLoaded,
    leaveTypesData: state.leaves.leaveTypesData,
    deviceDetailsLoaded: state.home.deviceDetailsLoaded,
    deviceDetails: state.home.deviceDetails,
    teamCountLoaded: state.home.teamCountLoaded,
    teamCount: state.home.teamCount,
    bloodGroupsLoaded: state.home.bloodGroupsLoaded,
    bloodGroups: state.home.bloodGroups,
    monthJoineesLoaded: state.home.monthJoineesLoaded,
    monthJoinees: state.home.monthJoinees,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(homeActions, dispatch),
    ...bindActionCreators(leaveActions, dispatch),
    ...bindActionCreators(holidaysActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
