import React from 'react';
import laptop from '../Assets/laptop1.png';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import {BsFillSuitHeartFill} from 'react-icons/bs';
export default function Cart() {
    return (
        <div>
            <div className="m-5">
                <div className="flex justify-center mb-5">
                    <h1>Your Cart (4 items)</h1>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col ">
                        <h2>Item</h2>
                        <img className="h-1/6 w-1/6" src={laptop} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <h2>Description</h2>
                        <h2>Dell Inspiring 7000 gaming</h2>
                    </div>
                    <div className="flex flex-col ">
                        <h2>Quantity</h2>
                        <div className="w-32 bg-lime-100 border-yellow-900 flex flex-row space-x-2 items-center justify-evenly">
                            <AiOutlinePlus size={25} color={'black'} />
                            <h2>20</h2>
                            <AiOutlineMinus size={25} color={'Black'} />
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <h2>Total</h2>
                        <h2>70700</h2>
                    </div>
                </div>
                {/* <div className="flex flex-row items-center justify-around">
                    <img className="h-1/6 w-1/6" src={laptop} alt="" />
                    <h2>Dell Inspiring 7000 gaming</h2>
                    <div className="w-32 bg-lime-100 border-yellow-900 flex flex-row space-x-2 items-center justify-evenly">
                        <AiOutlinePlus size={25} color={'black'} />
                        <h2>20</h2>
                        <AiOutlineMinus size={25} color={'Black'} />
                    </div>
                    <h2>70700</h2>
                </div> */}
                <div className="flex  items-end flex-col space-y-5 bg-lime-200 ">
                    <div className="flex flex-row space-x-16">
                        <h2>Subtotal</h2>
                        <h2>70000</h2>
                    </div>
                    <div className="flex flex-row space-x-16">
                        <h2>Grand Total</h2>
                        <h2>70700</h2>
                    </div>
                    <div className="bg-red-300 w-40 flex flex-col items-center">
                        <div className="flex flex-row">
                            <h2>Grand Total</h2>
                            <BsFillSuitHeartFill size={25} color={'red'} />
                        </div>
                        <h2>Shipping</h2>
                    </div>
                    <div className="w-1/6 font-serif text-3xl bg-slate-500 text-cyan-50 flex items-center">
                        Check Out
                    </div>
                </div>
                <div className="bg-red-700 h-5  items-end flex w-96"></div>
            </div>
        </div>
    );
}
