import React, { Component, PropTypes } from 'react';
import styles from './TeamLeavesReport.scss';
import { Table } from 'react-bootstrap';
import { orderBy } from 'lodash';
import { LoadingIndicator } from 'components';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['employee_id', 'emp_firstname'];

export default class TeamLeavesReport extends Component {
  static propTypes = {
    teamLeavesReportData: PropTypes.array,
    teamLeavesReportLoaded: PropTypes.bool,
  };

  state = {
    reportData: this.props.teamLeavesReportData,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.teamLeavesReportData !== nextProps.teamLeavesReportData) {
      this.setState({reportData: nextProps.teamLeavesReportData});
    }
  }

  searchUpdated = (term) => {
    const filteredData = this.props.teamLeavesReportData.filter(createFilter(term, KEYS_TO_FILTERS));
    this.setState({reportData: filteredData});
  };

  render() {
    const reportContent = orderBy(this.state.reportData, ['emp_firstname'], ['asc']).map(emp => (
      <tr key={emp.emp_number} onClick={()=>this.viewEmpInfo(emp)}>
        <td>{emp.employee_id}</td>
        <td>{emp.emp_firstname}</td>
        <td className="centered">{emp.carry_forward_leaves ? emp.carry_forward_leaves : 0}</td>
        <td className="centered">{emp.total_leaves ? emp.total_leaves : 0}</td>
        <td className="centered">{emp.sick_leaves ? emp.sick_leaves : 0}</td>
        <td className="centered">{emp.casual_leaves ? emp.casual_leaves : 0}</td>
        <td className="centered">{emp.Earned ? emp.Earned : 0}</td>
        <td className="centered">{emp.unapplied_leaves ? emp.unapplied_leaves : 0}</td>
        <td className="centered">{emp.WorkFromHome ? emp.WorkFromHome : 0}</td>
      </tr>
    ));
    return (
      <div className={styles.teamleaves}>
        <div>
          { !this.props.teamLeavesReportLoaded ? <LoadingIndicator /> :
            <div>
              <SearchInput className="search-input" onChange={this.searchUpdated} />
              <Table responsive className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First name</th>
                    <th className="centered">CF leaves</th>
                    <th className="centered">Total leaves (14)</th>
                    <th className="centered">Sick leaves (2)</th>
                    <th className="centered">Casual leaves (6)</th>
                    <th className="centered">Earned leaves (6)</th>
                    <th className="centered">Unapplied leaves</th>
                    <th className="centered">Work from home</th>
                  </tr>
                </thead>
                <tbody>
                  { reportContent.length ?
                    reportContent :
                    <tr>
                      <td colSpan="7">No data found.</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </div>
          }
        </div>
      </div>
    );
  }
}
