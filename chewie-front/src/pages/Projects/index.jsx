import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { 
    SearchRounded, 
    AttachMoneyRounded, 
    ArrowBackRounded, 
    PersonRounded, 
    TimelineRounded, 
    FolderRounded 
} from '@material-ui/icons';

import edit from '../../assets/images/Editar_Nome.png';

import API from '../../services/api';

import Progress from './Progress'
import Financial from './Financial';
import Members from './Members';
import Register from './Register';
import Menu from './Menu';
import Files from './File'

import { parseISO, format } from 'date-fns';

import './styles.scss';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);


    this.state = {
      search: '',
      showProject: false,
      showAllProjects: false,
      showView: false,
      showProgressCard: true,
      showFinancerCard: false,
      showMembersCard: false,
      showFilesCard: false,
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

    const { 
        name, 
        description, 
        client_name, 
        type, 
        start, 
        end, 
        value, 
        meeting_room_id, 
        responsible, 
        comments
    } = this.state;
        
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
    const { showAllProjects } = this.state;

    this.setState({showAllProjects: !showAllProjects})
  };

  handleProgressCard = () => {
      const {showProgressCard } = this.state;
      this.setState({
          showProgressCard: !showProgressCard,
          showFinancerCard: false,
          showMembersCard: false,
          showFilesCard: false,
      })
  };

  handleFinancerCard = () => {
    const {showFinancerCard } = this.state;
    this.setState({
        showFinancerCard: !showFinancerCard,
        showProgressCard: false,
        showMembersCard: false,
        showFilesCard: false,
    })
  };

  handleMembersCard = () => {
    const { showMembersCard } = this.state;
    this.setState({
        showMembersCard: !showMembersCard,
        showProgressCard: false,
        showFinancerCard: false,
        showFilesCard: false,
    })
  };

  handleFilesCard = () => {
    const { showFilesCard } = this.state;
    this.setState({
        showFilesCard: !showFilesCard,
        showProgressCard: false,
        showFinancerCard: false,
        showMembersCard: false,
    })
  };

  backToMenu = () => {
      this.setState({showProject: false});
  };

  render() {
    const { 
        showProgressCard,
        showProject, 
        showAllProjects, 
        showFinancerCard, 
        showMembersCard,
        showFilesCard, 
    } = this.state;

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
                <Register /> 
            </div>
            <div>
                {showProject && 
                    <>
                        <button className="bnt-all-projects" onClick={this.backToMenu} type="button">
                            <ArrowBackRounded style={{marginRight: '10px'}}/>
                            Voltar para Menu
                        </button>

                        <button 
                            className="bnt-all-projects" 
                            onClick={this.handleAllProjects} 
                            type="button"
                            style={showAllProjects === true ? {color: '#4c7bff'} : {}} 
                        >
                            Ver todos os projetos
                        </button>
                    </>
                }

            </div>
            </div>

            
            {showProject === true ? 
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
                                <TimelineRounded style={{width: '45px', height:'45px'}}/>
                            </button>

                            <button 
                                title="Financeiro"
                                style={showFinancerCard === true ? {color: '#4c7bff'} : {}} 
                                onClick={this.handleFinancerCard}
                            >
                                <AttachMoneyRounded style={{width: '45px', height:'45px'}}/>
                            </button>

                            <button 
                                title="Arquivos"
                                style={showFilesCard === true ? {color: '#4c7bff'} : {}}
                                onClick={this.handleFilesCard} 
                            >
                                <FolderRounded style={{width: '45px', height:'45px'}}/>
                            </button>

                            <button 
                                title="Membros" 
                                style={showMembersCard === true ? {color: '#4c7bff'} : {}}
                                onClick={this.handleMembersCard}
                            >
                                <PersonRounded style={{width: '45px', height:'45px'}}/>
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
                            <button className="edit-cards-bnt">
                                Informações 
                                <img src={edit} style={{color: '#fff'}}alt=""/>  
                            </button>

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
                        <Progress />
                        
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

                {showFilesCard &&
                    <div className="files-card">
                        <Files />
                    </div>
                }

            </div> : <Menu handleProjects={this.handleAllProjects} hoverProject={this.state.showAllProjects}/>}
        </div>
            {showAllProjects && 
            <div className = 'all-projects'>
                <div style = {{display: 'grid'}}>
                    <div style = {{margin: '40px auto 0px auto'}}>
                        <span className = 'all-projects-tittle'>Todos os projetos </span> 
                        <hr className="line" /> 
                        <SearchRounded style={{color: '#FFF'}}/>
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
            
            }

        </div>
    );
  }
}

export default Projects;