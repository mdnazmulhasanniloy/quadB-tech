import React, {useEffect, useState} from 'react';
import LeftSiteCard from './LeftSiteCard/LeftSiteCard';
import RightSiteCart from './RightSiteCart/RightSiteCart';
import { useLoaderData, useParams,  } from 'react-router-dom';
import Spanner from '../Shared/Spanner/Spanner';
import { useTitle } from './../../Hooks/useTitle';
import BookingModal from '../Shared/BookingModal/BookingModal';

const CardDetailsPage = () => {
  const [recentUpdate, setRecentUpdate] = useState([]);
	const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
  const params = useParams();
  const shows = useLoaderData();
  useTitle('Card Details')
  
  
  
//right site shows
  useEffect(()=>{
		setLoading(true)
		fetch(`https://api.tvmaze.com/search/shows?q=all`)
		.then((res)=>res.json())
		.then((result)=>{
		  console.log(result)
		  setRecentUpdate(result)
		  setLoading(false)
		})
		.catch(err=>{
		  console.log(err)
		  setLoading(false)
		})
	  },[]);


    const data = shows.filter(show=>show.show.id==params.id);
    const items = recentUpdate.slice(0, 3)
    

if(loading){
  return <Spanner />
}
    return (
        <section  className='w-screen'>
          <div className="w-11/12 mx-auto block md:flex">
            <div className="sm:w-full md:w-[70%] border-r-2 border-gray-300">
              <LeftSiteCard data={data} 
                          setBookingData={setBookingData}
                          setModalOpen={setModalOpen}/>
            </div>
            <div className="sm:w-full md:w-[30%]">

              <h1 className="text-3xl font-bold lg:ml-3 border-l-4 border-accent mb-5 sm:mt-5 md:mt-0 lg:mt-0">Latest Updates</h1>
              {items.map((item, index)=><RightSiteCart item={item} key={index} setBookingData={setBookingData} />)}
            </div>
          </div>
          {
            bookingData && modalOpen &&
            <BookingModal 
                          bookingData={bookingData}
                          setModalOpen={setModalOpen}
                          />
            }
        </section>
    );
};

export default CardDetailsPage;

