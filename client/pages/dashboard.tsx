import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { MarketContext } from '../context'
import { shortenAddress } from '../utils'


const Dashboard:NextPage = () => {
  const {signer, web3Provider } = useContext(MarketContext);
  const [balance, setBalance] = useState<string>('0');
  useEffect(() =>{
   (async () => {
      const bal = await web3Provider?.getBalance(signer!); 
      if(bal)
        setBalance(parseFloat(ethers.utils.formatEther(bal)).toFixed(2))
   })()
  },[balance]);

  const myNFT = () => {

  }

  const NFTSold = () => {

  }

  return(
    <div className='bg-gradient py-5'>
      <Head>
        <title>Create NFt</title>
        <meta name="description" content="NFT Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='text-white grid grid-cols-[30%_70%] w-[80vw] items-center justify-center my-0 mx-auto'>
        <div className='flex flex-col items-center justify-evenly text-xl'>
          <h3 className='py-2'>Address: {shortenAddress(signer!)}</h3>
          <h3 className='py-2'>Balance: {balance} eth</h3>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='py-4'>
            <h2 className='text-3xl text-pink-600 text-center py-3'>NFT's</h2>  
            <hr className='bg-pink-400' />
          </div>
          <div className='flex items-center justify-evenly'>
           <button className='p-1 w-[120px] border-2 border-blue-600 rounded-3xl hover:bg-gradient-to-r from-[#1199fa] to-[#11D2FA]' onClick={myNFT}>My NFT</button>
           <button className='p-1 w-[120px] border-2 border-blue-600 rounded-3xl hover:bg-gradient-to-r from-[#1199fa] to-[#11D2FA]' onClick={NFTSold}>Sold</button> 
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard;