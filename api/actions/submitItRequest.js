import axios from 'axios';
import config from '../../src/config';
import {parseCookies} from 'utils/url.js';

export default function submitItRequest(req) {
  const cookiesData = parseCookies(req);
  return axios.post(config.remoteApiHost + 'it_request', req.body, {
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
