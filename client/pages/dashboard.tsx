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

  return(
    <div className='bg-gradient py-5'>
      <Head>
        <title>Create NFt</title>
        <meta name="description" content="NFT Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='text-white'>
        <div className='flex items-center justify-evenly text-2xl'>
          <h3>Address: {shortenAddress(signer!)}</h3>
          <h3>Balance: {balance} eth</h3>
        </div>
        <div>
          <div>
            <h2>NFT's</h2>  
          </div>
          <div>
           <button>My NFT</button>
           <button>Sold</button> 
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard;