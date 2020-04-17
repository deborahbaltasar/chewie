import React, { Component } from 'react';

import API from '../../services/api';

import { 
    Inject, 
    ScheduleComponent, 
    Day, 
    Week, 
    Month, 
    ViewsDirective, 
    ViewDirective,
    Agenda,
  } 
  from '@syncfusion/ej2-react-schedule';

  import './styles.css';

class Meetings extends Component {
  constructor(props){
    super(props);
    this.state = {
      meetings: [],
    }
  }
  
  componentDidMount() {
    this.fetchData({});
  }  
  
  fetchData = async (data) => {
     await API.get('/meetings', {})
      .then(res => {
        console.log("DADOS", res)
        this.setState({
          meetings: res.data.map( meeting => {
            return {
              Id: meeting.id,
              Subject: meeting.name,
              StartTime: meeting.start,
              EndTime: meeting.end,
              Location: meeting.MeetingRoom.room
              //ResourceID: meeting.meeting_room_id
            }
          })
        });
        
      })
      .catch(error => {
        console.log('Error ', error);
        return { code: 'error', message: 'Cannot get meetings!' };
    });
    }
  
 
  render(){
    const {meetings, resourceData} = this.state
    return(
      <div className="schedule">
      <ScheduleComponent 
      eventSettings={{ dataSource: meetings }} 
      //group={{ resources: resourceData }} 
      height='800px' >
      
        <ViewsDirective>
          <ViewDirective 
            option='Agenda' 
            displayName='DIA'
          />
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
            <Inject services={[Agenda,Day, Week, Month]} />   
        </ScheduleComponent>
        </div>
    );
  }
}

export default Meetings;