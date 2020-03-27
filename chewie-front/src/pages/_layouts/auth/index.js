import React from 'react';
import PropTypes from 'prop-types';

import { Content, Container } from './styles';


export default function AuthLayout({ children }) {
  return (
    <Container>
        <Content>
         {children}  
        </Content>  
    </Container>
  );
}

AuthLayout.propType = {
  children: PropTypes.element.isRequired,
};
