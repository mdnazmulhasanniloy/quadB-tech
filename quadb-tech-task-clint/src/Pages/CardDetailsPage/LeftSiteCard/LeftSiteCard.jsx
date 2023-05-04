import React, { useState } from 'react';

const LeftSiteCard = ({data, setModalOpen, setBookingData}) => {
    const {name, image, summary, status, premiered, rating, language, officialSite, schedule, network} = data[0]?.show;
    const [tab, setTab] = useState('info')
    return (
        <div className='w-full mb-20'>
            <div className="w-full bg-cover">
                <div className="flex flex-col lg:flex-row justify-center max-w[80rem] gap-4 p-4">
                    <img src={image?.original} alt={`${name} Image`} className=" max-w-sm h-56" />
                    <div className='lg:mt-2'>
                        <h1 className="text-4xl"><span className='font-bold border-l-4 px-2 border-accent'>{name}</span>{`: Language[${language}] | ${status}`}</h1>
                        <div className="">
                            <h4 className='text-xl text-gray-500 mt-4'>{premiered? premiered.slice(0, 4) : ' '}</h4>
                            <label
                                    onClick={() => {
                                        setModalOpen(true) 
                                        setBookingData(data[0]?.show)
                                        }}
                                    htmlFor="Booking-Modal" className=' mt-10 max-w-[240px] bg-black hover:bg-accent px-4 py-2rounded-lg text-white transition-all duration-300'>
                                Book Now
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full min-h-[2px] bg-gray-400"></div>
                <div className="flex justify-center">
                    <div className="tabs py-4">
                        <button onClick={()=>setTab('info')} className={`${tab==='info' && 'tab-active'} text-2xl font-bold tab tab-bordered`}>Info</button> 
                        <button onClick={()=>setTab('link')} className={`${tab==='link' && 'tab-active'} text-2xl font-bold tab tab-bordered`}>Link</button> 
                        <button onClick={()=>setTab('cast')} className={`${tab==='cast' && 'tab-active'} text-2xl font-bold tab tab-bordered`}>Cast</button>
                    </div>

                </div>
            {
                tab==='info' &&
                <div className="mt-10">
                    <h1 className='text-2xl font-bold border-l-4 px-1 border-accent uppercase'>Details</h1>
                    <div className="mt-5 text-lg ml-3">
                        {`${summary}`}
                    </div>
                    <div className="w-11/12 mx-auto">
                    <div className="w-full min-h-[2px] bg-gray-400 mt-10"></div>
                    <div className="flex justify-between px-4 py-4">
                        <div className="">
                            <h1 className='text-md'><span className='font-bold'>Original title: </span> {name? name: ''}</h1>
                        </div>
                        <div className="">
                            <h1 className='text-md'><span className='font-bold'>IMDb Rating: </span> {rating? rating?.average : '0'}</h1>
                        </div>
                        <div className="">
                            <h1 className='text-md'><span className='font-bold'>Language:</span> {language? language:''}</h1>
                        </div>
                        <div className="">
                            <h1 className='text-md'><span className='font-bold'>Premiered: </span> {premiered? premiered:''}</h1>
                        </div>
                    </div>
                    <div className="w-full min-h-[2px] bg-gray-400"></div>
                    </div>


                </div>
            }


            {
                tab==='link' &&
                
                <div className="mt-10">
                    <h1 className='text-2xl font-bold border-l-4 px-1 border-accent uppercase'>Important Links:</h1>
                    <div className="w-11/12 mx-auto">
                    <div className="w-full min-h-[2px] bg-gray-400 mt-10"></div>
                        <div className="flex gap-5 px-4 py-4">
                            <h1 className='text-md font-bold uppercase'>OfficialSite : </h1>
                            <a href="" className='text-red-400 border-b-2 border-white hover:border-red-400 transition-all duration-500 ease-linear'>{officialSite? officialSite: ' '}</a>
                        </div>
                        <div className="w-full min-h-[2px] bg-gray-400"></div>
                    </div>
                </div>
            }

            {
                tab==='cast' &&
                
                <div className="mt-10">
                    <h1 className='text-2xl font-bold border-l-4 px-1 border-accent uppercase'>Schedule:</h1>
                    <div className="w-11/12 mx-auto">
                    <div className="w-full min-h-[2px] bg-gray-400 mt-10"></div>
                    <div className="flex justify-start gap-6 px-4 py-4">
                        <div className="">
                            <h1 className='text-md'><span className='font-bold'>Time: </span> {schedule?.time? schedule?.time: ''}</h1>
                        </div>
                        <div className="">
                            <h1 className='text-md'><span className='font-bold'>IMDb Rating: </span> {schedule?.days? schedule?.days : '0'}</h1>
                        </div>
                    </div>
                        <div className="w-full min-h-[2px] bg-gray-400"></div>
                    </div>


                    <div className="mt-10">
                        <h1 className='text-2xl font-bold border-l-4 px-1 border-accent uppercase'>Network:</h1>
                        <div className="w-11/12 mx-auto">
                        <div className="w-full min-h-[2px] bg-gray-400 mt-10"></div>
                        <div className="flex justify-between px-4 py-4">
                            <div className="">
                                <h1 className='text-md'><span className='font-bold'>Name </span> {network?.name? network?.name: ''}</h1>
                            </div>
                            <div className="">
                            <a href={`${network?.officialSite}`} className='text-md'><span className='font-bold'>Country: </span> {network?.country?.name}</a>
                            </div>
                            <div className="">
                                <h1 className='text-md'><span className='font-bold'>Timezone: </span> {network?.country?.timezone}</h1>
                            </div>
                        </div>
                            <div className="w-full min-h-[2px] bg-gray-400"></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default LeftSiteCard;