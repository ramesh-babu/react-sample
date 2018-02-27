import axios from 'axios';
import config from '../../src/config';
import {parseCookies} from 'utils/url.js';

export default function deleteExpensDetails(req) {
  const cookiesData = parseCookies(req);
	// Login Api call to get access token
  return axios.delete(config.remoteApiHost + 'expense/' + req.body.expense_id, {
    headers: {
      Authorization: cookiesData.access_token
    }
    // req.session.users = response.data;
  })
  .then((response) => {
    // req.session.myLeaves = response.data;
    return Promise.resolve(response.data);
  })
  .catch((error) => {
    if (!config.isProduction) {
      console.log(error);
    }
    return Promise.resolve(error.response.data);
  });
}
