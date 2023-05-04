import React, {useState} from 'react';
import LeftSiteCard from './LeftSiteCard/LeftSiteCard';
import RightSiteCart from './RightSiteCart/RightSiteCart';

const CardDetailsPage = () => {
  const [data, setData] = useState({})
  const shows = useLoaderData();


    


      const {image, name, language, status, season} = data?.show; 


    return (
        <section  className='w-screen'>
          <div className="w-11/12 mx-auto block md:flex">
            <div className="sm:w-full md:w-[70%] border-r-2 border-gray-300">
              <LeftSiteCard data={data}/>
            </div>
            <div className="sm:w-full md:w-[30%]">

              <h1 className="text-3xl font-bold lg:ml-3 border-l-4 border-accent mb-5 sm:mt-5 md:mt-0 lg:mt-0">Latest Updates</h1>
              <RightSiteCart data={data} />
            </div>


          </div>
        </section>
    );
};

export default CardDetailsPage;