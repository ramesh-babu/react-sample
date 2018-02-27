import axios from 'axios';
import config from '../../src/config';
import {parseCookies} from 'utils/url.js';

export default function submitUpdateEmloyeeRequest(req) {
  const cookiesData = parseCookies(req);
	// Login Api call to get access token
  const empData = req.body;
  empData.emp_team = empData.team_name;
  return axios.put(config.remoteApiHost + 'employees/' + req.body.emp_number, empData, {
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
