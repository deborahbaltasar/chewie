import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Sidebar from '../../../components/Sidebar';


export default function DefaultLayout({ children, location }) {
  return (
    
    <Container>
    <Sidebar pathSideBar={location.pathname} />     
     {children}
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
