import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { Modal } from 'react-bootstrap';
import { Alert, Button } from 'react-bootstrap';
import dateFormat from 'dateformat';
import * as expensActions from 'redux/modules/expens';
import { Row, Col } from 'react-bootstrap';
import { LoadingIndicator } from 'components';
import styles from './ExpenseDetailModel.scss';

class ExpenseDetailModel extends Component {
  static propTypes = {
    access_token: PropTypes.string,
    title: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    getExpensLoaded: PropTypes.bool,
    viewexpenseId: PropTypes.number,
    getExpensDetails: PropTypes.func,
    billApproval: PropTypes.func,
    viewExpensList: PropTypes.func,
  };
  state = {
    viewExpensDetailsData: null,
    bill_comments: null,
    status: null,
    addExpensDetailsSuccess: null,
  }
  componentWillMount() {
    this.props.getExpensDetails({authorization: this.props.access_token, expense_id: this.props.viewexpenseId}).then(response => {
      const tempMembers = response.memberDetails.map((item) => {
        return {
          project_name: item.member_project,
          memberName: item.memberName,
          member_id: item.member_id,
        };
      });
      this.setState({
        viewExpensDetailsData: {
          statusLabel: response.statusLabel,
          Approval: response.Approval,
          expense_stage: response.expenseDetails.expense_stage,
          expense_id: response.expenseDetails.expense_id,
          expense_date: response.expenseDetails.expense_date,
          expense_amount: response.expenseDetails.expense_amount,
          type_name: response.expenseDetails.type_name,
          expense_invoice: response.expenseDetails.expense_invoice,
          bill_comments: response.commentsDetails[0].comment_data,
          rejectedStatus: response.commentsDetails[0].comment_status,
          membersDetails: tempMembers,
          commentsDetails: response.commentsDetails,
        }
      });
    });
  }
  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : null,
    });
  }
  handleSubmitApprove = () => {
    this.props.billApproval({authorization: this.props.access_token, bill_comments: this.state.bill_comments, bill_status: 'Approved', expense_id: this.state.viewExpensDetailsData.expense_id});
    this.props.viewExpensList();
    this.setState({ addExpensDetailsSuccess: 'Expense Details Approved Successfully' });
  }
  handleSubmitReject = () => {
    this.props.billApproval({authorization: this.props.access_token, bill_comments: this.state.bill_comments, bill_status: 'Rejected', expense_id: this.state.viewExpensDetailsData.expense_id});
    this.props.viewExpensList();
    this.setState({ addExpensDetailsSuccess: 'Expense Details Rejected' });
  }
  render() {
    const { title, onHide, show, getExpensLoaded } = this.props;
    let Stage = null;
    if (this.state.viewExpensDetailsData !== null) {
      if (this.state.viewExpensDetailsData.expense_stage === 0) {
        Stage = 'Tame Lead Needs To Approve';
      }
    }
    if (this.state.viewExpensDetailsData !== null) {
      if (this.state.viewExpensDetailsData.expense_stage === 1) {
        Stage = 'Manager Needs To Approve';
      }
      if (this.state.viewExpensDetailsData.rejectedStatus === 'Rejected') {
        Stage = 'Bill Rejected';
      }
    }
    if (this.state.viewExpensDetailsData !== null) {
      if (this.state.viewExpensDetailsData.expense_stage === 2) {
        Stage = 'Admin Needs To Approve';
      }
      if (this.state.viewExpensDetailsData.rejectedStatus === 'Rejected') {
        Stage = 'Bill Rejected';
      }
    }
    if (this.state.viewExpensDetailsData !== null) {
      if (this.state.viewExpensDetailsData.expense_stage === 3) {
        Stage = 'Bill Approved Successfully';
      }
      if (this.state.viewExpensDetailsData.rejectedStatus === 'Rejected') {
        Stage = 'Bill Rejected';
      }
    }
    const Comments = this.state.viewExpensDetailsData ? this.state.viewExpensDetailsData.commentsDetails.map((commentData, index) => (
      <div className={styles.commentText}>
        <p>#{index + 1} {'Status:'} {commentData.comment_status ? commentData.comment_status : '-'}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'Comments:'} {commentData.comment_data ? commentData.comment_data : '-'}</p><span className={styles.subtext}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'By'} {commentData.comment_by} {dateFormat(commentData.comment_createdOn, 'mmm dd, yyyy')}<br/></span>
      </div>
    )) : null;
    const expensContent = this.state.viewExpensDetailsData ? this.state.viewExpensDetailsData.membersDetails.map((item, index) => {
      return (<div>
              <Col md={6} lg={6} sm={6}>
              <span>#{index + 1} {item.memberName}</span>
              </Col>
              <Col md={6} lg={6} sm={6}>
              <span>{item.project_name}</span>
              </Col>
            </div>);
    }) : null;
    return (
      <Modal bsSize="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton className={styles.modelHeader}>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modelBody}>
          { this.state.addExpensDetailsSuccess ?
              <div className="row">
                <div className="col-lg-12">
                  <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                    <strong>{this.state.addExpensDetailsSuccess}</strong>
                  </Alert>
                </div>
              </div> : null
          }
          { !getExpensLoaded ? <LoadingIndicator /> :
            <Row>
              <Col md={6} lg={6} sm={6}>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Status:</label>
                  </Col>
                  <Col md={8} lg={8} sm={8} className={styles.textalign}>
                    <span>{Stage}</span>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Bill date:</label>
                  </Col>
                  <Col md={8} lg={8} sm={8} className={styles.textalign}>
                    <span>{this.state.viewExpensDetailsData ? dateFormat(this.state.viewExpensDetailsData.expense_date, 'mmm dd, yyyy') : '-'}</span>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Bill Amt:</label>
                  </Col>
                  <Col md={8} lg={8} sm={8} className={styles.textalign}>
                    <span>{this.state.viewExpensDetailsData ? this.state.viewExpensDetailsData.expense_amount : '-'}</span>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Bill type:</label>
                  </Col>
                  <Col md={8} lg={8} sm={8} className={styles.textalign}>
                    <span>{this.state.viewExpensDetailsData ? this.state.viewExpensDetailsData.type_name : '-'}</span>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Comments:</label>
                  </Col>
                  <Col md={8} lg={8} sm={8} className={styles.textalign}>
                    <span>{Comments ? Comments : '-'}</span>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Pictures:</label>
                  </Col>
                  <Col md={8} lg={8} sm={8} className={styles.textalign}>
                    { this.state.viewExpensDetailsData.expense_invoice !== 'null' ?
                        <div className={styles.imgPreview}>
                          <ul><li><span onClick={() => this.handleImgCancel()} ></span><img src={this.state.viewExpensDetailsData.expense_invoice}/> </li></ul>
                        </div> : null
                    }
                  </Col>
                </Row>
              </Col>
              <Col md={6} lg={6} sm={6}>
                <Row>
                  <Col md={6} lg={6} sm={6}>
                    <label>Employee Name</label>
                  </Col>
                  <Col md={6} lg={6} sm={6}>
                    <label>Project Name</label>
                  </Col>
                  {expensContent}
                </Row>
              </Col>
              <Col md={6} lg={6} sm={6}>
                {
                  this.state.viewExpensDetailsData.Approval !== 0 && this.state.viewExpensDetailsData.expense_stage !== 3 && Stage !== 'Bill Rejected' ?
                  <Row className={styles.status}>
                    <Col md={3} lg={3} sm={3}>
                      <label>Comments:</label>
                    </Col>
                    <Col md={8} lg={8} sm={8}>
                      <textarea
                        rows="3"
                        ref="expenses_comments"
                        placeholder="Reason"
                        className="form-control"
                        onChange={(event) => this.handleFieldChange(event, 'bill_comments')}
                        value={this.state.bill_comments}
                      />
                    </Col>
                  </Row> : null
                }
                {
                  this.state.viewExpensDetailsData.Approval !== 0 && this.state.viewExpensDetailsData.expense_stage !== 3 && Stage !== 'Bill Rejected' ?
                  <Row className={styles.status}>
                    <Col md={3} lg={3} sm={3}>
                      <label>Status:</label>
                    </Col>
                    <Col md={4} lg={4} sm={4}>
                      <Button bsStyle="primary" className="btn-success" onClick={this.handleSubmitApprove}>Approve
                      </Button>
                    </Col>
                    <Col md={4} lg={4} sm={4}>
                      <Button bsStyle="primary" className="btn-danger" onClick={this.handleSubmitReject}>Reject
                      </Button>
                    </Col>
                  </Row> : null
                }
              </Col>
            </Row>
          }
        </Modal.Body>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    access_token: state.home.user.access_token,
    viewExpensData: state.expens.viewExpensData,
    getExpensLoaded: state.expens.getExpensLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(expensActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDetailModel);
