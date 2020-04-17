import React from 'react';
import {Link} from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { FiArrowLeft } from 'react-icons/fi';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';



import { Container } from './styles';

export default function NewMeetingRoom() {
  return (
    <Container>
      <Form>
        <h1>Cadastrar nova sala</h1>
        <input placeholder="Nome da sala" />
        <input placeholder="Número da sala" />
        {/* <textarea placeholder="Descrição" /> */}
        <div className="input-group">

        <input placeholder="Item" style={{ width: 220}}/>
        <input placeholder="Quatidade" style={{ width: 120}}/>
        <button>
        <AddCircleOutlineIcon  />
        </button>
        </div>
        <button type="submit">Cadastrar</button>
        <Link className="back-link" to="/meetingRooms" >
            <FiArrowLeft size={20} color="#E02041" />
            Voltar para salas de Reuniões
        </Link>
      </Form>


    </Container>
  );
}
