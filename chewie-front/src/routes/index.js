import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';


import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard"  component={Dashboard} isPrivate />
      <Route path="/profile"  component={Profile} isPrivate />
      

    </Switch>
  );
}