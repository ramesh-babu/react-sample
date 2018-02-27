import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import dateFormat from 'dateformat';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import styles from './ResourceDetailsView.scss';

export default class ResourceDetailsView extends Component {
  static propTypes = {
    resourceData: PropTypes.array,
    selectedResource: PropTypes.object,
    resourceDetailsLoaded: PropTypes.boll
  };
  render() {
    if (!this.props.resourceDetailsLoaded) {
      return <LoadingIndicator />;
    }
    const resourceContent = this.props.resourceData.map((projectData, index) => (
      <tr key={projectData.resource_id}>
        <td>{index + 1}</td>
        <td>{projectData.project_name}</td>
        <td>{projectData.start_date ? dateFormat(projectData.start_date, 'mmm dd, yyyy') : '-'}</td>
        <td>{projectData.end_date ? dateFormat(projectData.end_date, 'mmm dd, yyyy') : '-'}</td>
        <td>{projectData.no_of_days ? projectData.no_of_days : '-' }</td>
        <td>{projectData.resource_percentage}%</td>
      </tr>
    ));
    return (
      <div className={styles.home}>
        {this.props.selectedResource.emp_firstname ?
          <div>
            <div className={styles.resourceInfo + ' row'}>
              <div className="col-md-6">
                  <div><label><strong>Name:</strong> {this.props.selectedResource.emp_firstname} {this.props.selectedResource.emp_lastname}</label></div>
                  <div><label><strong># ID:</strong> {this.props.selectedResource.employee_id}</label></div>
              </div>
            </div>
            <Table responsive className="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Days</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {
                  resourceContent.length ? resourceContent :
                  <tr>
                    <td colSpan="4" className="centered">No projects found.</td>
                  </tr>
                }
              </tbody>
            </Table>
          </div> : null }
      </div>
    );
  }
}
