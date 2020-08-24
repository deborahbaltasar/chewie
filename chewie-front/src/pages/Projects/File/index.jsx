import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';

import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import setaEsquerda from '../../../assets/images/Seta_Esquerda.svg';
import setaDireita from '../../../assets/images/Seta_Direita.svg';

import Dropzone from '../../../components/Dropzone';
import StyledDropzone from '../../../components/Dropzone'; 

import API from '../../../services/api';

import './styles.scss';

class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDocumentation: true,
            showModal: false,
            projects: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    };

    fetchData = async () => {
        await API.get('/projects', {})
            .then((res) => {
                console.log('DADOS PROJS', res.data);
                this.setState({
                    projects: res.data,
                });
            })
            .catch((error) => {
                console.log('Error ', error);
                return { code: 'error', message: 'Cannot get projects!' };
            });
    };

    handleDocumentation =  () => {
        const { showDocumentation } = this.state; 
        this.setState({showDocumentation: !showDocumentation})
    }

    handleCloseModal = () => {
        this.setState({ showModal: false});
    }

    handleOpenModal = () => {
        this.setState({ showModal: true});
    }

    render() {
        const { showDocumentation } = this.state;
        return (
            <div className="files-component">
                <div className="members-bnts">
                    <button
                        title="Documentação"
                        onClick={this.handleDocumentation}   
                        style={showDocumentation === true ? {color: '#4c7bff'} : {}} 
                    >
                        <DescriptionRoundedIcon style={{width: '45px', height:'45px'}}/>
                    </button>

                    <button
                        title="Nova pasta de arquivos"
                    >
                        <AddRoundedIcon style={{width: '45px', height:'45px'}}/>
                    </button>
                </div>

                {showDocumentation && 
                    <div className="documentation-card">
                        <div className="documentation-header">
                            <h2>Documentação</h2>
                            <div className="pagination-bnts">
                                <button>
                                    <img style={{width: '24px', height: '24px'}}src={setaEsquerda} alt="Página Anterior"/>
                                </button>
                                <span>1/1</span>
                                <button>
                                <img style={{width: '24px', height: '24px'}}src={setaDireita} alt="Próxima página"/>
                                </button>
                            </div>
                        </div>
                        <div className="documentation-body">
                            <p>Nenhum arquivo nessa pasta.</p>
                            <button onClick={this.handleOpenModal}>Adiconar Novo Documento</button>
                        </div>
                    </div>
                }

                <div className="new-project-modal">
                    <form>
                        <Modal  
                            show={this.state.showModal}
                            onHide={this.handleCloseModal}
                            size="lg"
                        >
                            <Modal.Header closeButton />
                            <Modal.Body>
                                <StyledDropzone />                          
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="cadastro">
                                    Confirmar
                                </button>
                            </Modal.Footer>
                        </Modal>

                    </form>
                </div>
            </div>
 
        );
    }
}

export default Files;
