import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EventIcon from '@material-ui/icons/Event';
import DevicesIcon from '@material-ui/icons/Devices';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import BarChartIcon from '@material-ui/icons/BarChart';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import { toast } from 'react-toastify';

import Auth from '../../utils/auth';

import './styles.css';

export const profileList = (
  <div classname="container">
    <ListItem button component={Link} to="/profile">
      <ListItemIcon>
      <img
              src={
                'https://api.adorable.io/avatars/40/abott@adorable.png'
              }
          
            />
      </ListItemIcon>
      <ListItemText primary="Administrador" />
    </ListItem>

  </div>
);

// export const mainListItems = (
  
//   <div>

//     <ListItem button component={Link} to="/profile">
//       <ListItemIcon>
//         <PersonIcon />
//       </ListItemIcon>
//       <ListItemText primary="Perfil" />
//     </ListItem> 
//   </div>
// );

export const list = (
  
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

   <ListItem button>
      <ListItemIcon>
        <DevicesIcon />
      </ListItemIcon>
      <ListItemText primary="Dispositivos" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Projetos" />
    </ListItem>

    <ListItem button component={Link} to="/meetingRooms">
      <ListItemIcon>
        <MeetingRoomIcon />
      </ListItemIcon>
      <ListItemText primary="Salas de Reuniões" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Gerenciamento</ListSubheader>

    <ListItem button>
      <ListItemIcon>
        <DeveloperModeIcon />
      </ListItemIcon>
      <ListItemText primary="Meus projetos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DevicesOtherIcon />
      </ListItemIcon>
      <ListItemText primary="Meus empréstimos" />
    </ListItem>



  </div>
);

export const actionListItems = (
  
  <div>
    <ListSubheader inset>Ações</ListSubheader>
    
    <ListItem button>
      <ListItemIcon>
        <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Novo Empréstimo" />
    </ListItem>
    
    <ListItem button component={Link} to="/meetings">
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Agendar Nova Reunião" />
    </ListItem>

    <ListItem button onClick={() => {
        toast.warn("Bye!!!");
        Auth.logOut();
      }} component={Link} to="/">
      <ListItemIcon>
        <PowerSettingsNewIcon />
      </ListItemIcon>
      <ListItemText primary="Encerrar sessão" />
    </ListItem>

  </div>
);

