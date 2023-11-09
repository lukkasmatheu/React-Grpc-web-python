import styled from 'styled-components';

export const Main = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: hsl(227, 10%, 10%);
    h1{
        color: white;
    }

`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15px;
    gap: 10px;
    border-radius: 8px;
    button{
        width: 90px;
        height: 40px;
        border-radius: 8px;
        font-family: 'Courier New', Courier, monospace;
    }
    .button-layer{
        width: 150px;
        height: 80px;
        border: 0.5px solid gray;
        font-size: 18px;
        color: white;
        font-weight: 500;
        background: none;
        &:hover{
            background: rgba(255, 255, 255, 0.35);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
    }

`;


export const Input = styled.input`
    padding: 5px;
    background: #f3f3f3f2;
    width: 220px;
    border: 2px double #80808069;
    border-radius: 4px;
    font-weight: 400;
    outline: none;
    font-size: 15px;
    font-family: 'Courier New', Courier, monospace;
`;

export const Content = styled.div`
    background: white;
    height: 480px;
    width: 570px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 8px;;
    font-family: 'Courier New', Courier, monospace;
    span{
        margin-top:5px;
        font-size: 14px;
    }
`;

export const Notify = styled.div`
    width: 23vw;
    height: 85vh;
    overflow-y: auto;
    /* width */
    &::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #000;
        border-radius:8px;
        margin-left: 5px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
    background: #5d5d5d;
    border-radius:8px;
    }
`;