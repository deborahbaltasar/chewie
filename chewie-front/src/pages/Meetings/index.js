import React from 'react';
import { Container } from './styles';

import { 
    Inject, 
    ScheduleComponent, 
    Day, 
    Week, 
    Month, 
    ViewsDirective, 
    ViewDirective } 
  from '@syncfusion/ej2-react-schedule';



export default function Meetings({children}) {
  return (
    <Container>
            <header>Reuniões</header>
            <ScheduleComponent height='800px'>
              <ViewsDirective>
                <ViewDirective 
                  option='Day' 
                  displayName='DIA'
                />
                <ViewDirective 
                  option='Week' 
                  readonly={false} 
                  displayName='SEMANA'
                  startHour='08:00' 
                  endHour='24:00'             
                />
                <ViewDirective 
                  option='Month' 
                  displayName='MÊS'
                />
              </ViewsDirective>
              <Inject services={[Day, Week, Month]} />   
            </ScheduleComponent>
    </Container>

  );
}
