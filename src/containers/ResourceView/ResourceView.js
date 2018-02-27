import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { map, uniq, filter, isEmpty } from 'lodash';
import { Table } from 'react-bootstrap';
import * as resourceActions from 'redux/modules/resource';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import ResourceDetailsView from 'containers/ResourceDetailsView/ResourceDetailsView';
import TeamProjectDetailsView from 'containers/TeamProjectDetailsView/TeamProjectDetailsView';
import styles from './ResourceView.scss';

class ResourceView extends Component {
  static propTypes = {
    employeesLoaded: PropTypes.bool,
    employeesData: PropTypes.array,
    getResourceDetails: PropTypes.func,
    resourceDetailsData: PropTypes.array,
    getTeamProjectsDetails: PropTypes.func,
    teamProjectDetailsData: PropTypes.array,
    teamProjectDetailsLoaded: PropTypes.boll,
    resourceDetailsLoaded: PropTypes.boll,
  };
  state = {
    selectedResource: {
      emp_firstname: null,
      emp_lastname: null
    },
    selectedTeam: null,
    selectedTeamResources: [],
    showTeamProjectFlag: false,
    resourceKeyId: null,
    teamName: null,
    filterinfo: [{
      start_date: null,
      end_date: null,
      project_type: 'All',
    }]
  };
  componentWillMount() {
    if (this.props.employeesLoaded) {
      const teamNames = filter(uniq(map(this.props.employeesData, 'team_name')), (item) => (item !== 'Management' && item !== 'HR & Admin' && item !== 'Business Development' && item !== 'IT Support' && item !== 'SALES'));
      this.setState({
        selectedTeam: teamNames[0],
        teamName: teamNames[0]
      });
      const tempResources = filter(this.props.employeesData, (item ) => item.team_name === teamNames[0]);
      this.setState({ selectedTeamResources: tempResources });
      this.props.getTeamProjectsDetails(teamNames[0]);
      this.setState({
        selectedResource: tempResources[0],
        showTeamProjectFlag: true,
      });
      this.props.getResourceDetails(tempResources[0].employee_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.employeesLoaded && nextProps.employeesLoaded) {
      const teamNames = filter(uniq(map(nextProps.employeesData, 'team_name')), (item) => (item !== 'Management' && item !== 'HR & Admin' && item !== 'Business Development' && item !== 'IT Support' && item !== 'SALES'));
      this.setState({
        selectedTeam: teamNames[0],
        teamName: teamNames[0]
      });
      const tempResources = filter(nextProps.employeesData, (item ) => item.team_name === teamNames[0]);
      this.setState({ selectedTeamResources: tempResources });
      this.props.getTeamProjectsDetails(teamNames[0]);
      this.setState({
        selectedResource: tempResources[0],
        showTeamProjectFlag: true,
      });
      this.props.getResourceDetails(tempResources[0].employee_id);
    }
  }


  viewResourceDetails = (resourceData) => {
    this.setState({
      selectedResource: resourceData,
      showTeamProjectFlag: false,
      resourceKeyId: resourceData.emp_firstname
    });
    this.props.getResourceDetails(resourceData.employee_id);
  };

  viewTeamResourceDetails = (team) => {
    this.setState({ showTeamProjectFlag: false });
    this.setState({
      selectedTeam: team,
      showTeamProjectFlag: true,
      resourceKeyId: null,
      teamName: team,
      filterinfo: [{start_date: null, end_date: null, project_type: 'All'} ]
    });
    // const tempResources = filter(this.props.employeesData, (item ) => item.team_name === team);
    // this.setState({ selectedTeamResources: tempResources });
    this.props.getTeamProjectsDetails(team);
  };
  handleFilter = (startDate, endDate, projectType) => {
    if (!isEmpty(startDate) || !isEmpty(endDate) || !isEmpty(projectType)) {
      this.props.getTeamProjectsDetails(this.state.teamName, startDate, endDate, projectType);
    }
    this.setState({
      filterinfo: [{start_date: startDate, end_date: endDate, project_type: projectType} ]
    });
  }
  handleFilterCancel = () => {
    this.setState({
      filterinfo: [{start_date: null, end_date: null, project_type: 'All'} ]
    });
    this.props.getTeamProjectsDetails(this.state.teamName);
  }
  render() {
    const { employeesLoaded } = this.props;
    const teamNames = filter(uniq(map(this.props.employeesData, 'team_name')), (item) => (item !== 'Management' && item !== 'HR & Admin' && item !== 'Business Development' && item !== 'IT Support' && item !== 'SALES'));
    const teamNamesContent = teamNames.map((team, index) => (
        <tr className={team === this.state.selectedTeam ? 'bg-primary' : null} key={index}>
          <td onClick={()=>this.viewTeamResourceDetails(team)}>{team}</td>
        </tr>
    ));
    // const resourceContent = this.state.selectedTeamResources.map((emp) => (
    //     <tr className={emp.emp_firstname === this.state.selectedTeamResources.emp_firstname ? 'bg-primary' : null} key={emp.emp_number}>
    //       <td onClick={()=>this.viewResourceDetails(emp)}>{emp.emp_firstname} {emp.emp_lastname}</td>
    //     </tr>
    // ));
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          { !employeesLoaded ? <LoadingIndicator /> :
            <div className="row">
              <div className={styles.leftLidebar + ' col-sm-3'}>
                <Table responsive className="table-hover">
                  <thead>
                    <tr>
                      <th>Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamNamesContent}
                  </tbody>
                </Table>
              </div>
              {/* resourceContent.length ?
                <div className={styles.leftLidebar + ' col-sm-3'}>
                  <Table responsive className="table-hover">
                    <thead>
                      <tr>
                        <th>Resource</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resourceContent}
                    </tbody>
                  </Table>
                </div> : null */}
              <div className="col-sm-9">
              {
                this.state.showTeamProjectFlag ?
                <TeamProjectDetailsView
                  handleFilter={this.handleFilter}
                  handleFilterCancel={this.handleFilterCancel}
                  filterinfo={this.state.filterinfo}
                  teamProjectDetailsLoaded={this.props.teamProjectDetailsLoaded}
                  teamName={this.state.teamName}
                  teamProjectDetailsData={this.props.teamProjectDetailsData}
                /> :
                <ResourceDetailsView
                  resourceDetailsLoaded={this.props.resourceDetailsLoaded}
                  selectedResource={this.state.selectedResource}
                  resourceData={this.props.resourceDetailsData}
                />
              }
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employeesData: state.home.employeesData,
    employeesLoaded: state.home.employeesLoaded,
    resourceDetailsData: state.resource.resourceDetailsData,
    teamProjectDetailsData: state.resource.teamProjectDetailsData,
    teamProjectDetailsLoaded: state.resource.teamProjectDetailsLoaded,
    resourceDetailsLoaded: state.resource.resourceDetailsLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(resourceActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView);
