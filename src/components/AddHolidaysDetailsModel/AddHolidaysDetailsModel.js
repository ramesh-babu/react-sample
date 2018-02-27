import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import { Alert, Button, Modal } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import styles from './AddHolidaysDetailsModel.scss';
const initialState = {
  holiday_date: null,
  holiday_name: null,
  is_optional: 0,
  nation_id: null,
};
export default class AddHolidaysDetailsModel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    holidaysData: PropTypes.array,
    addHolidaysDetails: PropTypes.func,
    getHolidays: PropTypes.func,
    year: PropTypes.string,
  }
  state = {
    ...initialState,
    addHolidayDetailsSuccess: null,
  };
  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : null,
    });
    if (key === 'is_optional') {
      const val = !isEmpty(event.target.checked) ? event.target.checked : event.target.checked;
      this.setState({
        ...this.state,
        [key]: val ? 1 : 0,
      });
    }
  }
  handleHDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ holiday_date: selectedDate });
  }
  handleHDCacel = () => {
    this.setState({ holiday_date: null });
  }
  handleAlertDismiss = () => {
    this.setState({addHolidayDetailsSuccess: null});
  }

  handleSubmit = () => {
    this.props.addHolidaysDetails({
      nation_id: this.state.nation_id,
      holiday_name: this.state.holiday_name,
      is_optional: this.state.is_optional,
      holiday_date: this.state.holiday_date,
    }).then(response => {
      if (response.message === 'Holiday added successfully') {
        this.setState({ ...initialState, addHolidayDetailsSuccess: response.message });
        this.props.getHolidays(this.props.year);
      }
      if (response.message === 'Holiday already exists on this date') {
        this.setState({ addHolidayDetailsSuccess: response.message });
      }
    });
  }
  render() {
    const { title, onHide, show } = this.props;
    const nationListContent = this.props.holidaysData.map((item, index) => {
      return <option key={item.nation_id + index} value={item.nation_id}>{item.nation_name}</option>;
    });
    return (
    <Modal bsSize="sm" show={show} onHide={onHide}>
      <Modal.Header closeButton className={styles.modelHeader}>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modelBody}>
      <form onSubmit={this.handleSubmit} className={styles.addHoliday}>
        { this.state.addHolidayDetailsSuccess ?
            <div className="row">
              <div className="col-lg-12">
                <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                  <strong>{this.state.addHolidayDetailsSuccess}.</strong>
                </Alert>
              </div>
            </div> : null
        }
        <Row>
          <Col md={12} lg={12} sm={12}>
            <div className="form-group">
              <label><span className="error">*</span>Location name </label>
              <select
                ref={(select) => { this.appliedTo = select; }}
                value={this.state.nation_id || ''}
                onChange={event => this.handleFieldChange(event, 'nation_id') }
                >
                <option value="">--Select--</option>
                {nationListContent}
              </select>
            </div>
          </Col>
          <Col md={12} lg={12} sm={12}>
            <label><span className="error">*</span>Holiday date:</label>
            <MuiThemeProvider>
              <DatePicker
                hintText="Choose a date"
                mode="landscape"
                textFieldStyle={{width: '100%'}}
                formatDate={this.formatDate}
                value={this.state.holiday_date ? new Date(this.state.holiday_date) : null}
                onChange={this.handleHDChange}
                onDismiss={this.handleHDCacel}
                minDate={new Date()}
              />
            </MuiThemeProvider>
          </Col>
          <Col md={12} lg={12} sm={12}>
            <div className="form-group">
              <label><span className="error">*</span>Holiday name</label>
              <input
               className="form-control"
               placeholder="Holiday"
               value={this.state.holiday_name}
               onChange={(event) => this.handleFieldChange(event, 'holiday_name')}
              />
            </div>
          </Col>
          <Col md={12} lg={12} sm={12}>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value={this.state.is_optional}
                  checked={this.state.is_optional}
                  onChange={(event) => this.handleFieldChange(event, 'is_optional')}
                /> <span>Is optional</span>
              </label>
            </div>
          </Col>
        </Row>
        <div className="row">
          <div className="col-lg-12">
            <label />
            <Button bsStyle="primary" className="pull-right" onClick={this.handleSubmit}
              disabled={
               isEmpty(this.state.nation_id) ||
               isEmpty(this.state.holiday_name) ||
               isEmpty(this.state.holiday_date)
              }
            >Add</Button>
          </div>
        </div>
      </form>
      </Modal.Body>
    </Modal>
    );
  }
}
