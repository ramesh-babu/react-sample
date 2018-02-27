import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';
import FilterInfo from 'components/FilterInfo/FilterInfo';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { sumBy, round, orderBy, uniqBy } from 'lodash';
import { Table } from 'react-bootstrap';
import styles from './TeamProjectDetailsView.scss';

export default class TeamProjectDetailsView extends Component {
  static propTypes = {
    teamProjectDetailsData: PropTypes.array,
    teamName: PropTypes.string,
    teamProjectDetailsLoaded: PropTypes.boll,
    handleFilter: PropTypes.func,
    handleFilterCancel: PropTypes.func,
    filterinfo: PropTypes.shape({
      start_date: PropTypes.string,
      end_date: PropTypes.string,
      project_type: PropTypes.string,
    }),
  };
  render() {
    const { teamProjectDetailsData } = this.props;
    if (!this.props.teamProjectDetailsLoaded) {
      return <LoadingIndicator />;
    }
    const teamTotalResourcePercentage = teamProjectDetailsData ? round(sumBy(teamProjectDetailsData.employeeDetails, 'resource_percentage') / teamProjectDetailsData.team_total_resources, 2) : '';
    const activeResourceCount = teamProjectDetailsData.employeeDetails ? uniqBy(teamProjectDetailsData.employeeDetails, 'employee_name').length : 0;
    const resourceContent = teamProjectDetailsData.employeeDetails.length ? orderBy(teamProjectDetailsData.employeeDetails, ['employee_name'], ['asc']).map((resourceData, index) => (
      <tr key={index}>
        <td>{resourceData.employee_name}</td>
        <td>{resourceData.project_name}</td>
        <td className="centered">{resourceData.start_date && resourceData.start_date !== '0000-00-00' ? dateFormat(resourceData.start_date, 'mmm dd, yyyy') : ''}</td>
        <td className="centered">{resourceData.end_date && resourceData.end_date !== '0000-00-00' ? dateFormat(resourceData.end_date, 'mmm dd, yyyy') : ''}</td>
        <td className="centered">{resourceData.no_of_days ? resourceData.no_of_days : '-' }</td>
        <td>{resourceData.resource_percentage}</td>
      </tr>
    )) : null;
    const projectContent = teamProjectDetailsData.projectDetails.length ? teamProjectDetailsData.projectDetails.map((projectData) => (
      <tr key={projectData.project_id}>
        <td>{projectData.project_name}</td>
        <td>{projectData.project_type}</td>
        <td className="centered">{projectData.start_date && projectData.start_date !== '0000-00-00' ? dateFormat(projectData.start_date, 'mmm dd, yyyy') : ''}</td>
        <td className="centered">{projectData.end_date && projectData.end_date !== '0000-00-00' ? dateFormat(projectData.end_date, 'mmm dd, yyyy') : ''}</td>
        <td className="centered">{projectData.no_of_days ? projectData.no_of_days : '-' }</td>
        <td className="centered">{projectData.totalResource}</td>
        <td>{projectData.totalResourcePercentage}</td>
      </tr>
    )) : null;
    return (
      <div className={styles.home}>
        <div className={styles.tablefilterSectioin + ' row'}>
          <div className="col-md-12">
            <h4>Filter</h4>
            <FilterInfo
              handleFilter={this.props.handleFilter}
              handleFilterCancel={this.props.handleFilterCancel}
              filterinfo={this.props.filterinfo}
            />
          </div>
          <div className="col-md-12">
            <h4>Total Utilization</h4>
            <Table responsive className={styles.tableWidth + ' table-hover'}>
              <thead>
                <tr>
                  <th>Resources</th>
                  <th>Active</th>
                  <th>Inactive</th>
                  <th>Team Utilization</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{teamProjectDetailsData.team_total_resources}</td>
                  <td>{activeResourceCount}</td>
                  <td>{teamProjectDetailsData.team_total_resources - activeResourceCount}</td>
                  <td>{teamTotalResourcePercentage ? teamTotalResourcePercentage : 0}%</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="col-md-12">
            <h4>Utilization by Resource</h4>
            <Table responsive className={styles.tableWidth + ' table-hover'}>
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Project</th>
                  <th width="100" className="centered">Start date</th>
                  <th width="100" className="centered">End date</th>
                  <th className="centered">Days</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
              {
                resourceContent
              }
              </tbody>
            </Table>
          </div>
          <div className="col-md-12">
            <h4>Utilization by Project</h4>
            <Table responsive className={styles.tableWidth + ' table-hover'}>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Type</th>
                  <th width="100" className="centered">Start date</th>
                  <th width="100" className="centered">End date</th>
                  <th className="centered">Days</th>
                  <th className="centered">#</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
              {
                projectContent
              }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
