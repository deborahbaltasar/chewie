import React from 'react';

import { Container } from './styles';

export default function DashBoard({children}) {
  return (
    <Container>
      <h1>DASHBOARD</h1>
      <hr className="title-line"/>
    </Container>
  );
}
