import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import{ Lock, Info, Email }from '@material-ui/icons';



import '../../styles/global'

const AccountService = require('../../services/account');



class SignIn extends React.Component {
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
      
      <div className="grids"> 
      <div className="about">
        <span>SOBRE O SISTEMA</span>
       

      </div>
        <div className="drawer">   
          <button>          
            <Info style={{ fontSize: 30 }}/>         
          </button>
          <p>SOBRE O APP</p>
        </div>

        <Form onSubmit={this.handleSubmit}> 
          <span>Bem vindo ao </span>
          <p>CHEWIE</p>
          
          <h1>EMAIL</h1>
          <div>
            <Email style={{ color: '#fff' }}/>
            <Input name="email" type="email" placeholder="Me fala aí seu e-mail :)" />
          </div>
          <h1>SENHA</h1>
          <div>
            <Lock style={{ color: '#fff' }}/> 
            <Input name="password" type="password" placeholder="Aqui vai a senha. Shhh..." />
          </div>
          <button type="submit">VAMOS LÁ!</button>
        </Form>

        <div className="drawer">
          <button>
            <Lock style={{ fontSize: 30 }}/>
          </button>
          <p>ESQUECI A SENHA</p>
        </div>
        <div className="about">
        <span>ESQUECI A SENHA</span>
       

      </div>
      </div>
     
    );
  }
}

export default SignIn;
