import logo from './logo.svg';
import './App.css';
import React from 'react';
// import {loadSync} from '@grpc/proto-loader'
import { LoginRequest} from './protos/grpcModels_pb.js';
import { LoginServiceClient} from './protos/grpcModels_grpc_web_pb.js';
// var metadata = {'custom-header-1': 'value1'};
const client = new LoginServiceClient('http://localhost:8088'); // Substitua a URL pelo endpoint do seu serviço gRPC.
const loginRequest = new LoginRequest();
loginRequest.setName('Lucas');
loginRequest.setSenha('key123');
console.log("login",loginRequest);
console.log("cliente",client)
client.login(loginRequest, {}, (err, response) => {
  console.log({err,response})
});


// const packageDefinition = loadSync('../../Models/grpcModels.proto',    {keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true
//  })
//  var routeguide = loadPackageDefinition(packageDefinition);
//  console.log(routeguide);
//  var client = new routeguide.RouteGuide('localhost:50051',
//  ServerCredentials.createInsecure());


function App() {
//   useEffect(()=>{
//     client.login(login,(err, res) => {
//       if(err) { return console.error(err) }
//       console.log(res)
//     })
//   },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
