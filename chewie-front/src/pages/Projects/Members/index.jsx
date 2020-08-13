import React, { Component } from 'react';

import PaletteRoundedIcon from '@material-ui/icons/PaletteRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import LaptopRoundedIcon from '@material-ui/icons/LaptopRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import setaEsquerda from '../../../assets/images/Seta_Esquerda.svg';
import setaDireita from '../../../assets/images/Seta_Direita.svg';
import edit from '../../../assets/images/Editar_Nome.png';
import avatar from '../../../assets/images/a.png';

import API from '../../../services/api';

import './styles.scss';

class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showResponsibles: true,
            showDesigners: false,
            showDevs: false,
            showPartners: false,
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

    handleResponsibles =  () => {
        const { showResponsibles } = this.state; 
        this.setState({
            showResponsibles: !showResponsibles,
            showDesigners: false,
            showDevs: false,
            showPartners: false,
        })
    }

    handleDesigners =  () => {
        const { showDesigners } = this.state; 
        this.setState({
            showDesigners: !showDesigners,
            showResponsibles: false,
            showDevs: false,
            showPartners: false,
        })
    }

    handleDevs =  () => {
        const { showDevs } = this.state; 
        this.setState({
            showDevs: !showDevs,
            showResponsibles: false,
            showDesigners: false,
            showPartners: false,
        })
    }

    render() {
        const { showResponsibles, showDesigners, showDevs, showPartners } = this.state;
        return (
            <div className="members-component">
                <div className="members-bnts">
                    <button
                        title="Responsáveis"
                        onClick={this.handleResponsibles} 
                        style={showResponsibles === true ? {color: '#4c7bff'} : {}}
                    >
                        <SettingsRoundedIcon style={{width: '45px', height:'45px'}}/>
                    </button>

                    <button
                        title="Designers"
                        onClick={this.handleDesigners}  
                        style={showDesigners === true ? {color: '#4c7bff'} : {}} 
                    >
                        <PaletteRoundedIcon style={{width: '45px', height:'45px'}}/>
                    </button>

                    <button
                        title="Desenvolvedores" 
                        onClick={this.handleDevs}
                        style={showDevs === true ? {color: '#4c7bff'} : {}} 
                    >
                        <LaptopRoundedIcon style={{width: '45px', height:'45px'}}/>
                    </button>

                    <button
                        title="Parceiros" 
                        style={showPartners === true ? {color: '#4c7bff'} : {}} 
                    >
                        <GroupRoundedIcon style={{width: '45px', height:'45px'}}/>
                    </button>
                </div>

                {showResponsibles && 
                    <div className="responsibles-card">
                        <div className="responsibles-header">
                            <h2>Membros do projeto</h2>
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
                        <button className="title-bnt">
                            Responsáveis pelo projeto
                            <img src={edit} style={{color: '#fff'}}alt=""/>  
                        </button>
                        <div className="name-members">
                            <img src={avatar} alt=""/>
                            <span>Deborah Baltasar</span>
                        </div>
                    </div>
                }

                {showDesigners && 
                    <div className="responsibles-card">
                        <div className="responsibles-header">
                            <h2>Membros do projeto</h2>
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
                        <button className="title-bnt">
                            Designers do projeto
                            <img src={edit} style={{color: '#fff'}}alt=""/>  
                        </button>
                        <div className="name-members">
                            <img src={avatar} alt=""/>
                            <span>Deborah Baltasar</span>

                            <img src={avatar} alt=""/>
                            <span>Filipe Oliveira</span>

                        </div>
       
                    </div>
                }

                {showDevs && 
                    <div className="responsibles-card">
                        <div className="responsibles-header">
                            <h2>Membros do projeto</h2>
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
                        <button className="title-bnt">
                            Desenvolvedores do projeto
                            <img src={edit} style={{color: '#fff'}}alt=""/>  
                        </button>
                        <div className="name-members">
                            <img src={avatar} alt=""/>
                            <span>Deborah Baltasar</span>

                            <img src={avatar} alt=""/>
                            <span>Filipe Oliveira</span>

                        </div>
       
                    </div>
                }        

            </div>
        );
    }
}

export default Members;
