import React from 'react';
import {Link} from 'react-router-dom';
import signinBackground from '../Assets/signinBackground.jpeg';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
    const submit = () => {
        navigate('/');
    };
    return (
        <div className="flex flex-row items-center justify-center h-screen space-x-5 bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <div className="flex flex-col bg-slate-50 ">
                <h1>Welcome back !</h1>
                <OutlinedInput
                    id="time"
                    type="MuiOutlinedInput" //inputProps={inputProps}
                    className="w-6/12 h-10"
                    fullWidth={false}
                />
                <OutlinedInput
                    id="time"
                    type="MuiOutlinedInput" //inputProps={inputProps}
                />
                <Button variant="outlined" onClick={submit}>
                    Outlined
                </Button>
                <p>Forgate password ?</p>
            </div>
            <div className="flex flex-col bg-gray-900 ">
                <h1>Don't have an account ?</h1>
                <p>Start your journey in one click</p>
                <Button variant="outlined" onClick={submit}>
                    Outlined
                </Button>
            </div>
        </div>
    );
}
