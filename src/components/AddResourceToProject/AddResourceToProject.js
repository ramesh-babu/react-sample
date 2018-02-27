import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import ReactDOM from 'react-dom';
import { includes, uniq, map, filter } from 'lodash';
import { Row, Col } from 'react-bootstrap';

export default class AddResourceToProject extends Component {
  static propTypes = {
    appendNewResource: PropTypes.func,
    removeCurrentResource: PropTypes.func,
    handleResourceData: PropTypes.func,
    itemIndex: PropTypes.number,
    resourceData: PropTypes.shape({
      work_percentage: PropTypes.string,
      emp_id: PropTypes.string,
      resource_id: PropTypes.number,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
      resource_role: PropTypes.string,
      resource_type: PropTypes.string,
    }),
    resources: PropTypes.array,
    employeesData: PropTypes.array,
    projectStartDate: PropTypes.string,
    projectEndDate: PropTypes.string,
  };

  state = {
    work_percentage: this.props.resourceData.work_percentage,
    emp_id: this.props.resourceData.emp_id,
    resource_id: this.props.resourceData.resource_id,
    start_date: this.props.resourceData.start_date,
    end_date: this.props.resourceData.end_date,
    resource_role: this.props.resourceData.resource_role,
    resource_type: this.props.resourceData.resource_type,
    falg: true,
  };
  handleSDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.handleFieldChange('start_date', selectedDate);
  }
  handleSDCacel = () => {
    this.setState({ start_date: null });
    this.handleFieldChange('start_date', null);
  }
  handleEDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    // this.setState({ end_date: selectedDate });
    this.handleFieldChange('end_date', selectedDate);
  }
  handleEDCacel = () => {
    // this.setState({ end_date: null });
    this.handleFieldChange('end_date', null);
  }
  handleFieldChange = (name, value) => {
    const temp = this.state;
    temp[name] = value;
    this.props.handleResourceData(this.props.itemIndex, temp);
  };
  handleField = (name, value) => {
    let empId = uniq(map(this.props.resources, 'emp_id'));
    empId = filter(empId, (EmpId) => {
      return EmpId !== '0';
    });
    if (includes(empId, value)) {
      alert('You have already selected this resource');
      this.setState({ emp_id: null });
    } else {
      this.handleFieldChange(name, value);
    }
  };
  HandleTypeE = () => {
    ReactDOM.findDOMNode(this).addEventListener('keypress', (evt) => {
      if (evt.keyCode === 101 || evt.keyCode === 69) {
        evt.preventDefault();
      }
    });
  }
  handleWorkPercentageField = (name, value) => {
    if (name === 'work_percentage') {
      if (parseInt(value, 10) > 100) {
        this.setState({ work_percentage: null });
      } else {
        this.handleFieldChange(name, value);
      }
    }
  }
  render() {
    const resourcesListContent = this.props.employeesData.map((item, index) => {
      return <option key={item.employee_id + index} value={item.employee_id}>{item.emp_firstname} {item.emp_lastname}</option>;
    });
    return (
      <Row>
        <Col md={3} lg={3} sm={3}>
          <div className="form-group">
            <select
              ref={(select) => { this.appliedTo = select; }}
              value={this.props.resourceData.emp_id || '0'}
              onChange={event => this.handleField('emp_id', event.target.value) }
            >
              <option value="0">--Select--</option>
              {resourcesListContent}
            </select>
          </div>
        </Col>
        <Col md={2} lg={2} sm={2}>
          <div className="form-group">
            <input
             className="form-control"
             placeholder="Role"
             value={this.props.resourceData.resource_role}
             onChange={(event) => this.handleFieldChange('resource_role', event.target.value)}
            />
          </div>
        </Col>
				<Col md={2} lg={2} sm={2}>
					<div className="form-group">
						<input
              type="number"
              className="form-control"
              maxLength="3"
              min="1"
              max="100"
              ref={(input) => { this.workPercentage = input; }}
              value={this.props.resourceData.work_percentage ? this.props.resourceData.work_percentage : null }
              onFocus={this.HandleTypeE}
              onChange={event => this.handleWorkPercentageField('work_percentage', event.target.value) }
            />
					</div>
        </Col>
        <Col md={2} lg={2} sm={2}>
          <MuiThemeProvider>
            <DatePicker
              hintText="Choose a date"
              mode="landscape"
              textFieldStyle={{width: '100%'}}
              formatDate={this.formatDate}
              value={this.props.resourceData.start_date ? new Date(this.props.resourceData.start_date) : null}
              onChange={this.handleSDChange}
              onDismiss={this.handleSDCacel}
              minDate={this.props.projectStartDate ? new Date(this.props.projectStartDate) : null}
              maxDate={this.props.projectEndDate ? new Date(this.props.projectEndDate) : null}
            />
          </MuiThemeProvider>
        </Col>
        <Col md={2} lg={2} sm={2}>
          <MuiThemeProvider>
            <DatePicker
              hintText="Choose a date"
              mode="landscape"
              textFieldStyle={{width: '100%'}}
              formatDate={this.formatDate}
              value={this.props.resourceData.end_date ? new Date(this.props.resourceData.end_date) : null}
              onChange={this.handleEDChange}
              onDismiss={this.handleEDCacel}
              minDate={this.state.start_date ? new Date(this.state.start_date) : new Date(this.props.projectStartDate)}
              maxDate={this.props.projectEndDate ? new Date(this.props.projectEndDate) : null}
            />
          </MuiThemeProvider>
        </Col>
        <Col md={1} lg={1} sm={1}>
          <div className="form-group">
            <input
              type="button"
              className="form-control"
              maxLength="20"
              value={ (this.props.itemIndex + 1) === this.props.resources.length ? '+' : 'x' }
              onClick={ (this.props.itemIndex + 1) === this.props.resources.length ? this.props.appendNewResource : () => { this.props.removeCurrentResource(this.props.itemIndex); } }
            />
            <label></label>
          </div>
        </Col>
			</Row>
    );
  }
}
