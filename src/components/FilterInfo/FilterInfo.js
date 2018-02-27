import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import { Button } from 'react-bootstrap';
import styles from './FilterInfo.scss';

export default class FilterInfo extends Component {
  static propTypes = {
    handleFilter: PropTypes.func,
    handleFilterCancel: PropTypes.func,
    filterinfo: PropTypes.shape({
      start_date: PropTypes.string,
      end_date: PropTypes.string,
      project_type: PropTypes.string,
    }),
  };
  state = {
    start_date: this.props.filterinfo[0].start_date,
    end_date: this.props.filterinfo[0].end_date,
    project_type: this.props.filterinfo[0].project_type,
  };
  handleSDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ start_date: selectedDate });
  }
  handleSDCacel = () => {
    this.setState({ start_date: null });
  }
  handleEDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ end_date: selectedDate });
  }
  handleEDCacel = () => {
    this.setState({ end_date: null });
  }
  handleFieldChange = (name, value) => {
    this.setState({project_type: value });
  };
  submitFilter = () => {
    this.props.handleFilter(this.state.start_date, this.state.end_date, this.state.project_type);
  }
  filterCancel = () => {
    this.props.handleFilterCancel();
  }
  render() {
    return (
      <div className="col-md-12">
        <form>
          <div className="row">
            <div className="col-lg-3">
              <label>Start date:</label>
              <MuiThemeProvider>
                <DatePicker
                  hintText="date"
                  mode="landscape"
                  textFieldStyle={{width: '100%'}}
                  formatDate={this.formatDate}
                  value={this.state.start_date ? new Date(this.state.start_date) : null}
                  onChange={this.handleSDChange}
                  onDismiss={this.handleSDCacel}
                />
              </MuiThemeProvider>
            </div>
            <div className="col-lg-3">
              <label>End date:</label>
              <MuiThemeProvider>
                <DatePicker
                  hintText="date"
                  mode="landscape"
                  textFieldStyle={{width: '100%'}}
                  formatDate={this.formatDate}
                  value={this.state.end_date ? new Date(this.state.end_date) : null}
                  onChange={this.handleEDChange}
                  onDismiss={this.handleEDCacel}
                  minDate={new Date(this.state.start_date)}
                />
              </MuiThemeProvider>
            </div>
            <div className="col-lg-3">
              <label>Project type:</label>
              <select
                className={styles.selectwidth}
                ref={(select) => { this.appliedTo = select; }}
                value={this.state.project_type || '0'}
                onChange={event => this.handleFieldChange('project_type', event.target.value) }>
                <option value="All">All</option>
                <option value="Client">Client</option>
                <option value="Innovation">Innovation</option>
              </select>
            </div>
            <div className={styles.filterActions + ' col-lg-3 text-right row'}>
              <label />
              <Button className="btn btn-space" bsStyle="primary" onClick={this.submitFilter} >Filter</Button>
              <Button className="btn btn-space" bsStyle="primary" onClick={this.filterCancel} >Clear</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
