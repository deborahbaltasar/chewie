import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import unifor from '../../assets/images/Unifor.png'


import $ from "jquery";

import '../../assets/css/Login.scss'

const AccountService = require('../../services/account');

library.add(faLock, faEnvelope);



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

  handleSenha = () => {

    $(".botao-cadeado").focus(function () {
      $(".divEsqueci").css({"display" : 'initial'})
      $(".cadeado").css({"color" : '#4c7bff'})
      $(".grids").css({"margin" : '20px 0px 20px 20px'})
    })

    $(".botao-cadeado").click(function () {
    
      $(".cadeado").css({"color" : '#737bac'})
      $(".divEsqueci").css({"display" : 'none'})
      $(".grids").css({"margin" : '20px auto'})
      
    })}

    handleAbout = () => {

      $(".botao-unifor").focus(function () {
        $(".divAbout").css({"display" : 'initial'})
        $(".divGeral").css({"width" : '98%'})
      })
  
      $(".botao-unifor").click(function () {
        
        $(".divAbout").css({"display" : 'none'})
        $(".divGeral").css({"width" : '100%'})
        
      })}

  render() {

  
    return (
      
        <React.Fragment>
  
          <div className = 'divGeral'>
  
            <div className = 'divAbout'>
  
              <div style = {{display: 'flex', justifyContent: 'center'}}>
                <h1 className = 'About'>Sobre o sistema</h1>
              </div>
  
              <div style = {{display: 'flex', justifyContent: 'center'}}>
                <span className = 'spanAbout'>
                Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.
                </span>
              </div>
  
              <div className = 'divAlunos'>
                <h1 className = 'Alunos'> Alunos </h1>
  
                <div className = 'divSpanAlunos'>
                  <span> Aluno 1 </span>
                  <span> Aluno 2 </span>
                  <span> Aluno 3 </span>
                  <span> Aluno 4 </span>
                  <span> Aluno 5 </span>
                  <span> Aluno 6 </span>
                </div>
  
              </div>
  
            </div>
  
            <div className="grids"> 
  
            <Row className = 'rowAbout'>
            <div className="about">   
              <button className = "botao-unifor" onFocus = {this.handleAbout}>          
              <img src={unifor} alt="Unifor" className="imagemSobre" />         
              </button>
              <p>SOBRE O APP</p>
            </div>
            </Row>
            <Row className = 'rowForm'>
            <div style = {{display: 'grid', width: '100%', marginBottom: '100px'}}>
              <span className = 'spanBemVindo'>Bem vindo ao </span>
              <p className = 'Chewie'>CHEWIE</p>
            </div> 
            <Form onSubmit={this.handleSubmit}>
              
              <h1 className = 'Email'>EMAIL</h1>
              <div className = "div_email">
                <span className = "span-email"><FontAwesomeIcon icon = "envelope" size = "lg" id = "svg" style={{ color: '#fff' }}/></span>
                <Input className = "email-input" name="email" type="email" placeholder="Me fala aí seu e-mail :)" />
              </div>
              
              <h1 className = 'Senha'>SENHA</h1>
              <div className = "div_senha">
                <span className = "span-senha"><FontAwesomeIcon icon = "lock" size = "lg" id = "svg" style={{ color: '#fff' }}/></span>
                <Input className = "senha-input" name="password" type="password" placeholder="Aqui vai a senha. Shhh..." />
              </div>
              <button type="submit" className = 'botaoLogin'>VAMOS LÁ!</button>
            </Form>
            </Row>
  
            <Row className = 'rowDrawer'>
            <div className="drawer">
              <button className = "botao-cadeado" onFocus = {this.handleSenha}>
              <FontAwesomeIcon icon = "lock" size = "lg" className = "cadeado" style={{ color: '#737bac' }}/>
              </button>
              <p>ESQUECI A SENHA</p>
            </div>
            </Row>
  
            </div>
  
            <div className = 'divEsqueci'>
            <div style = {{display: 'flex', justifyContent: 'center'}}>
                <h1 className = 'About'>Esqueci a senha</h1>
              </div>
  
              <div style = {{display: 'flex', justifyContent: 'center'}}>
                <span className = 'spanEsqueci'>
                Esqueceu a senha, né? Coloca seu email no espaço abaixo que a gente vai te enviar instruções detalhadas para alterar sua senha.
                </span>
              </div>
              <div style = {{margin: '30px 0px 0px 40px'}}>
                <h1 className = 'Email'>EMAIL</h1>
                <div className = "div_email">
                  <span className = "span-email2"><FontAwesomeIcon icon = "envelope" size = "lg" id = "svg" style={{ color: '#fff' }}/></span>
                  <input className = "email-input2" name="email" type="email" placeholder="O Email você lembra...né?" />
                </div>
              </div>
                <div style = {{display: 'flex', justifyContent: 'center'}}>
                  <button type="submit" className = 'botaoAlterar'>Quero alterar minha senha</button>
                </div>
            </div>
  
          </div>
  
        </React.Fragment>
  
      );
    }
  }
  
  export default SignIn;