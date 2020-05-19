import React from 'react';
import PropTypes from 'prop-types';

import { Content, Container, Wrapper } from './styles';


export default function AuthLayout({ children }) {
  return (
    <Wrapper>

    <Container>
        <Content>
         {children}  
        </Content>  
    </Container>
    </Wrapper>
  );
}

AuthLayout.propType = {
  children: PropTypes.element.isRequired,
};
