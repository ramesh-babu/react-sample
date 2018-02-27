import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { LoadingIndicator } from 'components';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import Helmet from 'react-helmet';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import Table from 'react-bootstrap/lib/Table';
import * as holidaysActions from 'redux/modules/holidays';
import AddHolidaysDetailsModel from 'components/AddHolidaysDetailsModel/AddHolidaysDetailsModel';
import EditHolidaysDetailsModel from 'components/EditHolidaysDetailsModel/EditHolidaysDetailsModel';
import dateFormat from 'dateformat';
import styles from './Holidays.scss';

class Holidays extends Component {
  static propTypes = {
    user: PropTypes.object,
    holidaysData: PropTypes.array,
    getHolidays: PropTypes.func,
    holidaysLoaded: PropTypes.bool,
    addHolidaysDetails: PropTypes.func,
    deleteHolidaysDetails: PropTypes.func,
    updateHolidaysDetails: PropTypes.func,
  }
  state = {
    addHolidaysDetailsFlag: false,
    editHolidaysDetailsFlag: false,
    editHolidaysDetailsData: [],
    year: null,
    current_year: null,
    previous_year: null,
    next_year: null,
    showYearFilter: false,
  };
  componentWillMount() {
    const date = new Date();
    if (!this.props.holidaysLoaded) {
      this.props.getHolidays(date.getFullYear());
    }
    this.setState({
      current_year: date.getFullYear(),
      previous_year: date.getFullYear() - 1,
      next_year: date.getFullYear() + 1,
      year: date.getFullYear()
    });
  }
  handleAddHolidaysDetails = () => {
    this.setState({
      addHolidaysDetailsFlag: !this.state.addHolidaysDetailsFlag,
    });
  };
  handleEditHolidayDetails = (holiday) => {
    this.setState({
      editHolidaysDetailsFlag: !this.state.editHolidaysDetailsFlag,
      editHolidaysDetailsData: holiday
    });
  };
  handleDeleteHoliday = (holiday) => {
    this.props.deleteHolidaysDetails(holiday.holiday_id).then(() => {
      this.props.getHolidays(this.state.year
        );
    });
  }
  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : null,
    });
    this.props.getHolidays(value);
  }
  render() {
    const { holidaysLoaded } = this.props;
    const countryHolidaysContent = (holidays) => {
      const temp = holidays.map((holiday, index) => (
        <tr key={holiday.holiday_id}>
          <td>{index + 1}</td>
          <td>{holiday.holiday_name}</td>
          <td>{dateFormat(holiday.holiday_date, 'mmm dd, yyyy')}</td>
          <td className="centered">{holiday.is_optional ? 'Yes' : '-'}</td>
          { this.props.user.team_name === 'HR & Admin' ?
            <td className="centered">
              <Button
                bsStyle="primary"
                onClick={() => this.handleEditHolidayDetails(holiday)}>
                  <Glyphicon glyph="pencil" />
              </Button>
              <Button
                bsStyle="primary"
                onClick={() => {
                  if (confirm('Delete the holiday?')) {
                    this.handleDeleteHoliday(holiday);
                  }
                }}>
                <Glyphicon glyph="trash" />
              </Button>
            </td> : null
          }
        </tr>
      ));
      return temp;
    };

    const holidaysContent = this.props.holidaysData.map(countryHolidays => (
    	<Tab eventKey={countryHolidays.nation_id} title={countryHolidays.nation_name}>
        { countryHolidays.holidays.length ?
          <div>
            <Table responsive className="table-hover table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Holiday</th>
                  <th>Date</th>
                  <th className="centered">Optional</th>
                  { this.props.user.team_name === 'HR & Admin' ?
                    <th className="centered">Actions</th> : null
                  }
                </tr>
              </thead>
              <tbody>
                {countryHolidaysContent(countryHolidays.holidays)}
              </tbody>
            </Table>
          </div> : <h2 className={styles.noFound}>No holidays for this region...</h2>
        }
      </Tab>
    ));
    return (
      <div className={styles.holidaysPage}>
        <Helmet title="Holidays"/>
        <div className="container">
          <div className={styles.filterSection}>
            <div className="pull-right">
              <div className="form-inline">
                { this.state.showYearFilter ?
                  <div className="form-group">
                    <label><span className="error">*</span>Year filter</label>
                    <select
                      ref={(select) => { this.appliedTo = select; }}
                      className="form-control"
                      value={this.state.year || ''}
                      onChange={event => this.handleFieldChange(event, 'year') }
                      >
                      <option value="">--Select--</option>
                      <option key="0" value={this.state.previous_year}>{this.state.previous_year}</option>
                      <option key="1" value={this.state.current_year}>{this.state.current_year}</option>
                      <option key="2" value={this.state.next_year}>{this.state.next_year}</option>
                    </select>
                  </div> : null
                }
                <div className="form-group">
                  { this.props.user.team_name === 'HR & Admin' ?
                    <Button bsStyle="primary" className={styles.addProjectBtn} onClick={this.handleAddHolidaysDetails}>
                      <Glyphicon glyph="plus" /> Add Holiday
                    </Button> : null
                  }
                </div>
              </div>
            </div>
          </div>
          { !holidaysLoaded ? <LoadingIndicator /> :
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              {holidaysContent}
            </Tabs>
          }
          {
            this.state.addHolidaysDetailsFlag ?
            <AddHolidaysDetailsModel
              title="Add Holidays Details"
              onHide={this.handleAddHolidaysDetails}
              show
              holidaysData={this.props.holidaysData}
              addHolidaysDetails={this.props.addHolidaysDetails}
              getHolidays={this.props.getHolidays}
              year={this.state.year}
            /> : null
          }
          {
            this.state.editHolidaysDetailsFlag ?
            <EditHolidaysDetailsModel
              title="Update Holidays Details"
              onHide={this.handleEditHolidayDetails}
              show
              holidaysData={this.props.holidaysData}
              editHolidaysDetailsData={this.state.editHolidaysDetailsData}
              updateHolidaysDetails={this.props.updateHolidaysDetails}
              getHolidays={this.props.getHolidays}
              year={this.state.year}
            /> : null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    holidaysData: state.holidays.holidaysData,
    holidaysLoaded: state.holidays.holidaysLoaded,
    user: state.home.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(holidaysActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Holidays);
