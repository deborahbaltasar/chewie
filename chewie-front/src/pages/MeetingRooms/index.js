import React from 'react';
import { Container } from './styles';

export default function MeetingRooms({children}) {
  return (
    <Container>
      <header>Sala de Reuniões</header>
      <ul>
        <li>
          <strong>Iot lab</strong>       
          <p>Descrição: </p>
          <p>2 tv's</p>
          <p>20 cadeiras</p>
          <p>1 mesa</p>

        </li>

        <li>
          <strong>Iot lab</strong>
          <p>Descrição: </p>
          <p className="seconday">1 tv</p>
          <p className="seconday">15 cadeiras</p>
          <p className="seconday">2 mesas</p>
        </li>
        <li>
          <strong>Iot lab</strong>
          <p>Descrição: </p>
          <p className="seconday">2 tv's</p>
          <p className="seconday">30 cadeiras</p>
          <p className="seconday">2 mesa</p>
        </li>

      </ul>
    </Container>

  );
}

