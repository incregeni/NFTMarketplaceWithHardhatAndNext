import React, { useContext, useEffect, useState } from 'react'
import { CollectiblesMenu, NFTCardItems } from '../../components'
import { fetchMarketItems, getItems, MarketContext } from '../../context';
import { IItem } from '../../interfaces'

export const TopCollectibles = () => {
  const { signer, marketContract, nftContract} = useContext(MarketContext);
  const [items, setItems] = useState<IItem[] | []>([]);
  useEffect(() => {
   if(!marketContract) return; 
   if(!nftContract) return; 
   (async () => {
    const [nfts] = await fetchMarketItems({marketContract: marketContract, offSet: 0, limit: 6});
    const genItems = await getItems(nftContract, nfts);
    setItems(genItems);
   })()
  },[signer]);

  return (
    <div className='relative w-[75%] h-[100%] bg-gradient my-0 mx-auto'>
      <h2 className='text-white text-center text-[50px] mb-5'>Top Collectibles</h2>
      <CollectiblesMenu/>

      <NFTCardItems items={items}/>
    </div>
  )
}
