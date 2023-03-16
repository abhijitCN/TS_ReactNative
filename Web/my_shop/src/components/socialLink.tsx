import React from 'react';
import {BsYoutube, BsGoogle, BsFacebook} from 'react-icons/bs';

export default function socialLink() {
    return (
        <div>
            <div className="flex items-center m-5 space-x-5">
                <div className="font-serif text-xl font-bold items text-cyan-900">
                    Follow My-Shop on
                </div>
                <div>
                    <BsFacebook size={25} />
                </div>
                <div>
                    <BsGoogle size={25} />
                </div>
                <div>
                    <BsYoutube size={25} />
                </div>
            </div>
        </div>
    );
}
