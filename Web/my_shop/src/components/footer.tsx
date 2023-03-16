import React from 'react';
//grid gap-4 grid-cols-3 grid-rows-3 sm:flex	justify-evenly
import {BsGlobeEuropeAfrica} from 'react-icons/bs';

function footer() {
    return (
        <div>
            <div className="m-5 sm:grid sm:gap-4 sm:grid-cols-3 justify-items-center ">
                <div className="">
                    <div className="font-sans text-2xl font-bold text-slate-600">
                        What's new
                    </div>
                    <div className="font-serif text-slate-500">
                        Microsoft 365
                    </div>
                    <div className="font-serif text-slate-500">Games</div>
                    <div className="font-serif text-slate-500">
                        surface Pro 9
                    </div>
                    <div className="font-serif text-slate-500"></div>
                    <div className="font-serif text-slate-500">
                        Surface Laptop 5
                    </div>
                </div>
                <div className="">
                    <div className="font-sans text-2xl font-bold text-slate-600">
                        Microsoft Store
                    </div>
                    <div className="font-serif text-slate-500">footer</div>
                    <div className="font-serif text-slate-500">
                        Windows 11 apps
                    </div>
                    <div className="font-serif text-slate-500">
                        Surface Laptop Go 2
                    </div>
                    <div className="font-serif text-slate-500">
                        Surface Laptop Studio
                    </div>
                    <div className="font-serif text-slate-500">footer</div>
                </div>
                <div className="">
                    <div className="font-sans text-2xl font-bold text-slate-600">
                        Education
                    </div>
                    <div className="font-serif text-slate-500">footer</div>
                    <div className="font-serif text-slate-500">
                        Microsoft in education
                    </div>
                    <div className="font-serif text-slate-500">
                        Devices for education
                    </div>
                    <div className="font-serif text-slate-500">
                        Microsoft Teams for Education
                    </div>
                    <div className="font-serif text-slate-500">
                        Microsoft 365 Education
                    </div>
                </div>
                <div className="">
                    <div className="font-sans text-2xl font-bold text-slate-600">
                        Business
                    </div>
                    <div className="font-serif text-slate-500">footer</div>
                    <div className="font-serif text-slate-500">
                        Microsoft Cloud
                    </div>
                    <div className="font-serif text-slate-500">
                        Microsoft Security
                    </div>
                    <div className="font-serif text-slate-500">Azure</div>
                    <div className="font-serif text-slate-500">
                        Dynamics 365
                    </div>
                </div>
                <div className="">
                    <div className="font-sans text-2xl font-bold text-slate-600">
                        Developer & IT
                    </div>
                    <div className="font-serif text-slate-500">footer</div>
                    <div className="font-serif text-slate-500">
                        Developer Center
                    </div>
                    <div className="font-serif text-slate-500">
                        Documentation
                    </div>
                    <div className="font-serif text-slate-500">
                        Microsoft Learn
                    </div>
                    <div className="font-serif text-slate-500">
                        Microsoft Tech Community
                    </div>
                </div>
                <div className="">
                    <div className="font-sans text-2xl font-bold text-slate-600">
                        Company
                    </div>
                    <div className="font-serif text-slate-500">footer</div>
                    <div className="font-serif text-slate-500">
                        Privacy at Microsoft
                    </div>
                    <div className="font-serif text-slate-500">
                        Company news
                    </div>
                    <div className="font-serif text-slate-500">
                        About Microsoft
                    </div>
                    <div className="font-serif text-slate-500">Careers</div>
                </div>
            </div>
            <div className="flex items-center m-5 space-x-2">
                <div className=" text-slate-500">
                    <BsGlobeEuropeAfrica size={25} />
                </div>
                <div className="font-serif items text-slate-500">
                    English (india)
                </div>
            </div>
            <div className="flex flex-row flex-wrap m-5 mb-5 mr-3 space-x-2 md:justify-end">
                <div className="font-serif items text-slate-500">
                    Microsoft{' '}
                </div>
                <div className="font-serif items text-slate-500">Privacy </div>
                <div className="font-serif items text-slate-500">
                    Terms of use{' '}
                </div>
                <div className="font-serif items text-slate-500">
                    Trademarks{' '}
                </div>
                <div className="font-serif items text-slate-500">
                    Microsoft 2023
                </div>
            </div>
        </div>
    );
}

export default footer;
