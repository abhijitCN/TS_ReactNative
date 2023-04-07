import React from 'react';
import laptop from '../Assets/laptop1.png';
import {Link} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {BiRightArrow} from 'react-icons/bi';
export default function ItemList1() {
    const navigate = useNavigate();

    const productDetails = () => {
        navigate('/productDetails');
    };
    return (
        <div>
            <div className="m-5 font-serif text-xl font-bold text-black">
                For Business
            </div>{' '}
            <div
                className="pb-2 pr-1 m-5 bg-cyan-100 "
                onClick={productDetails}>
                <div className="absolute flex items-center justify-center w-16 h-8 bg-yellow-500">
                    <h1 className="flex items-center justify-center font-serif">
                        NEW
                    </h1>
                </div>
                <div className="flex items-center justify-center">
                    <img
                        className=""
                        width="150"
                        height="150"
                        src={laptop}
                        alt=""
                    />
                </div>

                <h1 className="flex justify-center font-serif text-slate-900">
                    Surface for Business Family
                </h1>
                <h2 className="p-1 m-1 font-serif text-xs text-justify text-slate-900">
                    Surface for Business devices enable work on your team's
                    terms with flexibility, built-in security and the power they
                    need to succeed.
                </h2>
                <div className="flex items-center justify-center space-x-2">
                    <div className="font-serif text-black items">
                        Learn more
                    </div>
                    <div>
                        <BiRightArrow size={25} />
                    </div>
                </div>
            </div>
        </div>
    );
}
