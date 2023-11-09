import { ReportServiceClient } from '../../../protos/grpcModels_grpc_web_pb.js';
import { Empty, ReportRequest} from '../../../protos/grpcModels_pb';
import * as S from './styles';
import {useState } from 'react';
import Modal from '../../../components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import ItemNotification from '../../../components/Notification/ItemNotification/index.js';

const client = new ReportServiceClient('http://localhost:8000'); // Substitua a URL pelo endpoint do seu serviço gRPC.

const StockProduct= () =>{
    const typeAction = {view: "view",inout: "inout", nout: "nout"};
    const [openModalProduct,setOpenModalProduct] = useState("");
    const [minutesPeriod,setMinutesPeriod] = useState()
    const [product,setProduct] = useState();
    const [message,setMessage] = useState();
    const getStock = () =>{
        setMessage("")
        client.getStock(new Empty(), {}, (err, response) => {
            const listMessage = response.getMessageList()
            const messages = listMessage.map(message=> JSON.parse(message))
            setProduct(messages);
            setOpenModalProduct(typeAction.view)
        }); 
    }
    
    const getProductWithoutStock = () =>{
        setProduct("")
        const request = new ReportRequest();
        request.setPeriod(minutesPeriod)
        client.getProductWithoutStock(request, {}, (err, response) => {
            const listMessage = response.getMessageList()
            setMessage(listMessage);
        });
    }

    const getProductWithoutOut = () => {
        const request = new ReportRequest();
        request.setPeriod(minutesPeriod)
        client.getProductWithoutOut(request, {}, (err, response) => {
            const listMessage = response.getMessageList()
            setMessage(listMessage);
        });
    }

    const openModal = (typeAction)=>{
        setProduct(null)
        setMessage()
        setOpenModalProduct(typeAction)
    }

    return (<>
    {openModalProduct !== "" && 
            <Modal>
                    <S.Content>
                        <h1>{openModalProduct === typeAction.view ? "Listar Produtos" : openModalProduct === typeAction.inout ? "Relatorio entrada/saida de Produtos" : "Relatorio Produtos sem saida" }</h1>
                        {(openModalProduct === typeAction.inout || openModalProduct === typeAction.nout) && <><label>Qual o periodo da busca em minutos</label><input value={minutesPeriod} onChange={e=> setMinutesPeriod(e.target.value)}></input></>}
                        <S.MessageContainer>
                            {product && product.map(produto => <p><b>Nome do produto:</b>{produto.produto} &nbsp;&nbsp; <b>Quantidade:</b> {produto.quantidade}</p>)}
                            {message && message.map(mensagem => <p><b>{mensagem}</b></p>)}
                        </S.MessageContainer>
                        <S.ButtonContainer>
                            <button onClick={()=> { setMinutesPeriod();
                                setOpenModalProduct('')}}>Fechar</button>
                            {(openModalProduct === typeAction.inout || openModalProduct === typeAction.nout) && <><button onClick={()=> {
                                if(minutesPeriod != null){
                                    if(openModalProduct === typeAction.nout){
                                        getProductWithoutStock()
                                    }else{
                                        getProductWithoutOut()
                                    }
                                }
                            }}>Buscar</button></>}
                        </S.ButtonContainer>
                    </S.Content>
                </Modal>
            }
            <S.ButtonContainer>
                <button className={'button-layer up'} onClick={() => getStock()}>Listar Produtos</button>
                <button className={'button-layer'} onClick={() => openModal(typeAction.inout)}>Relatorio Entrada/Saida de produtos </button>
                <button className={'button-layer'} onClick={() => openModal(typeAction.nout)}>Relatorio de produtos sem saida</button>
            </S.ButtonContainer>
            
        </>
)}

export default StockProduct;