import React, {Component} from 'react';

import EventRoundedIcon from '@material-ui/icons/EventRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import LaptopChromebookRoundedIcon from '@material-ui/icons/LaptopChromebookRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import NameReunionIcon from '../../assets/images/SalaDeReunioes.svg';

import { parseISO, format } from 'date-fns';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './styles.scss';

class CreateMeetings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: false,
            id: 0,
            name: '',
            room: '',
            responsable: '',
            description: '',
            day: ''
        }
    }


    handleCheck = () => {
        const { isChecked } = this.state;  
        this.setState({isChecked: (!isChecked)})
      };


      handleDay = (date) => {
        this.setState({
            day: format(date, "dd'/'MM'/'yyyy")
        })
    }

    render() {

        const {isChecked} = this.state;

        return (
            <div className="create-meetings-body">
                <div className="meeting-name">
                <img src={NameReunionIcon} style={{width: '35px', height: '35px'}}/>
                <input className="input-name" placeholder="Nome da reunião"/>
                </div>
                <div className="meeting-date">
                    <div className="meeting-day">
                    <EventRoundedIcon  style={{width: '35px', height: '35px', color: '#737bac'}}/>
                    <input placeholder="Data da reunião" value={this.state.day} onChange={this.handleDay}/>
                    <Calendar className="calendar-form" onClickDay={this.handleDay}/>
                    </div>

                    <div className="meeting-hour">
                    <ScheduleRoundedIcon  style={{width: '35px', height: '35px', color: '#737bac'}}/>
                    <input placeholder="Hora de Início"/>
                    <br /><br />
                    <ScheduleRoundedIcon  style={{width: '35px', height: '35px', color: '#737bac'}}/>
                    <input placeholder="Hora do Termino"/>
                    </div>
                </div>

                <div className="meeting-project">
                    <div className="meeting-project-header">
                        <LaptopChromebookRoundedIcon  style={{width: '35px', height: '35px', color: '#737bac'}}/>
                        <span>Projeto</span> 
                    </div>
                    <div className="project-check">
                        <input type="checkbox" className="project-checkbox" onClick={this.handleCheck}/>
                        <p>Reunião de um projeto específico</p>
                        
                    </div>  
                    </div>
                    {isChecked &&
                        
                        <div className="project-bnt">
                            <button className="project-arrows-bnt">
                                <ArrowBackRoundedIcon style={{width: '35px', height: '35px', color: '#737bac'}}/>
                            </button>
                            <button className="name-project-bnt">Chewie</button>
                            <button className="name-project-bnt">Livmex</button>
                            <button className="name-project-bnt">florapedia</button>

                            <button className="project-arrows-bnt">
                                <ArrowForwardRoundedIcon style={{width: '35px', height: '35px', color: '#737bac'}}/>
                            </button>
                        </div>
                    }
                <div className="create-meetings-footer">
                    <button>Agendar reunião</button>
                </div>
                
            </div>
        );

    }
}

export default CreateMeetings;