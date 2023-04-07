import React from 'react';
import laptop from '../Assets/laptop1.png';
import HorizontalScrollDiv from '../components/HorizontalScrollDiv';
import {Button, TextField, IconButton} from '@mui/material';
import {
    BsYoutube,
    BsGoogle,
    BsFacebook,
    BsFillSuitHeartFill,
} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';

export default function ProductDetails() {
    const navigate = useNavigate();

    const addToCart = () => {
        navigate('/cart');
    };
    return (
        <div className="">
            <div className="flex justify-around">
                <div className="">
                    {' '}
                    <img className="h-1/2" src={laptop} alt="" />
                    <div className="flex flex-row h-40 bg-orange-400">
                        <img className="" src={laptop} alt="" />
                        <img className="" src={laptop} alt="" />
                        <img className="" src={laptop} alt="" />
                    </div>
                </div>
                <div className="mx-20">
                    <h1 className="font-serif text-6xl font-bold">2000</h1>
                    <h1 className="font-serif text-5xl">short dec</h1>
                    <p className="font-serif text-3xl">long dec</p>
                    <h1 className="font-serif text-3xl">Select Color</h1>
                    <div className="flex space-x-2">
                        <div className="flex flex-row items-center w-2/3 h-10 px-3 space-x-5 bg-orange-200 ">
                            <div className="w-5 h-5 border-black rounded-full bg-slate-500 "></div>
                            <h1>gray</h1>
                        </div>
                        <div className="flex flex-row items-center w-2/3 h-10 px-3 space-x-5 bg-orange-200 ">
                            <div className="w-5 h-5 border-black rounded-full bg-slate-500 "></div>
                            <h1>gray</h1>
                        </div>{' '}
                    </div>
                    <p>long dec</p>
                    <div>select specification</div>
                    <div className="flex flex-row">
                        <div>base 1</div>
                        <div>bass 2</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="font-serif text-3xl">short dec</h1>
                    <h1 className="font-serif text-3xl">short dec</h1>
                </div>
                <div className="flex flex-row items-center">
                    <div
                        className="w-4/5 font-serif text-3xl bg-slate-500 text-cyan-50"
                        onClick={addToCart}>
                        Add to Cart
                    </div>
                    <div className="flex items-center justify-center w-20 h-12 bg-orange-500">
                        <BsFillSuitHeartFill size={25} color={'red'} />
                    </div>
                </div>
            </div>
            <HorizontalScrollDiv />
        </div>
    );
}
