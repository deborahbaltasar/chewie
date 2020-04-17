

import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import API from '../../services/api';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Accordion, Card, Button, Modal} from 'react-bootstrap'
import './styles.css';


class MeetingRoom extends Component {
  constructor(props, context){
    super(props, context);
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    }
  }

  handleClose() {
    this.setState({ show: false});
  }

  handleShow() {
    this.setState({ show: true});
  }
   render() {
    return(
        <div className="profile-container">
            <div className="header">
            <h1>Sala de reuniões</h1>
              <button onClick={this.handleShow} type="button">
                <AddCircleOutlineIcon />
              </button>
              <div className="modal">
              <Modal 
                show={this.state.show} 
                onHide={this.handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Cadastrar nova sala</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input placeholder="Nome da sala" />
                  <br />
                  <input placeholder="Número da sala" />
                  <br />
                  <input placeholder="Responsável pela sala" />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleClose}>
                    Cadastrar
                  </Button>
                </Modal.Footer>
                </Modal>
                </div>
            </div>    
            <ul>
              <li>   
              <Accordion defaultActiveKey="1">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                <div className="room">
                  <strong>IOT LAB - M09</strong>
                  <div>
                    <button className="button-room" type="button">
                        <DeleteIcon size={18} />
                    </button>
                    <button className="button-room" type="button">
                        <MoreVertIcon size={18} />  
                         
                    </button>
      
                    </div>
                </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="body">
                      <div>
                        <h6>Descrição: </h6>
                        <p>1 tv</p>
                        <p>20 cadeiras</p>
                        <p>1 mesa</p>
                      </div>
                      <div>
                        <h6>Responsável: </h6>
                        <p>Fernando</p>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              </Accordion>
              </li>  
              
              <li>  
              <Accordion defaultActiveKey="1">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                <div className="room">
                  <strong>LAB - M13</strong>
                  <div>
                    <button className="button-room" type="button">
                        <DeleteIcon size={18} />
                    </button>
                    <button className="button-room" type="button">
                        <MoreVertIcon size={18} />   
                    </button>
                  </div>
                </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  <div className="body">
                      <div>
                        <h6>Descrição: </h6>
                        <p>2 tv's</p>
                        <p>20 cadeiras</p>
                        <p>1 mesa</p>
                      </div>
                      <div>
                        <h6>Responsável: </h6>
                        <p>Fernando</p>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              </Accordion>
              </li>
              <li>  
              <Accordion defaultActiveKey="1">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                <div className="room">
                  <strong>LAB - M07</strong>
                  <div>
                    <button className="button-room" type="button">
                        <DeleteIcon size={18} />
                    </button>
                    <button className="button-room" type="button">
                        <MoreVertIcon size={18} />   
                    </button>
                  </div>
                </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  <div className="body">
                      <div>
                        <h6>Descrição: </h6>
                        <p>2 tv's</p>
                        <p>20 cadeiras</p>
                        <p>1 mesa</p>
                      </div>
                      <div>
                        <h6>Responsável: </h6>
                        <p>Fernando</p>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              </Accordion>
              </li>              
  
            </ul>
        


        </div>
    );
   }
}

export default MeetingRoom;
