import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faAngleLeft, faAngleRight, faAngleDoubleRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import {
  HomeRounded,
  DevicesRounded,
  LaptopChromebookRounded,
  MeetingRoomRounded,
  DeveloperModeRounded,
  DevicesOtherRounded,
  AddCircleOutlineRounded,
  EventRounded,
  InfoOutlined,
} from '@material-ui/icons';


import './styles.scss';

import $ from "jquery";


library.add(faUser, faAngleLeft, faAngleRight, faAngleDoubleRight, faLongArrowAltLeft);

class Sidebar extends React.Component {
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
    const userName = localStorage.getItem('userName'); 
    const { pathSideBar } = this.props;

    return (
      
      <React.Fragment>

          <div className = 'divSideBar1'>

            <div className = 'Abas'>

                <div className = 'divNomeUsuario'>
                  
                  <div style = {{display: 'flex'}}>
                    <p className = 'Chewie2'>CHEWIE</p>
                    <div>
                      
                      <FontAwesomeIcon icon = 'angle-left' size = '2x' className = 'Angulo' onClick = {this.handleSideBar}/>

                    </div>
                  </div>

                  <div>
                    <hr className = 'linha'></hr>
                  </div>

                  <div className = 'divNome'>

                    <div className = 'ImgUsuario'>
                    <FontAwesomeIcon icon = 'user' size = '2x' className = 'user' />
                    </div>
                    <Link to="/profile" className={pathSideBar === '/profile' ? 'Nome_usuario link-active' : 'Nome_usuario'}>{userName}</Link>
              


                  </div>

                  <div>
                    <hr className = 'linha'></hr>
                  </div>

                </div>

                <div>
                  <div className = 'Busca'>
                  <HomeRounded className = 'DashboardIcon'></HomeRounded>
                  <Link to="/dashboard" className = 'Dashboard'>Dashboard</Link> 
                  </div>

                  <div className = 'Busca'>
                  <DevicesRounded className = 'DispositivosIcon'></DevicesRounded>
                  <span className = 'Dispositivos'>Dispositivos</span> 
                  </div>

                  <div className = 'Busca'>
                  <LaptopChromebookRounded className = 'ProjetosIcon'></LaptopChromebookRounded>
                  <Link to="/projects" className = 'Projetos'>Projetos</Link> 
                  </div>

                  <div className = 'Busca'>
                  <MeetingRoomRounded className = 'Salas_reunioesIcon'></MeetingRoomRounded>
                  <Link to="/meetingRooms" className = 'Salas_reunioes'>Salas de reuniões</Link> 
                  </div>
                </div>

                <div>
                  <hr className = 'linha2'></hr>
                </div>

                <div className = 'divGerenciamento'>

                  <div className = 'Setor'>
                    <span>GERENCIAMENTO</span>
                  </div>

                  <div className = 'Busca'>
                  <DeveloperModeRounded className = 'Meus_projetosIcon'></DeveloperModeRounded>
                  <Link to="/myProjects" className = 'Meus_projetos'>Meus projetos</Link> 
                  </div>

                  <div className = 'Busca'>
                  <DevicesOtherRounded className = 'Meus_emprestimosIcon'></DevicesOtherRounded><span className = 'Meus_emprestimos'>Meus empréstimos</span> 
                  </div>
                </div>

                <div>
                  <hr className = 'linha2'></hr>
                </div>

                <div className = 'divAcoes'>

                  <div className = 'Setor'>
                    <span>AÇÕES</span>
                  </div>

                  <div className = 'Busca'>
                  <AddCircleOutlineRounded className = 'Novo_emprestimoIcon'></AddCircleOutlineRounded><span className = 'Novo_emprestimo'>Novo empréstimo</span> 
                  </div>

                  <div className = 'Busca'>
                  <EventRounded className = 'Agendar_reuniaoIcon'></EventRounded>
                  <Link to="/meetings" className = 'Dashboard'>Agendar Reunião</Link>

                  </div>
                </div>

                <div>
                  <hr className = 'linha2'></hr>
                </div>

                <div className = 'divSobre'>
                  
                  <div className = 'Busca'>
                  <InfoOutlined className = 'Sobre_sistemaIcon'></InfoOutlined>
                  <Link to="/profile" className = 'Sobre_sistema'>Sobre o sistema</Link> 
                  </div>

                </div>
        
                    <Link
                      className ="botao-sair"
                      to="/"
                      onClick={() => 
                        {toast.warn("Bye!!!");
                        Auth.logOut();
                        }}>ENCERRAR SESSÃO
                    </Link>
            

            </div> 

          </div>

          <div className = 'divSideBar2'>

            <div className = 'Abas'>

                <div className = 'divNomeUsuario'>
                  
                  <div>
                    <FontAwesomeIcon icon = 'angle-right' size = '2x' className = 'Angulo2'/>
                  </div>

                  <div>
                    <hr className = 'linha3'></hr>
                  </div>

                  <div className = 'divNome2'>

                    <div className = 'ImgUsuario'>
                    <FontAwesomeIcon icon = 'user' size = '2x' className = 'user' />
                    </div>

                  </div>

                  <div>
                    <hr className = 'linha3'></hr>
                  </div>

                </div>
                
                <div className = 'divSetores'>
                  <div>
                    <div className = 'Busca2'>
                    <HomeRounded className = 'DashboardIcon'></HomeRounded>
                    </div>

                    <div className = 'Busca2'>
                    <DevicesRounded className = 'DispositivosIcon'></DevicesRounded>
                    </div>

                    <div className = 'Busca2'>
                    <LaptopChromebookRounded className = 'ProjetosIcon'></LaptopChromebookRounded> 
                    </div>

                    <div className = 'Busca2'>
                    <MeetingRoomRounded className = 'Salas_reunioesIcon'></MeetingRoomRounded> 
                    </div>
                  </div>
                </div>

                <div>
                  <hr className = 'linha4'></hr>
                </div>

                <div className = 'divGerenciamento2'>

                  <div className = 'Setor'>
        
                  </div>

                  <div className = 'Busca2'>
                  <DeveloperModeRounded className = 'Meus_projetosIcon'></DeveloperModeRounded>
                  </div>

                  <div className = 'Busca2'>
                  <DevicesOtherRounded className = 'Meus_emprestimosIcon'></DevicesOtherRounded> 
                  </div>
                </div>

                <div>
                  <hr className = 'linha5'></hr>
                </div>

                <div className = 'divAcoes2'>

                  <div className = 'Setor'>
                    
                  </div>

                  <div className = 'Busca2'>
                  <AddCircleOutlineRounded className = 'Novo_emprestimoIcon'></AddCircleOutlineRounded> 
                  </div>

                  <div className = 'Busca2'>
                  <EventRounded className = 'Agendar_reuniaoIcon'></EventRounded>
                  </div>
                </div>

                <div>
                  <hr className = 'linha6'></hr>
                </div>

                <div className = 'divSobre2'>
                  
                  <div className = 'Busca2'>
                  <InfoOutlined className = 'Sobre_sistemaIcon'></InfoOutlined>
                  </div>

                </div>

            </div> 

          </div>

      </React.Fragment>

    );
  }
}

export default Sidebar;