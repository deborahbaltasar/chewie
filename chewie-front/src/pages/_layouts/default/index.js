import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Border, Container } from './styles';
import Dashboard from '../../../components/Dashboard';


export default function DefaultLayout({ children }) {
  return (
    
    <Container>
    <Dashboard />
    <Border>
      <Wrapper>
        
        {children}
      </Wrapper>
    </Border>
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
