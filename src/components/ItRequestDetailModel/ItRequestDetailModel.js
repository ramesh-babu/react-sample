import React, { PropTypes, Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { isEmpty } from 'lodash';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './ItRequestDetailModel.scss';

export default class ItRequestDetailModel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    itRequestDetails: PropTypes.object,
    replyItRequest: PropTypes.func,
    replyItRequestResponse: PropTypes.shape({
      message: PropTypes.string,
    }),
    alertFlag: PropTypes.bool,
    handleComments: PropTypes.func,
    comments: PropTypes.string,
    deleteItRequest: PropTypes.func,
    handleDeleteItRequest: PropTypes.func,
  }

  state = {
    reply_msg: '',
    reply_status: '' + this.props.itRequestDetails.status,
    alertMsg: true,
    alertMsgText: null,
  };
  componentWillMount() {
    this.setState({reply_msg: this.props.comments});
    if (this.props.replyItRequestResponse.message === 'Reply submitted successfully') {
      this.setState({
        reply_msg: '',
        alertMsgText: this.props.replyItRequestResponse.message
      });
    } else {
      this.setState({
        alertMsgText: this.props.replyItRequestResponse.message
      });
    }
    if (!this.props.itRequestDetails.request_by) {
      this.setState({reply_status: '4'});
    }
  }
  componentWillReceiveProps() {
    if (!this.props.itRequestDetails.request_by) {
      if (this.props.replyItRequestResponse.message === 'Reply submitted successfully') {
        this.setState({
          reply_msg: '',
          alertMsgText: this.props.replyItRequestResponse.message
        });
      } else {
        this.setState({
          alertMsgText: this.props.replyItRequestResponse.message
        });
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
  handleSubmit = (event) => {
    event.preventDefault();
    const itRequestData = {
      request_id: '' + this.props.itRequestDetails.request_id,
      reply_msg: this.state.reply_msg,
      reply_status: this.state.reply_status,
    };
    this.setState({
      alertMsgText: null
    });
    this.props.replyItRequest(itRequestData);
    this.props.handleComments(this.state.reply_msg);
  }
  handleAlertDismiss = () => {
    this.setState({
      alertMsg: false,
    });
  }
  handleDelete = (requestId) => {
    console.log(requestId);
    const result = confirm('Want to delete itRequest?');
    if (result) {
      this.props.deleteItRequest(requestId).then(res => {
        this.setState({
          alertMsg: false
        });
        this.props.handleDeleteItRequest(res.message);
      });
    }
  }
  render() {
    const { title, onHide, show, itRequestDetails} = this.props;
    const Comments = itRequestDetails.replays.length ? itRequestDetails.replays.map((itData, index) => (
        <div className={styles.commentText}>
          <p>#{index + 1} {itData.reply_msg}</p><span className={styles.subtext}>{itData.emp_firstname} {itData.emp_lastname}, {dateFormat(itData.created_date, 'mmm dd, yyyy')}</span>
         </div>
    )) : null;
    return (
      <Modal bsSize="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton className={styles.modelHeader}>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modelBody}>
          { this.state.alertMsg && this.state.alertMsgText !== null && this.props.alertFlag ?
            <div className="row">
              <div className="col-lg-12">
                <Alert bsStyle={this.state.alertMsgText === 'Failed to submit reply' ? 'danger' : 'success'} onDismiss={this.handleAlertDismiss}>
                  <strong>{this.state.alertMsgText}</strong>
                </Alert>
              </div>
            </div> : null
          }
          <div className="row">
            <div className="col-lg-6">
              <strong>Created on</strong>
              <p>{dateFormat(itRequestDetails.created_date, 'mmm dd, yyyy')}</p>
            </div>
            <div className="col-lg-6">
              <strong>Priority</strong>
              <p>{itRequestDetails.priority}</p>
            </div>
          </div>
           <hr />
          <div className="row">
            <div className="col-lg-6">
              <strong>{itRequestDetails.request_by ? 'Requested by' : 'Reporting to'}</strong>
              <p>{itRequestDetails.request_by ? itRequestDetails.request_by : itRequestDetails.reporting_to_name }</p>
            </div>
            {
              itRequestDetails.request_status !== 'RESOLVED' && itRequestDetails.request_by ?
              <div className="col-lg-6">
<strong>Status</strong>
                <select
                  ref={(select) => { this.appliedTo = select; }}
                  value={this.state.reply_status}
                  onChange={event => this.handleFieldChange(event, 'reply_status') }
                  >
                  <option value="4">Submitted</option>
                  <option value="5">Resolved</option>
                </select>
              </div> :
              <div className="col-lg-6">
                <strong>Status</strong>
                <p>{itRequestDetails.request_status}</p>
              </div>
            }
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-6">
              <strong>Subject</strong>
              <p>{itRequestDetails.subject}</p>
            </div>
          </div>
           <hr />
          <div className="row">
            <div className="col-lg-12">
              <strong>Message</strong>
              <p>{itRequestDetails.message}</p>
            </div>
          </div>
          {
            Comments ?
            <div>
              <hr />
              <div className="row">
                <div className="col-lg-12">
                  <strong>Comments</strong>
                  {Comments}
                </div>
              </div>
            </div> : null
          }
          { itRequestDetails.request_status !== 'RESOLVED' ?
            <div>
              <hr />
              <div className="row">
                <div className="col-lg-12">
                  <strong>Comments :</strong>
                  <textarea
                    rows="3"
                    placeholder="Reason for IT Request"
                    className="form-control"
                    onChange={(event) => this.handleFieldChange(event, 'reply_msg')}
                    value={this.state.reply_msg}
                  />
                </div>
                <div className="col-lg-12">
                  <label />
                  {
                    !itRequestDetails.request_by ?
                    <Button bsStyle="primary"
                      className="pull-left" bsStyle="danger" onClick={()=>this.handleDelete(itRequestDetails.request_id)}
                    ><Glyphicon glyph="trash" /></Button> : null
                  }
                  <label />
                  <Button bsStyle="primary"
                    className="pull-right" onClick={this.handleSubmit}
                    disabled={isEmpty(this.state.reply_msg) || isEmpty(this.state.reply_status)}
                  >Reply</Button>
                </div>
              </div>
            </div> : null
          }
        </Modal.Body>
      </Modal>
    );
  }
}
