import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ExpensManagement from 'containers/ExpensManagement/ExpensManagement';
import styles from './OfficeExpensesManagement.scss';

export default class OfficeExpensesManagement extends Component {
  render() {
    return (
      <div className={styles.home}>
        <Helmet title="Resource Management"/>
        <div className="container">
          <ExpensManagement />
        </div>
      </div>
    );
  }
}
