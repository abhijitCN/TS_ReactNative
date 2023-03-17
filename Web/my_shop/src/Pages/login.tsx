import React from 'react';
import {Link} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {BsYoutube, BsGoogle, BsFacebook} from 'react-icons/bs';
import {orange} from '@mui/material/colors';

export default function Login() {
    const navigate = useNavigate();
    const login = () => {
        navigate('/');
    };
    const signUp = () => {
        navigate('/register');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-2 space-x-5 bg-red-200 sm:flex-row">
            <div className="flex flex-col w-11/12 p-5 m-5 space-y-3 font-serif bg-white md:w-5/10 h-7/12 md:h-6/12">
                <h1 className="flex justify-center text-lg font-bold">
                    Welcome back !
                </h1>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                />

                <p className="flex justify-center">--- or ---</p>
                <div className="flex justify-center m-5 space-x-5">
                    <div>
                        <BsFacebook size={25} color={'blue'} />
                    </div>
                    <div>
                        <BsGoogle size={25} color={'orange'} />
                    </div>
                    <div>
                        <BsYoutube size={25} color={'red'} />
                    </div>
                </div>
                <Button variant="outlined" color="secondary" onClick={login}>
                    Login
                </Button>
                <p className="flex justify-center">Forgoat password ?</p>
            </div>
            <div className="flex flex-col items-center justify-center w-11/12 ml-0 space-y-5 font-serif text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 md:w-5/10 h-7/12 md:h-3/6">
                <h1 className="text-2xl font-bold">Don't have an account ?</h1>
                <p>Start your journey in one click</p>
                <Button variant="contained" color="primary" onClick={signUp}>
                    register
                </Button>
            </div>
        </div>
    );
}
