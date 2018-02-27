import React, {Component, PropTypes} from 'react';
import dateFormat from 'dateformat';
import { sortBy } from 'lodash';

export default class TodayBirthdays extends Component {
  static propTypes = {
    birthdays: PropTypes.array,
  };

  render() {
    let birthdays = this.props.birthdays.map((birthday) => {
      return {
        emp_firstname: birthday.emp_firstname,
        emp_lastname: birthday.emp_lastname,
        emp_birthday: dateFormat(birthday.emp_birthday, 'mmm-dd'),
      };
    });
    birthdays = sortBy(birthdays, ['emp_birthday']);
    const birthdaysData = birthdays.map((birthday) => {
      return <li><span>{birthday.emp_firstname} {birthday.emp_lastname}</span><span className="totalCount bDate">{birthday.emp_birthday ? birthday.emp_birthday : '---'}</span></li>;
    });
    return (
      <div className="widget">
        <div className="widget-header">
          { birthdaysData.length > 1 ? <h4>Today's Birthdays</h4> : <h4>Today's Birthday Baby</h4> }
        </div>
        <div className="widget-content">
          <ul>
            {birthdaysData}
          </ul>
        </div>
      </div>
    );
  }
}
