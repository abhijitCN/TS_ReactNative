import React from 'react';
import {FaGithub} from 'react-icons/fa';
import {FaDribbble} from 'react-icons/fa';
import {FaTwitter} from 'react-icons/fa';
import {FaRegEnvelope} from 'react-icons/fa';

function card() {
    return (
        <div className="w-full">
            <div className="flex flex-col justify-center max-w-xs bg-blue mx-auto shadow-xl rounded-xl p-5 ">
                <div>
                    <img
                        className="w-32 mx-auto rounded-full"
                        src="https://static.toiimg.com/thumb/resizemode-4,msid-76729750,imgsize-249247,width-720/76729750.jpg"
                        alt="Profile"
                    />
                </div>
                <div className="text-center mt-5">
                    <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                        Abhijit Saha
                    </p>
                    <p className="text-xs pt-2 pb-4 border-b-2 px-5 w-auto font-semibold text-gray-600">
                        Java-Scrept Developer
                    </p>
                    <div className="flex align-center justify-center mt-4">
                        <a
                            href="#"
                            className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-800 rounder-full hover:text-white">
                            <FaGithub />
                        </a>
                        <a
                            href="#"
                            className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-800 rounder-full hover:text-white ">
                            {' '}
                            <FaRegEnvelope />
                        </a>
                        <a
                            href="#"
                            className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-800 rounder-full hover:text-white ">
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-800 rounder-full hover:text-white ">
                            <FaDribbble />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default card;
