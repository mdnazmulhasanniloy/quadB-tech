import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';  
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../../Provider/AuthProvider';
import Spanner from '../../../Shared/Spanner/Spanner';
import Pagination from './../../../Shared/Pagination/Pagination';
import MyBookingTable from './MyBookingTable';


const MyBooking = () => {

    
    const { user } = useContext(AuthContext)
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [loader, setLoader] = useState(false);
    

    const email = user?.email;


    const { data: myBookings = [], refetch, isLoading } = useQuery({
        queryKey: ['bookings', email],
        queryFn: async () => {
            const res = await fetch(`https://quadb-tech-server.vercel.app/MyBooking/${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            setItems(data);
            return data;
        }
    });

    // delete myBooking Item

   const handelDelete = id =>{
    setLoader(true)
    fetch(`https://quadb-tech-server.vercel.app/MyBooking/delete/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }

        })
            
      .then(res => res.json())
            .then(data => {

                if (data.deletedCount > 0) {
                    toast.success('User deleted successfully.');
                    refetch()
                    setLoader(false)
                }
            })
            .catch(err => {
                toast.error(err.message)
                setLoader(false)
            });
   }

   

//get current post

const indexOfLastItem = currentPage * itemPerPage;
const indexOfFirstItem =indexOfLastItem - itemPerPage;
const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);






    if (isLoading) {
        return <Spanner />
    }
    return (
        <div className="w-screen overflow-x-scroll overflow-hidden">
            <div className="w-11/12 mx-auto mt-36">
                {
                    myBookings?.length > 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>

                                    </th>
                                    <th></th>
                                    <th>Show Name</th>
                                    <th>Language</th>
                                    <th>Rating</th>
                                    <th></th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems?.map((booking, index) =><MyBookingTable
                                            booking={booking}
                                            index={index}
                                            handelDelete={handelDelete}
                                            loader={loader}
                                            key={booking?._id}
                                            
                                    /> )
                                }
                            </tbody>
                        </table>
                        : <h1 className=" text-5xl text-center text-red-400 mt-5"> Don't have any Order </h1>
                }
                {
                    myBookings.length > 5 &&
                    <div className="flex justify-center mt-10">
                        <Pagination totalItem={items.length} itemPerPage={itemPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div> 
                }
            </div>
        </div>
    );
};

export default MyBooking;