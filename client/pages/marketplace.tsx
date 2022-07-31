import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { NFTCardItems } from "../components";
import { Loader } from "../components/common";
import { fetchMarketItems, getItems, IItem, MarketContext } from "../context";

const Marketplace:NextPage = () => {
  const { signer, marketContract, nftContract} = useContext(MarketContext);
  const [items, setItems] = useState<IItem[] | []>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(6);
  const [offSet, setOffSet] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
   if(!marketContract) return; 
   if(!nftContract) return; 
   setIsLoading(true);
   (async () => {
    const [nfts, off, total] = await fetchMarketItems({marketContract: marketContract, offSet, limit });
    const genItems = await getItems(nftContract, nfts);
    setItems(genItems);
    setTotal(total);
    setOffSet(off);
    setIsLoading(false);
   })()
  },[signer]);

  const showMore = async () => {
    setIsLoading(true);
     const [nfts, off, total] = await fetchMarketItems({marketContract: marketContract!, offSet, limit });
     const genItems = await getItems(nftContract!, nfts);
     setItems((prev:IItem[]) => {
      return  [...prev, ...genItems]
    });
     setTotal(total);
     setOffSet(off);
     setIsLoading(false);
    
  }

  return (
    <section className="bg-gradient text-white py-5">
      <div className="w-[80%] mx-auto my-0">
         <h2 className="text-center text-4xl">Marketplace</h2>
         <NFTCardItems items={items} />
      </div>
      <div className="flex justify-center items-center">
      { isLoading ? <Loader className='w-[150px] h-[150px]' size={150} /> :
        (total > offSet) ? <button className="bg-gradient-to-r from-[#1199fa] to-[#11d0fa] rounded-3xl w-[200px] p-3 cursor-pointer mx-auto my-3" onClick={showMore}>Show more</button> : <></>
      }
      </div>
      
    </section>
  )
}

export default Marketplace;
