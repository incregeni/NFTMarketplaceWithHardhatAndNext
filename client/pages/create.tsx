import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { MarketContext } from '../context'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { nftAddress } from '../utils'
import { useRouter } from 'next/router'

const options = {
  url: 'https://ipfs.infura.io:5001/api/v0'
}

const client = ipfsHttpClient(options);

interface NFTForm  {
  price: string,
  name: string,
  description: string
}

const WalletConnect:NextPage = () => {
  return (
    <div>
      <h2>Please Connect your wallet</h2>
    </div>
  )
}

const Create: NextPage = () => {
  const { signer, isConnected, nftContract, marketContract, getListingFee } = useContext(MarketContext);
  const [fileUrl, setFileUrl] = useState<string>('')
  const [form, setForm] = useState<NFTForm>({price: '', name: '', description:''});
  const [listingFee, setListingFee] = useState('0');
  const router = useRouter();
 
  async function onChange(e:React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return; 
    const file = e.target.files[0]
    try{ 
        const added= await client.add(
           file,
            {
                
                progress: (prog) => console.log(`received: ${prog}`)
            }
        )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log('URL ',added)
      setFileUrl(url)
    }catch(e){
        console.log('Error uploading file: ', e)
    }
}

const createItem = async () => { 
  const {name, description, price} = form;
  if(!name || !description || !price || !fileUrl) {
      return;
  }
  const data = JSON.stringify({
      name, description, image: fileUrl
  });

  try{
      const added = await client.add(data)
    const url = `https://ipfs.infura.io/ipfs/${added.path}`
    createSale(url)
  }catch(error){
      console.log(`Error uploading file: `, error)
  }
}

const createSale = async (url:string) => {
  if(!nftContract || !marketContract) return;
  let transaction = await nftContract.createToken(url);
  let tx = await transaction.wait()

  console.log('NFT Transaction: ',tx)
  console.log('NFT Transaction events: ',tx.events[0])
  let event = tx.events[0]
  let value = event.args[2]
  let tokenId = value.toNumber()

  const price = ethers.utils.parseUnits(form.price, 'ether')
  
  transaction = await marketContract.createMarketItem(
      nftAddress, tokenId, price, { value: listingFee }
  )

  await transaction.wait()

  console.log('MARKET Transaction: ',tx)
  console.log('MARKET Transaction events: ',tx.events[0])

  router.push('/')


}

useEffect(() => {
  if(!marketContract) return;
  (async () => {
    const fee = await getListingFee(marketContract);
    setListingFee(fee);
  })();
},[]);

  return (
    <div className='bg-[#0b1426] text-white'>
      <Head>
        <title>Create NFt</title>
        <meta name="description" content="NFT Create" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
       isConnected ? (
        <div className='mx-auto my-6 flex justify-center items-center'>
          <div className='w-[70%]'>
          <div className="grid grid-cols-[1fr_300px] gap-24 items-center justify-center">
            <div className="flex flex-col pb-12 text-black">
              <h2 className='text-white text-3xl text-center'>Create NFT</h2>
              <input 
                    placeholder="Asset Name"
                    className="mt-8 border rounded p-4"
                    onChange={e => setForm({...form, name: e.target.value})}
                    />
                <textarea
                     placeholder="Asset description"
                     className="mt-2 border rounded p-4"
                     onChange={e => setForm({...form, description: e.target.value})}
                     />
                <input 
                    placeholder="Asset Price in Eth"
                    className="mt-8 border rounded p-4"
                    type="number"
                    onChange={e => setForm({...form, price: e.target.value})}
                    />
                    <input
                        type="file"
                        name="Asset"
                        className="my-4"
                        onChange={onChange}
                    />
                    <button onClick={createItem}
                     className="font-bold mt-4 bg-gradient-to-r from-[#1199fa] to-[#11d0fa]  rounded-md text-white  p-4 shadow-lg"
                     >Create NFT</button>
                     <h5 className='text-white mt-4'>* Listing Price: {ethers.utils.formatEther(listingFee)} eth</h5>
              </div>
              {
                        fileUrl ? ( 
                        <div className='w-[300px] h-[300px]'>
                        <Image
                            src={fileUrl}
                            unoptimized
                            alt="Picture of the author"
                            className="rounded mt-4"
                            layout='responsive'
                            width={300}
                            height={300}
                          />
                        </div>
                         
                         ) : (
                          <div className='flex items-center justify-center w-[300px] h-[300px] rounded-md border-2 border-blue-500'>
                                <h4 className='text-2xl'>Image</h4>
                          </div>
                         )
                    }
          </div>
        </div>
        </div>
       ): <WalletConnect />
      }
    </div>
  )
}

export default Create;
