import styled from 'styled-components';

export const Main = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
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

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15px;
    gap: 10px;
    button{
        width: 90px;
        height: 30px;
        border-radius: 8px;
        font-family: 'Courier New', Courier, monospace;
    }
`;
export const Content = styled.div`
    background: white;
    height: 250px;
    width: 430px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;