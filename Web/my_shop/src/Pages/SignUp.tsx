import * as React from 'react';
import {Link} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {BsYoutube, BsGoogle, BsFacebook} from 'react-icons/bs';
import {orange} from '@mui/material/colors';

export default function SignUp() {
    const navigate = useNavigate();

    const submit = () => {
        navigate('/login');
    };

    return (
        <div>
            {/* <Link to="/signUp">Sign-Up</Link> */}
            <div className="flex flex-col items-center justify-center h-screen p-2 space-x-5 bg-red-200 sm:flex-row">
                <div className="flex flex-col w-11/12 p-10 m-5 space-y-3 font-serif bg-white md:w-5/10 h-7/12 md:h-6/12">
                    <h1 className="flex justify-center text-2xl font-bold">
                        Please Register Now !!
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

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={submit}>
                        Login
                    </Button>
                    <p className="flex justify-center">
                        Already Have Account ?
                    </p>
                </div>
            </div>
        </div>
    );
}
