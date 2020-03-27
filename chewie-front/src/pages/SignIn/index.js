import React from 'react';
import { Form, Input } from '@rocketseat/unform';



export default function SignIn() {
  function handleSubmit(data) {

  }

  return (
    <>
     <Form onSubmit={handleSubmit}>
       <p>Chewie</p>
       <Input name="email" type="email" placeholder="Seu e-mail" />
       <Input name="password" type="password" placeholder="Sua senha" />

       <button type="submit">Acessar</button>

     </Form>
    </>
  );
}
