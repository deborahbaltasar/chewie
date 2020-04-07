import React, { Component } from 'react';
import axios from 'axios';
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



export default function MeetingRooms({children}) {
  return (
    <Container>
            <ScheduleComponent locale='pt'  >
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
