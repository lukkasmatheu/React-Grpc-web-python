import { ProductServiceClient} from '../../../protos/grpcModels_grpc_web_pb.js';
import { Product, RemoveProductRequest} from '../../../protos/grpcModels_pb';
import * as S from './styles';
import {useState } from 'react';
import Modal from '../../../components/Modal';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client = new ProductServiceClient('http://localhost:8000'); // Substitua a URL pelo endpoint do seu serviço gRPC.

const ManagerProduct= () =>{
    const typeAction = {create: "create",update: "update", remove: "remove"};
    const [product,setProduct] = useState({});
    const [errorFields,setErrorFields] = useState('');
    const [openModalProduct,setOpenModalProduct] = useState("");

    const createProduct = (productRequest) =>{

        client.createProduct(productRequest, {}, (err, response) => {
            toast((response.getResponse().includes("sucesso") ? "✅ " : "🚨 ") + response.getResponse(),{
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        });
    }
    
    const updateProduct = (productRequest) =>{
        client.updateProduct(productRequest, {}, (err, response) => {
            toast((response.getResponse().includes("sucesso") ? "✅ " : "🚨 ") + response.getResponse(),{
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        });
    }

    const removeProduct = () =>{
        const productRequest = new RemoveProductRequest();
        productRequest.setId(product.id)
        productRequest.setQuantity(Number(product.amount));
        client.removeProduct(productRequest, {}, (err, response) => {
            if(err){
                toast("🚨 " + err.getResponse(),{
                    position: "top-right",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }else{
                toast((response.getResponse().includes("sucesso") ? "✅ " : "🚨 ") + response.getResponse(),{
                    position: "top-right",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
                
        });
    }

    const valideFields=()=>{
        
        if(product.id === '' || product.id == null ||product.amount === '' || product.amount == null )
            return false
        if(openModalProduct === typeAction.create && (product.name === '' || product.name == null) && (product.description === '' || product.description == null) && (product.price === "" || product.price == null) && (product.minimalStorage === '' || product.minimalStorage == null))
            return false
        return true
    }

    const submitProduct = () =>{
        if(valideFields()){
            const productRequest = new Product();
            productRequest.setAmount(product.amount);
            productRequest.setId(product.id)
            productRequest.setName(product.name ?? "");
            productRequest.setDescription(product.description ?? "");
            productRequest.setPrice(product.price ?? "0");
            productRequest.setMinimalstorage(Number(product.minimalStorage ?? 0));

            if(openModalProduct === typeAction.create)
                createProduct(productRequest)
            if(openModalProduct === typeAction.update)
                updateProduct(productRequest)
            if(openModalProduct === typeAction.remove)
                removeProduct()
            setOpenModalProduct("")
        }else{
            setErrorFields("Preencha os campos obrigatorios para continuar.")
        }
        
    }
    const openModal = (typeModal) => {
        setOpenModalProduct(typeModal);
        setProduct({});
    }
    return (<>
    {openModalProduct !== "" && 
            <Modal>
                    <S.Content>
                        <h1>{openModalProduct === typeAction.create ? "Criar" : openModalProduct === typeAction.update ? "Atualizar" : "Retirar" } Produto</h1>
                        <label>Codigo do produto *</label>
                        <S.Input type='text' placeholder='codigo do produto' value={product.id} onChange={e=> setProduct({...product,id:e.target.value.replace(/\D/g,'')})}/>
                        {openModalProduct === typeAction.create && <>
                            <label>Nome {openModalProduct === typeAction.create ? '*':''}</label>
                            <S.Input type="text" placeholder="Nome" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value })} />
                        </>}
                        <label>quantidade *</label>
                        <S.Input type='text' placeholder='quantidade' value={product.amount} onChange={e=> setProduct({...product,amount:e.target.value.replace(/\D/g,'')})}/>
                        {openModalProduct !== typeAction.remove && <>
                        <label>Preço {openModalProduct === typeAction.create ? '*':''}</label>
                        <S.Input type="text" placeholder="Preço" value={product.price} onChange={(e) => setProduct({  ...product ,price: e.target.value.replace(/\D/g,'')})} />
                        <label>Estoque Mínimo {openModalProduct === typeAction.create ? '*':''}</label>
                        <S.Input type="text" placeholder="Estoque Mínimo" value={product.minimalStorage} onChange={(e) => setProduct({  ...product ,minimalStorage: e.target.value.replace(/\D/g,'') })} />
                        <label>Descrição {openModalProduct === typeAction.create ? '*':''}</label>
                        <S.Input
                            type="text"
                            placeholder="Descrição do produto"
                            value={product.description}
                            onChange={(e) => setProduct({ ...product  ,description: e.target.value })}
                        />
                        </>}
                        <span><b>*</b> Campos Obrigatorios</span>
                        <span style={{"color":"red"}}>{errorFields}</span>
                        <S.ButtonContainer>
                            <button onClick={()=> setOpenModalProduct('')}>Fechar</button>
                            <button onClick={submitProduct}>{openModalProduct === typeAction.create ? "Cadastrar" : openModalProduct === typeAction.update ? "Atualizar" : "Retirar" } </button>
                        </S.ButtonContainer>
                    </S.Content>
                </Modal>
            }
            <S.ButtonContainer>
                <button className={'button-layer up'} onClick={() => openModal(typeAction.create)}>cadastrar produto</button>
                <button className={'button-layer'} onClick={() => openModal(typeAction.update)}>atualizar produto</button>
                <button className={'button-layer'} onClick={() => openModal(typeAction.remove)}>retirar produto</button>
            </S.ButtonContainer>
            
        </>
)}

export default ManagerProduct;