import React, { Component, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import Menu from './Menu';


import API from '../../services/api';

import './styles.scss';

import $ from "jquery";

import { parseISO, formatDistance, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
  
  
  const firstDate = parseISO('2018-04-01 16:00:00');
  const secondDate = parseISO('2018-04-02 16:00:00');
  
  const formattedDate = format(
    firstDate, 
    "dd'/'MM'/'yy"
  );

  



class Projects extends Component {
  constructor(props) {
    super(props);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleShow = this.handleShowCreate.bind(this);
    this.handleClose = this.handleCloseCreate.bind(this);

    this.state = {
      search: '',
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
    $(".project-button").focus(function () {
        $(".body").css({"display" : 'grid'})
      })
  
    //   $(".project-button").click(function () {
    //     $(".project-button").css({"color" : '#FFF'})
    //     $(".body").css({"display" : 'none'})
        
    //   })
    this.setState({
      name: project.name,
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
    //   status: project.ProjectStatus[0].Statu.name,
      showView: true,
    })
    
    // const formattedDate = format(
    //     project.start, 
    //     "dd'/'MM'/'yy"
    //   );  
      console.log('aaaa', project.start.format(project.start, "dd'/'MM"))
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
  
  updateSearch = (e) => {
    this.setState({search: e.target.value.substr(0,20)});
  };


  handleAllProjects = () => {

    $(".bnt-all-projects").focus(function () {
      $(".all-projects").css({"display" : 'initial'})
      $(".bnt-all-projects").css({"color" : '#4c7bff'})
    })

    $(".bnt-all-projects").click(function () {
    
      $(".bnt-all-projects").css({"color" : '#FFF'})
      $(".all-projects").css({"display" : 'none'})    
    })}



  render() {
    let filteredProjects = this.state.projects.filter(
       (project) => {
           return project.name.toLowerCase().indexOf(this.state.search) !== -1;
       }
    );

    // const date = this.state.start;
    


    return (
    <div className="geral">
      <div className="projects-container">      
        <div className="header">
          <div className="header-left">
            <h1>PROJETOS</h1>
            <button className="add-project" title="Adicionar novo Projeto" onClick={this.handleShowCreate.bind(this)} type="button">
                <AddCircleOutlineIcon />
            </button>
          </div>
          <div>
            <button className="bnt-all-projects" onFocus={this.handleAllProjects} type="button">
                Ver todos os projetos
            </button>
          </div>
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
                    label={formattedDate} 
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
          <div className="body-tittle">
            <h1>{this.state.name}</h1>
            <span className="body-status">EM DESENVOVIMENTO</span>
          </div>
          <div className="description-body">
              <header>DESCRIÇÃO</header>
              <p className="scroll-description">
                  {this.state.description} 
              </p>
          </div>
          <div className="informations-body">
              <header>INFORMAÇÕES</header>
              <div style={{overflow: 'auto'}}>
                  <fieldset style={{marginBottom: '15px'}}>
                  <span className="span-tittle">Cliente: </span>
                  <span className="span-answer">{this.state.client_name}</span>

                  <span className="span-tittle" style={{marginLeft: '103px'}}>Tipo do projeto: </span>
                  <span className="span-answer">{this.state.type}</span>
                  </fieldset>

                  </div>
                  <fieldset style={{marginBottom: '15px'}}>
                  <span className="span-tittle">Laboratório: </span>
                  <span className="span-answer">{this.state.meeting_room_room}</span>

                  <span className="span-tittle" style={{marginLeft: '55px'}}>Responsável: </span>
                  <span className="span-answer">{this.state.responsible}</span>
                  </fieldset>
                
              
            
          </div>
          <div className="steps-body">
              <header>prazo</header>
              <div className="start-end-progress">
                  <span className="start-end-span">Início</span>
                  <span className="start-end-span">Fim</span>
              </div>
              <div className="progress">
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    aria-valuenow="0" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                    style={{width: '55%'}}
                > 
                </div>
              </div>
              <div className="start-end-progress">
                  <span className="start-end-date">{this.startFormatted}</span>
                  <span className="start-end-date">30/09/20</span>
              </div>

          </div>
          <div className="meetings-body">
              <header>Próximas reuniões</header>
              <span className="span-tittle">28/07: </span>
              <span className="span-answer">Mostrar tela de 'reuniões'</span>
              <hr className="line-meetings" /> 
              <span className="span-tittle">30/07: </span>
              <span className="span-answer">Mostrar tela de 'dispositivos'</span>
              <hr className="line-meetings" /> 
              <span className="span-tittle">12/08: </span>
              <span className="span-answer">Mostrar tela de 'Meus Projetos'</span>
              <hr className="line-meetings" />
              <br />
              <Link to='/meetings' className="next-meeting">Agendar Próxima reunião</Link>
              
          </div>

          <div className="value-body">
              <header>Valor</header>
              <div className="start-end-progress">
                  <span className="start-end-span">R$ 0</span>
                  <span className="start-end-span">{`R$ ${this.state.value}`}</span>
              </div>
              <div className="progress">
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    aria-valuenow="0" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                    style={{width: '70%'}}
                >
                    R$ 4200
                </div>
              </div>
            
          </div>

          {/* <div className="members-body">
              <header>Membros</header>

            
          </div> */}

        </div>
      </div>
        <div className = 'all-projects'>
            <div style = {{display: 'grid'}}>
                <div style = {{margin: '40px auto 0px auto'}}>
                    <span className = 'all-projects-tittle'>Todos os projetos </span> 
                    <hr className="line" /> 
                    <SearchRoundedIcon style={{color: '#FFF'}}/>
                    <input 
                        className="search-input" 
                        placeholder="Procure um projeto aqui." 
                        value={this.state.search} 
                        onChange={this.updateSearch.bind(this)}
                    />
                    <hr className="line" />
                </div>
                </div>
                <div className="projects-buttons">
                {filteredProjects.map(project => (
                    <button className="project-button" key={project.id} onFocus={() => this.handleShowView(project)}>{project.name}</button>
                ))}
                {/* <button className="project-button">Chewie</button>
                <button className="project-button">Chewie</button>
                <button className="project-button">Chewie</button>
                <button className="project-button">Chewie</button>
                <button className="project-button">Chewie</button>
                <button className="project-button">Chewie</button>
                <button className="project-button">Chewie</button>
                <button className="project-button">Chewie</button>
                <button className="project-button">Chewie</button>
                <button className="project-button">Chewie</button>
                 */}
                </div>
                  
        </div>
      </div>
    );
  }
}

export default Projects;