import axios from 'axios';
import config from '../../src/config';

export default function graphData(req) {
	// Login Api call to get access token
  return axios.get('https://graph.microsoft.com/v1.0/me', {
    headers: { Authorization: 'Bearer ' + req.body.access_token }
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
