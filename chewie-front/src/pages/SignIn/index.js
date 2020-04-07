import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

const AccountService = require('../../services/account');



class SignIn extends React.Component {


  handleSubmit = (data) => {
    const { history } = this.props;
    
    AccountService.login(data).then( result => {
      if (result.success) {
        toast.success('Acesso permitido', {
          position: toast.POSITION.TOP_RIGHT
        });
        history.push("/dashboard")    
      }else {
        // show error message
        toast.error('Acesso negado', {
          position: toast.POSITION.TOP_RIGHT
        });
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
