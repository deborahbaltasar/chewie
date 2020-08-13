import React, { Component } from 'react';

import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';

import { Progress }  from 'react-sweet-progress';

import $ from "jquery";

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
                                    percent={80}
                                />
                            </div>
                        </div>

                        <div className="plots-progress">
                        <br /><h2>Parcelas</h2>
                            <div className="plots-body">
                            
                            </div>
                        </div>

                    </div>
                }

                {showInformation && 
                    <div>
                        Informações
                    </div>
                }

            </div>
        );
    }
}

export default Financial;
