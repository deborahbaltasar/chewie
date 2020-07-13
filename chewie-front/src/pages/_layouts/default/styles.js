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
  z-index: 1;
  border-radius: 50px;
  background: #252a4a;
  display: flex;
  
  

  h1 {
    font: 400 40px 'Oswald';
    font-weith: bold;
    border-bottom:3px solid #4c7bff;
  }


  `;
