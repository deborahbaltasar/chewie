import React, { Component } from 'react';

import { toast } from 'react-toastify';

import API from '../../services/api';

import './styles.css';

import AvatarInput from './AvatarInput';
import Auth from '../../utils/auth';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      profile: [],
      newName: '',
      newEmail: '',
      oldPass: '',
      pass: '',
      confirmPass: '',
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  handleChange = e => {
    this.setState({
      newName: e.target.value,
      newEmail: e.target.value,
      oldPass: e.target.value,
      pass: e.target.value,
      confirmPass: e.target.value,
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const updateUser = {
      name: this.state.newName,
      email: this.state.newEmail,
      oldPass: this.state.oldPass,
      pass: this.state.pass,
      confirmPass: this.state.confirmPass,
    }

    await API.put('/users', { updateUser })
      .then(res => {
        console.log("DADOS", res)
        console.log(res.data)
      })
      .catch(error => {
        console.log('Error ', error);
        return { code: 'error', message: 'Cannot update!' };
    });

  }

  fetchData = async (data) => {
    await API.get('/sessions', {})
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,

        });

      })
      .catch(error => {
        console.log('Error ', error);
        return { code: 'error', message: 'Cannot get user!' };
      });
  }


  render() {
    const { name, email } = this.state
    const { history } = this.props;
    return (
      <div className="container">
        <form >
          <AvatarInput name="avatar_id" />
          <input name="name" placeholder={name} />
          <input name="name" type="email" placeholder={email} />

          <hr />

          <input type="password" name="oldPass" placeholder="Sua senha atual"  />
          <input type="password" name="pass" placeholder="Nova senha"  />
          <input type="password" name="confirmPass" placeholder="Confirmar senha atual"  />

          <button className="update-profile-bnt" type="submit">Atualizar perfil</button>
          <button className="quit-bnt" onClick={() => {
            toast.warn("Bye!!!");
            Auth.logOut();
            history.push("/")
          }} type="button">Sair do Chewie</button>

        </form>


      </div>
    );
  }
}

export default Profile;
