import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';
import { Table } from 'react-bootstrap';
import { LoadingIndicator, ItRequestDetailModel } from 'components';
import SearchInput, {createFilter} from 'react-search-input';
import styles from '../ItRequests.scss';

const ASSIGNED_KEYS_TO_FILTERS = ['subject', 'created_date', 'priority', 'request_status', 'request_by'];

export default class AssignedItRequests extends Component {
  static propTypes = {
    assignedItRequestsLoading: PropTypes.bool,
    assignedItRequestsLoaded: PropTypes.bool,
    assignedItRequestsData: PropTypes.array,
    getAssignedItRequests: PropTypes.func,
    replyItRequest: PropTypes.func,
    replyItRequestLoaded: PropTypes.bool,
    replyItRequestResponse: PropTypes.object,
    deleteItRequest: PropTypes.func,
  }

  state = {
    assignedItRequests: [],
    viewItRequestsFlag: false,
    selectedItRequestsKey: null,
    selectedItRequestsData: null,
    alertFlag: true,
    comments: '',
  };

  componentWillMount() {
    if (!this.props.assignedItRequestsLoaded || this.props.assignedItRequestsData === undefined) {
      this.props.getAssignedItRequests().then(res => {
        this.setState({assignedItRequests: res });
      });
    } else {
      this.setState({assignedItRequests: this.props.assignedItRequestsData });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.replyItRequestLoaded && nextProps.replyItRequestLoaded) {
      this.props.getAssignedItRequests().then(res => {
        this.setState({assignedItRequests: res, selectedItRequestsData: res[this.state.selectedItRequestsKey] });
      });
    }
    this.setState({ alertFlag: true });
  }

  handleSearch = (term) => {
    const filteredData = this.props.assignedItRequestsData.filter(createFilter(term, ASSIGNED_KEYS_TO_FILTERS));
    this.setState({assignedItRequests: filteredData});
  };

  viewAssignedItRequests = (itRequest, keyData) => {
    this.setState({
      viewItRequestsFlag: true,
      selectedItRequestsKey: keyData,
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
    if (!this.props.assignedItRequestsLoaded) {
      return <LoadingIndicator />;
    }
    const assignedItRequestsContent = this.state.assignedItRequests.map((itRequest, index) => (
      <tr key={itRequest.request_id} onClick={()=>this.viewAssignedItRequests(itRequest, index)}>
        <td>{index + 1}</td>
        <td>{dateFormat(itRequest.created_date, 'mmm dd, yyyy')}</td>
        <td>{itRequest.subject}</td>
        <td className="centered">{itRequest.priority}</td>
        <td className="centered">{itRequest.request_by}</td>
        <td>{itRequest.request_status}</td>
      </tr>
    ));
    return (
      <div className={styles.itRequests}>
        <SearchInput className="search-input" onChange={this.handleSearch} />
        <Table responsive className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Created on</th>
              <th>Subject</th>
              <th className="centered">Priority</th>
              <th className="centered">Requested by</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { assignedItRequestsContent.length ?
              assignedItRequestsContent :
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
            replyItRequest={this.props.replyItRequest}
            replyItRequestResponse={this.props.replyItRequestResponse}
            alertFlag={this.state.alertFlag}
            handleComments={this.handleComments}
            comments={this.state.comments}
            deleteItRequest={this.props.deleteItRequest}
          />
        }
      </div>
    );
  }
}
