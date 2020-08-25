import React, { Component } from 'react';

import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';

import edit from '../../../assets/images/Editar_Nome.png';

import { Progress }  from 'react-sweet-progress';

import './styles.scss';

class Financial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: true,
            showInformation: false,
            showExpenses: false,
            finances: [],
            invoices: [],
        };
    }

    handleProgress =  () => {
        const { showProgress } = this.state; 
        this.setState({
            showProgress: !showProgress,
            showInformation: false,
            showExpenses: false,
        })
    }

    handleInformation =  () => {
        const { showInformation } = this.state; 
        this.setState({
            showInformation: !showInformation,
            showProgress: false,
            showExpenses: false,
        })
    }

    render() {
        const { showProgress, showInformation } = this.state;
        return (
            <div className="financer-component">       
                <div className="financer-bnts">
                    <button
                        title="Progresso"
                        style={showProgress === true ? {color: '#4c7bff'} : {}} 
                        onClick={this.handleProgress}
                    >
                        <TrendingUpRoundedIcon style={{width: '45px', height:'45px'}}/>
                    </button>

                    <button
                        title="Informações"
                        style={showInformation === true ? {color: '#4c7bff'} : {}} 
                        onClick={this.handleInformation}
                    >
                        <InfoRoundedIcon style={{width: '45px', height:'45px'}}/>
                    </button>

                    <button
                        title="Gastos"
                    >
                        <PaymentRoundedIcon style={{width: '45px', height:'45px'}}/>
                    </button>
                </div>
                {showProgress && 
                    <div className="financer-progress">
                        <div className="payment-container">
                            <h2>Progresso do pagamento</h2>

                            <div className="donut-progress">
                                <Progress 
                                    type="circle" 
                                    width={280} 
                                    strokeWidth={5}
                                    percent={86}
                                />
                            </div>
                        </div>

                        <div className="plots-progress">
                        <br /><h2>Parcelas</h2>
                            <div className="plots-body">
                            <div className="triangle-down-plots">

                            </div>
                            <svg height="40" width="100%">
                                <polyline className="dotted-line" points="30,20, 90,20, 150,20, 220,20, 280,20, 340,20, 410,20"/>
                                <marker id="circle-marker" markerWidth="8" markerHeight="8" refX="5" refY="5">
                                    <circle className="foreground" cx="5" cy="5" r="1" />
                                </marker>
                            </svg>
                            <span>1ª</span>
                            <span>2ª</span>
                            <span>3ª</span>
                            <span>4ª</span>
                            <span>5ª</span>
                            <span>6ª</span>
                            <span>7ª</span>
                            {/* <span>8ª</span>
                            <span>9ª</span> */}
                            
                            </div>
                        </div>

                    </div>
                }

                {showInformation && 
                <div className="info-component">
                    <div className="information-card">
                        <button className="info-title-bnt">
                            Informações de pagamento
                            <img src={edit} style={{color: '#fff'}}alt=""/>  
                        </button>
                        <div className="info-card-body">
                        <span className="span-tittle">Valor total do projeto: </span>
                        <span className="span-answer">R$ 7.000</span>
                        </div>
                        <br />
                        <div className="info-card-body">
                        <span className="span-tittle">Valor pago: </span>
                        <span className="span-answer">R$ 6.000</span>
                        </div>
                        <br />
                        <div className="info-card-body">
                        <span className="span-tittle">Valor da parcela: </span>
                        <span className="span-answer">R$ 1.000</span>
                        </div>
                        <br />
                        <div className="info-card-body">
                        <span className="span-tittle">Valor restante: </span>
                        <span className="span-answer">R$ 1.000</span>
                        </div>
                        <br />
                        <div className="info-card-body">
                        <span className="span-tittle">Quantidade de parcelas: </span>
                        <span className="span-answer">7</span>
                        </div>
                        <br />
                        <div className="info-card-body">
                        <span className="span-tittle">Parcelas pagas: </span>
                        <span className="span-answer">6</span>
                        </div>                        
                        <br />
                        <div className="info-card-body">
                        <span className="span-tittle">Parcelas restantes: </span>
                        <span className="span-answer">2</span>
                        </div>
                        </div>
                        <div className="plots-progress">
                            <br /><h2>Parcelas</h2>
                            <div className="plots-body">
                                <div className="triangle-down-plots">

                            </div>
                                <svg height="40" width="100%">
                                    <polyline className="dotted-line" points="30,20, 90,20, 150,20, 220,20, 280,20, 340,20, 410,20"/>
                                    <marker id="circle-marker" markerWidth="8" markerHeight="8" refX="5" refY="5">
                                        <circle className="foreground" cx="5" cy="5" r="1" />
                                    </marker>
                                </svg>
                                <span>1ª</span>
                                <span>2ª</span>
                                <span>3ª</span>
                                <span>4ª</span>
                                <span>5ª</span>
                                <span>6ª</span>
                                <span>7ª</span>
                                {/* <span>8ª</span>
                                <span>9ª</span> */}
                            </div>
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default Financial;
