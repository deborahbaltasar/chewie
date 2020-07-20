import React from 'react';
import { toast } from 'react-toastify';

import Auth from '../../utils/auth';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faAngleLeft, faAngleRight, faAngleDoubleRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'


import './styles.scss';

import $ from "jquery";

library.add(faUser, faAngleLeft, faAngleRight, faAngleDoubleRight, faLongArrowAltLeft);

class Profile extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      
    }
  }

  handleEditCard = () => {

    $(".botaoEditar").focus( () => {
      $(".CardPerfil").css({"display" : 'none'})
      $(".CardEditarPerfil").css({"display" : 'grid'})
      $(".botaoEditar").css({"color" : '#4c7bff'})
    })

    $(".botaoEditar").click( () => {    
      $(".CardEditarPerfil").css({"display" : 'none'})    
    })
  }

  backToProfile = () => {

    $(".back-profile").focus( () => {
      $(".CardEditarPerfil").css({"display" : 'none'})
      $(".CardPerfil").css({"display" : 'grid'})
      $(".botaoEditar").css({"color" : '#FFF'})

    })
  }


  render() {
    const { history } = this.props;
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    return (
      
      <React.Fragment>

        <div className = 'divGeral'>

          <div className = 'CardPerfil'>

          <div style = {{display: 'grid'}}>

          <div style = {{display: 'flex', justifyContent: 'center'}}>
              <div className = 'divTutorial2'>
                <span>PERFIL</span>
              </div>
            </div>
            
            <div style = {{margin: '-40px auto 0px auto'}}>
              <div className = 'ImgUsuario2'>
                <FontAwesomeIcon icon = 'user' size = '5x' className = 'user' />
              </div>
                <p className = 'spanNome'>{userName}</p>
            </div>

            <div style = {{display: 'grid'}}>
              <span className = 'spanProjetos'>Email</span>
              <span className = 'spanPerfil'>
              {userEmail}
              </span>
            </div>
            
            <div style = {{display: 'grid'}}>
              <span className = 'spanProjetos'>Laboratório</span>
              <span className = 'spanPerfil2'>
              Sala M-09
              </span>
            </div>

            <div style = {{display: 'grid'}}>
              <span className = 'spanProjetos'>Projeto em execução</span>
              <span className = 'spanPerfil3'>
              Projeto 1, projeto 2, projeto 3
              </span>
            </div>

            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '120px', marginBottom: '10px'}}>
                <button type="button" className = 'botaoEditar' onFocus={this.handleEditCard}>Editar perfil</button>
                <button 
                    type="submit" 
                    className = 'botaoSair' 
                    onClick={() => 
                        {toast.warn("Bye!!!");
                        Auth.logOut();
                        history.push("/")
                        }}
                >
                    Sair do Chewie
                </button>
              </div>

          </div> 
            
          </div>

          <div className = 'CardEditarPerfil'>

          <div style = {{display: 'grid'}}>

          <div style = {{display: 'flex', justifyContent: 'center'}}>
              <div className = 'divTutorial3'>
                <div className = 'divBack'>
                  <button className="back-profile" onFocus={this.backToProfile}>
                      <ArrowBackRoundedIcon/>
                 </button>
                </div>
                <span className = 'spanPerfil4'>PERFIL</span>
                <FontAwesomeIcon icon = 'angle-right' size = '1x' className = 'Setas2' />
                <span className = 'spanEditar'>EDITAR PERFIL</span>
              </div>
            </div>
            
            <div style = {{margin: '-40px 0px 0px 0px', display: 'flex'}}>
              <div className = 'ImgUsuario3'>
                <FontAwesomeIcon icon = 'user' size = '5x' className = 'user' />
              </div>
                    <p className = 'spanNome2'>{userName}</p>
            </div>

            <form onSubmit={() => {}}>
            
            <h1 className = 'Email2'>EMAIL</h1>
            <div className = "div_email">
              <span className = "span-email3"><FontAwesomeIcon icon = "envelope" size = "lg" id = "svg" style={{ color: '#fff' }}/></span>
              <input className = "email-input2" type="email" placeholder="Me fala aí seu e-mail :)" />
            </div>
            
            <h1 className = 'Senha2'>SENHA</h1>
            <div className = "div_senha">
              <span className = "span-senha2"><FontAwesomeIcon icon = "lock" size = "lg" id = "svg" style={{ color: '#fff' }}/></span>
              <input className = "senha-input2" type="password" placeholder="Aqui vai a senha. Shhh..." />
            </div>

            <h1 className = 'Email2'>NOVA SENHA</h1>
            <div className = "div_email">
              <span className = "span-email4"><FontAwesomeIcon icon = "lock" size = "lg" id = "svg" style={{ color: '#fff' }}/></span>
              <input className = "email-input2" type="email" placeholder="Escreva aqui sua nova senha." />
            </div>

            <h1 className = 'Email2'>REPETIR NOVA SENHA</h1>
            <div className = "div_email">
              <span className = "span-email5"><FontAwesomeIcon icon = "lock" size = "lg" id = "svg" style={{ color: '#fff' }}/></span>
              <input className = "email-input2" type="email" placeholder="Só mais uma vez, eu juro." />
            </div>
            <button type="submit" className = 'botaoLogin2'>ATUALIZAR PERFIL</button>
          </form>

          </div> 
            
          </div>

          <div className = 'DashboardTela-perfil'>

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

export default Profile;
