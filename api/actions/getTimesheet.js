import axios from 'axios';
import config from '../../src/config';

export default function getTimesheet(req) {
	// Login Api call to get access token
  return axios.get('https://login.popcornapps.com/timesheets/api/reports.php?employee_id=' + req.body.employeeId, { headers: { Authorization: 'pop@123' } }).then((response) => {
    // req.session.users = response.data;
    let returnData = null;
    if (response.data.response === '0 results') {
      returnData = [];
    } else {
      returnData = response.data.response;
    }
    return Promise.resolve(returnData);
  })
  .catch((error) => {
    if (!config.isProduction) {
      console.log(error);
    }
    return Promise.resolve(error.response.data);
  });
}
