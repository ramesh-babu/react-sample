import axios from 'axios';
import config from '../../src/config';

export default function login(req) {
  // Login Api call to get access token
  return axios.get(config.remoteApiHost + 'login', { headers: { Authorization: 'web ' + req.body.authrizedToken } }).then((response) => {
    const user = {
      access_token: response.data.access_token
    };
    req.session.user = user;
    return Promise.resolve(user);
  })
  .catch((error) => {
    return new Promise((resolve) => {
      if (!config.isProduction) {
        console.log(error);
      }
      req.session.destroy(() => {
        req.session = null;
        return resolve(error.response.data);
      });
    });
  });
}
