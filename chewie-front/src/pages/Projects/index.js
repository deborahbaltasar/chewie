import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { TextField } from '@material-ui/core';
import {Card, Button, Modal } from 'react-bootstrap';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// import TabPanel from './Menu'
import Menu from './Menu'

import API from '../../services/api';

import './styles.css';


class Projects extends Component {
  constructor(props) {
    super(props);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleShow = this.handleShowCreate.bind(this);
    this.handleClose = this.handleCloseCreate.bind(this);

    this.state = {
      showCreate: false,
      showView: false,
      projects: [],
      members: [],
      partners: [],
      rooms: [],
      allStatus: [],
      id: 0,
      name: '',
      description: '',
      client_name: '',
      type: '',
      start: '',
      end: '',
      value: '',
      meeting_room_id: '',
      meeting_room_room: '',
      meeting_room_name: '',
      responsible: '',
      comments: '',
      status: '',
    }
  }

  componentDidMount() {
    this.fetchData();
    this.fetchPartners();
    this.fetchRooms();
    this.fetchStatus();
  }

  fetchRooms = async () => {
    await API.get('/meetingRoom', {})
     .then(res => {
       console.log("DADOS SALAS", res)
       this.setState({
          rooms: res.data,    
       });
     })
     .catch(error => {
       console.log('Error ', error);
       return { code: 'error', message: 'Cannot get meetings!' };
   });
  };

  fetchMembers = async (id) => {
    return API.get(`/members/${id}`, {})
      .then(res => {
        return res.data     
      })
      .catch(error => {
        console.log('Error ', error);
        return { code: 'error', message: 'Cannot get members!' };
      });
  };

  fetchData = async () => {
    await API.get('/projects', {})
      .then(res => {
        console.log("DADOS PROJS", res.data)
        Promise.all(res.data.map((p) => 
         this.fetchMembers(p.id)))
         .then(result => {
          console.log('MEMBROS: ', result)
          this.setState({
            members: result,
          })

        })
        this.setState({
          projects: res.data,
        });
      })
      .catch(error => {
        console.log('Error ', error);
        return { code: 'error', message: 'Cannot get projects!' };
      });

  };

  handleProject = async e => {
    e.preventDefault();

    const { name, description, client_name, type, start, end, value, meeting_room_id, responsible, comments} = this.state;
        
    await API.post("/projects", { name, description, client_name, type, start, end, value, meeting_room_id, responsible, comments })
      .then(async _ => {
        toast.success("Projeto criada com sucesso");
        await this.fetchData();
        this.handleCloseCreate();
      }).catch(err => {
        console.log(err);
        toast.error("Ocorreu um erro ao registrar o projeto.");
        this.handleCloseCreate();
      });
  };

  updateProject = async e => {
    e.preventDefault();
    const { id } = this.state;
    await API.put("/project/"+id, {  })
      .then(async _ => {
        toast.success("Projeto atualizado com sucesso");
        await this.fetchData();
        this.handleCloseEdit();
        }).catch(err => {
            console.log(err);
            toast.error("Ocorreu um erro ao atualizar o projeto.");
            this.handleCloseCreate();
            });
  };

  fetchPartners = async () => {
    await API.get('/partners-projects', {})
     .then(res => {
       console.log("DADOS", res)
       this.setState({
          partners: res.data,    
       });
     })
     .catch(error => {
       console.log('Error ', error);
       return { code: 'error', message: 'Cannot get partners!' };
   });
  };

  fetchStatus = async () => {
    await API.get('/status', {})
     .then(res => {
       console.log("DADOS", res)
       this.setState({
          allStatus: res.data,    
       });
     })
     .catch(error => {
       console.log('Error ', error);
       return { code: 'error', message: 'Cannot get meetings!' };
   });
  };

  handleShowView = (project) => {
    this.setState({
      name: project.name,
      showView: true,
        selected: {
        id: project.id,
        description: project.description,
        client_name: project.client_name,
        type: project.type,
        start: project.start,
        end: project.end,
        value: project.value,
        meeting_room_room: project.MeetingRoom.room,
        meeting_room_name: project.MeetingRoom.name,
        responsible: project.User.name,
        comments: project.comments,
        status: project.ProjectStatus[0].Statu.name,
      }
    }) 
  };

  handleCloseCreate = () => {
    this.setState({ showCreate: false});
  };

  handleShowCreate = () => {
    this.setState({ showCreate: true});
  };

  handleCloseView = () => {
    this.setState({showView: false})
  };

  handleSelectedChange = (e) => {
    const { selected } = this.state;
    this.setState({
      selected: {
        ...selected,
        [e.target.name]: e.target.value
      }
    })
  };


  render() {

    const { projects, allStatus, rooms, selected } = this.state;


    return (
      <div className="projects-container">
        <div className="header">
          <h1>PROJETOS</h1>
          <button title="Adicionar novo Projeto" onClick={this.handleShowCreate.bind(this)} type="button">
            <AddCircleOutlineIcon />
          </button>
        </div>
        <div className="modal">
            <form>
              <Modal
                
                show={this.state.showCreate}
                onHide={this.handleCloseCreate.bind(this)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Cadastrar novo projeto</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <TextField 
                    className="standard-basic" 
                    label="Nome do projeto" 
                    onChange={e => this.setState({ name: e.target.value })}
                  />
          
                  <br />
                 
                  <TextField 
                    className="standard-basic" 
                    label="Descrição" 
                    onChange={e => this.setState({ description: e.target.value })}
                  />
                  <br />

                  <TextField 
                    className="standard-basic" 
                    label="Cliente"
                    onChange={e => this.setState({ client_name: e.target.value })}
                  />
                  <br />

                  <TextField 
                    className="standard-basic" 
                    label="Tipo" 
                    onChange={e => this.setState({ type: e.target.value })}
                  />
                  <br />

                  <TextField 
                    className="standard-basic" 
                    label="Valor" 
                    onChange={e => this.setState({ value: e.target.value })}
                  />
                  <br />

                  <TextField 
                    className="standard-basic" 
                    label="Início do projeto" 
                    onChange={e => this.setState({ start: e.target.value })}
                  />
                  <br />

                  <TextField 
                    className="standard-basic" 
                    label="Fim do projeto" 
                    onChange={e => this.setState({ end: e.target.value })}
                  />             
                  <br />

                  <TextField 
                    className="standard-basic" 
                    label="Sala de desenvolvimento" 
                    onChange={e => this.setState({ meeting_room_id: e.target.value })}
                  />
                  <br />

                  <TextField 
                    className="standard-basic" 
                    label="Responsável" 
                    onChange={e => this.setState({ responsible: e.target.value })}
                  />
                  <br />

                  <TextField 
                    className="standard-basic" 
                    label="Comentários" 
                    onChange={e => this.setState({ comments: e.target.value })}
                  />
                  <br />

                </Modal.Body>
                <Modal.Footer>
                  <button type="submit" className="update-project" onClick={this.handleProject}>
                    Cadastrar
                    </button>
                </Modal.Footer>
              </Modal>
            </form>
            </div>
        <div className="body">
          <ul>
            {projects.map(project => (
              <Card 
                key={project.id} 
                style={{ width: '18rem', background: '#1b2139', borderRadius: '1rem' }}
              >

                <Card.Body>
                  <Card.Title style={{ color: '#fff', fontSize: '25px'}}>{project.name}</Card.Title>
                    <Card.Text style={{ color: '#ccc'}}>
                      {project.description}
                    </Card.Text>
                  <Button 
                    style={{ background: '#4c7bff'}}
                    variant="primary" 
                    onClick={() => this.handleShowView(project)}
                  >
                    Mais informações
                  </Button>
                </Card.Body>
                <Modal
                  scrollable
                  size="xl"
                  className="project-modal"
                  show={this.state.showView}
                  onHide={this.handleCloseView.bind(this)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title >{this.state.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body >
                    
                    <Menu 
                      selected={selected} 
                      rooms={rooms} 
                      allStatus={allStatus} 
                      handleSelectedChange={this.handleSelectedChange}
                    />
                    

                  </Modal.Body>
                </Modal>
              </Card>
            ))}

          </ul>
        </div>
      </div>
    );
  }
}

export default Projects;