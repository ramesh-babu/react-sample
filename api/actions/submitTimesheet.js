import axios from 'axios';
import config from '../../src/config';

export default function submitTimesheet(req) {
	// Login Api call to get access token
  return axios.post('https://login.popcornapps.com/timesheets/api/insert.php', req.body, { headers: { Authorization: 'pop@123' } }).then((response) => {
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
