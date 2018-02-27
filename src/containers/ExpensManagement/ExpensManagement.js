import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Table } from 'react-bootstrap';
import dateFormat from 'dateformat';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import * as expensActions from 'redux/modules/expens';
import AddExpensDetails from 'containers/AddExpensDetails/AddExpensDetails';
import EditExpensDetails from 'containers/EditExpensDetails/EditExpensDetails';
import ExpenseDetailModel from 'containers/ExpenseDetailModel/ExpenseDetailModel';
import SearchInput, {createFilter} from 'react-search-input';
import styles from './ExpensManagement.scss';
const KEYS_TO_FILTERS = ['expense_createdOn', 'type_name', 'expense_amount', 'membersCount', 'submittedBy', 'status'];

class ExpensManagement extends Component {
  static propTypes = {
    viewExpensList: PropTypes.func,
    viewExpensData: PropTypes.func,
    viewExpensLoaded: PropTypes.boll,
    access_token: PropTypes.string,
    getExpensDetails: PropTypes.func,
    billTypeData: PropTypes.array,
    getBillType: PropTypes.func,
    updateExpensDetails: PropTypes.func,
    deleteExpensDetails: PropTypes.func,
    getExpensLoaded: PropTypes.boll,
  }
  state = {
    addExpensDetailsFlag: false,
    editExpensDetailsFlag: false,
    editExpensDetailsData: {
      expense_id: null,
      expense_date: null,
      expense_amount: null,
      expense_type: null,
      bill_comments: null,
      membersDetails: [],
    },
    showExpensDetailsFlag: false,
    viewExpensData: [],
    expenseId: null,
    viewexpenseId: null,
    flagTrue: true,
    flagFalse: false
  };
  componentWillMount() {
    if (!this.props.viewExpensLoaded) {
      this.props.viewExpensList({authorization: this.props.access_token}).then(res => {
        this.setState({ viewExpensData: res });
      });
    } else {
      this.setState({ viewExpensData: this.props.viewExpensData });
    }
    this.props.getBillType();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ viewExpensData: nextProps.viewExpensData });
  }
  addExpensDetails = () => {
    this.setState({
      addExpensDetailsFlag: !this.state.addExpensDetailsFlag,
    });
  };
  handleEditExpensDetails = (expensData) => {
    this.setState({
      editExpensDetailsFlag: true,
      expenseId: expensData.expense_id
    });
  };

  handleDeleteExpens = (expensData) => {
    this.props.deleteExpensDetails(expensData.expense_id).then(() => {
      this.props.viewExpensList();
    });
  }
  handleEditExpensDetailModelClose = () => {
    this.setState({
      editExpensDetailsFlag: false,

    });
  }
  viewExpensDetails = (expensData) => {
    this.setState({
      showExpensDetailsFlag: true,
      viewexpenseId: expensData.expense_id
    });
  }
  handleViewExpensDetailModelClose = () => {
    this.setState({ showExpensDetailsFlag: false });
  }
  searchUpdated = (term) => {
    const filteredData = this.props.viewExpensData.filter(createFilter(term, KEYS_TO_FILTERS));
    this.setState({viewExpensData: filteredData});
  };
  render() {
    const expensContent = this.state.viewExpensData ? this.state.viewExpensData.map((expensData, index) => (
      <tr key={expensData.expense_id}>
        <td onClick={() => this.viewExpensDetails(expensData)}>{index + 1}</td>
        <td onClick={() => this.viewExpensDetails(expensData)}>{dateFormat(expensData.expense_createdOn, 'mmm dd, yyyy')}</td>
        <td onClick={() => this.viewExpensDetails(expensData)}>{expensData.type_name}</td>
        <td className="centered" onClick={() => this.viewExpensDetails(expensData)}>{expensData.expense_amount}</td>
        <td className="centered" onClick={() => this.viewExpensDetails(expensData)}>{expensData.membersCount}</td>
        <td onClick={() => this.viewExpensDetails(expensData)}>{expensData.submittedBy}</td>
        <td onClick={() => this.viewExpensDetails(expensData)}>{expensData.status}</td>
        {
          expensData.isEdit !== 0 && expensData.status !== 'Rejected' ?
          <td>
            <Button
              bsStyle="primary"
              className="pull-right"
              onClick={() => this.handleEditExpensDetails(expensData)}>
                <Glyphicon glyph="pencil" />
            </Button>
          </td> : <td> </td>
        }
        {
          expensData.isEdit !== 0 && expensData.status !== 'Rejected' ?
          <td>
            <Button
              bsStyle="primary"
              onClick={() => {
                if (confirm('Delete the expens?')) {
                  this.handleDeleteExpens(expensData);
                }
              }}>
              <Glyphicon glyph="trash" />
            </Button>
          </td> : <td> </td>
        }
      </tr>
    )) : null;
    return (
      <div className={styles.home}>
        { !this.props.viewExpensLoaded ? <LoadingIndicator /> :
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Button bsStyle="primary" className={styles.addProjectBtn + ' pull-right'} onClick={this.addExpensDetails}>
                  <Glyphicon glyph="plus" /> Add Expenses
                </Button>
              </div>
            </div>
            <br />
            <SearchInput className="search-input" onChange={this.searchUpdated} />
            <Table responsive className="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th className="centered">Amount</th>
                  <th className="centered"># Members</th>
                  <th>Submitted by</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                { expensContent ?
                  expensContent :
                  <tr>
                    <td colSpan="7">No expenses found.</td>
                  </tr>
                }
              </tbody>
            </Table>
          </div>
        }
        {
          this.state.addExpensDetailsFlag ?
          <AddExpensDetails
            title="Add Expens Details"
            onHide={this.addExpensDetails}
            show
          /> : null
        }
        {
          this.state.editExpensDetailsFlag ?
          <EditExpensDetails
            title="Update Expens Details"
            onHide={this.handleEditExpensDetailModelClose}
            show
            expenseId={this.state.expenseId}
            billTypeData={this.props.billTypeData}
            updateExpensDetails={this.props.updateExpensDetails}
            viewExpensList={this.props.viewExpensList}
          /> : null
        }
        {
          this.state.showExpensDetailsFlag ?
          <ExpenseDetailModel
            title="Expens Details"
            onHide={this.handleViewExpensDetailModelClose}
            show
            getExpensLoaded={this.props.getExpensLoaded}
            viewexpenseId={this.state.viewexpenseId}
          /> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    access_token: state.home.user.access_token,
    viewExpensData: state.expens.viewExpensData,
    viewExpensLoaded: state.expens.viewExpensLoaded,
    billTypeData: state.expens.billTypeData,
    getExpensLoaded: state.expens.getExpensLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(expensActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensManagement);
