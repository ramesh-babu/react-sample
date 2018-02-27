import axios from 'axios';
import config from '../../src/config';

export default function getProjectsList() {
	// Login Api call to get access token
  return axios.get('https://login.popcornapps.com/timesheets/api/projects_list.php', { headers: { Authorization: 'pop@123' } }).then((response) => {
    // req.session.users = response.data;
    return Promise.resolve(response.data.response);
  })
  .catch((error) => {
    if (!config.isProduction) {
      console.log(error);
    }
    return Promise.resolve(error.response.data);
  });
}
