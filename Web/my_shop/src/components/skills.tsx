import React from 'react';
import {FaPalette} from 'react-icons/fa';
import {FaReact} from 'react-icons/fa';
import {FaCode} from 'react-icons/fa';

function skills() {
    return (
        <div className="flex flex-col justify-center max-w-2xl py-4 mx-auto mt-8 sm:flex-row bg-slate-800">
            <div className="w-40 p-4 mx-auto mb-2 text-center bg-white border-2 border-gray-600 rounded-xl">
                <FaPalette className="inline-block mx-auto text-4xl" />
                <p>FrontEnd</p>
            </div>
            <div className="w-40 p-4 mx-auto text-center bg-white border-2 border-gray-600 rounded-xl sm:mb-2">
                <FaReact className="inline-block mx-auto text-4xl" />
                <p>Backend</p>
            </div>
            <div className="w-40 p-4 mx-auto text-center bg-white border-2 border-gray-600 rounded-xl">
                <FaCode className="inline-block mx-auto text-4xl" />
                <p>Server</p>
            </div>
        </div>
    );
}

export default skills;
