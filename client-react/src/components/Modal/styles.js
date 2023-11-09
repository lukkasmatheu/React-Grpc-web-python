import styled from 'styled-components';

export const ModalContent = styled.div`
background-color: rgba(0, 0, 0, 0.6);

height: 100vh;
width: 100vw;

position: fixed;
top: 0;
left: 0;

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
z-index: 9999;
`;
