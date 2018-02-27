import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import dateFormat from 'dateformat';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import BulletGraph from 'react-bullet-graph';
import { round, sumBy, map } from 'lodash';
import styles from './ProjectDetailsView.scss';

export default class ProjectDetailsView extends Component {
  static propTypes = {
    selectedProject: PropTypes.object,
    projectDetailsData: PropTypes.array,
    projectDetailsLoaded: PropTypes.boll
  };
  render() {
    const { projectDetailsData } = this.props;
    if (!this.props.projectDetailsLoaded) {
      return <LoadingIndicator />;
    }
    const realResourceDays = sumBy(map(this.props.projectDetailsData.resourceDetails, 'no_of_days'));
    const estimatedResourceDays = sumBy(map(this.props.projectDetailsData.estimatedResources, 'no_of_days'));
    const resourceContent = this.props.projectDetailsData.resourceDetails.map((resourceData, index) => (
      <tr key={resourceData.resource_id}>
        <td>{index + 1}</td>
        <td>{resourceData.emp_firstname} {resourceData.emp_lastname}</td>
        <td>{resourceData.emp_team}</td>
        <td className="centered">{resourceData.start_date && resourceData.start_date !== '0000-00-00' ? dateFormat(resourceData.start_date, 'mmm dd, yyyy') : ''} </td>
        <td className="centered">{resourceData.end_date && resourceData.end_date !== '0000-00-00' ? dateFormat(resourceData.end_date, 'mmm dd, yyyy') : ''}</td>
        <td className="centered">{resourceData.no_of_days}</td>
        <td className="centered">{resourceData.resource_percentage}%</td>
      </tr>
    ));
    const milestonesContent = projectDetailsData.milestoneDetails ? projectDetailsData.milestoneDetails.map((milestoneData, index) => (
      <tr key={milestoneData.id}>
        <td>{index + 1}</td>
        <td>{milestoneData.milestone_title}</td>
        <td>{milestoneData.start_date !== '0000-00-00' ? dateFormat(milestoneData.start_date, 'mmm dd, yyyy') : ''}</td>
        <td>{milestoneData.milestone_status}</td>
        <td>{milestoneData.milestone_comments}</td>
      </tr>
    )) : null;
    const estimatedResourcesContent = this.props.projectDetailsData.estimatedResources.map((resourceData, index) => (
      <tr key={resourceData.resource_id}>
        <td>{index + 1}</td>
        <td>{resourceData.emp_firstname} {resourceData.emp_lastname}</td>
        <td>{resourceData.emp_team}</td>
        <td className="centered">{resourceData.start_date && resourceData.start_date !== '0000-00-00' ? dateFormat(resourceData.start_date, 'mmm dd, yyyy') : ''} </td>
        <td className="centered">{resourceData.end_date && resourceData.end_date !== '0000-00-00' ? dateFormat(resourceData.end_date, 'mmm dd, yyyy') : ''}</td>
        <td className="centered">{resourceData.no_of_days}</td>
        <td className="centered">{resourceData.resource_percentage}%</td>
      </tr>
    ));
    const estimatedMilestonesContent = projectDetailsData.estimatedMilestones ? projectDetailsData.estimatedMilestones.map((milestoneData, index) => (
      <tr key={milestoneData.id}>
        <td>{index + 1}</td>
        <td>{milestoneData.milestone_title}</td>
        <td>{milestoneData.start_date !== '0000-00-00' ? dateFormat(milestoneData.start_date, 'mmm dd, yyyy') : '' }</td>
        <td>{milestoneData.milestone_status}</td>
        <td>{milestoneData.milestone_comments}</td>
      </tr>
    )) : null;
    return (
      <div className={styles.home}>
        {this.props.selectedProject ?
          <div>
            <div className={styles.projectInfo + ' row'}>
              <div className="col-md-6">
                  <div><label><strong>Name:</strong> {this.props.selectedProject.project_name}</label></div>
                  <div><label><strong>Start date:</strong> {this.props.selectedProject.start_date && this.props.selectedProject.start_date !== '0000-00-00' ? dateFormat(this.props.selectedProject.start_date, 'mmm dd, yyyy') : ''}</label></div>
                  <div><label><strong>End date:</strong> {this.props.selectedProject.end_date && this.props.selectedProject.end_date !== '0000-00-00' ? dateFormat(this.props.selectedProject.end_date, 'mmm dd, yyyy') : ''}</label></div>
                  <div><label><strong>Project type:</strong> {this.props.selectedProject.project_type ? this.props.selectedProject.project_type : '-'}</label></div>
                  <div><label><strong>Estimated start date:</strong> {this.props.selectedProject.est_start_date && this.props.selectedProject.est_start_date !== '0000-00-00' ? dateFormat(this.props.selectedProject.est_start_date, 'mmm dd, yyyy') : ''}</label></div>
                  <div><label><strong>Estimated end date:</strong> {this.props.selectedProject.est_end_date && this.props.selectedProject.est_end_date !== '0000-00-00' ? dateFormat(this.props.selectedProject.est_end_date, 'mmm dd, yyyy') : ''}</label></div>
              </div>
              <div className="col-md-6">
                { estimatedResourceDays ?
                  <div>
                    <h4>Resource utilization</h4>
                    <BulletGraph
                      scaleMin={0}
                      scaleMax={estimatedResourceDays + (estimatedResourceDays * 0.3)}
                      performanceVal={realResourceDays}
                      symbolMarker={realResourceDays}
                      badVal={estimatedResourceDays}
                      satisfactoryVal={estimatedResourceDays + (estimatedResourceDays * 0.1)}
                      badColor={"#3cad7b"}
                      satisfactoryColor={"#ffb300"}
                      goodColor={"#dc2727"}
                      isActiveColor
                      opacity={1}
                      width={400}
                    />
                  </div> : null}
                  { estimatedResourceDays ?
                    <ul className={styles.resoureceUtilization}>
                      <li>Estimated days({estimatedResourceDays})</li>
                      <li>Warning({round(estimatedResourceDays + (estimatedResourceDays * 0.1))})</li>
                      <li>Danger({round(estimatedResourceDays + (estimatedResourceDays * 0.3))})</li>
                      <li>Actual days({realResourceDays})</li>
                    </ul> : null }
              </div>
            </div>
            <h4 className={styles.heading}>Resources:</h4>
            <Table responsive className="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th className="centered">Start date</th>
                  <th className="centered">End date</th>
                  <th className="centered"># Days</th>
                  <th className="centered">%</th>
                </tr>
              </thead>
              <tbody>
                {
                  resourceContent.length ? resourceContent :
                  <tr>
                    <td colSpan="7" className="centered">No resources found.</td>
                  </tr>
                }
              </tbody>
            </Table>
            <h4 className={styles.heading}>Milestones:</h4>
            <Table responsive className="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Milestone title</th>
                  <th>Start date</th>
                  <th>Status</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
              {
                milestonesContent.length ? milestonesContent :
                <tr>
                  <td colSpan="6" className="centered">No milestones found.</td>
                </tr>
              }
              </tbody>
            </Table>
            <h4 className={styles.heading}>Estimated Resources:</h4>
            <Table responsive className="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th className="centered">Start date</th>
                  <th className="centered">End date</th>
                  <th className="centered"># Days</th>
                  <th className="centered">%</th>
                </tr>
              </thead>
              <tbody>
                {
                  estimatedResourcesContent.length ? estimatedResourcesContent :
                  <tr>
                    <td colSpan="7" className="centered">No resources found.</td>
                  </tr>
                }
              </tbody>
            </Table>
            <h4 className={styles.heading}>Estimated Milestones:</h4>
            <Table responsive className="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Milestone title</th>
                  <th>Start date</th>
                  <th>Status</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
              {
                estimatedMilestonesContent.length ? estimatedMilestonesContent :
                <tr>
                  <td colSpan="6" className="centered">No milestones found.</td>
                </tr>
              }
              </tbody>
            </Table>
          </div> : null }
      </div>
    );
  }
}
