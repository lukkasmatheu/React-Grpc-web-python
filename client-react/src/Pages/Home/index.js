// import {loadSync} from '@grpc/proto-loader'
import { LoginRequest,CreateUserRequest} from '../../protos/grpcModels_pb';
import { LoginServiceClient} from '../../protos/grpcModels_grpc_web_pb.js';
import * as S from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// var metadata = {'custom-header-1': 'value1'};
const client = new LoginServiceClient('http://localhost:8000'); // Substitua a URL pelo endpoint do seu serviço gRPC.



const Home = () =>{
    const navigate = useNavigate();
    const submitLogin = () =>{
        const loginRequest = new LoginRequest();
        loginRequest.setName(login);
        loginRequest.setSenha(password);
        client.login(loginRequest, {}, (err, response) => {
            if(err){
                setResult(err)
                console.log(err);
            }else{
                if (response.getResponse() === "sucesso"){
                    toast("✅ Logado com sucesso",{
                        position: "top-right",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                    navigate("product");
                }
                setResult(response.getResponse());
            }
        });
    }
    
    const submitRegister = () =>{
        const registerRequest = new CreateUserRequest();
        registerRequest.setName(login);
        registerRequest.setSenha(password);
        registerRequest.setCargo(occupation);

        client.createUser(registerRequest, {}, (err, response) => {
            if(err){
                console.error(err)
            }else if(response.getResponse() === "Usuario cadastrado com sucesso."){
                setResult("")
                setOpenRegister(!openRegister);
            }else{
                setResult(response.getResponse());
            }
        });
    }
    const [login,setLogin] = useState('');
    const [password,setPassword] = useState('')
    const [occupation,SetOccupation] = useState('')
    const [result,setResult] = useState('')
    const [openRegister,setOpenRegister] = useState(false)
    return(
        <S.Main>
            {openRegister && 
                <Modal>
                    <S.Content>
                        <label>Login</label>
                        <S.Input type={'text'} placeholder='Email ou Login' value={login} onChange={e=> setLogin(e.target.value)}/>
                        <label>senha</label>
                        <S.Input type={'password'} placeholder='Senha' value={password} onChange={e=> setPassword(e.target.value)}/>
                        <label>Cargo</label>
                        <S.Input type={'text'} placeholder='Cargo' value={occupation} onChange={e=> SetOccupation(e.target.value)}/>
                        <S.ButtonContainer>
                            <button onClick={()=> setOpenRegister(!openRegister)}>Fechar</button>
                            <button onClick={submitRegister}>Cadastrar</button>
                        </S.ButtonContainer>
                        {result && <label style={{"color":"red"}}>{result}</label>}
                    </S.Content>
                </Modal>
            }
            <label>Login</label>
            <S.Input type={'text'} placeholder='Email ou Login' value={login} onChange={e=> setLogin(e.target.value)}/>
            <label>senha</label>
            <S.Input type={'password'} placeholder='Senha' value={password} onChange={e=> setPassword(e.target.value)}/>
            <S.ButtonContainer>
                <button onClick={submitLogin}>Logar</button>
                <button onClick={()=> {setResult("");
                setOpenRegister(!openRegister);}}>Cadastrar</button>
            </S.ButtonContainer>
            {result && <label style={{"color":"red"}}>{result}</label>}
        </S.Main>
    )
    
}

export default Home;