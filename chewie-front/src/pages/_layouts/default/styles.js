import styled from 'styled-components';


export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');  
  height: 100%;
  display: flex;
`

export const Border = styled.div`
 display: grid;
 padding: 25px;
 height: 100%;
 width: 100%;
`

export const Wrapper = styled.div` 
  height: 100%;
  border-radius: 15px;
  background: #252a4a;
  display: flex;
  
  

  h1 {
    font: 400 40px 'Oswald';
    font-weith: bold;
  }

  .title-line {
    border: 0;
    height: 3px;
    background: #4c7bff;
    margin: -10px 0 20px;
    margin-left: 50px;
    
    
  }
  `;
