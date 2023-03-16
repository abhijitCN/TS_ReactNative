import React from 'react';
import {FcCustomerSupport} from 'react-icons/fc';
import {GrPaypal} from 'react-icons/gr';
import {FaProductHunt} from 'react-icons/fa';
import {SlSocialGoogle} from 'react-icons/sl';

export default function features() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row my-14 ">
            <div className="flex items-center mx-4 mt-6 space-x-3 md:flex-col ">
                <GrPaypal size={35} />
                <span className="font-serif">Easy Payment</span>
            </div>
            <div className="flex items-center mx-4 space-x-2 md:flex-col">
                <FcCustomerSupport size={35} />
                <span className="font-serif ">24*7 Customer Support</span>
            </div>
            <div className="flex items-center mx-4 space-x-2 md:flex-col">
                <FaProductHunt size={35} />
                <span className="font-serif ">Quality Product</span>
            </div>
            <div className="flex items-center mx-4 space-x-2 md:flex-col">
                <SlSocialGoogle size={35} />
                <span className="font-serif ">Social Login</span>
            </div>
        </div>
    );
}
