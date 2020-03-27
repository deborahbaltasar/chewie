import styled from 'styled-components';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css?family=Pacifico&display=swap');

background: #FFF;
padding: 0 30px; 
align-items: center;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      margin-left:12%;
      margin-left:8%;
      margin-top: 10px;
      border-right: 1px solid #eee;
      background: none;
      border: none;
    }

    p {
      margin-bottom: 8px;
      font-size: 22px;
      color: rgba(1,1,51,1);
    }
  }

  aside {
    display: flex;
    align-items:center;

  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #333;
    }
  }

  img {
      height: 40px;
      border-radius: 50%;
    }
`;


