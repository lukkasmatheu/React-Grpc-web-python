// import {loadSync} from '@grpc/proto-loader'
import * as S from './styles';
import { useEffect, useState } from 'react';
import Notification from '../../components/Notification';
import ItemNotification from  '../../components/Notification/ItemNotification'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManagerProduct from './ManagerProduct';
import StockProduct from './StockProduct';

// var metadata = {'custom-header-1': 'value1'};

const ProductMenu = () =>{

    const [notifications,setNotifications] = useState([]);

    useEffect(()=>{
        let source;
        const connectToSSE = () => {
            source = new EventSource("http://localhost:7779/notification");
            source.addEventListener('notification', (event) =>{
                var data = JSON.parse(event.data);
                if(data.message !== "ok"){
                    toast("⚠️ " + data.message,{
                        position: "top-right",
                        autoClose: 9000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setNotifications((prevNotifications) => [data.message, ...prevNotifications])
                }
                
            }, false);
            source.addEventListener('error', (event) => {
                if (event.readyState === EventSource.CLOSED) {
                   console.log(event)
                    connectToSSE();
                }
            }, false);

        }
        connectToSSE()
        window.addEventListener("beforeunload", () => {
            if (source) {
                source.close(); // Fecha a conexão EventSource ao recarregar a página
            }
        });    
            
        return () => {
            if (source) {
                source.close(); // Certifique-se de fechar a conexão ao desmontar o componente
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    

    return(
        <S.Main>
            <Notification><h1>Notificaçoes</h1>
                <S.Notify>
                    {notifications && notifications.map((notification,index)=>(
                    <ItemNotification key={index} message={notification}/>))}
                </S.Notify>
                <S.ButtonContainer>
                    <button className={'button-layer endpage'} onClick={() => setNotifications([])}>Limpar notificações</button>
                </S.ButtonContainer>
            </Notification>
            <h1>Produtos</h1>
            <ManagerProduct/>
            <StockProduct/>
        </S.Main>
    )
    
}

export default ProductMenu;