import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Tabs, Tab } from 'react-bootstrap';
import ProjectsView from 'containers/ProjectsView/ProjectsView';
import ResourceView from 'containers/ResourceView/ResourceView';
import ProjectManagement from 'containers/ProjectManagement/ProjectManagement';
import styles from './ResourceManagement.scss';

export default class ResourceManagement extends Component {
  render() {
    return (
      <div className={styles.home}>
        <Helmet title="Resource Management"/>
        <div className="container">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Project View" >
              <ProjectsView />
            </Tab>
            <Tab eventKey={2} title="Resource View" >
              <ResourceView />
            </Tab>
            <Tab eventKey={3} title="Projects">
              <ProjectManagement />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
