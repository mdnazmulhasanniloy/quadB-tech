import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { toast } from 'react-hot-toast';
import Spanner from '../../../Shared/Spanner/Spanner';
import Pagination from '../../../Shared/Pagination/Pagination';
import AllUserTable from './AllUserTable/AllUserTable';

const AllUser = () => {
    
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);


    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://quadb-tech-server.vercel.app/allUser`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            setItems(data);
            return data;
        }
    })


    //delete user 
    const handelToDelete = (id) => {
        fetch(`https://quadb-tech-server.vercel.app/user/delete/${id}`, {
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
                }
            })
            .catch(err => {
                toast.error(err.message)
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
    <div className="w-screen overflow-y-scroll">

        <div className="w-11/12 mx-auto mt-36">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>

                                </label>
                            </th>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete Account</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((user, index) => <AllUserTable
                                user={user}
                                index={index}
                                handelToDelete={handelToDelete} 
                                key={user._id} />)
                        }
                    </tbody>
                </table>
                {
                    users.length > 5 &&
                    <div className="flex justify-center mt-10">
                        <Pagination totalItem={items.length} itemPerPage={itemPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div> 
                }
            </div>
        </div>
        </div>
    );
};

export default AllUser;