import { ethers } from "ethers";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../../../components/common";
import { IItem, MarketContext, generateItem } from "../../../context";
import { buyNFT } from "../../../context/marketContract";
import { DATA_URL } from "../../../utils";

const NFTItem:NextPage = () => {
  const {marketContract, nftContract, signer} = useContext(MarketContext);
  const [nft, setNft] = useState<IItem | undefined>(undefined);
  const [active, seActive] = useState(1);
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

  const notify = (message: string) => {
    toast.success(message);
  };

  const buyNft = async () => {
    const price = ethers.utils.parseUnits(nft!.price, "ether")
    const res = await buyNFT({ marketContract: marketContract!, nftContract: nftContract!, itemId: nft!.tokenId, price });
    if(res) {
      notify('Transaction completed!')
      router.push('/dashboard');
    }
  }

  return (
    <div className="bg-gradient text-white p-5">
      <Head>
        <title>NFT {id}</title>
        <meta name="description" content="NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        !nft ? (<Loader className='w-[500px] h-[500px] mx-auto my-0 py-5' size={500} />)  :
        (
        <section className="w-[70%] mx-auto my-0 grid grid-cols-[400px_1fr] items-center justify-center">
           <div className="w-[400px] h-[400px]">
          <Image
            unoptimized
            src={nft!.image}
            alt="Picture of the author"
            className="rounded-2xl mt-4"
            layout="responsive"
            width={400}
            height={400}
            blurDataURL={DATA_URL}
            placeholder="blur"
          />
        </div>
        <div className="self-start justify-center pt-[40px] pl-[50px]">
          <div className="flex flex-row">
            <div className="w-[50px] h-[50px] border-2 rounded-full border-blue-500">
              <Image 
                unoptimized
                src={`https://joeschmoe.io/api/v1/${nft.seller}`}
                alt="avatar"
                className="rounded-full"
                layout="responsive"
                width={40}
                height={40}
              />
           </div> 
           <h5 className="text-gray-400 items-start px-3">Creator</h5>
          </div>  
            <h2 className="text-3xl py-3">{nft.name}</h2>
            <h2 className="text-4xl py-3">$ {nft.price} eth</h2>
            <div className="flex items-center justify-start pt-5">
              <ul className="flex flex-row gap-5 text-lg">
                <li className={`cursor-pointer ${ active === 1 ? 'border-b-4 border-b-blue-700' : ''}`} onClick={() => seActive(1)}>Ownership</li>
                <li className={`cursor-pointer ${ active === 2 ? 'border-b-4 border-b-blue-700' : ''}`} onClick={() => seActive(2)}>Creator</li>
              </ul>
              </div>
                { active === 1 ? (
                  <div className="pt-3">
                    { nft.sold ? (
                      <div className="flex items-center justify-start py-3">
                      <div className="w-[50px] h-[50px] border-2 rounded-full border-blue-500">
                        <Image 
                          unoptimized
                          src={`https://joeschmoe.io/api/v1/${nft.owner}`}
                          alt="avatar"
                          className="rounded-full"
                          layout="responsive"
                          width={40}
                          height={40}
                        />
                     </div>
                      <h4 className="text-xl px-1">{nft.owner}</h4>
                   </div>) : (<h3>Has no owner</h3>)}
                  </div>         
                ): (
                  <div className="flex items-center justify-start py-3">
                  <div className="w-[50px] h-[50px] border-2 rounded-full border-blue-500">
                    <Image 
                      unoptimized
                      src={`https://joeschmoe.io/api/v1/${nft.seller}`}
                      alt="avatar"
                      className="rounded-full"
                      layout="responsive"
                      width={40}
                      height={40}
                    />
                 </div>
                  <h4 className="text-xl px-5">{nft.seller}</h4>
                  </div>
                )}
        </div>
        <div className="py-3 flex flex-col gap-4">
          <Link href={`/nft/${id}/details`}>
            <div className="border-2 border-white rounded-md w-[400px] p-4 cursor-pointer">
              <h4 className="text-center text-xl">Details</h4>
            </div>
          </Link>
          { (!nft.sold && nft.seller !== signer) && (
            <div className="bg-gradient-to-r from-[#1199fa] to-[#11d0fa] rounded-md w-[400px] p-4 cursor-pointer flex justify-center">
              <button className="bold text-xl" onClick={buyNft}>Buy</button>
            </div>) 
          }
        </div>
        </section>
        
        )
      }
      
    </div>
  )
}

export default NFTItem;