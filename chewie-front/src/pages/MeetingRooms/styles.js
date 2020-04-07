import styled from 'styled-components';

export const Container = styled.div`
margin: 50px auto;

header {
    margin-top: 20px;
    margin-left: 40px;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-align: center;
}

ul {
    width: 700px;
    margin-top: 50px;
    margin-left: 50px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4px;
    list-style: none;

    li {
        margin-right: 20px;
        margin-bottom: 20px;
        background: #FFF;
        padding: 12px;
        border-radius: 8px; 
        position: relative;

        strong {
            font-size: 20px;
            display: block;
            margin-bottom: 16px;
            text-align: center;
         }
     }
}
`
export const Content = styled.div`
strong {
    padding: 0;
    margin-top: 10px;
    color: #fff;
    background: blue;
    height: 50px;
    text-align: rigth;
    border-radius: 8px;
}
`