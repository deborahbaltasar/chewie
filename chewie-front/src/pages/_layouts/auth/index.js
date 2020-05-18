import React from 'react';
import PropTypes from 'prop-types';

import { Content, Container, Border } from './styles';


export default function AuthLayout({ children }) {
  return (
    <Border>
    <Container>
        <Content>
         {children}  
        </Content>  
    </Container>
    </Border>
  );
}

AuthLayout.propType = {
  children: PropTypes.element.isRequired,
};
