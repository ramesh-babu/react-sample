import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Tabs, Tab } from 'react-bootstrap';
import AttendanceView from 'containers/AttendanceView/AttendanceView';
import styles from './Biometric.scss';

export default class Biometric extends Component {
  render() {
    return (
      <div className={styles.biometricView}>
        <Helmet title="Biometric"/>
        <div className="container">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Attendance Data" >
              <AttendanceView />
            </Tab>
            <Tab eventKey={2} title="Upload Data" >
              <iframe src="http://52.52.64.152:81/" width="100%" height="600" frameBorder="0"></iframe>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
