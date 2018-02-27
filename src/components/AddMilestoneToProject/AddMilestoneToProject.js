import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import { Row, Col } from 'react-bootstrap';

export default class AddMilestoneToProject extends Component {
  static propTypes = {
    appendNewMilestone: PropTypes.func,
    removeCurrentMilestone: PropTypes.func,
    handleMilestoneData: PropTypes.func,
    itemIndex: PropTypes.number,
    milestoneData: PropTypes.shape({
      milestone_title: PropTypes.string,
      milestone_id: PropTypes.string,
      start_date: PropTypes.string,
      milestone_status: PropTypes.string,
      milestone_comments: PropTypes.string,
      milestone_type: PropTypes.string,
    }),
    milestones: PropTypes.array,
    projectStartDate: PropTypes.string,
    projectEndDate: PropTypes.string,
  };

  state = {
    milestone_title: this.props.milestoneData.milestone_title,
    milestone_id: this.props.milestoneData.milestone_id,
    start_date: this.props.milestoneData.start_date,
    milestone_status: this.props.milestoneData.milestone_status,
    milestone_comments: this.props.milestoneData.milestone_comments,
    milestone_type: this.props.milestoneData.milestone_type,
  };

  handleSDChange = (event, date) => {
    const dDate = new Date(date);
    const selectedDate = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + dDate.getDate();
    this.setState({ start_date: selectedDate });
    this.handleFieldChange('start_date', selectedDate);
  }
  handleSDCacel = () => {
    this.setState({ start_date: null });
  }
  handleFieldChange = (name, value) => {
    const temp = this.state;
    temp[name] = value;
    this.props.handleMilestoneData(this.props.itemIndex, temp);
  };

  render() {
    return (
      <Row>
        <Col md={3} lg={3} sm={3}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Milestone title"
              value={this.props.milestoneData.milestone_title}
              onChange={(event) => this.handleFieldChange('milestone_title', event.target.value )}
            />
          </div>
        </Col>
				 <Col md={3} lg={3} sm={3}>
          <MuiThemeProvider>
            <DatePicker
              hintText="Choose a date"
              mode="landscape"
              textFieldStyle={{width: '100%'}}
              formatDate={this.formatDate}
              value={this.props.milestoneData.start_date ? new Date(this.props.milestoneData.start_date) : null}
              onChange={this.handleSDChange}
              onDismiss={this.handleSDCacel}
              minDate={this.props.projectStartDate ? new Date(this.props.projectStartDate) : null}
              maxDate={this.props.projectEndDate ? new Date(this.props.projectEndDate) : null}
            />
          </MuiThemeProvider>
        </Col>
        <Col md={3} lg={3} sm={3}>
          <select
              ref={(select) => { this.appliedTo = select; }}
              value={this.props.milestoneData.milestone_status || '0'}
              onChange={event => this.handleFieldChange('milestone_status', event.target.value) }
            >
              <option value="">--Select--</option>
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
          </select>
        </Col>
        <Col md={2} lg={2} sm={2}>
          <textarea
            rows="3"
            ref="milestone_comments"
            placeholder="Reason"
            className="form-control"
            onChange={(event) => this.handleFieldChange('milestone_comments', event.target.value)}
            value={this.props.milestoneData.milestone_comments}
          />
        </Col>
				<Col md={1} lg={1} sm={1}>
					<div className="form-group">
						<input
              type="button"
              className="form-control"
              maxLength="20"
              value={ (this.props.itemIndex + 1) === this.props.milestones.length ? '+' : 'x' }
              onClick={ (this.props.itemIndex + 1) === this.props.milestones.length ? this.props.appendNewMilestone : () => { this.props.removeCurrentMilestone(this.props.itemIndex); } }
   					/>
						<label></label>
					</div>
        </Col>
			</Row>
    );
  }
}
