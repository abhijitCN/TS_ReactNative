import React from 'react';
import {FaBars, FaSearch, FaShoppingCart, FaUserCircle} from 'react-icons/fa';
import laptop from '../Assets/laptop1.png';

export default function imageSlider() {
    return (
        <div className="flex justify-evenly flex-col-reverse slider md:flex-row bg-[#efdddd]">
            <div className="flex flex-col items-center justify-center py-12 md:items-baseline left">
                <h1 className="mx-5 text-2xl font-medium md:text-4xl">
                    Yoga Laptop
                </h1>
                <p className="w-3/4 mx-5 text-center md:text-left">
                    Tablet versatility and laptop power all in one
                    ultra-portable device
                </p>
                <button className="px-4 py-2 mx-5 my-6 font-bold text-white bg-black">
                    Shop Now
                </button>
            </div>
            <div className="right">
                <img className="w-[60rem] md:w-[64rem]" src={laptop} alt="" />
            </div>
        </div>
    );
}
