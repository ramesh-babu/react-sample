import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import dateFormat from 'dateformat';
import Table from 'react-bootstrap/lib/Table';
import styles from './Teamleaves.scss';
import * as leaveActions from 'redux/modules/leaves';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { Alert } from 'react-bootstrap';
import { LoadingIndicator, LeaveDetailModel } from 'components';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['emp_firstname', 'from_date', 'to_date', 'leave_description', 'no_of_days', 'leave_type', 'leave_status'];

class Teamleaves extends Component {
  static propTypes = {
    teamLeavesLoading: PropTypes.bool,
    teamLeavesLoaded: PropTypes.bool,
    teamLeavesData: PropTypes.array,
    getTeamLeaves: PropTypes.func,
    updateLeaveStatus: PropTypes.func,
    deleteLeaveRequest: PropTypes.func,
    access_token: PropTypes.string,
  }

  state = {
    empData: [],
    viewLeaveInfoFlag: false,
    selectedLeaveData: null,
    successMsg: null,
    alertVisible: false,
    searchVal: ''
  };

  componentWillMount() {
    if (!this.props.teamLeavesLoaded) {
      this.props.getTeamLeaves().then(res => {
        this.setState({empData: res.data });
      });
    } else {
      this.setState({empData: this.props.teamLeavesData });
    }
  }

  viewLeaveInfo = (leave) => {
    this.setState({
      viewLeaveInfoFlag: true,
      selectedLeaveData: leave,
    });
  };

  handleLeaveModelClose = () => {
    this.setState({ viewLeaveInfoFlag: false });
  };

  updateLeave = (statusId, leaveId, message) => {
    const data = {
      status_id: statusId,
      leave_id: leaveId,
      message,
      access_token: this.props.access_token
    };
    this.props.updateLeaveStatus(data).then((response) => {
      this.setState({viewLeaveInfoFlag: false, successMsg: response.message, alertVisible: true, searchVal: null });
      this.props.getTeamLeaves().then(res => {
        this.setState({empData: res});
      });
    });
  }

  deleteLeave = (leaveId) => {
    const data = {
      leave_id: '' + leaveId,
      access_token: this.props.access_token
    };
    this.props.deleteLeaveRequest(data).then((response) => {
      this.setState({viewLeaveInfoFlag: false, successMsg: response.message, alertVisible: true});
      this.props.getTeamLeaves();
    });
  }

  handleAlertDismiss = () => {
    this.setState({successMsg: null, alertVisible: false});
  }

  searchUpdated = (term) => {
    const filteredData = this.props.teamLeavesData.filter(createFilter(term, KEYS_TO_FILTERS));
    this.setState({empData: filteredData, searchVal: term});
  };

  render() {
    if (!this.props.teamLeavesLoaded) {
      return <LoadingIndicator />;
    }
    const teamLeavesContent = this.state.empData ? this.state.empData.map((leave, index) => (
      <tr key={leave.leave_id} onClick={()=>this.viewLeaveInfo(leave)}>
        <td>{index + 1}</td>
        <td>{leave.emp_firstname}</td>
        <td>{dateFormat(leave.from_date, 'mmm dd, yyyy')}</td>
        <td>{dateFormat(leave.to_date, 'mmm dd, yyyy')}</td>
        <td>{leave.leave_description.substring(0, 75)}</td>
        <td className="centered">{leave.no_of_days}</td>
        <td className="centered">{leave.leave_type === 'UNA' ? 'UAL' : leave.leave_type}</td>
        <td>{leave.leave_status}</td>
      </tr>
    )) : null;
    return (
      <div className={styles.teamleaves}>
        <Helmet title="Home"/>
        <div>
          {(!isEmpty(this.state.successMsg) && this.state.alertVisible) &&
            <div className="row">
              <div className="col-lg-12">
                <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                  <strong>{this.state.successMsg}</strong>
                </Alert>
              </div>
            </div>}
          <SearchInput value={this.state.searchVal} className="search-input" onChange={this.searchUpdated} />
          <Table responsive className="table-hover table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Applied By</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th className="centered"># Days</th>
                <th className="centered">Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              { teamLeavesContent.length ?
                teamLeavesContent :
                <tr>
                  <td colSpan="8">No data found.</td>
                </tr>
              }
            </tbody>
          </Table>
        </div>
        {
          this.state.viewLeaveInfoFlag ?
          <LeaveDetailModel
            title="Leave Details"
            onHide={this.handleLeaveModelClose}
            show
            leaveDetails={this.state.selectedLeaveData}
            updateLeave={this.updateLeave}
            deleteLeave={this.deleteLeave}
            admin
          /> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teamLeavesLoading: state.leaves.teamLeavesLoading,
    teamLeavesLoaded: state.leaves.teamLeavesLoaded,
    teamLeavesData: state.leaves.teamLeavesData,
    access_token: state.home.user.access_token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(leaveActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Teamleaves);
