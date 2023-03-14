import React from 'react';
import {FaBars, FaSearch, FaShoppingCart, FaUserCircle} from 'react-icons/fa';

export default function fetures() {
    return (
        <div className="flex flex-col justify-center space-y-6 md:flex-row my-14">
            <div className="flex items-center mx-4 mt-6 space-x-2 md:flex-col">
                <FaUserCircle size={35} />
                <span className="font-medium">Social Login</span>
            </div>
            <div className="flex items-center mx-4 space-x-2 md:flex-col">
                <FaUserCircle size={35} />
                <span>Social Login</span>
            </div>
            <div className="flex items-center mx-4 space-x-2 md:flex-col">
                <FaUserCircle size={35} />
                <span>Social Login</span>
            </div>
            <div className="flex items-center mx-4 space-x-2 md:flex-col">
                <FaUserCircle size={35} />
                <span>Social Login</span>
            </div>
            <div className="flex items-center mx-4 space-x-2 md:flex-col">
                <FaUserCircle size={35} />
                <span>Social Login</span>
            </div>
        </div>
    );
}
