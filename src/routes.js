import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isEmpty } from 'lodash';
import Cookies from 'js-cookie';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import {
    App,
    Home,
    Login,
    LoginSuccess,
    NotFound,
    Leaves,
    Directory,
    Holidays,
    ItRequests,
    Timesheet,
    ResourceManagement,
    OfficeExpensesManagement,
    Biometric,
    AddEmployee,
    EditEmployeeDetailModal
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if ((!user || isEmpty(user)) && Cookies.get('access_token') === undefined) {
        store.dispatch(logout());
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Login}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      { /* Routes */ }
      <Route onEnter={requireLogin} path="home" component={Home}/>
      <Route onEnter={requireLogin} path="leaves" component={Leaves}/>
      <Route onEnter={requireLogin} path="directory" component={Directory} />
      <Route onEnter={requireLogin} path="directory/add" component={AddEmployee}/>
      <Route onEnter={requireLogin} path="directory/edit/:id" component={EditEmployeeDetailModal}/>
      <Route onEnter={requireLogin} path="holidays" component={Holidays}/>
      <Route onEnter={requireLogin} path="it-requests" component={ItRequests}/>
      <Route onEnter={requireLogin} path="timesheet" component={Timesheet}/>
      <Route onEnter={requireLogin} path="resource-management" component={ResourceManagement}/>
      <Route onEnter={requireLogin} path="office-expenses" component={OfficeExpensesManagement}/>
      <Route onEnter={requireLogin} path="biometric" component={Biometric}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
