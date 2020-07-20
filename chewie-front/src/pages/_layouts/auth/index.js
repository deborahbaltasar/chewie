import React from 'react';
import PropTypes from 'prop-types';

import { Content } from './styles';


export default function AuthLayout({ children }) {
  return (
    


        <Content>
         {children}  
        </Content>  

  );
}

AuthLayout.propType = {
  children: PropTypes.element.isRequired,
};
