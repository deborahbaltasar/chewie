

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';



import './styles.css';

class MeetingRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      room: "",
    }
  }


   render() {
    return(
        <div className="profile-container">
 
            <h1>Sala de reuniões</h1>
            <Link className="button" to="/newMeetingRoom">Criar nova sala</Link>      

            <ul>
              <li>
                <strong>IOT LAB - M09</strong>
              </li>
            </ul>
        </div>
    );
   }
}

export default MeetingRoom;
