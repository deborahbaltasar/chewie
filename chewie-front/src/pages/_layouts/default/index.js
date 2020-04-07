import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import Dashboard from '../../../components/Dashboard';


export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Dashboard />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
