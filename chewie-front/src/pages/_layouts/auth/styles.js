import styled from 'styled-components';
import { darken } from 'polished';


export const Wrapper = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap'); 
display: grid;
 padding: 25px;
 height: 100%;
`




export const Container = styled.div`

border-radius: 50px;
height: 100%;
background: #252a4a;

  
  display: flex;
  justify-content: center;
  align-items: center;
  

`;

export const Content = styled.div`
  width: 100%;
  max-width: 90%;
  text-align: center;

  .about {
    span {
      font: 400 40px 'Oswald';
      color: #fff;
      margin-top: 5px;
      background: none;
      border-bottom:3px solid #4c7bff;
      

    }
    



  }

.grids {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


  .drawer {
    
    p {
      font: 400 12px 'Oswald';
      color: #737bac;
      margin-top: 5px;
      background: none;
    }
    button {
      padding: 10px;
      background: #1b2139;
      border-radius: 10px;
      border: 0;
      color: #737bac;  
      margin-top: 10px;
      
      &:hover {
        color: ${darken(0.06, '#4c7bff')};
      }

    }

  }

  form {
    display: flex;
    flex-direction: column;
    
    margin-top: 30px;
    position: relative;

    span {
      color: #fff;
      font-size: 20px;
      margin: -15px;
      
    }
    
    p {
      color: #4c7bff;
      font: 400 70px 'Oswald';
      margin-bottom: 100px;
      font-weight: bold;
      
    }

    h1 {
      color: #4c7bff;
      font: 400 30px 'Oswald';
      margin-bottom: 0; 
      position: relative;
      text-align: left;
    }

    input {
      outline: 0;
      border-width: 0 0 2px;
      border-color: #fff;
      color: #fff;
      background: none;
      width: 400px;
      height: 44px;
      padding: 0 15px;  
      margin: 0 0 15px;

      &::placeholder {
        color: rgba(255,255,255,0.8);
        font-size: 15px;
      }
    }

    button {
      margin: 80px 0 0;
      height: 44px;
      background: #4c7bff;
      font: 400 25px 'Oswald';
      font-weight: bold;
      color: #FFF;
      border: 0;
      border-radius: 15px;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.06, '#4c7bff')};
      }
    }
    
    a {
      color: #FFF;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
