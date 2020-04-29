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
    }
    this.ownerData = [
      { OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
      { OwnerText: 'Iot lab', Id: 2, OwnerColor: '#f8a398' },
      { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
    ];
  }

  componentDidMount() {
    this.fetchData({});
  }

  fetchData = async (data) => {
    await API.get('/meetings', {})
      .then(res => {
        console.log("DADOS", res)
        this.setState({
          meetings: res.data.map(meeting => {
            return {
              Id: meeting.id,
              Subject: meeting.name,
              StartTime: meeting.start,
              EndTime: meeting.end,
              Location: meeting.MeetingRoom.room,
              ResourceID: meeting.MeetingRoom.id
            }
          })
        });

      })
      .catch(error => {
        console.log('Error ', error);
        return { code: 'error', message: 'Cannot get meetings!' };
      });
  }

  // resourceDataSource = () => {[
  //   {Name: 'M09', Id: 1, Color: '#ea7a57'},

  // ]};



  render() {
    const { meetings, resourceData } = this.state
    console.log(this.ownerData, meetings)

    const data = [];
    return (
      <div className="schedule">
        <ScheduleComponent
          eventSettings={{ dataSource: data }}
          //group={{ resources: resourceData }} 
          height='800px' >
          {/* <ResourcesDirective>
          <ResourceDirective 
          field='ResourceID'
          title='Resource Name'
          name='Resources'
          textField='Name'
          idFielD="Id"
          colorField='Color'
          >

          </ResourceDirective>
        </ResourcesDirective> */}



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
              field='OwnerId'
              title='Owner'
              name='Owners'
              allowMultiple={true}
              dataSource={this.ownerData}
              textField='OwnerText'
              idField='Id'
              colorField='OwnerColor'>
            </ResourceDirective>
          </ResourcesDirective>


          <Inject services={[Agenda, Day, Week, Month]} />
        </ScheduleComponent>
      </div>
    );
  }
}

export default Meetings;