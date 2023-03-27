import * as React from 'react';
import {Routes, Route} from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/login';
import HomePage from './Pages/HomePage';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Payment from './Pages/Payment';

function App() {
    return (
        <div className="">
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<SignUp />} />
                <Route path="/" element={<HomePage />} />
                <Route path="productDetails" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="cart" element={<Payment />} />
            </Routes>
        </div>
    );
}

export default App;
