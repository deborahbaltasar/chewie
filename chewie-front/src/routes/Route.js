import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';
import Auth from '../utils/auth';

export default function RouteWrapper({
  component: Component, 
  isPrivate,
  ...rest
}) {
  const signed = Auth.isLoggedIn();

  if (!signed && isPrivate) {
    return <Redirect to ="/" />
  }

  if (signed && !isPrivate) {
    return <Redirect to ="/dashboard" />
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route {...rest} render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )} />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};