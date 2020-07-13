import React, { Component } from 'react';

import { Modal, ProgressBar } from 'react-bootstrap'

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIcon from '@material-ui/icons/Assignment';

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


import { toast } from 'react-toastify';

import API from '../../services/api';

import './styles.css';



class MyProjects extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShowCreate.bind(this);
    this.handleClose = this.handleCloseCreate.bind(this);

    this.state = {
      showCreate: false,
      showView: false,
      id: 0,
      tasks: [],
      Tasks: [],
      projects: [],
      title: '',
      description: '',
      deliver_date: '',
      note: '',
      fk_project: '',
      page: 1,
    }
  }

  componentDidMount() {
    this.fetchData();
    this.fetchTasks();

  };

  fetchProjectTask = async (id) => {
    return API.get(`/tasks/${id}`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        console.log('Error ', error);
        return { code: 'error', message: 'Cannot get tasks!' };
      });
  };

  fetchData = async (data) => {
    await API.get('/projects', {})
      .then(res => {
        console.log("DADOS PROJS", res.data)
        Promise.all(res.data.map((p) =>
          this.fetchProjectTask(p.id)))
          .then(result => {
            console.log("ola",result)
            this.setState({
              tasks: result,
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

  fetchTasks = async (data) => {
    await API.get('/tasks', {})
      .then(res => {
        this.fetchData();
        console.log("tarefinhas", res.data)
        this.setState({
          Tasks: res.data,
        });
      })
      .catch(error => {
        console.log('Error ', error);
        return { code: 'error', message: 'Cannot get projects!' };
      });
  };

  handleTask = async e => {
    e.preventDefault();

    const { title, description, deliver_date, note } = this.state;

    if (!(title || description || deliver_date || note)) {
      toast.error("Preencha todos os campos");
      return;
    }

    await API.post("/tasks", { title, description, deliver_date, note })
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

  updateTask = async e => {
    e.preventDefault();

    const { id, title, description, deliver_date, note } = this.state;

    if (!(id || title || description || deliver_date || note)){
        toast.error("Preencha todos os campos");
        return;
      }

    await API.put("/tasks/"+id, { id, title, description, deliver_date, note })
      .then(async _ => {
        toast.success("Tarefa atualizada com sucesso");
        await this.fetchTasks();
        this.handleCloseView();
      }).catch(err => {
        console.log(err);
        toast.error("Ocorreu um erro ao atualizar a tarefa.");
        this.handleCloseView();
      });
  }

  handleShowView = (task) => {
    this.setState({
      showView: true,
      id: task.id,
      title: task.title,
      description: task.description,
      deliver_date: task.deliver_date,
      note: task.note


    })
  }

  handleCloseCreate = () => {
    this.setState({ showCreate: false });
  }

  handleShowCreate = () => {
    this.setState({ showCreate: true });
  }

  handleCloseView = () => {
    this.setState({ showView: false })
  }

  prevPage = () => {

  }

  nextPage = () => {

  }
  render() {
    const { projects, Tasks } = this.state;
    return (
    
      <div className="my-projects-container">
        <div className="header">
          <h1> MEUS PROJETOS</h1>
        </div>
        <div className="actions">
            <button onClick={this.prevPage}>Anterior</button>
            <button onClick={this.nextPage}>Próximo</button>
        </div> 
        <form>
            <Modal
                size="lg"
                show={this.state.showView}
                onHide={this.handleCloseView.bind(this)}
                
            >
                <Modal.Header className="my-modal" closeButton>
                    <Modal.Title style={{alignItems: 'center'}}><AssignmentIcon /> {this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="my-modal">
                      
                    {/* <TextField
                        id="standard-multiline-flexible"
                        label="Título"
                        multiline
                        rowsMax={1}
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                    />
                    <br /><br /> */}
                    <TextField
                        id="standard-multiline-flexible"
                        label="Descrição"
                        multiline
                        rowsMax={4}
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })}
                    />
                    <br /><br />
                    <TextField
                        id="standard-multiline-flexible"
                        label="Data de Entrega"
                        multiline
                        rowsMax={1}
                        value={this.state.deliver_date}
                        onChange={e => this.setState({ deliver_date: e.target.value })}
                    />
                    <br /><br />
                    <TextField
                        id="standard-multiline-flexible"
                        label="Observações"
                        multiline
                        rowsMax={4}
                        value={this.state.note}
                        onChange={e => this.setState({ note: e.target.value })}
                    />
                    <br /><br />
                 
                    
                    <h6> <CheckCircleOutlineRoundedIcon /> CHECKLIST</h6>
                    
                    <br />
                    <ProgressBar now={60} style={{width: '400px', marginLeft: 'auto', marginRight: 'auto', marginTop:'-20px' }}/>
                    <br />

                    <label className="container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                
                      <p>Estilização tela de perfil</p>
                    </label>

                    <label className="container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                
                      <p>Estilização tela de sdrfgwr</p>
                    </label>

                        {/* <p style={{ alignItems: 'center' }}>
                          <CheckBoxIcon style={{ color: '#444' }} size={10} />
                        CheckLIst:
                      </p> */}

                        {/* {task.Checklists.map(checklist => 
                    <fieldset key={`task.Checklists${checklist.id}`}> 
                      <div className="checklist-content">
                      <input type="checkbox" />
                      <label>{` ${checklist.name}`}</label>
                      </div>
                    </fieldset>
                    )} */}

                </Modal.Body>
                <Modal.Footer className="my-modal">
                    <button className="update-project" onClick={this.updateTask}>
                        Atualizar tarefa
                    </button>
                </Modal.Footer>
            </Modal>
        </form>
        <ul>
          {projects.map(project => {
            return (
              <li key={`project${project.id}`}>
                <h3>{project.name}</h3>
                <h6>{`\u2713Tarefas`}</h6>
                {Tasks.map(task =>  {
                if(task.Project.name === project.name) {  
                 return <fieldset key={`Tasks${task.id}`}>
                      
                <button className="task-bnt" onClick={() => this.handleShowView(task)}>{task.title}</button>
                </fieldset>
                } else return;
                })}
                <button className="new-task-bnt" onClick={this.handleShowCreate.bind(this)}>
                    <AddRoundedIcon />
                    Criar nova tarefa
                </button>
              </li>
            )
          })}

          
          {/* {Tasks.map(task => {
            return (
              <li key={`task${task.id}`}>
                <h3>{task.Project.name}</h3>
                <h6>{`\u2713Tarefas`}</h6>
            
                <button className="task-bnt" onClick={() => this.handleShowView(task)}>{task.title}</button>
    
                <button className="new-task-bnt" onClick={this.handleShowCreate.bind(this)}>
                    <AddRoundedIcon />
                    Criar nova tarefa
                </button>
              </li>
            )
          })} */}
        </ul> 
       
                <Modal
                  show={this.state.showCreate}
                  onHide={this.handleCloseCreate.bind(this)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Criar nova tarefa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <TextField id="standard-basic" label="Título da tarefa" onChange={e => this.setState({ title: e.target.value })} />
                    <br />

                    <TextField id="standard-basic" label="Descrição" onChange={e => this.setState({ description: e.target.value })} />
                    <br />

                    <TextField id="standard-basic" label="Data de entrega" onChange={e => this.setState({ deliver_date: e.target.value })} />
                    <br />

                    <TextField id="standard-basic" label="Observações" onChange={e => this.setState({ note: e.target.value })} />
                    <br />
                  </Modal.Body>
                  <Modal.Footer>
                    <button type="submit" className="update-project" onClick={this.handleTask}>
                      Cadastrar
                    </button>
                  </Modal.Footer>
                </Modal>
                
      </div>
    );
  }
}

export default MyProjects;

