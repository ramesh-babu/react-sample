import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import styles from './Directory.scss';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import * as homeActions from 'redux/modules/home';
import { Table } from 'react-bootstrap';
import { orderBy } from 'lodash';
import { LinkContainer } from 'react-router-bootstrap';
import { LoadingIndicator, EmployeeDetailModel } from 'components';
import { bindActionCreators } from 'redux';
import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['employee_id', 'emp_firstname', 'emp_lastname', 'emp_work_email', 'job_title', 'team_name', 'reporting_to_name', 'skype_id', 'emp_street1'];

class Directory extends Component {
  static propTypes = {
    user: PropTypes.object,
    getAllEmployees: PropTypes.func,
    employeesData: PropTypes.array,
    employeesLoaded: PropTypes.bool,
  };
  state = {
    empData: [],
    viewEmpInfoFlag: false,
    selectedEmpData: null,
    eployeeId: null,
  };
  componentWillMount() {
    if (!this.props.employeesLoaded) {
      this.props.getAllEmployees().then(res => {
        this.setState({ empData: res });
      });
    } else {
      this.setState({ empData: this.props.employeesData });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ empData: nextProps.employeesData });
  }

  viewEmpInfo = (emp) => {
    this.setState({
      viewEmpInfoFlag: true,
      selectedEmpData: emp,
      eployeeId: emp.employee_id,
    });
  };
  handleEmployeeModelClose = () => {
    this.setState({ viewEmpInfoFlag: false });
  }

  searchUpdated = (term) => {
    const filteredData = this.props.employeesData.filter(createFilter(term, KEYS_TO_FILTERS));
    this.setState({empData: filteredData});
  };
  render() {
    const { employeesLoaded } = this.props;
    const employeesContent = orderBy(this.state.empData, ['emp_firstname'], ['asc']).map((emp, index) => (
      <tr key={emp.emp_number}>
        <td onClick={() => this.viewEmpInfo(emp)}>{index + 1}</td>
        <td onClick={() => this.viewEmpInfo(emp)}>{emp.emp_firstname}</td>
        <td onClick={() => this.viewEmpInfo(emp)}>{emp.emp_lastname}</td>
        <td onClick={() => this.viewEmpInfo(emp)}>{emp.emp_work_email}</td>
        <td onClick={() => this.viewEmpInfo(emp)}>{emp.job_title}</td>
        <td onClick={() => this.viewEmpInfo(emp)}>{emp.team_name}</td>
        <td onClick={() => this.viewEmpInfo(emp)}>{emp.reporting_to_name}</td>
        { this.props.user.team_name === 'HR & Admin' ?
          <td>
            <LinkContainer to={'directory/edit/' + emp.emp_number}>
              <Button
                bsStyle="primary"
                className="pull-right"
              >
                <Glyphicon glyph="pencil" />
              </Button>
            </LinkContainer>
          </td> : null }
      </tr>
    ));
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          { !employeesLoaded ? <LoadingIndicator /> :
            <div>
              { this.props.user.team_name === 'HR & Admin' ?
                <div className="row"
                >
                  <div className="col-lg-12">
                    <LinkContainer to="/directory/add">
                      <Button bsStyle="primary" className={'pull-right ' + styles.addEmp}>
                        <Glyphicon glyph="plus" /> Add Employee
                      </Button>
                    </LinkContainer>
                  </div>
                </div> : null
              }
              <div className={styles.directoryPage}>
                <SearchInput className="search-input" onChange={this.searchUpdated} />
                <Table responsive className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Team</th>
                      <th>Reporting to</th>
                      { this.props.user.team_name === 'HR & Admin' ?
                        <th></th> : null }
                    </tr>
                  </thead>
                  <tbody>
                    { employeesContent.length ?
                      employeesContent :
                      <tr>
                        <td colSpan="7">No data found.</td>
                      </tr>
                    }
                  </tbody>
                </Table>
              </div>
            </div>
          }
        </div>
        {
          this.state.viewEmpInfoFlag ?
          <EmployeeDetailModel
            title="Profile Details"
            onHide={this.handleEmployeeModelClose}
            show
            employeeDetails={this.state.selectedEmpData}
          /> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employeesData: state.home.employeesData,
    employeesLoaded: state.home.employeesLoaded,
    user: state.home.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(homeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
