import React, { Component, useState } from 'react';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';

import { Modal } from 'react-bootstrap';

import { toast } from 'react-toastify';

import API from '../../../services/api';

import './styles.scss';
import { ContactlessOutlined } from '@material-ui/icons';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCreate: false,
            step1: true,
            step2: false,
            step3: false,
            step4: false,
            rooms: [],
            id: 0,
            name: '', 
            description: '', 
            client_name: '', 
            type: '', 
            start: '', 
            end: '', 
            value: 0, 
            plots: 0,
            meeting_room_id: '', 
            responsible: '', 
            comments: '',

        };
    }

    componentDidMount() {
        this.fetchRooms();
        this.fetchData();
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

    fetchData = async () => {
        await API.get('/projects', {})
          .then(res => {
            console.log("DADOS PROJS", res.data)
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
        // e.preventDefault();

        console.log('teste', this.state.meeting_room_id)
    
        const { 
            name, 
            description, 
            client_name, 
            type, 
            start, 
            end, 
            value, 
            plots,
            meeting_room_id, 
            responsible, 
            comments
        } = this.state;
            
        await API.post("/projects", { name, description, client_name, type, start, end, value, plots, meeting_room_id, responsible, comments })
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

    handleCloseCreate = () => {
        this.setState({ 
            showCreate: false,
            step2: false,
            step3: false,
            step4: false,
        });
    };
    
    handleShowCreate = () => {
        this.setState({ 
            showCreate: true,
            step1: true,
        });
    };

    nextStep = () => {
        const {step1, step2, step3 } = this.state

        if(step1 === true) {
            this.setState({ step1: false, step2: true})
        } 

         if(step2 === true) {
            this.setState({ step2: false, step3: true})
        } 
        if(step3 === true) {
            this.setState({ step3: false, step4: true})
        } return;
     
    }

    prevStep = () => {
        const { step2, step3, step4 } = this.state

         if(step2 === true) {
            this.setState({ step2: false, step1: true})
        }         
        if(step3 === true) {
            this.setState({ step3: false, step2: true})
        } 
        if(step4 === true) {
            this.setState({ step4: false, step3: true})
        } return;
     
    }



    render() {
        const {step1, step2, step3, step4, rooms } = this.state;
        const { submit } = this.props

        return (
            <div className="register-component">
            <button 
                className="add-project" 
                title="Adicionar novo Projeto" 
                onClick={this.handleShowCreate.bind(this)} 
                type="button"
            >
                <AddCircleOutlineIcon style={{width: '25px', height:'25px'}}/>
            </button>
            <div className="new-project-modal">
                <form>
                    <Modal  
                        show={this.state.showCreate}
                        onHide={this.handleCloseCreate}
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Cadastrar novo projeto</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {step1 &&
                                <>
                                    <div className="steps-body">
                                        <div className="triangle-down">

                                        </div>
                                        <svg height="40" width="90%">
                                            <polyline className="dotted-line" points="20,20, 170,20, 320,20,470,20"/>
                                            <marker id="circle-marker" markerWidth="8" markerHeight="8" refX="5" refY="5">
                                                <circle className="foreground" cx="5" cy="5" r="1" />
                                            </marker>
                                        </svg>
                                        <div className="steps-span">
                                            <span>1º Passo</span>
                                            <span>2º passo</span>
                                            <span>3º passo</span>
                                            <span>4º passo</span>
                                        </div>
                                        {/* <span >Desenvolvimento</span> */}
                                    </div>

                                    <div className="modal-inputs">
                                        <header>
                                            <p>Informações gerais</p>
                                        </header>
                                        <div className="geral-info">
                                            <div className="info-grid">
                                                <input 
                                                    className="standard-basic" 
                                                    placeholder="Nome do projeto"
                                                    value={this.state.name} 
                                                    onChange={e => this.setState({ name: e.target.value })}
                                                />
                                                <br />

                                                {/* <select>
                                                    <option value="" hidden>Sala de desenvolvimento</option>
                                                    {rooms.map(room => (
                                                        <option key={room.id} value={room.id} onChange={e => this.setState({ meeting_room_id: e.target.value })}>{`${room.room} - ${room.name}`}</option>
                                                    ))}
                                                </select>
                                                <br /> */}

                                                <input 
                                                    className="standard-basic" 
                                                    placeholder="Sala de desenvolvimento" 
                                                    value={this.state.meeting_room_id}
                                                    onChange={e => this.setState({ meeting_room_id: e.target.value })}
                                                /><br />

                                                <input 
                                                    className="standard-basic" 
                                                    placeholder="Tipo" 
                                                    value={this.state.type}
                                                    onChange={e => this.setState({ type: e.target.value })}
                                                /><br />
                                            </div>

                                            <div className="description-grid">
                                                <textarea 
                                                    className="standard-basic" 
                                                    placeholder="Descrição" 
                                                    value={this.state.description}
                                                    onChange={e => this.setState({ description: e.target.value })}
                                                />

                                            </div>

                                        </div>

                                        <header>
                                            <p>Prazo</p>
                                        </header>
                                        <div className="deadline-inputs">
                                            <input 
                                                className="standard-basic" 
                                                placeholder="Início do projeto"
                                                value={this.state.start}
                                                onChange={e => this.setState({ start: e.target.value })}
                                            />
                                            <input 
                                                className="standard-basic" 
                                                placeholder="Fim do projeto"
                                                value={this.state.end} 
                                                onChange={e => this.setState({ end: e.target.value })}
                                            />  
                                        </div>
                                         
                                      
                                    </div> 
                            </>
                            }

                            {step2 &&
                                <>
                                    <div className="steps-body">
                                        <div className="triangle-down-steps" style={{marginLeft: '180px'}}>

                                        </div>
                                        <svg height="40" width="90%">
                                            <polyline className="dotted-line" points="20,20, 170,20, 320,20,470,20"/>
                                            <marker id="circle-marker" markerWidth="8" markerHeight="8" refX="5" refY="5">
                                                <circle className="foreground" cx="5" cy="5" r="1" />
                                            </marker>
                                        </svg>
                                        <div className="steps-span">
                                            <span>1º Passo</span>
                                            <span>2º passo</span>
                                            <span>3º passo</span>
                                            <span>4º passo</span>
                                        </div>
                                    </div>

                                    <div className="modal-inputs">
                                        <header>
                                            <p>Financeiro</p>
                                        </header>
                                        <input 
                                            className="standard-basic" 
                                            placeholder="Cliente"
                                            value={this.state.client_name}
                                            onChange={e => this.setState({ client_name: e.target.value })}
                                        />
                                        <br />

                                        <input 
                                            className="standard-basic" 
                                            placeholder="Valor" 
                                            onChange={e => this.setState({ value: e.target.value })}
                                        />
                                        <br />

                                        <input 
                                            className="standard-basic" 
                                            placeholder="Parcelas" 
                                            onChange={e => this.setState({ plots: e.target.value })}
                                        />
                                        <br />                                      
                                    </div>            
                                </>
                            }

                            {step3 &&
                                <>
                                     <div className="steps-body">
                                        <div className="triangle-down-steps" style={{marginLeft: '330px'}}>

                                        </div>
                                        <svg height="40" width="90%">
                                            <polyline className="dotted-line" points="20,20, 170,20, 320,20,470,20"/>
                                            <marker id="circle-marker" markerWidth="8" markerHeight="8" refX="5" refY="5">
                                                <circle className="foreground" cx="5" cy="5" r="1" />
                                            </marker>
                                        </svg>
                                        <div className="steps-span">
                                            <span>1º Passo</span>
                                            <span>2º passo</span>
                                            <span>3º passo</span>
                                            <span>4º passo</span>
                                        </div>
                                    </div>          
                                    <div className="modal-inputs">
                                        <header>
                                        <p>etapas do Projeto</p> 
                                        </header>
                                        <button type="button" onClick={() => {}}>+ Nova Etapa</button>                                    
                                    </div>
                                </>             
                            }

                            {step4 &&
                                <>
                                     <div className="steps-body">
                                        <div className="triangle-down-steps" style={{marginLeft: '480px'}}>

                                        </div>
                                        <svg height="40" width="90%">
                                            <polyline className="dotted-line" points="20,20, 170,20, 320,20,470,20"/>
                                            <marker id="circle-marker" markerWidth="8" markerHeight="8" refX="5" refY="5">
                                                <circle className="foreground" cx="5" cy="5" r="1" />
                                            </marker>
                                        </svg>
                                        <div className="steps-span">
                                            <span>1º Passo</span>
                                            <span>2º passo</span>
                                            <span>3º passo</span>
                                            <span>4º passo</span>
                                        </div>
                                    </div>            
                                    <div className="modal-inputs">
                                        <header>
                                            <p>membros</p> 
                                        </header>
                                        <input 
                                            className="standard-basic" 
                                            placeholder="Responsável" 
                                            value={this.state.responsible}
                                            onChange={e => this.setState({ responsible: e.target.value })}
                                        />
                                        <br />
                                    
                                        {/* <input 
                                            className="standard-basic" 
                                            placeholder="Comentários" 
                                            value={this.state.comments}
                                            onChange={e => this.setState({ comments: e.target.value })}
                                        />
                                        <br />                                       */}
                                    </div>
                                </>             
                            }                            

                    </Modal.Body>
                        <Modal.Footer>
                            <div className="prev-next-step">
                                {step4 === true ?
                                    <>
                                    <button 
                                        type="button" 
                                        className="cadastro" 
                                        onClick={this.prevStep}
                                        style={step1 === true ? {color: '#999', cursor: 'auto'} : {}}
                                    >
                                        Anterior
                                    </button>
                                    <button type="submit" className="submit-project" onClick={this.handleProject}>
                                        Cadastrar
                                    </button> 
                                    </> :   
                                    <>
                                        <button 
                                            type="button" 
                                            className="cadastro" 
                                            onClick={this.prevStep}
                                            style={step1 === true ? {color: '#999', cursor: 'auto'} : {}}
                                            >
                                            Anterior
                                        </button>
                                        <button type="button" className="next" onClick={this.nextStep}>
                                            Próximo
                                        </button>
                                    </>
                                }
                            </div>
                        </Modal.Footer>
                    </Modal>

                </form>
            </div>



            </div>
        );
    }
}

export default Register;