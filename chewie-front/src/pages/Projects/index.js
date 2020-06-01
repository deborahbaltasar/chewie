import React, { Component } from 'react';

import API from '../../services/api';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    }
  }

  componentDidMount() {
    this.fetchData();    
  }

  fetchData = async (data) => {
    await API.get('/projects', {})
     .then(res => {
       console.log("DADOS", res)
       this.setState({
          projects: res.data,    
       });
     })
     .catch(error => {
       console.log('Error ', error);
       return { code: 'error', message: 'Cannot projects!' };
   });
   }

  render() {
    const { projects } = this.state;
    return (
        <div className="profile-container">
         <div className="header">
             <h1>PROJETOS</h1>

         </div>
         <ul>
         {projects.map(project => {
           return (
            <li key={`project${project.id}`}>
              <strong>{project.name}</strong>
                <p>{`Descrição:  ${project.description}`}</p>
                <p>{`Cliente:  ${project.client_name}`}</p>
                <p>{`Responsável:  ${project.User.name}`}</p>
                <p>{`Sala:  ${project.MeetingRoom.name} - ${project.MeetingRoom.room}`}</p>
                <p>{`Tipo:  ${project.type}`}</p>
                <p>{`Data de início:  ${project.start}`}</p>
                <p>{`Data final:  ${project.end}`}</p>
                <p>{`Comentário:  ${project.comments}`}</p>
                
            </li>
           )
          })}
          </ul>
        </div>
    );
  }
}

export default Projects;