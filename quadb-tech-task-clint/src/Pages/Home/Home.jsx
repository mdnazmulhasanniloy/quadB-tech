import React, { useContext, useEffect, useState } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import Spanner from '../Shared/Spanner/Spanner';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Shared/Pagination/Pagination';
import HomePageCard from './HomePageCard/HomePageCard';
import { AuthContext } from './../../Provider/AuthProvider';


const Home = () => {
  const {user} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(6);
  const Navigate = useNavigate();



//   const { data: shows = [], refetch, isLoading } = useQuery({
//     queryKey: ['shows'],
//     queryFn: async () => {
//         const res = await fetch(`Shows.json`)
//         const data = await res.json();
//         setItems(data);
//         return data;
//       }
// })

useEffect(()=>{
  setLoading(true)
  fetch(`https://api.tvmaze.com/search/shows?q=all`)
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data)
    setItems(data)
    setLoading(false)
  })
  .catch(err=>{
    console.log(err)
    setLoading(false)
  })
},[])

// console.log(shows)
//get current post

const indexOfLastItem = currentPage * itemPerPage;
const indexOfFirstItem =indexOfLastItem - itemPerPage;
const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

if(loading){
  return <Spanner />
}

  return (
    <div className='py-24'>
    <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            { currentItems.map(currentItem => <HomePageCard currentItem={currentItem}/>)}
        </div>

    </div>
        <div className="my-20 w-screen flex justify-center">

            {
              <Pagination 
                totalItem={items.length} 
                itemPerPage={itemPerPage} 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            }

        </div>
</div>
  );
};

export default Home;