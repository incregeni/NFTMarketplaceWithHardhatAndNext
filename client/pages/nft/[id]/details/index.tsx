import { ethers } from "ethers";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../../../../components/common";
import { generateItem, IItem, MarketContext } from "../../../../context";

const NFTDetails:NextPage = () => {
  const {marketContract, nftContract, signer} = useContext(MarketContext);
  const [nft, setNft] = useState<IItem | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if(!marketContract) return;
    if(!nftContract) return;
    (async () => {    
      const item = await marketContract.getItemById(parseInt(id as string))
      const newItem = await generateItem(item, nftContract);
      setNft(newItem);
    })();
  },[signer]);
  
  return (
    <div className="bg-gradient text-white p-5">
      <Head>
        <title>NFT Details {id}</title>
        <meta name="description" content="NFT Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {
      !nft ? (<Loader className='w-[500px] h-[500px] mx-auto my-0 py-5' size={500} />)  :
      (<section className="w-[80%] mx-auto my-0">
         <h2 className="bold text-blue-600 text-4xl text-center">Details</h2>
         <div className="grid grid-cols-[1fr_350px] gap-[20px] justify-center items-center">
           <div>
             <h4 className="py-3"><span className="bold text-pink-600 text-lg">Item-ID:</span> {ethers.BigNumber.from(nft.itemId).toNumber()}</h4>
             <h4 className="py-3"><span className="bold text-pink-600 text-lg">Name:</span> {nft.name}</h4> 
             <h4 className="py-3"><span className="bold text-pink-600 text-lg">Creator:</span> {nft.seller}</h4> 
             <h4 className="py-3"><span className="bold text-pink-600 text-lg">Description:</span> {nft.description}</h4> 
             <h4 className="py-3"><span className="bold text-pink-600 text-lg">Owner:</span> {nft.owner}</h4>
             <h4 className="py-3"><span className="bold text-pink-600 text-lg">Price:</span> {nft.price} eth</h4> 
             <h4 className="py-3"><span className="bold text-pink-600 text-lg">Sold:</span> {nft.sold ? 'sold out' : 'unsold'}</h4> 
             <h4 className="py-3"><span className="bold text-pink-600 text-lg">Token-ID:</span> {ethers.BigNumber.from(nft.tokenId).toNumber()}</h4>
             <h4 className="py-3"><span className="bold text-pink-600 text-lg">NFT Url:</span> <a className="text-blue-500" target="_blank" href={nft.image}>{nft.image}</a></h4> 
           </div>
           <div className="flex flex-col ">
             <div className="w-[350px] h-[350px]">
               <Image
                 unoptimized
                 src={nft!.image}
                 alt="Picture of the author"
                 className="rounded-2xl mt-4"
                 layout="responsive"
                 width={350}
                height={350}
               />
              </div>
              <Link href={`/nft/${id}`}>
            <div className="bg-gradient-to-r from-[#1199fa] to-[#11d0fa] rounded-3xl w-[300px] p-3 cursor-pointer mx-auto my-3">
              <h4 className="text-center text-xl">View on market</h4>
            </div>
          </Link>
            </div>
         </div>
      </section>) 
    }  
    </div>
  )
}

export default NFTDetails;