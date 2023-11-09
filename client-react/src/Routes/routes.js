import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import ProductMenu from '../Pages/Product';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Home/>} />
                <Route path="/product" element={< ProductMenu/>} />
            </Routes>
        </BrowserRouter>
    );
};
export default Routers;