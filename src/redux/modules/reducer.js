import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { pagination } from 'violet-paginator';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import home from './home';
import leaves from './leaves';
import holidays from './holidays';
import itrequests from './itrequests';
import timesheet from './timesheet';
import resource from './resource';
import attendance from './attendance';
import expens from './expens';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  pagination,
  home,
  leaves,
  holidays,
  itrequests,
  timesheet,
  resource,
  attendance,
  expens
});
