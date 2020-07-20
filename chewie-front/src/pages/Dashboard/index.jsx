import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faAngleLeft, faAngleRight, faAngleDoubleRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import '../../assets/css/Dashboard.scss';


import $ from "jquery";

library.add(faUser, faAngleLeft, faAngleRight, faAngleDoubleRight, faLongArrowAltLeft);

class Dashboard extends React.Component {
  constructor(props, context){
    super(props, context);
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSideBar = this.handleSideBar.bind(this);

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


    handleSideBar = () => {

      $(".Angulo").focus(function () {
        $(".divSideBar1").css({"display" : 'none'})
        $(".divSideBar2").css({"display" : 'flex'})
      })
  
      $(".Angulo2").click(function () {
      
        $(".divSideBar1").css({"display" : 'flex'})
        $(".divSideBar2").css({"display" : 'none'})
        
      })}

      handleWelcome = () => {

        $(".CardPrimeiroLogin").load(function () {
          $(".divSideBar").css({"margin" : '10px 10px 10px 30px'})
        })
    }

  render() {
    const { history } = this.props;
    return (
      
      <React.Fragment>

        <div className = 'divGeral'>

          <div className = 'CardPrimeiroLogin'>

          <div style = {{display: 'grid'}}>

            <div style = {{margin: '100px auto 0px auto'}}>
              <span className = 'spanBemVindo2'>Bem vindo ao </span>
              <p className = 'Chewie'>CHEWIE</p>
            </div>

            <div style = {{display: 'flex', justifyContent: 'center'}}>
              <span className = 'spanEsqueci2'>
              Antes de começar a viajar pela galáxia do Chewie, é necessário redefinir a senha.
              </span>
            </div>
            
            <div style = {{display: 'flex', justifyContent: 'center'}}>
              <span className = 'spanEsqueci3'>
              Para fazer isso, é necessário seguir o seguinte fluxo:
              </span>
            </div>

            <div style = {{"display": 'flex', "justifyContent": 'center'}}>
              <div className = 'divTutorial'>
                <span>PERFIL</span>
                <FontAwesomeIcon icon = 'angle-double-right' size = '1x' className = 'Setas' />
                <span>EDITAR PERFIL</span>
                <FontAwesomeIcon icon = 'angle-double-right' size = '1x' className = 'Setas' />
                <span>ATUALIZAR PERFIL</span>
              </div>
            </div>

            <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button className ='botaoPerfil' onClick={() => {history.push("/profile")}}>
                    Ir para o perfil
                </button>
            </div>

          </div> 
            
          </div>

          <div className = 'DashboardTela'>

            <div style = {{display: 'grid'}}>

              <h1 className = 'Titulo'>Dashboard</h1>
              <div style = {{display: 'flex', marginBottom: '80px', marginTop: '-80px'}}>

                <div className = 'Espaco1'>
                </div>

                <div className = 'Espacinho1'>
                </div>

              </div>
              <div style = {{display: 'flex', marginBottom: '80px'}}>

                <div className = 'Espaco2'>
                </div>

                <div className = 'Espaco2'>
                </div>

                <div className = 'Espacinho2'>
                </div>
                
              </div>

              <div style = {{display: 'flex', marginBottom: '80px'}}>

                <div className = 'Espaco3'>
                </div>

                <div className = 'Espaco3'>
                </div>

                <div className = 'Espacinho3'>
                </div>

              </div>

            </div>

          </div>

        </div>

      </React.Fragment>

    );
  }
}

export default Dashboard;