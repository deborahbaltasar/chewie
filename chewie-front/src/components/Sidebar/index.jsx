import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <Link 
                        to="/profile" 
                        className={pathSideBar === '/profile' ? 'Nome_usuario link-active' : 'Nome_usuario'}
                    >
                        {userName}
                    </Link>
              


                  </div>

                  <div>
                    <hr className = 'linha'></hr>
                  </div>

                </div>

                <div>
                  <div className = 'Busca'>
                  <HomeRounded className={pathSideBar === '/dashboard' ? 'DashboardIcon link-active' : 'DashboardIcon'}></HomeRounded>
                  <Link to="/dashboard" className={pathSideBar === '/dashboard' ? 'Dashboard link-active' : 'Dashboard'}>Dashboard</Link> 
                  </div>

                  <div className = 'Busca'>
                  <DevicesRounded className = 'DispositivosIcon'></DevicesRounded>
                  <span className = 'Dispositivos'>Dispositivos</span> 
                  </div>

                  <div className = 'Busca'>
                  <LaptopChromebookRounded className={pathSideBar === '/projects' ? 'DashboardIcon link-active' : 'DashboardIcon'}></LaptopChromebookRounded>
                  <Link to="/projects" className={pathSideBar === '/projects' ? 'Projetos link-active' : 'Projetos'}>Projetos</Link> 
                  </div>

                  <div className = 'Busca'>
                  <MeetingRoomRounded className={pathSideBar === '/meetingRooms' ? 'DashboardIcon link-active' : 'DashboardIcon'}></MeetingRoomRounded>
                  <Link to="/meetingRooms" className={pathSideBar === '/meetingRooms' ? 'Dashboard link-active' : 'Dashboard'}>Salas de reuniões</Link> 
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
                  <DeveloperModeRounded className={pathSideBar === '/myProjects' ? 'DashboardIcon link-active' : 'DashboardIcon'}></DeveloperModeRounded>
                  <Link to="/myProjects" className={pathSideBar === '/myProjects' ? 'Dashboard link-active' : 'Dashboard'}>Meus projetos</Link> 
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
                  <EventRounded className={pathSideBar === '/meetings' ? 'DashboardIcon link-active' : 'DashboardIcon'}></EventRounded>
                  <Link to="/meetings" className={pathSideBar === '/meetings' ? 'Dashboard link-active' : 'Dashboard'}>Agendar Reunião</Link>

                  </div>
                </div>

                <div>
                  <hr className = 'linha2'></hr>
                </div>

                <div className = 'divSobre'>
                  
                  <div className = 'Busca'>
                  <InfoOutlined className = 'Sobre_sistemaIcon'></InfoOutlined>
                  <span className = 'Sobre_sistema'>Sobre o sistema</span> 
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
                    <HomeRounded className={pathSideBar === '/dashboard' ? 'DashboardIcon link-active' : 'DashboardIcon'}></HomeRounded>
                    </div>

                    <div className = 'Busca2'>
                    <DevicesRounded className = 'DispositivosIcon'></DevicesRounded>
                    </div>

                    <div className = 'Busca2'>
                    <LaptopChromebookRounded className={pathSideBar === '/projects' ? 'DashboardIcon link-active' : 'DashboardIcon'}></LaptopChromebookRounded> 
                    </div>

                    <div className = 'Busca2'>
                    <MeetingRoomRounded className={pathSideBar === '/meetingRooms' ? 'DashboardIcon link-active' : 'DashboardIcon'}></MeetingRoomRounded> 
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
                  <DeveloperModeRounded className={pathSideBar === '/myProjects' ? 'DashboardIcon link-active' : 'DashboardIcon'}></DeveloperModeRounded>
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
                  <EventRounded className={pathSideBar === '/meetings' ? 'DashboardIcon link-active' : 'DashboardIcon'}></EventRounded>
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