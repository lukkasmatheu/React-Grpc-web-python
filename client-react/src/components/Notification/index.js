import React, {useState} from 'react';
import * as S from './styles';
import Bells from '../../assets/bells.svg'
import Close from '../../assets/close.svg'
const Notification = ({children}) => {
    const [enabled,setEnabled] = useState(false)
    return <>
    {!enabled ? <S.BellsNotification src={Bells} alt="notifications bells" onClick={()=> setEnabled(true)}/> :
    <S.NotificationContent><S.Close src={Close} alt="close notifications" onClick={()=> setEnabled(false)}/>{children}</S.NotificationContent>}
    </> 
};
export default Notification;