import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import queryString from 'query-string';
import { LoadingIndicator } from 'components';

@connect(
  state => ({user: state.home.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.shape({
      hash: PropTypes.string
    }),
  }
  componentDidMount() {
    const parsedHash = queryString.parse(this.props.location.hash);
    if (!__DEVELOPMENT__ && !parsedHash.access_token) {
      window.location = 'https://login.popcornapps.com/#tpstag';
    }
  }

  render() {
    const { user } = this.props;
    const parsedHash = queryString.parse(this.props.location.hash);
    const styles = require('./Login.scss');
    const popLogo = require('./PopcornApps-logo.png');
    const loginImage = require('./login.png');
    let loginURL = '';
    if (__DEVELOPMENT__) {
      loginURL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=3f3e4dda-fc1e-465c-9332-f1586aad1724&response_type=id_token+token&redirect_uri=http%3A%2F%2Flocalhost:3001%2F&scope=openid%20https%3A%2F%2Fgraph.microsoft.com%2FUser.Read&response_mode=fragment&state=12345&nonce=678910';
    } else {
      loginURL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=bb11b3a5-ae54-46a8-b053-31d636a1031f&response_type=id_token+token&redirect_uri=https%3A%2F%2Ftouchpoint.popcornapps.com%2F&scope=openid%20https%3A%2F%2Fgraph.microsoft.com%2FUser.Read&response_mode=fragment&state=12345&nonce=678910';
    }
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        { (user.emp_firstname === '' && !parsedHash.access_token && __DEVELOPMENT__) ?
          <div className={styles.loginWrap}>
            <img src={popLogo} className={styles.popLogo} />
            <h1>TouchPoint Login With</h1>
            <div>
              <a href={loginURL} >
                <img src={loginImage} />
              </a>
            </div>
            <small>&copy; 2018 PopcornApps - All Rights Reserved. Version - V2.1</small>
          </div> : <LoadingIndicator />
        }
      </div>
    );
  }
}
