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
  ResourcesDirective,
  ResourceDirective,
}
  from '@syncfusion/ej2-react-schedule';

  import { extend, createElement } from '@syncfusion/ej2-base';

import './styles.css';

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
      rooms: [],
    }
    //TODO: add color to DB
    this.COLORS = ['#ffaa00', '#f8a398', '#7499e1'];
  }

  componentDidMount() {
    console.log("MOUNT")
    this.fetchData({});
    this.fetchRoom();
  }

  fetchData = async (data) => {
    /*let debugMeetings = [
      {
        id: 1,
        name: "Reunião 1",
        allDay: false,
        start: new Date(Date.UTC(2020, 4, 8, 14, 30, 0, 0)),
        end: new Date(Date.UTC(2020, 4, 8, 15, 0, 0, 0)),
        MeetingRoom: {
          room: 1,
          id: 1
        }
      }, 
      {
        id: 2,
        name: "Reunião 1",
        allDay: false,
        start: new Date(Date.UTC(2020, 4, 9, 14, 30, 0, 0)),
        end: new Date(Date.UTC(2020, 4, 9, 15, 0, 0, 0)),
        MeetingRoom: {
          room: 1,
          id: 1
        }
      }
    ]*/
    return API.get('/meetings', data)
      .then(res => {
        console.log("DADOS", res)
        this.setState({
          meetings: res.data.map(meeting => {
            return {
              Id: meeting.id,
              Subject: meeting.name,
              StartTime: meeting.start,
              EndTime: meeting.end,
              Location: meeting.MeetingRoom.id,
              IsAllDay: meeting.allDay
            }
          })
        });
      })
      .catch(error => {
        console.log('Error ', error);
        return { code: 'error', message: 'Cannot get meetings!' };
      });
  }

  fetchRoom = async () => {
    await API.get('/meetingRoom', {})
     .then(res => {
       this.setState({
          rooms: res.data.map(room => {
            return {
              Id: room.id,
              Name: `${room.name} - ${room.room}`,
              Color: this.COLORS[room.id-1],
            }
          })
       });
       
     })
     .catch(error => {
       console.log('Error ', error);
       return { code: 'error', message: 'Cannot get meetings!' };
   });
  }

  onActionComplete(args) {
    console.log({args})
    /*args.data 
      Id: 1
      Subject: 
      StartTime: 
      EndTime: 
      Location: 1
      ResourceID: 1
      IsAllDay: false
      StartTimezone: null
      EndTimezone: null
      Description: undefined
      RecurrenceRule: null
    */
    switch (args.requestType) {
        case "eventChanged":
        break
        case "eventCreated":
          let data = args.data[0]
          let req = {
            name: data.Subject,
            meeting_room_id: data.Location,
            start: data.StartTime,
            end: data.EndTime
          }
          API.post('/meetings', req)
            .then(res => {
              console.log(res)
            })
            .catch(error => {
              console.log("error", error)
            })
        break
        case "eventRemoved":
        break
    }
    
}

  render() {
    const {  meetings, rooms } = this.state
    return (
      <div className="schedule">
        <ScheduleComponent
          ref={schedule => this.scheduleObj = schedule}
          eventSettings={{ dataSource: meetings }}
          actionComplete={this.onActionComplete.bind(this)}
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

          <ResourcesDirective>
            <ResourceDirective
              field='Location'
              title='Sala'
              name='Location'
              allowMultiple={false}
              dataSource={rooms}
              textField='Name'
              idField='Id'
              colorField='Color'>
            </ResourceDirective>
          </ResourcesDirective>


          <Inject services={[Agenda, Day, Week, Month]} />
        </ScheduleComponent>
      </div>
    );
  }
}

export default Meetings;