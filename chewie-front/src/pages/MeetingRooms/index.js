

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

import {Accordion, Card, Modal} from 'react-bootstrap'
import './styles.css';


class MeetingRoom extends Component {
  constructor(props, context){
    super(props, context);
    
    this.handleShow = this.handleShowCreate.bind(this);
    this.handleClose = this.handleCloseCreate.bind(this);

    this.state = {
      showCreate: false,
      showEdit: false,
      rooms: [],
      id: 0,
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

    const { name, room, description, responsable: admin } = this.state;

    if (!(name || room || description || admin)){
      toast.error("Preencha todos os campos");
      return;
    }
        
    await API.post("/meetingRoom", { name, room, admin, description })
      .then(async _ => {
        toast.success("Sala criada com sucesso");
        await this.fetchData();
        this.handleCloseCreate();
      }).catch(err => {
        console.log(err);
        toast.error("Ocorreu um erro ao registrar a sala.");
        this.handleCloseCreate();
      });
  };

  updateMeetingRoom = async e => {
    e.preventDefault();

    const { id, name, room, description, responsable: admin } = this.state;

    if (!(id || name || room || description || admin)){
      toast.error("Preencha todos os campos");
      return;
    }

    await API.put("/meetingRoom/"+id, { id, name, room, admin, description })
      .then(async _ => {
        toast.success("Sala atualizada com sucesso");
        await this.fetchData();
        this.handleCloseEdit();
      }).catch(err => {
        console.log(err);
        toast.error("Ocorreu um erro ao atualizar a sala.");
        this.handleCloseCreate();
      });
  }


  handleCloseCreate() {
    this.setState({ showCreate: false});
  }

  handleShowCreate() {
    this.setState({ showCreate: true});
  }

  handleShowEdit(room){
    console.log(room)
    this.setState({
      showEdit: true,
      id: room.id,
      name: room.name,
      room: room.room,
      responsable: room.admin,
      description: room.description
    })
  }

  handleCloseEdit(){
    this.setState({showEdit: false})
  }
  
  render() {
    const { rooms } = this.state;
    return (
      <div className="profile-container">
        <div className="header">
          <h1>SALA DE REUNIÕES</h1>
          <button onClick={this.handleShowCreate.bind(this)} type="button">
            <AddCircleOutlineIcon />
          </button>
          <hr className="title-line" />
          <div className="modal">
            <form>
              <Modal
                show={this.state.showCreate}
                onHide={this.handleCloseCreate.bind(this)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Cadastrar nova sala</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <MeetingRoomIcon />
                  <input placeholder="Nome da sala" onChange={e => this.setState({ name: e.target.value })} />
                  <br />
                  <LocationOnIcon />
                  <input placeholder="Número da sala" onChange={e => this.setState({ room: e.target.value })} />
                  <br />
                  <PersonIcon />
                  <input placeholder="Responsável pela sala" onChange={e => this.setState({ responsable: e.target.value })} />
                  <br />

                  <DescriptionIcon />
                  <input placeholder="Descrição" onChange={e => this.setState({ description: e.target.value })} />
                  {/* <textarea placeholder="Descrição"></textarea> */}

                </Modal.Body>
                <Modal.Footer>
                  <button type="submit" onClick={this.handleMeetingRoom}>
                    Cadastrar
                    </button>
                </Modal.Footer>
              </Modal>
            </form>
            <form>
              <Modal
                show={this.state.showEdit}
                onHide={this.handleCloseEdit.bind(this)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Editar sala</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <MeetingRoomIcon />
                  <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                  <br />
                  <LocationOnIcon />
                  <input value={this.state.room} onChange={e => this.setState({ room: e.target.value })} />
                  <br />
                  <PersonIcon />
                  <input value={this.state.responsable} onChange={e => this.setState({ responsable: e.target.value })} />
                  <br />

                  <DescriptionIcon />
                  <input value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
                  {/* <textarea placeholder="Descrição"></textarea> */}

                </Modal.Body>
                <Modal.Footer>
                  <button type="submit" onClick={this.updateMeetingRoom}>
                    Salvar
                    </button>
                </Modal.Footer>
              </Modal>
            </form>
          </div>
        </div>
        <ul>
          {rooms.map(room => {
            return (
              <li key={`room${room.id}`}>
                <Accordion defaultActiveKey={room.id}>
                  <Card>
                    <div className="room">
                      <Accordion.Toggle as={Card.Header} eventKey="0">

                        <strong>{`${room.name} - ${room.room}`}</strong>
                      </Accordion.Toggle>
                      <div>
                        <button
                          onClick={() => this.handleDelete(room.id)}
                          className="button-room"
                          type="button"
                        >
                          <DeleteIcon size={18} />

                        </button>
                        <button className="button-room"
                          onClick={() => this.handleShowEdit(room)}
                          type="button">
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
                            <br />
                            <h6>Itens: </h6>
                            {room.RoomItems.map(item => {
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
