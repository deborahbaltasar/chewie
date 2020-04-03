import React from 'react';

import { Container } from './styles';

export default function DashBoard({children}) {
  return (
    <Container>
      {children}
    </Container>
  );
}
