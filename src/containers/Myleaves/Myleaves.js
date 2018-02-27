import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import styles from './Myleaves.scss';
import dateFormat from 'dateformat';
import * as leaveActions from 'redux/modules/leaves';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { Alert } from 'react-bootstrap';
import { LoadingIndicator, LeaveDetailModel } from 'components';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['from_date', 'to_date', 'leave_description', 'no_of_days', 'leave_type', 'leave_status'];

class Myleaves extends Component {
  static propTypes = {
    myLeavesLoading: PropTypes.bool,
    myLeavesLoaded: PropTypes.bool,
    myLeavesData: PropTypes.array,
    getMyLeaves: PropTypes.func,
    getTeamLeaves: PropTypes.func,
    deleteLeaveRequest: PropTypes.func,
    access_token: PropTypes.string,
  }

  state = {
    empData: [],
    viewLeaveInfoFlag: false,
    selectedLeaveData: null,
    successMsg: null,
    alertVisible: false,
  };

  componentWillMount() {
    if (!this.props.myLeavesLoaded) {
      this.props.getMyLeaves().then(res => {
        this.setState({empData: res });
      });
    } else {
      this.setState({empData: this.props.myLeavesData });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.myLeavesLoaded && !nextProps.myLeavesLoaded) {
      this.props.getMyLeaves().then(res => {
        this.setState({empData: res });
      });
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

  searchUpdated = (term) => {
    const filteredData = this.props.myLeavesData.filter(createFilter(term, KEYS_TO_FILTERS));
    this.setState({empData: filteredData});
  };
  deleteLeave = (leaveId) => {
    const data = {
      leave_id: '' + leaveId,
      access_token: this.props.access_token
    };
    this.props.deleteLeaveRequest(data).then((response) => {
      this.setState({viewLeaveInfoFlag: false, successMsg: response.message, alertVisible: true});
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
    const myLeavesContent = this.state.empData ? this.state.empData.map((leave, index) => (
      <tr key={leave.leave_id} onClick={()=>this.viewLeaveInfo(leave)}>
        <td>{index + 1}</td>
        <td>{dateFormat(leave.from_date, 'mmm dd, yyyy')}</td>
        <td>{dateFormat(leave.to_date, 'mmm dd, yyyy')}</td>
        <td>{leave.leave_description.substring(0, 100)}</td>
        <td className="centered">{leave.no_of_days}</td>
        <td className="centered">{leave.leave_type === 'UNA' ? 'UAL' : leave.leave_type}</td>
        <td>{leave.leave_status}</td>
      </tr>
    )) : null;
    return (
      <div className={styles.myleaves}>
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
          <SearchInput className="search-input" onChange={this.searchUpdated} />
          <Table responsive className="table-hover table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th className="centered"># Days</th>
                <th className="centered">Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              { myLeavesContent.length ?
                myLeavesContent :
                <tr>
                  <td colSpan="7">No data found.</td>
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
            deleteLeave={this.deleteLeave}
          /> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myLeavesLoading: state.leaves.myLeavesLoading,
    myLeavesLoaded: state.leaves.myLeavesLoaded,
    myLeavesData: state.leaves.myLeavesData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(leaveActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Myleaves);
