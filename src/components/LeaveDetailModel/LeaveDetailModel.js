import React, { PropTypes, Component } from 'react';
import { Modal, Button, Glyphicon } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { isEmpty } from 'lodash';
import styles from './LeaveDetailModel.scss';

export default class LeaveDetailModel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    leaveDetails: PropTypes.object,
    updateLeave: PropTypes.func,
    deleteLeave: PropTypes.func,
    admin: PropTypes.bool,
  }

  state = {
    status_id: '',
    message: ''
  };

  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateLeave(this.state.status_id, this.props.leaveDetails.leave_id, this.state.message);
  }

  handleDelete = (event) => {
    const flag = confirm('Do you want to delete a leave!');
    if (flag) {
      event.preventDefault();
      this.props.deleteLeave(this.props.leaveDetails.leave_id);
    }
  }

  render() {
    const { title, onHide, show, leaveDetails, admin } = this.props;
    return (
      <Modal bsSize="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton className={styles.modelHeader}>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modelBody}>
          <div className="row">
            <div className="col-lg-6">
              <strong>From</strong>
              <p>{dateFormat(leaveDetails.from_date, 'dd-mm-yyyy')}</p>
            </div>
            <div className="col-lg-6">
              <strong>To</strong>
              <p>{dateFormat(leaveDetails.to_date, 'dd-mm-yyyy')}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-6">
              <strong>No of days</strong>
              <p>{leaveDetails.no_of_days}</p>
            </div>
            <div className="col-lg-6">
              <strong>Status</strong>
              <p>{leaveDetails.leave_status}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-6">
              <strong>Type</strong>
              <p>{leaveDetails.leave_type === 'UNA' ? 'UAL' : leaveDetails.leave_type}</p>
            </div>
            <div className="col-lg-6">
              <strong>{leaveDetails.leave_type === 'UNA' ? 'Auto Applied On' : 'Applied On'}</strong>
              <p>{dateFormat(leaveDetails.created_date, 'dd-mm-yyyy')}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <strong>Reason</strong>
              <p>{leaveDetails.leave_description}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <strong>Comments</strong>
              <p>{leaveDetails.reply_msg}</p>
            </div>
          </div>
          { admin ?
            <div>
              <hr />
              <div className="row">
                <div className="col-lg-12">
                  <strong><span className="error">*</span> Status:</strong>
                  <select onChange={(event) => this.handleFieldChange(event, 'status_id')} value={this.state.status_id}>
                    <option value="">--Select type--</option>
                    <option value="1">Approve</option>
                    <option value="2">Reject</option>
                  </select>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-lg-12">
                  <strong><span className="error">*</span> Reason:</strong>
                  <textarea
                    rows="2"
                    ref="message"
                    placeholder="Reason"
                    className="form-control"
                    onChange={(event) => this.handleFieldChange(event, 'message')}
                    value={this.state.message}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label />
                  {/* <Button bsStyle="danger" bsSize="large" className="pull-left" onClick={this.handleDelete}><Glyphicon glyph="trash" /></Button> */}
                </div>
                <div className="col-lg-6">
                  <label />
                  <Button bsStyle="primary" bsSize="large" className="pull-right" onClick={this.handleSubmit} disabled={isEmpty(this.state.status_id) || isEmpty(this.state.message)}>Update</Button>
                </div>
              </div>
            </div> :
            <div>
              <hr />
              <div className="row">
                <div className="col-lg-6">
                  <label />
                  <Button bsStyle="danger" bsSize="large" className="pull-left" onClick={this.handleDelete}><Glyphicon glyph="trash" /></Button>
                </div>
              </div>
            </div> }

        </Modal.Body>
      </Modal>
    );
  }
}
