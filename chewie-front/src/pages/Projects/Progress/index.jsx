import React, { useState, useEffect } from 'react';
import { Progress }  from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

import API from '../../../services/api';

import './styles.scss';


const ProgressCard = () => {
    const [progress, setProgress] = useState(45);

    useEffect(() => {
        API.get('status').then(res => {
            const  total  = res.data;

            setProgress(total);
        })
    }, [])
    return (
        <div className="progress-component">
            <div className="progress-title">
                <h2>Em desenvolvimento</h2>
            </div>    
            <div className="donut-container">
                <h2>Progresso do projeto</h2>

                <div className="donut-progress">
                    <Progress 
                        type="circle" 
                        width={280} 
                        strokeWidth={5}
                        percent={45}
                    />
                </div>
            </div>
            <div className="steps-progress">
               <br /><h2>Etapas do projeto</h2>
                <div className="steps-body">
                    <div className="triangle-down">

                    </div>
                    <svg height="40" width="90%">
                        <polyline className="dotted-line" points="20,20, 190,20, 330,20"/>
                        <marker id="circle-marker" markerWidth="8" markerHeight="8" refX="5" refY="5">
                            <circle className="foreground" cx="5" cy="5" r="1" />
                        </marker>
                    </svg>
                    <span>Documentação</span>
                    <span>Telas de baixa</span>
                    <span>Telas de alta</span>
                    {/* <span >Desenvolvimento</span> */}
                </div>
            </div>
        </div>
    )
}
export default ProgressCard;