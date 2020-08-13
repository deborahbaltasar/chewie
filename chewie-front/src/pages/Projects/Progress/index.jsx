import React, { useState, useEffect } from 'react';
import { Progress }  from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

import API from '../../../services/api';

import './styles.scss';


const ProgressCard = () => {
    const [progress, setProgress] = useState(45);

    // useEffect(() => {
    //     API.get('status').then(res => {
    //         const  total  = res.data;

    //         console.log(total);
    //     })
    // }, [])
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
                        percent={progress}
                    />
                </div>
            </div>
            <div className="steps-progress">
               <br /><h2>Etapas do projeto</h2>
                <div className="steps-body">
                  
                </div>
            </div>
        </div>
    )
}
export default ProgressCard;