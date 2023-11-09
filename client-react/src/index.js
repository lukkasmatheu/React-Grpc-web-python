import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="bottom-right" newestOnTop />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//compile proto
//protoc --proto_path=src/ -I=. --js_out=import_style=commonjs:src/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/ ../Models/grpcModels.proto
// protoc --proto_path=../Models/ -I=. --js_out=import_style=commonjs:src/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/ ../Models/grpcModels.proto