import React, { useState } from 'react';

import { AiTwotoneStar} from 'react-icons/ai';
import { MdOutlineLanguage } from 'react-icons/md';
import { Link } from 'react-router-dom';

const HomePageCard = ({currentItem}) => {
    const {name, image, summary, rating, language, id} = currentItem?.show
    
    
    return (
        <div className='bg-white shadow-2xl min-h-[500px]  pb-10'>
            {/* image */ }
            <div className='overflow-hidden'>
                <img src={image?.original} className='group-hover:scale-110 transition-all duration-500 w-full h-auto max-h-96' alt="" />
            </div>
            {/* details */}

            <div className="bg-white shadow-lg max-w-[400px] mx-auto 
                            -translate-y-1/2 flex justify-center items-center 
                            uppercase font-semibold tracking-[1px] text-base
                            ">
                <div className="flex justify-between w-[80%] h-[50px]">
                                {/* size */}
                    <div className="flex items-center gap-x-2">
                        <div className="text-accent ">
                            <MdOutlineLanguage className='text-[15px] '/>
                        </div>
                        <div className="flex gap-x-1">
                            <div className=""></div>
                            <div className="font-bold">{language?language:''}</div>
                        </div>
                    </div>
                    {/* room capacity */}
                    <div className="flex items-center gap-x-2">
                        <div className="text-accent">
                            <AiTwotoneStar className='text-[15px] '/>
                        </div>
                        <div className="flex gap-x-1">
                            <div className="">IMDb</div>
                            <div className="">{rating?.average? rating.average :'0'}/10</div>
                        </div>
                    </div>
                </div>            
            </div>
            <div className="text-center">
                {/* name */}
                <Link to={`/cardDetails/${id}`}>
                    <h3 className='text-2xl font-bold'>{name}</h3>
                </Link>
                <p className='max-w-[300px] mx-auto mb-3 lg:mb-6'>
                
                    {summary.slice(0, 56)}
                
                </p>
            {/*button */}
            <Link to={`/cardDetails/${id}`} className='max-w-[240px] bg-black hover:bg-accent px-4 py-3 rounded-sm text-white transition-all duration-300'>
                See Details
            </Link>
            </div>
        </div>
    );
};

export default HomePageCard;