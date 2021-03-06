import axios from 'axios';
import config from '../../src/config';
import {parseCookies} from 'utils/url.js';

export default function submitLeaveRequest(req) {
  const cookiesData = parseCookies(req);
	// Login Api call to get access token
  return axios.post(config.remoteApiHost + 'leave', req.body, {
    headers: {
      Authorization: cookiesData.access_token
    }
  }).then((response) => {
    // req.session.users = response.data;
    return Promise.resolve(response.data);
  })
  .catch((error) => {
    if (!config.isProduction) {
      console.log(error);
    }
    return Promise.resolve(error.response.data);
  });
}
