import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { CSVLink } from 'react-csv';
import * as timesheetActions from 'redux/modules/timesheet';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { LoadingIndicator, TimesheetDetailModel, AddTimesheetModal } from 'components';
import { bindActionCreators } from 'redux';
import SearchInput, {createFilter} from 'react-search-input';
import styles from './Timesheet.scss';

const KEYS_TO_FILTERS = ['task_date', 'project_name', 'description', 'no_of_hours'];

class Timesheet extends Component {
  static propTypes = {
    user: PropTypes.object,
    getTimesheet: PropTypes.func,
    timesheetData: PropTypes.array,
    timesheetLoaded: PropTypes.bool,
    projectsListData: PropTypes.array,
    projectsListLoaded: PropTypes.bool,
    getProjectsList: PropTypes.func,
    submitTimesheet: PropTypes.func,
    submitTimesheetLoaded: PropTypes.bool,
  };

  state = {
    tsData: [],
    viewTsInfoFlag: false,
    selectedTsData: null,
    addTimesheetFlag: false,
  };

  componentWillMount() {
    if (!this.props.timesheetLoaded) {
      this.props.getTimesheet(this.props.user.emp_number).then(res => {
        this.setState({ tsData: res });
      });
    } else {
      this.setState({ tsData: this.props.timesheetData });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.submitTimesheetLoaded && nextProps.submitTimesheetLoaded) {
      this.props.getTimesheet(this.props.user.emp_number).then(res => {
        this.setState({ tsData: res });
      });
    }
  }

  viewTimesheetInfo = (timesheet) => {
    this.setState({
      viewTsInfoFlag: true,
      selectedTsData: timesheet,
    });
  };

  handleTimesheetModelClose = () => {
    this.setState({ viewTsInfoFlag: false });
  }

  searchUpdated = (term) => {
    const filteredData = this.props.timesheetData.filter(createFilter(term, KEYS_TO_FILTERS));
    this.setState({tsData: filteredData});
  };

  addTimesheet = () => {
    this.setState({addTimesheetFlag: true});
  };

  handleSubmitTimesheetRequest = (data) => {
    const requestData = {
      ...data,
      employee_id: this.props.user.emp_number
    };
    this.props.submitTimesheet(requestData);
  }

  handleAddTimesheetModalClose = () => {
    this.setState({addTimesheetFlag: false});
  };

  render() {
    const { timesheetLoaded } = this.props;
    const downloadData = [];
    const timesheetContent = this.state.tsData.map((timesheet, index) => {
      downloadData.push({
        date: timesheet.task_date,
        project: timesheet.project_name,
        description: timesheet.description,
        hours: timesheet.no_of_hours
      });
      return (<tr key={timesheet.timesheet_id} onClick={()=>this.viewTimesheetInfo(timesheet)}>
        <td className="centered">{index + 1}</td>
        <td>{timesheet.task_date}</td>
        <td>{timesheet.project_name}</td>
        <td>{timesheet.description.substring(0, 100)}</td>
        <td className="centered">{timesheet.no_of_hours}</td>
      </tr>);
    });
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="pull-left">
                <CSVLink data={downloadData} filename={ this.props.user.employee_id + '-timesheet.csv'} >Click here to download CSV file</CSVLink>
              </span>
              <Button bsStyle="primary" className="pull-right" onClick={this.addTimesheet}>
                <Glyphicon glyph="plus" /> Add Activity
              </Button>
            </div>
          </div>
          <br />
          { !timesheetLoaded ? <LoadingIndicator /> :
            <div className="row">
              <div className="col-lg-12">
                <SearchInput className="search-input" onChange={this.searchUpdated} />
                <Table responsive className="table-hover">
                  <thead>
                    <tr>
                      <th className="centered">#</th>
                      <th>Date</th>
                      <th>Project</th>
                      <th>Description</th>
                      <th className="centered"># No of hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    { timesheetContent.length ?
                      timesheetContent :
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
          this.state.viewTsInfoFlag ?
          <TimesheetDetailModel
            title="Activity Details"
            onHide={this.handleTimesheetModelClose}
            show
            timesheetDetails={this.state.selectedTsData}
          /> : null
        }
        {
          this.state.addTimesheetFlag ?
          <AddTimesheetModal
            title="Add Activity"
            onHide={this.handleAddTimesheetModalClose}
            show
            getProjectsList={this.props.getProjectsList}
            projectsListLoaded={this.props.projectsListLoaded}
            projectsListData={this.props.projectsListData}
            submitTimesheetRequest={this.handleSubmitTimesheetRequest}
            submitTimesheetLoaded={this.props.submitTimesheetLoaded}
          /> : null
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.home.user,
    timesheetData: state.timesheet.timesheetData,
    timesheetLoaded: state.timesheet.timesheetLoaded,
    projectsListData: state.timesheet.projectsListData,
    projectsListLoaded: state.timesheet.projectsListLoaded,
    submitTimesheetLoaded: state.timesheet.submitTimesheetLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(timesheetActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timesheet);
