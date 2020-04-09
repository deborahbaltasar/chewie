

import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

import './styles.css';

export default function MeetingRoom() {
    
    return(
        <div className="profile-container">
 
            <h1>Sala de reuniões</h1>
            <Link className="button" to="/newMeetingRoom">Criar nova sala</Link>      

            <ul>
              
              <li>
                <strong>IOT LAB - M09</strong>
                <strong>Descrição:</strong>
                <p>1 tv</p>
                <p>1 mesa</p>
                <p>15 cadeiras</p>
  
              </li>
    
              <li>
                <strong>LAB - M13</strong>
                <strong>Descrição:</strong>
                <p>2 tv's</p>
                <p>2 mesas</p>
                <p>30 cadeiras</p>
              </li>

              <li>
                <strong> LAB - M02</strong>
                <strong>Descrição:</strong>
                <p>1 tv</p>
                <p>1 mesa</p>
                <p>15 cadeiras</p>
              </li>
              <li>
                <strong>LAB - M07</strong>
                <strong>Descrição:</strong>
                <p>1 tv</p>
                <p>1 mesa</p>
                <p>15 cadeiras</p>
              </li>
            </ul>
        </div>
    );
}

