import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';

import AvatarInput from './AvatarInput';

export default function Profile() {
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

      <button type="button">Sair do Chewie</button>
    </Container>
  );
}
