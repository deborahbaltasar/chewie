import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import MeetingRooms from '../pages/MeetingRooms';
import Meetings from '../pages/Meetings';
import Projects from '../pages/Projects';
import MyProjects from '../pages/Myprojects';


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard"  component={Dashboard} isPrivate />
      <Route path="/profile"  component={Profile} isPrivate />
      <Route path="/meetingRooms"  component={MeetingRooms} isPrivate />
      <Route path="/meetings"  component={Meetings} isPrivate />
      <Route path="/projects"  component={Projects} isPrivate />
      <Route path="/myProjects"  component={MyProjects} isPrivate />

    </Switch>
  );
}