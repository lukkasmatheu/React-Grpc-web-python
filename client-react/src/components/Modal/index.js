import React from 'react';
import * as S from './styles';

const Modal = ({children}) => {
    return <S.ModalContent>{children}</S.ModalContent>;
};

export default Modal;