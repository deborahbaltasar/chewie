import React from 'react';
import {useHistory} from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

const AccountService = require('../../services/account');



class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (data) => {
    const { history } = this.props;
    
    AccountService.login(data).then( result => {
      if (result.success) {
        history.push("/dashboard")    
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
