import React from 'react';
import {FaPalette} from 'react-icons/fa';
import {FaReact} from 'react-icons/fa';
import {FaCode} from 'react-icons/fa';

function skills() {
    return (
        <div className="flex flex-col sm:flex-row align-center  justify-center max-w-2xl mx-auto mt-8">
            <div className='className="p-4 w-40 mx-auto text-center rounded-xl border-2 border-gray-600 bg-white'>
                <FaPalette className="text-4xl mx-auto inline-block" />
                <p>FrontEnd</p>
            </div>
            <div className="p-4 w-40 mx-auto text-center rounded-xl border-2 border-gray-600 bg-white">
                <FaReact className="text-4xl mx-auto inline-block" />
                <p>Backend</p>
            </div>
            <div className="p-4 w-40 mx-auto text-center rounded-xl border-2 border-gray-600 bg-white">
                <FaCode className="text-4xl mx-auto inline-block" />
                <p>Server</p>
            </div>
        </div>
    );
}

export default skills;
