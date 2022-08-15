import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { NFTCardItems } from "../components";
import { Loader } from "../components/common";
import { MarketContext } from "../context";

const Marketplace:NextPage = () => {
  const { NFTFilterItems, getMarketPlaceItems} = useContext(MarketContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    showMore();
  },[]);


  const showMore = async () => {
      setIsLoading(true);
      await getMarketPlaceItems();
      setIsLoading(false);
  }

  return (
    <section className="bg-gradient text-white py-5">
      <div className="w-[80%] mx-auto my-0">
         <h2 className="text-center text-4xl">Marketplace</h2>
         <NFTCardItems items={NFTFilterItems} isLoading={isLoading}/>
      </div>
      <div className="flex justify-center items-center">
      { isLoading && <Loader className='w-[150px] h-[150px]' size={150} /> }
      </div>
      
    </section>
  )
}

export default Marketplace;
