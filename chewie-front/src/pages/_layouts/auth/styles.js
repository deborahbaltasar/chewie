import styled from 'styled-components';


export const Container = styled.div`
@import url('https://fonts.googleapis.com/css?family=Pacifico&display=swap');
  height: 100%;
  background: linear-gradient(180deg, rgba(8,21,24,1) 0%, rgba(1,1,51,1) 31%, rgba(1,97,117,1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const Content = styled.div`


  width: 100%;
  max-width: 380px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    position: relative;
    
    p {
      color: #fff;
      font: 400 90px 'Pacifico';
      
    }
    input {
      background: #fff;
      width: 100%;
      height: 60px;
      color: #333;
      border: 1px solid #dcdce6;
      border-radius: 8px;
      padding: 0 24px;
      margin-top: 16px;

      &::placeholder {
        color: #333;      
      }
    }

    button {
      width: 100%;
      height: 60px;
      background: #3b9eff;
      border: 0;
      border-radius: 8px;
      color: #FFF;
      font-weight: 700;
      margin-top: 16px;
      display: inline-block;
      text-align: center;
      text-decoration: none;
      font-size: 18px;
      line-height: 60px;
      transition: filter 0.2s;
      
      &:hover {
        filter:brightness(90%);
      }
    }
    
  }
`;
