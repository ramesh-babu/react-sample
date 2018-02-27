import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import Cookies from 'js-cookie';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { employeedetails } from 'redux/modules/home';
import { isLoaded as isAuthLoaded, load as loadAuth,
  login, logout, getGraphUserData, resetGraphUserData } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import classNames from 'classnames';
import styles from './App.scss';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    auth: state.auth,
    userData: state.home.user,
    userLoaded: state.home.userLoaded
  }),
  {login, logout, getGraphUserData, resetGraphUserData, employeedetails, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.shape({
      user: PropTypes.object,
      graph: PropTypes.shape({
        mail: PropTypes.string
      }),
    }),
    userData: PropTypes.shape({
      emp_firstname: PropTypes.string,
      job_title: PropTypes.string,
      team_name: PropTypes.string
    }),
    userLoaded: PropTypes.bool,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
    }),
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    getGraphUserData: PropTypes.func.isRequired,
    resetGraphUserData: PropTypes.func.isRequired,
    loadAuth: PropTypes.func,
    employeedetails: PropTypes.func,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const parsedHash = queryString.parse(this.props.location.hash);
    // validating office 365 accessToken
    if (parsedHash.access_token) {
      // to get logged-in user information from office 365 with accessToken
      const authRequest = this.props.login(parsedHash.access_token);
      authRequest.then(res => {
        if (res) {
          if (res.message === 'Access token has expired' || res.message === 'Invalid email id') {
            this.props.resetGraphUserData();
            this.props.pushState('/');
          } else {
            const accessTokenMaxAgeSeconds = 60 * 60 * 2;
            const expireTime = new Date(new Date().getTime() + (accessTokenMaxAgeSeconds * 1000));
            Cookies.set('access_token', res.access_token, { expires: expireTime });
            this.props.employeedetails().then(response => {
              if (response.message === 'Invalid access token') {
                this.props.resetGraphUserData();
                this.props.pushState('/');
              }
            });
          }
        } else {
          // remove graph data and redirect to login page
          this.props.resetGraphUserData();
          this.props.pushState('/');
        }
      });
    } else if (this.props.userData.emp_firstname !== '' && Cookies.get('access_token') !== undefined) {
      // login
    } else if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== 'undefined') {
      this.props.employeedetails().then(response => {
        console.log(response);
        if (response.message === 'Invalid access token') {
          console.log(108, Cookies.get('access_token'));
          this.handleLogout();
          this.props.resetGraphUserData();
          this.props.pushState('/');
        }
      });
    } else {
      // logout
      this.props.pushState('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userData.emp_firstname !== '' && nextProps.location.pathname === '/') {
      this.props.pushState('/home');
    }
    if (this.props.userData.emp_firstname === '' && nextProps.userData.emp_firstname !== '' && nextProps.userLoaded) {
      // login
      this.props.pushState('/home');
    } else if (this.props.userData.emp_firstname !== '' && nextProps.userData.emp_firstname === '') {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    this.props.logout();
    Cookies.remove('access_token');
    if (!__DEVELOPMENT__) {
      window.location = 'https://login.popcornapps.com/#tpstag-logout';
    } else {
      window.location = '/';
    }
    event.preventDefault();
  };

  render() {
    const { userData } = this.props;
    // const { user } = auth;
    const style = classNames(
      // add as many classes or objects as we would like here
      styles.app,
      { [styles.loggedin]: userData }
    );

    return (
      <div className={style}>
        <Helmet {...config.app.head}/>
        {userData.emp_firstname !== '' &&
        <Navbar fixedTop className={styles.navbarTop}>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/home" activeStyle={{color: '#33e0ff'}}>
                <div className={styles.brand}/>
              </IndexLink>
              </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
            <Nav navbar className="pull-right logoutMenu">
              <LinkContainer to="/logout">
                <NavItem eventKey={7} className={styles.logoutLink} onClick={this.handleLogout}>
                  <i className="fa fa-sign-out" title="Logout" aria-hidden="true"></i>
                </NavItem>
              </LinkContainer>
            </Nav>
            <p className={styles.loggedInMessage + ' navbar-text pull-right'}>Logged in as <strong>{userData.emp_firstname}</strong>.</p>
          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/home">
                <NavItem eventKey={1}>Home</NavItem>
              </LinkContainer>
              <LinkContainer to="/leaves">
                <NavItem eventKey={1}>Leaves</NavItem>
              </LinkContainer>
              <LinkContainer to="/directory" className={this.props.location.pathname.indexOf('directory') !== -1 ? 'active' : ''}>
                <NavItem eventKey={1}>Directory</NavItem>
              </LinkContainer>
              <LinkContainer to="/holidays">
                <NavItem eventKey={1}>Holidays</NavItem>
              </LinkContainer>
              <LinkContainer to="/it-requests">
                <NavItem eventKey={1}>IT Requests</NavItem>
              </LinkContainer>
              {/* <LinkContainer to="/timesheet">
                <NavItem eventKey={1}>Timesheet</NavItem>
              </LinkContainer> */}
              { userData.employee_id === 'PCA9000162' || userData.employee_id === 'PCA9000068' ?
                <LinkContainer to="/resource-management">
                  <NavItem eventKey={1}>RM</NavItem>
                </LinkContainer> : null }
              {/* <LinkContainer to="/office-expenses">
                  <NavItem eventKey={1}>OE</NavItem>
                </LinkContainer> */}
              {userData.team_name === 'HR & Admin' || userData.team_name === 'Management' || userData.employee_id === 'PCA9000125' ?
                <LinkContainer to="/biometric">
                  <NavItem eventKey={1}>BM</NavItem>
                </LinkContainer> : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>}
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
