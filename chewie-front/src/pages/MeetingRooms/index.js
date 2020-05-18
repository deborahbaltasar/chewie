

import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import API from '../../services/api';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';

import { toast } from 'react-toastify';

import {Accordion, Card, Button, Modal, Dropdown, DropdownButton} from 'react-bootstrap'
import './styles.css';


class MeetingRoom extends Component {
  constructor(props, context){
    super(props, context);
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      rooms: [],
      name: '',
      room: '',
      responsable: '',
      description: '',
   
    }
  }

  componentDidMount() {
    this.fetchData()
    
  }

  handleDelete = async id => {
    await API
      .delete(`/meetingRoom/${id}`)
      .then(result => {
        this.setState({
          
        });
        this.fetchData()
        toast.success("Sala apagada com sucesso");
      })
      .catch(e => {
        toast.error("Permissão negada");
        console.log("Error", e);
      });
  };

  fetchData = async (data) => {
    await API.get('/meetingRoom', {})
     .then(res => {
       console.log("DADOS", res)
       this.setState({
          rooms: res.data,    
       });         
     })
     .catch(error => {
       console.log('Error ', error);
       return { code: 'error', message: 'Cannot get meetings!' };
   });
   }

   handleMeetingRoom = async e => {
    e.preventDefault();

    const { name, room, description, responsable } = this.state;

    if (!(name || room || description || responsable)) {
        
      toast.error("Preencha todos os campos");
    
    } else {
      try {
        await API.post("/meetingRoom", { name, room, responsable, description });
        console.log("");
        toast.success("Sala criada com sucesso");
      } catch (err) {
        console.log(err);
        toast.error("Ocorreu um erro ao registrar sua conta");
        
      } 
    }
  };


  handleClose() {
    this.setState({ show: false});
  }

  handleShow() {
    this.setState({ show: true});
  }
  
  render() {
    const { rooms } = this.state;
    return(
        <div className="profile-container">
            <div className="header">
            <h1>SALA DE REUNIÕES</h1>
            <button onClick={this.handleShow} type="button">
              <AddCircleOutlineIcon />
            </button>
            <hr className="title-line" />
              <div className="modal">
              <form onSubmit={this.handleMeetingRoom}>
                <Modal 
                  show={this.state.show} 
                  onHide={this.handleClose}
                >
                <Modal.Header closeButton>
                  <Modal.Title>Cadastrar nova sala</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <MeetingRoomIcon />  
                  <input placeholder="Nome da sala" onChange={e => this.setState({ name: e.target.value })} />
                    <br />
                    <LocationOnIcon />
                    <input placeholder="Número da sala" onChange={e => this.setState({ room: e.target.value })}/>
                    <br />
                    <PersonIcon />
                    <input placeholder="Responsável pela sala" onChange={e => this.setState({ responsable: e.target.value })} />
                    <br />
                    
                    <DescriptionIcon />
                    <input placeholder="Descrição" onChange={e => this.setState({ description: e.target.value })}/>
                    {/* <textarea placeholder="Descrição"></textarea> */}
                  
                  </Modal.Body>
                  <Modal.Footer>
                    <button type="submit" onClick={this.handleClose}>
                      Cadastrar
                    </button>
                  </Modal.Footer>
                  </Modal>
                </form>
                </div>
            </div>    
            <ul>
            {rooms.map( room => {
              return(
                <li key={`room${room.id}`}>   
                <Accordion defaultActiveKey={room.id}>
                <Card>
                <div className="room">
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                  
                    <strong>{`${room.name} - ${room.room}` }</strong>
                  </Accordion.Toggle>
                  <div>
                      <button 
                        onClick={() => this.handleDelete(room.id)}
                        className="button-room" 
                        type="button"
                      >
                          <DeleteIcon size={18} />

                      </button>
                      <button className="button-room" type="button">
                          <MoreVertIcon size={18} /> 
                      </button>
                      </div>
                  </div>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div className="body">
                        <div>
                          <h6>Descrição: </h6>
                          <p>{room.description}</p>
                          <br/>
                          <h6>Itens: </h6>
                          {room.RoomItems.map( item => {
                            return (<p key={`roomItem${item.info.name}`}>
                              {`\u2713${item.info.name}: ${item.quantity}`}
                            </p>)
                          })}
                        </div>
                        <div>
                          <h6>Responsável: </h6>
                          <p>{room.admin}</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                </Accordion>
                </li>
              )
            })}
               </ul>
        </div>
    );
   }
}

export default MeetingRoom;
