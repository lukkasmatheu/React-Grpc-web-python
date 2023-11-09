import styled from 'styled-components';

export const NotificationContent = styled.div`

    width: 26vw;
    height: 100vh;

    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.8px);
    -webkit-backdrop-filter: blur(6.8px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 9999;
`;

export const BellsNotification = styled.img`
    color: white;
    background:white;
    width: 30px;
    height: 30px;
    border-radius: 60%;
    position: fixed;
    top: 10px;
    left: 10px;
`;

export const Close = styled.img`
    color: white;
    background:white;
    width: 30px;
    height: 30px;
    border-radius: 60%;
    position: fixed;
    top: 25px;
    left: 22vw;
`;