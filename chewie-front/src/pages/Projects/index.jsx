import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { Modal } from 'react-bootstrap';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import FolderRoundedIcon from '@material-ui/icons/FolderRounded';

import API from '../../services/api';

import Status from './Status'
import Financial from './Financial';
import Members from './Members';

import $ from "jquery";

import { parseISO, format } from 'date-fns';

import './styles.scss';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleShow = this.handleShowCreate.bind(this);
    this.handleClose = this.handleCloseCreate.bind(this);

    this.state = {
      search: '',
      showProject: false,
      showCreate: false,
      showView: false,
      showProgressCard: true,
      showFinancerCard: false,
      showMembersCard: false,
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
      showProject: true,
      name: project.name,
      id: project.id,
      description: project.description,
      client_name: project.client_name,
      type: project.type,
      start: format(parseISO(project.start), "dd'/'MM'/'yy"),
      end: format(parseISO(project.end), "dd'/'MM'/'yy"),
      value: project.value,
      meeting_room_room: project.MeetingRoom.room,
      meeting_room_name: project.MeetingRoom.name,
      responsible: project.User.name,
      comments: project.comments,
    //   status: project.ProjectStatus[0].Statu.name,
      showView: true,
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
  })};

  handleProgressCard = () => {
      const {showProgressCard } = this.state;
      this.setState({
          showProgressCard: !showProgressCard,
          showFinancerCard: false,
          showMembersCard: false,
      })
  }

  handleFinancerCard = () => {
    const {showFinancerCard } = this.state;
    this.setState({
        showFinancerCard: !showFinancerCard,
        showProgressCard: false,
        showMembersCard: false,
    })
  }

  handleMembersCard = () => {
    const { showMembersCard } = this.state;
    this.setState({
        showMembersCard: !showMembersCard,
        showProgressCard: false,
        showFinancerCard: false,
    })
  }



  render() {
    const { showProgressCard, showProject, showFinancerCard, showMembersCard } = this.state;

    let filteredProjects = this.state.projects.filter(
       (project) => {
           return project.name.toLowerCase().indexOf(this.state.search) !== -1;
       }
    );

    return (
    <div className="geral">
      <div className="projects-container">      
        <div className="header">
          <div className="header-left">
            <h1>PROJETOS</h1>
            <button 
                className="add-project" 
                title="Adicionar novo Projeto" 
                onClick={this.handleShowCreate.bind(this)} 
                type="button"
            >
                <AddCircleOutlineIcon style={{width: '25px', height:'25px'}}/>
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
        {showProject && 
        <div className="project-card">
            <div className="body">           
                <div className="body-tittle">
                    <h1>{this.state.name}</h1>
                    <div className="new-cards">
                        <button 
                            title="Progresso" 
                            style={showProgressCard === true ? {color: '#4c7bff'} : {}}
                            onClick={this.handleProgressCard}
                        >
                            <TimelineRoundedIcon style={{width: '45px', height:'45px'}}/>
                        </button>

                        <button 
                            title="Financeiro"
                            style={showFinancerCard === true ? {color: '#4c7bff'} : {}} 
                            onClick={this.handleFinancerCard}
                        >
                            <AttachMoneyRoundedIcon style={{width: '45px', height:'45px'}}/>
                        </button>

                        <button 
                            title="Arquivos"
                            // style={showProgressCard === true ? {color: '#4c7bff'} : {}} 
                        >
                            <FolderRoundedIcon style={{width: '45px', height:'45px'}}/>
                        </button>

                        <button 
                            title="Membros" 
                            style={showMembersCard === true ? {color: '#4c7bff'} : {}}
                            onClick={this.handleMembersCard}
                        >
                            <PersonRoundedIcon style={{width: '45px', height:'45px'}}/>
                        </button>
                    </div>
                </div>
                <div className="scroll-body">
                    <div className="description-body">
                        <header>Descrição</header>
                        <p className="scroll-description">
                        {this.state.description} 
                        </p>
                    </div>

                    <div className="information-body">
                        <header>Informações</header>

                        <div>
                        <span className="span-tittle">Laboratório: </span>
                        <span className="span-answer">{this.state.meeting_room_room}</span>
                        <br /><br />
                        </div>

                        <div>
                        <span className="span-tittle">Cliente: </span>
                        <span className="span-answer">{this.state.client_name}</span>
                        <br /><br />
                        </div>

                        <div>
                        <span className="span-tittle">Tipo do projeto: </span>
                        <span className="span-answer">{this.state.type}</span>
                        <br /><br />
                        </div>

                        <div>
                        <span className="span-tittle">Responsável: </span>
                        <span className="span-answer">{this.state.responsible}</span>
                        </div>
                    </div>

                    <div className="meeting-body">
                        <header>Próximas reuniões</header>
                        <span className="span-tittle">28/07: </span>
                        <span className="span-answer">Mostrar tela de 'reuniões'</span>
                        <hr className="line-meetings" /> 
                        <span className="span-tittle">30/07: </span>
                        <span className="span-answer">Mostrar tela de 'dispositivos'</span>
                        <hr className="line-meetings" /> 
                        <span className="span-tittle">12/08: </span>
                        <span className="span-answer">Mostrar tela de 'Projetos'</span>
                        <hr className="line-meetings" />
                        <br />
                        <Link to='/meetings' className="next-meeting">Agendar Próxima reunião</Link>
                    </div>

                    <div className="deadline-body">
                        <header>Prazo</header>
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
                                style={{width: '45%'}}
                            > 
                            </div>
                        </div>
                        <div className="start-end-progress">
                            <span className="start-end-date">{this.state.start}</span> 
                            <span className="start-end-date">{this.state.end}</span>
                        </div>
                    </div>

                </div> 
            </div>
            {showProgressCard &&
                <div className="progress-card">
                    <Status />
                    
                </div>
            }

            {showFinancerCard &&
                <div className="financer-card">
                    <Financial />
                </div>
            }

            {showMembersCard &&
                <div className="members-card">
                    <Members />
                </div>
            }

        </div>}
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
                </div>
                  
        </div>
      </div>
    );
  }
}

export default Projects;