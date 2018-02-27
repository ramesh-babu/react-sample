import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as expensActions from 'redux/modules/expens';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import { Alert, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { isEmpty, filter, uniqueId, uniq, map } from 'lodash';
import AddExpenses from 'components/AddExpenses/AddExpenses';
import styles from './AddExpensDetails.scss';

const initialState = {
  bill_date: null,
  invoice_pic: null,
  bill_amount: null,
  bill_type: null,
  bill_comments: null,
  emp_id: null,
  project_name: null,
  members: [{
    id: uniqueId(),
    emp_id: null,
    project_name: null,
  },
    {
      id: uniqueId(),
      emp_id: null,
      project_name: null,
    },
    {
      id: uniqueId(),
      emp_id: null,
      project_name: null,
    },
    {
      id: uniqueId(),
      emp_id: null,
      project_name: null,
    }],
  file: null,
  bill_invoice: null,
  imagePreviewUrl: [],
  empId: [],
  projectName: [],
};

class AddExpensDetails extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    employeesData: PropTypes.array,
    addExpensDetails: PropTypes.func,
    viewExpensList: PropTypes.func,
    getBillType: PropTypes.func,
    billTypeData: PropTypes.array,
    getBillTypeLoaded: PropTypes.boll,
    access_token: PropTypes.string,
  }

  state = {
    ...initialState,
    addExpensDetailsSuccess: null,
  };
  componentWillMount() {
    if (!this.props.getBillTypeLoaded) {
      this.props.getBillType();
      this.props.viewExpensList({authorization: this.props.access_token});
    }
  }
  componentWillReceiveProps() {
    const empId = uniq(map(this.state.members, 'emp_id'));
    const projectName = uniq(map(this.state.members, 'project_name'));
    this.setState({
      empId: empId[0],
      projectName: projectName[0]
    });
  }
  handleBillChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ bill_date: selectedDate });
  }
  handleBillCacel = () => {
    this.setState({ bill_date: null });
  }
  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : null,
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
  handleSubmit = () => {
    const tempMembers = this.state.members.filter((item) => (item.emp_id !== null));
    this.props.addExpensDetails({
      authorization: this.props.access_token,
      bill_date: this.state.bill_date,
      invoice_pic: this.state.invoice_pic,
      bill_amount: this.state.bill_amount,
      bill_type: this.state.bill_type,
      bill_comments: this.state.bill_comments,
      bill_invoice: this.state.bill_invoice,
      MembersDetails: tempMembers,
    }).then(response => {
      if (response.message === 'expense details created successfully') {
        this.props.viewExpensList({authorization: this.props.access_token});
        this.setState({ ...initialState, addExpensDetailsSuccess: 'expense details created successfully.' });
      }
    });
  }

  handleAlertDismiss = () => {
    this.setState({addExpensDetailsSuccess: null});
  }
  handleImageChange = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        bill_invoice: reader.result,
        imagePreviewUrl: [ ...this.state.imagePreviewUrl, reader.result],
      });
    };
    reader.readAsDataURL(file);
  }
  handleImgCancel = (url) => {
    let imagePreviewUrl = this.state.imagePreviewUrl;
    imagePreviewUrl = filter(imagePreviewUrl, (images) => {
      return images !== url;
    });
    this.setState({ imagePreviewUrl });
  }
  render() {
    const { title, onHide, show, billTypeData } = this.props;
    // const empId = uniq(map(this.state.members, 'emp_id'));
    // const projectName = uniq(map(this.state.members, 'project_name'));
    const {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = this.state.imagePreviewUrl.map((url) => {
        return <li><span onClick={() => this.handleImgCancel(url)} className="glyphicon glyphicon-remove"></span><img src={url}/> </li>;
      });
    }
    const billTypeToOptions = billTypeData.map(item => {
      return <option value={item.type_id} key={item.type_id}>{item.type_name}</option>;
    });
    const expensMembersContent = this.state.members.map((members, index) => {
      return (<AddExpenses
        itemIndex={index}
        members={this.state.members}
        membersData={this.state.members[index]}
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
          <form onSubmit={this.handleSubmit}>
            { this.state.addExpensDetailsSuccess ?
            <div className="row">
              <div className="col-lg-12">
                <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                  <strong>{this.state.addExpensDetailsSuccess}</strong>
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
                        value={this.state.bill_date ? new Date(this.state.bill_date) : null}
                        onChange={this.handleBillChange}
                        onDismiss={this.handleBillCacel}
                        maxDate={new Date()}
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
                       value={this.state.bill_amount}
                       onChange={(event) => this.handleFieldChange(event, 'bill_amount')}
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
                        value={this.state.bill_type || '0'}
                        onChange={event => this.handleFieldChange(event, 'bill_type') }>
                        <option value="">--Select bill type--</option>
                        {billTypeToOptions}
                      </select>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} lg={3} sm={3}>
                    <label>Comments:</label>
                  </Col>
                  <Col md={8} lg={8} sm={8}>
                    <textarea
                      rows="3"
                      ref="expenses_comments"
                      placeholder="Reason"
                      className="form-control"
                      value={this.state.bill_comments}
                      onChange={(event) => this.handleFieldChange(event, 'bill_comments')}
                    />
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
                    { imagePreview ?
                      <div className={styles.imgPreview}>
                        <ul>{imagePreview}</ul>
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
                    isEmpty(this.state.bill_date) ||
                    isEmpty(this.state.bill_amount) ||
                    isEmpty(this.state.bill_type)
                  }
                >Submit</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    access_token: state.home.user.access_token,
    employeesData: state.home.employeesData,
    billTypeData: state.expens.billTypeData,
    getBillTypeLoaded: state.expens.getBillTypeLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(expensActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensDetails);
