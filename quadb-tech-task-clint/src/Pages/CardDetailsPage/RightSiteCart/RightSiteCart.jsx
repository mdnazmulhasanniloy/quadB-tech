import React, { useState } from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';



const RightSiteCart = ({item}) => {
	
    const {image, name, language, status, rating, season, id} = item?.show;
	
	
    return (
        <div className="max-w-3xl w-full mx-auto z-10">
		<div className="flex flex-col">
			<div className="bg-white border border-white shadow-lg  rounded-3xl p-4 m-4">
				<div className=" w-full flex justify-between">
					<div className=" relative h-32 w-32 mb-3 mr-5">
						<img src={image?.original} alt="aji" className=" w-32 h-32 object-cover rounded-2xl" />
					</div>
					<div className="flex-auto justify-evenly">
						<div className="flex items-center justify-between ">
							<div className="flex items-center">
								<div className="flex flex-col">
									<div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">{name}</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row items-center my-5">
							<div className="flex">
								
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									stroke="currentColor" className="h-5 w-5 text-accent">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
									</path>
								</svg>
							</div>
                                <h1 className='text-md ml-4 text-gray-400'>
									{rating? rating?.average : '0'}
								</h1>
							
							</div>
							<div className="flex pt-2  text-sm text-gray-500">
								<Link to={`/cardDetails/${id}`}  className="flex-no-shrink bg-accent hover:bg-accent px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-accent hover:border-accent text-white rounded-full transition ease-in duration-300">
									See Details
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
};

export default RightSiteCart;