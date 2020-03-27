import React from 'react';
import { Form, Input } from '@rocketseat/unform';

const AccountService = require('../../services/account');



class SignIn extends React.Component {
  handleSubmit = (data) => {
    AccountService.login(data).then( result => {
      // TODO:
      if (result.success) {
        // redirect to new page
        console.log(result)
      }else {
        // show error message
        console.log(result)
      }
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <p>Chewie</p>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Acessar</button>

      </Form>
    );
  }
}

export default SignIn;
