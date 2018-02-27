import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';
import { Alert } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { LoadingIndicator, ItRequestDetailModel } from 'components';
import SearchInput, {createFilter} from 'react-search-input';
import { isEqual } from 'lodash';
import styles from '../ItRequests.scss';

const MY_KEYS_TO_FILTERS = ['subject', 'created_date', 'priority', 'request_status', 'reporting_to_name'];

export default class MyItRequests extends Component {
  static propTypes = {
    myItRequestsLoading: PropTypes.bool,
    myItRequestsLoaded: PropTypes.bool,
    myItRequestsData: PropTypes.array,
    getMyItRequests: PropTypes.func,
    deleteItRequest: PropTypes.func,
    replyItRequest: PropTypes.func,
    replyItRequestResponse: PropTypes.object,
    replyItRequestLoaded: PropTypes.bool,
  }

  state = {
    myItRequests: [],
    viewItRequestsFlag: false,
    selectedItRequestsData: null,
    alertFlag: true,
    selectedItRequestsKey: null,
    comments: '',
    deleteAlert: false,
    alertMsgText: '',
  };

  componentWillMount() {
    if (!this.props.myItRequestsLoaded || this.props.myItRequestsData === undefined) {
      this.props.getMyItRequests().then(res => {
        this.setState({myItRequests: res });
      });
    } else {
      this.setState({myItRequests: this.props.myItRequestsData });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.myItRequestsData !== nextProps.myItRequestsData)) {
      this.setState({myItRequests: nextProps.myItRequestsData });
    }
    this.setState({ alertFlag: true });
    if (!this.props.replyItRequestLoaded && nextProps.replyItRequestLoaded) {
      this.props.getMyItRequests().then(res => {
        this.setState({myItRequests: res, selectedItRequestsData: res[this.state.selectedItRequestsKey] });
      });
    }
  }
  handleDeleteItRequest = (alertMsgText) => {
    this.props.getMyItRequests().then(res => {
      this.setState({myItRequests: res, viewItRequestsFlag: false, alertMsgText: alertMsgText, deleteAlert: true});
    });
  }
  handleAlertDismiss = () => {
    this.setState({
      deleteAlert: false,
    });
  }
  handleSearch = (term) => {
    const filteredData = this.props.myItRequestsData.filter(createFilter(term, MY_KEYS_TO_FILTERS));
    this.setState({myItRequests: filteredData});
  };

  viewAssignedItRequests = (itRequest, index) => {
    this.setState({
      viewItRequestsFlag: true,
      selectedItRequestsKey: index,
      selectedItRequestsData: itRequest,
      alertFlag: false,
      comments: ''
    });
  };

  handleItRequestModelClose = () => {
    this.setState({ viewItRequestsFlag: false });
  };
  handleComments = (comments) => {
    this.setState({ comments: comments });
  };
  render() {
    if (!this.props.myItRequestsLoaded) {
      return <LoadingIndicator />;
    }
    const myItRequestsContent = this.state.myItRequests.map((itRequest, index) => (
      <tr key={itRequest.request_id} onClick={()=>this.viewAssignedItRequests(itRequest, index)}>
        <td>{index + 1}</td>
        <td>{dateFormat(itRequest.created_date, 'mmm dd, yyyy')}</td>
        <td>{itRequest.subject}</td>
        <td className="centered">{itRequest.priority}</td>
        <td className="centered">{itRequest.reporting_to_name}</td>
        <td>{itRequest.request_status}</td>
      </tr>
    ));
    return (
      <div className={styles.itRequests}>
        { this.state.deleteAlert ?
          <div className="row">
            <div className="col-lg-12">
              <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                <strong>{this.state.alertMsgText}</strong>
              </Alert>
            </div>
          </div> : null
        }
        <SearchInput className="search-input" onChange={this.handleSearch} />
        <Table responsive className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Created on</th>
              <th>Subject</th>
              <th className="centered">Priority</th>
              <th className="centered">Reporting to</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { myItRequestsContent.length ?
              myItRequestsContent :
              <tr>
                <td colSpan="6">No data found.</td>
              </tr>
            }
          </tbody>
        </Table>
        {
          this.state.viewItRequestsFlag &&
          <ItRequestDetailModel
            title="IT Request details"
            onHide={this.handleItRequestModelClose}
            show
            itRequestDetails={this.state.selectedItRequestsData}
            replyItRequestResponse={this.props.replyItRequestResponse}
            deleteItRequest={this.props.deleteItRequest}
            replyItRequest={this.props.replyItRequest}
            handleComments={this.handleComments}
            comments={this.state.comments}
            alertFlag={this.state.alertFlag}
            handleDeleteItRequest={this.handleDeleteItRequest}
          />
        }
      </div>
    );
  }
}
