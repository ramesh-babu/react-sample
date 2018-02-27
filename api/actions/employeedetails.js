import axios from 'axios';
import config from '../../src/config';
import {parseCookies} from 'utils/url.js';

export default function employeedetails(req) {
  const cookiesData = parseCookies(req);
  // Login Api call to get access token
  return axios.get(config.remoteApiHost + 'me', { headers: { Authorization: cookiesData.access_token } }).then((response) => {
    const user = response.data;
    user.access_token = cookiesData.access_token;
    req.session.user = user;

    return Promise.resolve(user);
  })
  .catch((error) => {
    if (!config.isProduction) {
      console.log(error);
    }
    return Promise.resolve(error.response.data);
  });
}
