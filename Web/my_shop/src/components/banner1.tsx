import React from 'react';
import laptop from '../Assets/laptop1.png';
import {FaBars, FaSearch, FaShoppingCart, FaUserCircle} from 'react-icons/fa';
export default function banner1() {
    return (
        <div className="flex flex-col items-center justify-center pb-2 pr-1 m-5 bg-cyan-100">
            <div>
                <img
                    className=""
                    width="150"
                    height="150"
                    src={laptop}
                    alt=""
                />
            </div>
            <h1 className="font-serif text-slate-900">
                Surface for Business Family
            </h1>
            <h2 className="p-1 font-serif text-xs text-justify text-slate-900">
                Surface for Business devices enable work on your team's terms
                with flexibility, built-in security and the power they need to
                succeed.
            </h2>
            <button className="px-4 py-2 mx-5 my-6 font-serif font-bold text-white bg-black">
                Shop Now
            </button>
        </div>
    );
}
