import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import { Alert, Button } from 'react-bootstrap';
import { isEmpty, uniqueId, filter } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import * as expensActions from 'redux/modules/expens';
import AddExpenses from 'components/AddExpenses/AddExpenses';
import { LoadingIndicator } from 'components';
import styles from './EditExpensDetails.scss';
class EditExpensDetails extends Component {
  static propTypes = {
    access_token: PropTypes.string,
    title: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    employeesData: PropTypes.array,
    billTypeData: PropTypes.array,
    viewExpensList: PropTypes.func,
    updateExpensDetails: PropTypes.func,
    getExpensLoaded: PropTypes.boll,
    getExpensData: PropTypes.array,
    expenseId: PropTypes.number,
    getExpensDetails: PropTypes.func,
  }
  state = {
    editExpensDetailsSuccess: null,
    bill_status: null,
    expense_id: null,
    expense_date: null,
    expense_amount: null,
    expense_type: null,
    expense_invoice: null,
    members: [
      { id: uniqueId(), emp_id: null, project_name: null, member_id: null }
    ],
    file: null,
    editFlag: 'AAA',
  }
  componentWillMount() {
    this.props.getExpensDetails({authorization: this.props.access_token, expense_id: this.props.expenseId}).then(response => {
      this.setState({ ...response.expenseDetails });
      const tempMembers = response.memberDetails.map((item) => {
        return {
          project_name: item.member_project,
          emp_id: item.employee_id,
          member_id: item.member_id,
        };
      });
      this.setState({
        members: [ ...tempMembers, {id: uniqueId(), emp_id: null, project_name: null} ]
      });
    });
  }
  appendNewMember = () => {
    this.setState({
      members: [ ...this.state.members, {id: uniqueId(), emp_id: null, project_name: null} ]
    });
  };
  removeCurrentMember = (itemIndex) => {
    let members = this.state.members;
    members = filter(members, (resource, index) => {
      return index !== itemIndex;
    });
    this.setState({ members });
  };

  handleMemberData = (itemIndex, membersData) => {
    const members = this.state.members;
    members[itemIndex] = membersData;
    this.setState({ members });
  };
  handleBillChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ expense_date: selectedDate });
  }
  handleBillCacel = () => {
    this.setState({ expense_date: null });
  }
  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : null,
    });
  }
  handleSubmit = () => {
    const tempMembers = this.state.members.filter((item) => (item.emp_id !== null));
    this.props.updateExpensDetails({
      access_token: this.props.access_token,
      expense_id: this.state.expense_id,
      expense_date: this.state.expense_date,
      expense_amount: this.state.expense_amount,
      expense_type: this.state.expense_type,
      bill_status: this.state.bill_status,
      bill_invoice: this.state.expense_invoice,
      MembersDetails: tempMembers,
    }).then(response => {
      if (response.message === 'Project details updated successfully') {
        this.props.viewExpensList({authorization: this.props.access_token});
        this.setState({
          ...this.state, editExpensDetailsSuccess: 'Project details updated successfully.',
          editFlag: null,
        });
      }
    });
  }
  handleImageChange = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        expense_invoice: reader.result
      });
    };
    reader.readAsDataURL(file);
  }
  handleImgCancel = () => {
    this.setState({ expense_invoice: null });
  }
  render() {
    const { title, onHide, show, billTypeData, getExpensLoaded } = this.props;
    const billTypeToOptions = billTypeData.map(item => {
      return <option value={item.type_id} key={item.type_id}>{item.type_name}</option>;
    });
    const expensMembersContent = this.state.members.map((members, index) => {
      return (<AddExpenses
        itemIndex={index}
        members={this.state.members}
        membersData={members}
        key={members.id}
        appendNewMember={this.appendNewMember}
        removeCurrentMember={this.removeCurrentMember}
        handleMemberData={this.handleMemberData}
        employeesData={this.props.employeesData}
      />);
    });
    return (
      <Modal bsSize="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton className={styles.modelHeader}>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modelBody}>
          { !getExpensLoaded ? <LoadingIndicator /> :
            <form onSubmit={this.handleSubmit}>
              { this.state.editExpensDetailsSuccess ?
              <div className="row">
                <div className="col-lg-12">
                  <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                    <strong>{this.state.editExpensDetailsSuccess}</strong>
                  </Alert>
                </div>
              </div> : null
              }
              <Row>
                <Col md={6} lg={6} sm={6}>
                  <Row>
                    <Col md={3} lg={3} sm={3}>
                      <label><span className="error">*</span>Bill date:</label>
                    </Col>
                    <Col md={8} lg={8} sm={8}>
                      <MuiThemeProvider>
                        <DatePicker
                          hintText="Choose a date"
                          mode="landscape"
                          textFieldStyle={{width: '100%'}}
                          formatDate={this.formatDate}
                          value={this.state.expense_date ? new Date(this.state.expense_date) : null}
                          onChange={this.handleBillChange}
                          onDismiss={this.handleBillCacel}
                        />
                      </MuiThemeProvider>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} lg={3} sm={3}>
                      <label><span className="error">*</span>Bill Amt:</label>
                    </Col>
                    <Col md={8} lg={8} sm={8}>
                      <div className="form-group">
                        <input
                         className="form-control"
                         placeholder="Bill amount"
                         value={this.state.expense_amount}
                         onChange={(event) => this.handleFieldChange(event, 'expense_amount')}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} lg={3} sm={3}>
                      <label><span className="error">*</span>Bill type</label>
                    </Col>
                    <Col md={8} lg={8} sm={8}>
                        <select
                          ref={(select) => { this.appliedTo = select; }}
                          value={this.state.expense_type || '0'}
                          onChange={event => this.handleFieldChange(event, 'expense_type') }>
                          <option value={"0"}>--Select bill type--</option>
                          {billTypeToOptions}
                        </select>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8} lg={8} sm={8}>
                      <label><span className="error">*</span>Invoice Pictures:</label>
                      <input
                        type="file"
                        className="form-control"
                        ref={(input) => { this.file = input; }}
                        onChange={(event)=>this.handleImageChange(event)}
                      />
                      { this.state.expense_invoice !== 'null' ?
                        <div className={styles.imgPreview}>
                          <ul><li><span onClick={() => this.handleImgCancel()} className="glyphicon glyphicon-remove"></span><img src={this.state.expense_invoice}/> </li></ul>
                        </div> : null
                      }
                    </Col>
                  </Row>
                </Col>
                  <Col md={6} lg={6} sm={6}>
                    <Row>
                      <Col md={5} lg={5} sm={5}>
                        <label><span className="error">*</span>Employee Name</label>
                      </Col>
                      <Col md={6} lg={6} sm={6}>
                        <label><span className="error">*</span>Project Name</label>
                      </Col>
                      {expensMembersContent}
                    </Row>
                  </Col>
              </Row>
              <div className="row">
                <div className="col-lg-12">
                  <label />
                  <Button bsStyle="primary" className="pull-right" onClick={this.handleSubmit}
                    disabled={
                      isEmpty(this.state.editFlag)
                    }
                  >Update</Button>
                </div>
              </div>
            </form>
          }
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    access_token: state.home.user.access_token,
    employeesData: state.home.employeesData,
    getExpensData: state.expens.getExpensData,
    getExpensLoaded: state.expens.getExpensLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(expensActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensDetails);
