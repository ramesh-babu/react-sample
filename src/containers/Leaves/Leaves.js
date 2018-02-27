import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import styles from './Leaves.scss';
import * as leaveActions from 'redux/modules/leaves';
import { bindActionCreators } from 'redux';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Modal from 'react-bootstrap/lib/Modal';
import { TeamLeavesReport } from 'components';
import { Myleaves, Teamleaves, ApplyLeave } from 'containers';

class Leaves extends Component {
  static propTypes = {
    userData: PropTypes.shape({
      job_title: PropTypes.string,
      team_name: PropTypes.string
    }),
    getTeamLeavesReport: PropTypes.func,
    teamLeavesReportData: PropTypes.array,
    teamLeavesReportLoaded: PropTypes.bool,
  }

  state = {
    applyLeaveFlag: false,
  };

  componentWillMount() {
    if (!this.props.teamLeavesReportLoaded) {
      this.props.getTeamLeavesReport();
    }
  }

  applyLeaveRequest = () => {
    this.setState({applyLeaveFlag: true});
  };

  handleAddItRequestModelClose = () => {
    this.setState({applyLeaveFlag: false});
  };

  render() {
    const { userData } = this.props;
    return (
      <div className={styles.myleaves}>
        <Helmet title="Home"/>
        <div className="container">
          <div className="topActions">
            <Button bsStyle="primary" className="pull-right" onClick={this.applyLeaveRequest}>
              <Glyphicon glyph="plus" /> Apply Leave
            </Button>
          </div>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="My Leaves">
              <Myleaves />
            </Tab>
            { userData.job_role === 'Admin' ?
              <Tab eventKey={2} title="Team Leaves">
                <Teamleaves />
              </Tab> : null }
            { userData.job_role === 'Admin' ?
              <Tab eventKey={3} title="Leave Balance Report">
                <TeamLeavesReport teamLeavesReportData={this.props.teamLeavesReportData} teamLeavesReportLoaded={this.props.teamLeavesReportLoaded} />
              </Tab> : null }
          </Tabs>
          {
            this.state.applyLeaveFlag ?
            <Modal bsSize="lg" show onHide={this.handleAddItRequestModelClose}>
              <Modal.Header closeButton className="modelHeader">
                <Modal.Title>Apply Leave</Modal.Title>
              </Modal.Header>
              <Modal.Body className="styles.modelBody">
                <ApplyLeave />
              </Modal.Body>
            </Modal> : null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.home.user,
    teamLeavesReportData: state.leaves.teamLeavesReportData,
    teamLeavesReportLoaded: state.leaves.teamLeavesReportLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(leaveActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaves);
