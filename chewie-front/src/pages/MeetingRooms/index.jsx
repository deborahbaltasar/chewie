import React, { Component } from 'react';

import API from '../../services/api';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import EventSeatRoundedIcon from '@material-ui/icons/EventSeatRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { toast } from 'react-toastify';

import { Modal } from 'react-bootstrap'

import { parseISO, format } from 'date-fns';
import moment from 'moment';
import 'moment/locale/pt-br';



import $ from "jquery";

import CreateMeetings from '../../components/CreateMeeting';

import './styles.scss';

class MeetingRoom extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShowCreate.bind(this);
        this.handleClose = this.handleCloseCreate.bind(this);

        this.state = {
            showCreate: false,
            showEdit: false,
            showView: false,
            showItems: false,
            showCalendar: false,
            createMeetings: false,
            rooms: [],
            meetings: [],
            id: 0,
            name: '',
            room: '',
            responsable: '',
            description: '',
            startHour: '',
            endHour: '',
            day: moment().locale('pt-br').format('L'),
            meetingDay: [],
        }

    }

    componentDidMount() {
        this.fetchData();
        this.fetchMeetings();
    };

    handleDelete = async id => {
        await API
            .delete(`/meetingRoom/${id}`)
            .then(result => {
                this.setState({

                });
                this.fetchData()
                toast.success("Sala apagada com sucesso");
            })
            .catch(e => {
                toast.error("Permissão negada");
                console.log("Error", e);
            });
    };

    fetchData = async (data) => {
        await API.get('/meetingRoom', {})
            .then(res => {
                console.log("DADOS", res)
                this.setState({
                    rooms: res.data,
                });
            })
            .catch(error => {
                toast.error("Não foi possível carregar as salas de reuniões");
                console.log("Error", error);
            });
    };

    fetchMeetings = async (data) => {
        await API.get(`/meetings`)
            .then(res => {
                console.log("Reuniões", res.data)

                this.setState({
                    meetings: res.data,
                    meetingDay: res.data.filter((item) => {
                        return format(parseISO(item.start), "dd'/'MM'/'yyyy")  == this.state.day;
                     }).map((item) => {
                        return item;
                    })
                });
            })
            .catch(error => {
                toast.error("Não foi possível carregar as reuniões");
                console.log("Error", error);
            });
    };

    handleMeetingRoom = async e => {
        e.preventDefault();

        const { name, room, description, responsable: admin } = this.state;

        if (!(name || room || description || admin)) {
            toast.error("Preencha todos os campos");
            return;
        }

        await API.post("/meetingRoom", { name, room, admin, description })
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

    updateMeetingRoom = async e => {
        e.preventDefault();

        const { id, name, room, description, responsable: admin } = this.state;

        if (!(id || name || room || description || admin)) {
            toast.error("Preencha todos os campos");
            return;
        }

        await API.put("/meetingRoom/" + id, { id, name, room, admin, description })
            .then(async _ => {
                toast.success("Sala atualizada com sucesso");
                await this.fetchData();
                this.handleCloseEdit();
            }).catch(err => {
                console.log(err);
                toast.error("Ocorreu um erro ao atualizar a sala.");
                this.handleCloseCreate();
            });
    };


    handleCloseCreate() {
        this.setState({ showCreate: false });
    };

    handleShowCreate() {
        this.setState({ showCreate: true });
    };

    handleShowEdit(room) {
        this.setState({
            showEdit: true,
            id: room.id,
            name: room.name,
            room: room.room,
            responsable: room.admin,
            description: room.description
        })
    };

    handleCloseEdit() {
        this.setState({ showEdit: false })
    };

    handleItems = () => {
        const { showItems} = this.state;
        this.setState({ 
            showItems: !showItems,
            showCalendar: false,
            createMeetings: false,

        })
    };

    showCalendar = () => {
        const { showCalendar } = this.state;
        this.setState({ 
            showCalendar: (!showCalendar), 
            showItems: false,
            createMeetings: false,


        })
    };

    createMeetings = () => {
        const { createMeetings } = this.state;
        this.setState({ 
            createMeetings: (!createMeetings),
            showItems: false,
            showCalendar: false,
  
        })
    };

    handleShowView = (room) => {
        $(".room-bnt").focus(function () {
            $(".room-body").css({ "display": 'initial' })
            $(".all-rooms").css({ "marginTop": '0' })
        })

        this.setState({
            id: room.id,
            name: room.name,
            room: room.room,
            responsable: room.admin,
            description: room.description
        })
    };


    handleDay = (date) => {
        this.setState({
            day: format(date, "dd'/'MM'/'yyyy")
        })
    }

    render() {

        const { rooms, showItems, showCalendar, createMeetings,showInformation, meetings } = this.state;

        return (
            <div className="meeting-rooms-container">
                <div className="meeting-room-header">
                    <div className="meeting-room-header-left">
                        <h1>SALA DE REUNIÕES</h1>
                        <button onClick={this.handleShowCreate.bind(this)} type="button">
                            <AddCircleOutlineIcon />
                        </button>
                    </div>
                    <div className="all-rooms">
                        {rooms.map(room => (
                            <button
                                key={`room${room.id}`}
                                className="room-bnt"
                                onFocus={() => this.handleShowView(room)}
                            >
                                {`${room.name} - ${room.room}`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="modal">
                    <form>
                        <Modal
                            show={this.state.showCreate}
                            onHide={this.handleCloseCreate.bind(this)}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Cadastrar nova sala</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <MeetingRoomIcon />
                                <input placeholder="Nome da sala" onChange={e => this.setState({ name: e.target.value })} />
                                <br />
                                <LocationOnIcon />
                                <input placeholder="Número da sala" onChange={e => this.setState({ room: e.target.value })} />
                                <br />
                                <PersonIcon />
                                <input placeholder="Responsável pela sala" onChange={e => this.setState({ responsable: e.target.value })} />
                                <br />

                                <DescriptionIcon />
                                <input placeholder="Descrição" onChange={e => this.setState({ description: e.target.value })} />

                            </Modal.Body>
                            <Modal.Footer>
                                <button className="cadastro" type="submit" onClick={this.handleMeetingRoom}>
                                    Cadastrar
                    </button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                    <form>
                        <Modal
                            show={this.state.showEdit}
                            onHide={this.handleCloseEdit.bind(this)}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Editar sala</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <MeetingRoomIcon />
                                <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                <br />
                                <LocationOnIcon />
                                <input value={this.state.room} onChange={e => this.setState({ room: e.target.value })} />
                                <br />
                                <PersonIcon />
                                <input value={this.state.responsable} onChange={e => this.setState({ responsable: e.target.value })} />
                                <br />

                                <DescriptionIcon />
                                <input value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
                                {/* <textarea placeholder="Descrição"></textarea> */}

                            </Modal.Body>
                            <Modal.Footer>
                                <button type="submit" onClick={this.updateMeetingRoom}>
                                    Salvar
                  </button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>

                <div className="room-cards">
                    <div className="room-body">
                        <div className="room-header">
                            <div className="room-body-tittle">
                                <h1>{`Sala  ${this.state.room}`}</h1>
                            </div>

                            <div className="room-body-buttons">
                                <button className="item-bnt" onClick={this.handleItems}>
                                    <EventSeatRoundedIcon style={{ marginRight: '8px' }} />
                                    itens de sala
                                </button>
                                <button className="calendar-bnt" onClick={this.showCalendar}>
                                    <EventRoundedIcon style={{ marginRight: '8px' }} />
                                    calendário
                                </button>
                                <button className="meeting-bnt" onClick={this.createMeetings}>
                                    <AccessTimeRoundedIcon style={{ marginRight: '8px' }} />
                                    agendar reunião
                                </button>
                            </div>
                        </div>
                        <div className="range-body">
                            <h2>{this.state.day}</h2>
                            {meetings.map(meeting => (
                                format(parseISO(meeting.start), "dd'/'MM'/'yyyy") === this.state.day ?
                                    meeting.MeetingRoom.id === this.state.id ?
                                        meeting.Project !== null ?
                                            <div key={meeting.id} className="meetings-of-a-day">
                                                <h1>{meeting.name}</h1>
                                                <p>{`${format(parseISO(meeting.start), "HH':'mm")} - ${format(parseISO(meeting.end), "HH':'mm'h'")}`}</p>
                                                <span>{`* Reunião referente ao projeto '${meeting.Project.name}'`}</span>
                                            </div>
                                            :
                                            <div key={meeting.id} className="meetings-of-a-day">
                                                <h1>{meeting.name}</h1>
                                                <p>{`${format(parseISO(meeting.start), "HH':'mm")} - ${format(parseISO(meeting.end), "KK':'mm'h'")}`}</p>
                                            </div>
                                        : ''

                                    : ''
                            ))}

                        </div>
                    </div>


                    {showItems &&
                        <div className="items-body">
                            <div className="items-body-header">
                                <h1>Nome do item</h1>
                                <h1>QUantidade</h1>
                            </div>
                            <div className="items-body-flex">
                                <div className="items-body-row">
                                    <p>mesas</p>
                                    <p>2</p>
                                </div>
                                <hr />
                                <div className="items-body-row">
                                    <p>cadeiras</p>
                                    <p>10</p>
                                </div>
                                <hr />

                                <div className="items-body-row">
                                    <p>televisões</p>
                                    <p>2</p>
                                </div>
                                <hr />
                            </div>






                        </div>
                    }

                    {showCalendar &&
                        <div className="calendar">
                            <Calendar
                                className="calendar-box"
                                onClickDay={this.handleDay}
                                onChange={this.onChange}
                            />
                        </div>
                    }

                    {createMeetings &&
                        <div className="create-meetings-body">
                            <CreateMeetings />
                        </div>
                    }

                </div>
            </div>


        );
    }
}

export default MeetingRoom;
