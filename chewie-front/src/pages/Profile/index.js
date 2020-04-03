import React from 'react';
import {useHistory} from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import { Container } from './styles';

import AvatarInput from './AvatarInput';
import Auth from '../../utils/auth';

export default function Profile() {
  const history = useHistory();

  return (
    <Container>
      <Form>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome completo" />
        <Input name="name" type="email" placeholder="Seu endereço de email" />
      
        <hr />

        <Input type="password" name="oldPassword" placeholder="Sua senha atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input type="password" name="confirmPassword" placeholder="Confirmar senha atual" />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button onClick={()=>{
        toast.warn("Bye!!!");
        Auth.logOut();
        history.push("/");
      }} type="button">Sair do Chewie</button>
    </Container>
  );
}
