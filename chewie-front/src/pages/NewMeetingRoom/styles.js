import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
margin: 50px auto;

  form {
    max-width: 380px;
    display: flex;
    flex-direction: column;
    margin-top: 160px;
    position: relative;
    align-itens: center;
    text-align: center;
 

    h1 {
        color: #fff;
        margin-bottom: 50px;
    }

    input {
      background: #fff;
      border: 0;
      border-radius: 4px;
      width: 350px;
      height: 44px;
      padding: 0 15px;
      color: #333;
      margin: 0 0 10px;
      margin-bottom: 15px;

      &::placeholder {
        color: #333;
      }
    }
    
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #e02041;
      font-weight: bold;
      color: #FFF;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.08, '#e02041')};
      }
    }

    textarea {
        max-width: 350px;
        background: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        width: 350px;
        height: 44px;
        color: #111;
        padding: 0 15px;
        margin: 0 0 10px;
    }
  }
    
    a {
      width: 100%;
      margin: 10px 0 0;
      margin-top: 20px;
      height: 44px;
      font-weight: bold;
      color: #FFF;
      border: 0;
      border-radius: 4px;
      font-size: 18px;
      transition: opacity 0.2s;
      text-align: center;

      &:hover {
        opacity: 0.8;
      }
    } 
`;
