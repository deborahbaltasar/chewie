import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import {
  HomeRounded,
  DevicesRounded,
  LaptopChromebookRounded,
  MeetingRoomRounded,
  DeveloperModeRounded,
  DevicesOtherRounded,
  AddCircleOutlineRounded,
  EventRounded,
  PowerSettingsNew,

} from '@material-ui/icons';

import { toast } from 'react-toastify';

import Auth from '../../utils/auth';

import './styles.css';

 export const ProfileList = () => {
  const name = localStorage.getItem('userName')
  return (
        <ListItem button component={Link} to="/profile">
        <ListItemIcon >
          <img
            alt=""
            src={
              'https://api.adorable.io/avatars/40/abott@adorable.png'
            }
          />
        </ListItemIcon>
      
        <ListItemText 
          style={{color: '#fff'}} 
          primary={name} 
        />
    
      </ListItem>
  );
};



export const list = (
  
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <HomeRounded style={{color: '#777'}}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

   <ListItem button>
      <ListItemIcon>
        <DevicesRounded style={{color: '#777'}}/>
      </ListItemIcon>
      <ListItemText primary="Dispositivos" />
    </ListItem>

    <ListItem button component={Link} to="/projects">
      <ListItemIcon>
        <LaptopChromebookRounded style={{color: '#777'}}/>
      </ListItemIcon>
      <ListItemText primary="Projetos" />
    </ListItem>

    <ListItem button component={Link} to="/meetingRooms">
      <ListItemIcon>
        <MeetingRoomRounded style={{color: '#777'}}/>
      </ListItemIcon>
      <ListItemText primary="Salas de Reuniões" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader style={{color: '#fff'}} inset>Gerenciamento</ListSubheader>

    <ListItem button component={Link} to="/myProjects">
      <ListItemIcon>
        <DeveloperModeRounded style={{color: '#777'}}/>
      </ListItemIcon>
      <ListItemText primary="Meus projetos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DevicesOtherRounded style={{color: '#777'}}/>
      </ListItemIcon>
      <ListItemText primary="Meus empréstimos" />
    </ListItem>



  </div>
);

export const actionListItems = (
  
  <div>
    <ListSubheader style={{color: '#fff'}} inset>Ações</ListSubheader>
    
    <ListItem button>
      <ListItemIcon>
        <AddCircleOutlineRounded style={{color: '#777'}}/>
      </ListItemIcon>
      <ListItemText primary="Novo Empréstimo" />
    </ListItem>
    
    <ListItem button component={Link} to="/meetings">
      <ListItemIcon>
        <EventRounded style={{color: '#777'}}/>
      </ListItemIcon>
      <ListItemText primary="Agendar Nova Reunião" />
    </ListItem>

    <ListItem button onClick={() => {
        toast.warn("Bye!!!");
        Auth.logOut();
      }} component={Link} to="/">
      <ListItemIcon>
        <PowerSettingsNew style={{color: '#777'}}/>
      </ListItemIcon>
      <ListItemText primary="Encerrar sessão" />
    </ListItem>

  </div>
);

