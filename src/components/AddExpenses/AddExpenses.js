import React, { Component, PropTypes } from 'react';
import { includes, uniq, map, isEmpty } from 'lodash';
import { Col } from 'react-bootstrap';

export default class AddExpenses extends Component {
  static propTypes = {
    appendNewMember: PropTypes.func,
    removeCurrentMember: PropTypes.func,
    handleMemberData: PropTypes.func,
    itemIndex: PropTypes.number,
    membersData: PropTypes.shape({
      emp_id: PropTypes.string,
      project_name: PropTypes.string,
      member_id: PropTypes.number,
    }),
    members: PropTypes.array,
    employeesData: PropTypes.array,
  };

  state = {
    emp_id: this.props.membersData.emp_id,
    project_name: this.props.membersData.project_name,
    member_id: this.props.membersData.member_id
  };
  handleFieldChange = (event, key) => {
    const value = !isEmpty(event.target.value) ? event.target.value : '';
    this.setState({
      ...this.state,
      [key]: !isEmpty(value) ? value : null,
    });
    const temp = this.state;
    temp[key] = event.target.value;
    this.handleMemberData(this.props.itemIndex, temp);
  }
  handleMemberData = (itemIndex, temp) => {
    this.props.handleMemberData(itemIndex, temp);
  }
  handleField = (event, key) => {
    const empId = uniq(map(this.props.members, 'emp_id'));
    if (includes(empId, event.target.value)) {
      alert('You have already selected this resource');
      this.setState({ emp_id: null });
    } else {
      this.handleFieldChange(event, key);
    }
  };
  render() {
    const empListContent = this.props.employeesData.map((item, index) => {
      return <option key={item.employee_id + index} value={item.employee_id}>{item.emp_firstname} {item.emp_lastname}</option>;
    });
    return (
      <div>
        <Col md={5} lg={5} sm={5}>
          <div className="form-group">
            <select
              ref={(select) => { this.appliedTo = select; }}
              value={this.state.emp_id || '0'}
              onChange={event => this.handleField(event, 'emp_id') }
            >
              <option value="0">--Select--</option>
              {empListContent}
            </select>
          </div>
        </Col>
        <Col md={5} lg={5} sm={5}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              maxLength="20"
              ref={(input) => { this.taxPercentage = input; }}
              value={this.state.project_name ? this.state.project_name : null }
              onChange={event => this.handleFieldChange(event, 'project_name') }
            />
          </div>
        </Col>
        <Col md={2} lg={2} sm={2}>
          <div className="form-group">
            <input
              type="button"
              className="form-control"
              maxLength="20"
              value={ (this.props.itemIndex + 1) === this.props.members.length ? '+' : 'x' }
              onClick={ (this.props.itemIndex + 1) === this.props.members.length ? this.props.appendNewMember : () => { this.props.removeCurrentMember(this.props.itemIndex); } }
            />
            <label></label>
          </div>
        </Col>
			</div>
    );
  }
}
