import React from 'react';





const MyBookingTable = ({ booking, index, handelDelete, loader}) => { 
    const {name, image, rating, language} = booking?.show;

     

    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image?.original} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {name}
            </td>
            <td>
                {language}
            </td>
            <td>
                {rating}
            </td>

            <th>
                
            </th>
            <th>
                <button className={`${loader?"btn btn-error btn-sm text-white loading" : "btn btn-error btn-sm text-white"}`} 
                        onClick={()=>handelDelete(booking?._id)}>{loader? 'Loading' : 'Delete'}</button>
            </th>
        </tr>
    );
};

export default MyBookingTable;