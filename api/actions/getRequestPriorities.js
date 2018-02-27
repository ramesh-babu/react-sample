import axios from 'axios';
import config from '../../src/config';
import {parseCookies} from 'utils/url.js';

export default function getRequestPriorities(req) {
  const cookiesData = parseCookies(req);
	// Login Api call to get access token
  return axios.get(config.remoteApiHost + 'request_priorities', {
    headers: {
      Authorization: cookiesData.access_token
    }
  }).then((response) => {
    return Promise.resolve(response.data);
  })
  .catch((error) => {
    if (!config.isProduction) {
      console.log(error);
    }
    return Promise.resolve(error.response.data);
  });
}
