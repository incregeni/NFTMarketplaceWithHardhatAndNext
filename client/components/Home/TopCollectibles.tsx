
import React, { useEffect, useState } from 'react'
import { CollectiblesMenu, NFTCardItems } from '../../components'
import { fetchMarketItems, getDefaultMarketContractProvider, getDefaultNFTContractProvider, getItems } from '../../context';
import { IItem } from '../../interfaces'
import { Loader } from '../common';


export const TopCollectibles = () => {
  const [items, setItems] = useState<IItem[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => { 
   (async () => {
    try {
      setIsLoading(true);
      const marketContract = await getDefaultMarketContractProvider();
      console.log('CONTRACT ',marketContract)
      const nftContract = await getDefaultNFTContractProvider();
      const [nfts] = await fetchMarketItems({marketContract: marketContract, offSet: 0, limit: 6});
      const genItems = await getItems(nftContract, nfts);
      setItems(genItems);
      setIsLoading(false);  
    } catch (error) {
        console.error('Home-Collection #',error)
        setIsLoading(false);
    }
   })()
  },[]);

  return (
      isLoading ? (
           <Loader className='relative w-[150px] h-[150px] bg-gradient my-0 mx-auto' size={150} /> ) : (
        <div className='relative w-[75%] h-[100%] bg-gradient my-0 mx-auto'>
          <h2 className='text-white text-center text-[50px] mb-5'>Top Collectibles</h2>
          <CollectiblesMenu/>
          <NFTCardItems items={items}/>
        </div>
      )
  )
}
