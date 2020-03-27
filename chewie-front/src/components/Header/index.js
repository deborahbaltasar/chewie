import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/index';

import { Container, Content, Profile } from './styles';


export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
         <SideBar />
         <p>Chewie</p>
        </nav>
        
        <aside>
          <Profile>
            <div>
              <strong>Deborah Baltasar</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Test User"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}