import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { FiArrowLeft } from 'react-icons/fi';



import { Container } from './styles';

export default function NewMeetingRoom() {
  const history = useHistory();

  return (
    <Container>
      <Form>
        <h1>Cadastrar nova sala</h1>
        <input placeholder="Nome da sala" />
        <input placeholder="Número da sala" />
        <textarea placeholder="Descrição" />
 

        <button type="submit">Cadastrar</button>
        <Link className="back-link" to="/meetingRooms" >
            <FiArrowLeft size={20} color="#E02041" />
            Voltar para salas de Reuniões
        </Link>
      </Form>


    </Container>
  );
}
