import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import styles from './ItRequests.scss';
import * as itrequestsActions from 'redux/modules/itrequests';
import { bindActionCreators } from 'redux';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { AssignedItRequests, MyItRequests, AddItRequestModel } from 'components';

class ItRequests extends Component {
  static propTypes = {
    allItRequestsLoading: PropTypes.bool,
    allItRequestsLoaded: PropTypes.bool,
    allItRequestsData: PropTypes.array,
    getAllItRequests: PropTypes.func,
    assignedItRequestsLoading: PropTypes.bool,
    assignedItRequestsLoaded: PropTypes.bool,
    assignedItRequestsData: PropTypes.array,
    getAssignedItRequests: PropTypes.func,
    requestTypesLoaded: PropTypes.bool,
    getRequestTypes: PropTypes.func,
    requestTypesData: PropTypes.array,
    requestPrioritiesLoaded: PropTypes.bool,
    getRequestPriorities: PropTypes.func,
    requestPrioritiesData: PropTypes.array,
    employeesData: PropTypes.array,
    user: PropTypes.object,
    submitItRequest: PropTypes.func,
    submitItRequestResponse: PropTypes.object,
    access_token: PropTypes.string,
    replyItRequest: PropTypes.func,
    replyItRequestLoaded: PropTypes.bool,
    replyItRequestResponse: PropTypes.object,
    deleteItRequest: PropTypes.func,
    getItRequestTypesManagers: PropTypes.func,
    getItRequestTypesManagersLoaded: PropTypes.bool,
  }

  state = {
    addItRequestFlag: false,
  };

  addItRequest = () => {
    this.setState({addItRequestFlag: true});
  };

  handleAddItRequestModelClose = () => {
    this.setState({addItRequestFlag: false});
  }

  handleSubmitItRequest = (data) => {
    const requestData = {
      ...data,
      access_token: this.props.access_token
    };
    this.props.submitItRequest(requestData).then(() => {
      this.props.getAllItRequests();
    });
  }

  handleReplyItRequest = (data) => {
    const itRequestData = {
      access_token: this.props.access_token,
      request_id: data.request_id,
      reply_msg: data.reply_msg,
      reply_status: data.reply_status
    };
    this.props.replyItRequest(itRequestData);
  }

  render() {
    return (
      <div className={styles.allItRequests}>
        <Helmet title="It Requests"/>
        <div className="container">
          <div className="pull-right">
            <Button bsStyle="primary" className="pull-right" onClick={this.addItRequest}>
              <Glyphicon glyph="plus" /> IT Request
            </Button>
          </div>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Assigned Requests">
              <AssignedItRequests
                assignedItRequestsLoading={this.props.assignedItRequestsLoading}
                assignedItRequestsLoaded={this.props.assignedItRequestsLoaded}
                assignedItRequestsData={this.props.assignedItRequestsData}
                getAssignedItRequests={this.props.getAssignedItRequests}
                replyItRequest={this.handleReplyItRequest}
                replyItRequestLoaded={this.props.replyItRequestLoaded}
                replyItRequestResponse={this.props.replyItRequestResponse}
                deleteItRequest={this.props.deleteItRequest}
              />
            </Tab>
            <Tab eventKey={2} title="My Requests">
              <MyItRequests
                myItRequestsLoading={this.props.allItRequestsLoading}
                myItRequestsLoaded={this.props.allItRequestsLoaded}
                myItRequestsData={this.props.allItRequestsData}
                getMyItRequests={this.props.getAllItRequests}
                deleteItRequest={this.props.deleteItRequest}
                replyItRequest={this.handleReplyItRequest}
                replyItRequestResponse={this.props.replyItRequestResponse}
                replyItRequestLoaded={this.props.replyItRequestLoaded}
              />
            </Tab>
          </Tabs>
          {
            this.state.addItRequestFlag ?
            <AddItRequestModel
              title="IT Request"
              onHide={this.handleAddItRequestModelClose}
              show
              requestTypesLoaded={this.props.requestTypesLoaded}
              getRequestTypes={this.props.getRequestTypes}
              requestTypesData={this.props.requestTypesData}
              requestPrioritiesLoaded={this.props.requestPrioritiesLoaded}
              getRequestPriorities={this.props.getRequestPriorities}
              requestPrioritiesData={this.props.requestPrioritiesData}
              employeesData={this.props.employeesData}
              submitItRequest={this.handleSubmitItRequest}
              submitItRequestResponse={this.props.submitItRequestResponse}
              user={this.props.user}
              getItRequestTypesManagers={this.props.getItRequestTypesManagers}
              getItRequestTypesManagersLoaded={this.props.getItRequestTypesManagersLoaded}
            /> : null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getItRequestTypesManagersData: state.itrequests.getItRequestTypesManagersData,
    allItRequestsLoading: state.itrequests.allItRequestsLoading,
    allItRequestsLoaded: state.itrequests.allItRequestsLoaded,
    allItRequestsData: state.itrequests.allItRequestsData,
    assignedItRequestsLoading: state.itrequests.assignedItRequestsLoading,
    assignedItRequestsLoaded: state.itrequests.assignedItRequestsLoaded,
    assignedItRequestsData: state.itrequests.assignedItRequestsData,
    requestTypesLoaded: state.itrequests.requestTypesLoaded,
    requestTypesData: state.itrequests.requestTypesData,
    requestPrioritiesLoaded: state.itrequests.requestPrioritiesLoaded,
    requestPrioritiesData: state.itrequests.requestPrioritiesData,
    submitItRequestResponse: state.itrequests.submitItRequestResponse,
    employeesData: state.home.employeesData,
    user: state.home.user,
    replyItRequestLoading: state.itrequests.replyItRequestLoading,
    replyItRequestLoaded: state.itrequests.replyItRequestLoaded,
    replyItRequestResponse: state.itrequests.replyItRequestResponse,
    access_token: state.home.user.access_token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(itrequestsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItRequests);
