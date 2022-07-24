import axios from "axios";
import { ethers } from "ethers";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../../components/common";
import { IItem, MarketContext, generateItem } from "../../context";

const NFTItem:NextPage = () => {
  const {marketContract, nftContract, signer} = useContext(MarketContext);
  const [nft, setNft] = useState<IItem | undefined>(undefined);
  const router = useRouter();
  const { itemSlug } = router.query;

  useEffect(() => {
    if(!marketContract) return;
    if(!nftContract) return;
    (async () => {    
      const item = await marketContract.getItemById(parseInt(itemSlug as string))
      const newItem = await generateItem(item, nftContract);
      console.log('NEW - ITEM :: ',newItem)
      setNft(newItem);
    })();
  },[signer]);

  return (
    <div className="bg-gradient text-white p-5">
      {
        !nft ? (<Loader className='w-[500px] h-[500px] mx-auto my-0 py-5' size={500} />)  :
        (
        <section className="w-[80%] mx-auto my-0 grid grid-cols-2 items-center justify-center">
           <div className="w-[400px] h-[400px]">
          <Image
            unoptimized
            src={nft!.image}
            alt="Picture of the author"
            className="rounded-2xl mt-4"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>
        <div className="self-start">
        <h2 className="text-3xl py-3">{nft.name}</h2>
        <p>{nft.description}</p>
        </div>
        
        </section>
        
        )
      }
      
    </div>
  )
}

export default NFTItem;