import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Partners from '../Partners';
import Members from '../Members';
import Financial from '../Financial';

import {
  TextField, 
  Select, 
  InputLabel, 
  FormControl, 
  Paper, 
  Grid,
  AppBar,
  Tab,
  Tabs,
  Typography,
  Box,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '470px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  commentField: {
    position: 'absolute',
    left: '580px',
    top: '250px',
  },

  button: {
    position: 'absolute',
    left: '960px',
    top: '460px',
    height: '44px',
    background: '#4c7bff',
    color: '#FFF',
    border: 0,
    borderRadius: '8px',
    fontSize: '14px',
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export default function Menu(props) {
  const classes = useStyles();
  
  const [value, setValue] = React.useState(0);
  
  const {selected, rooms, allStatus, handleSelectedChange } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Dados"  className={classes.paper}/>
          <Tab label="Membros"  />
          <Tab label="Parceiros"  />
          <Tab label="Financeiro"  />
        </Tabs>
      </AppBar>
    
      <TabPanel value={value} index={0} >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <FormControl >
                <InputLabel htmlFor="standard-basic" />
                <TextField 
                  name="responsible"
                  className="standard-basic" 
                  label="Responsável" 
                  value={selected.responsible}
                  onChange={handleSelectedChange}
                />
              </FormControl>
            </Paper>
            <Paper className={classes.paper}>
              <FormControl >
                <InputLabel htmlFor="room-native-simple">Sala desenvolvimento</InputLabel>
                <Select
                  name="meeting_room_room"
                  native
                  value={selected.meeting_room_room}
                  onChange={handleSelectedChange}
                  inputProps={{
                    name: 'room',
                    id: 'room-native-simple',
                  }}
                >
                  <option aria-label="None" value={selected.meeting_room_room} />
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>{`${room.room} - ${room.name}`}</option>
                    ))}
                    {/* <option value={selected.meeting_room_room}>{`${selected.meeting_room_room} - ${selected.meeting_room_name}`}</option> */}
                </Select>
              </FormControl>
            </Paper>
            <Paper className={classes.paper}>
              <FormControl >
                <InputLabel htmlFor="status-native-simple">Status</InputLabel>
                <Select
                  name="status"
                  native
                  value={selected.status}
                  onChange={handleSelectedChange}
                  inputProps={{
                    name: 'status',
                    id: 'status-native-simple',
                  }}
                >
                  <option aria-label="None" value="A" />                  
                  <option  value={selected.status}>{selected.status}</option>
                    {allStatus.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                </Select>
              </FormControl> 
            </Paper>

          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <FormControl >
                <InputLabel htmlFor="standard-basic" />
                <TextField 
                  name="start"
                  className="standard-basic" 
                  label="Início" 
                  value={selected.start}
                  onChange={handleSelectedChange}
                />
              </FormControl>
            </Paper>
            <Paper className={classes.paper}>
              <FormControl >
                <InputLabel htmlFor="standard-basic" />
                <TextField 
                  name="end"
                  className="standard-basic" 
                  label="Final" 
                  value={selected.end}
                  onChange={handleSelectedChange}
                />
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <FormControl >
                <InputLabel htmlFor="standard-basic" />
                <TextField 
                  name="client_name"
                  className="standard-basic" 
                  label="Cliente" 
                  value={selected.client_name}
                  onChange={handleSelectedChange}
                />
              </FormControl>
            </Paper>
            <Paper className={classes.paper}>
              <FormControl >
                <InputLabel />
                <TextField 
                  name="type"
                  className="standard-basic" 
                  label="Tipo" 
                  value={selected.type}
                  onChange={handleSelectedChange}
                />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item className={classes.commentField} sm={6}> 
            <Paper className={classes.paper}>
              <FormControl >
                <InputLabel  />
                <TextField 
                  name="comments"
                  className="standard-basic"
                  multiline
                  rowsMax={4}
                  label="Comentário" 
                  value={selected.comments}
                  onChange={handleSelectedChange}
                />
              </FormControl>
            </Paper>
          </Grid>
        </Grid>

        <button className={classes.button} onClick={() => {}}>
          Atualizar projeto
        </button>

      </TabPanel>

      <TabPanel value={value} index={1} className={classes.root}>
        <Members />
      </TabPanel>

      <TabPanel value={value} index={2} className={classes.root}>
        <Partners />       
      </TabPanel>

      <TabPanel value={value} index={3} className={classes.root}>
        <Financial /> 
      </TabPanel>
    </div>
  );
}

