import * as React from 'react';
import {Routes, Route} from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/login';
import HomePage from './Pages/HomePage';

function App() {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<Login />} />
                {/* <Route path="signUp" element={<SignUp />} /> */}
            </Routes>
        </div>
    );
}

export default App;
