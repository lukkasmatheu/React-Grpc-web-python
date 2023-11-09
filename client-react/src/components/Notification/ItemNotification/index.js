import React from 'react';
import * as S from './styles';

const ItemNotification = ({message}) => {
    
    return <S.NotificationContent>
        {message}
    </S.NotificationContent> 
};
export default ItemNotification;