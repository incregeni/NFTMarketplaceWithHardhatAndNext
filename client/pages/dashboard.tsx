import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import { FC, useContext, useEffect, useState } from 'react'
import { getItems, getNFTBySeller, getSoldNFT, IItem, MarketContext } from '../context'
import { shortenAddress } from '../utils'
import { NFTCardItems } from '../components'
import { Loader } from '../components/common'
import { ButtonGroup, ButtonGroupItemType } from '../components/common/buttonGroup'
import { getNFTByOwner } from '../context/marketContract'

const NFTButtonGroup:ButtonGroupItemType[] = [
  { id: 'creation-button-1', title: 'Creations', active: true },
  { id: 'sale-button-2', title: 'Sales', active: false },
  { id: 'shopping-button-3', title: 'Shopping', active: false },
]
interface INFTComponent {
  NFTs: IItem[],
  title: string
}

const NFTS:FC<INFTComponent> = ({ NFTs, title }) => {
  return (
    <div>
      <h4 className='text-xl text-blue-500'>{title}</h4>
       { <NFTCardItems items={NFTs ? NFTs : []}/> }
    </div>  
  )

}

const Dashboard:NextPage = () => {
  const {signer, marketContract, nftContract, web3Provider } = useContext(MarketContext);
  const [isLoading, setIsLoading] = useState(false);
  const [nftButtons, setNftButtons] = useState<ButtonGroupItemType[]>(NFTButtonGroup);
  const [balance, setBalance] = useState<string>('0');
  const [currentNFTItems, setCurrentNFTItems] = useState<IItem[]>([]);
  const [NFTItems, setNFTItems] = useState<IItem[]>([]);
  const [shoppingNFTItems, setShoppingNFTItems] = useState<IItem[] | null>(null);
  const [title, setTitle] = useState('My Creations');
  
  useEffect(() =>{
   (async () => {
      const bal = await web3Provider?.getBalance(signer!); 
      if(bal)
        setBalance(parseFloat(ethers.utils.formatEther(bal)).toFixed(2))
   })()
  },[balance, signer]);

  useEffect(()=> {
     getNFTs() 
  },[signer, marketContract, nftContract]);
  
  const getNFTs = async () => {
     if(!marketContract) return;
     setIsLoading(true);
     const itemsBySeller = await getNFTBySeller(marketContract!);
     const items = await getItems(nftContract!, itemsBySeller);
     setNFTItems(items);
     setIsLoading(false);
     setCurrentNFTItems(items);
  }

  const getOwnerNFTs = async () => {
    if(!marketContract) return;
    if(!shoppingNFTItems) {
      setIsLoading(true);
      const itemsByOwner = await getNFTByOwner(marketContract!);
      const items = await getItems(nftContract!, itemsByOwner);
      setShoppingNFTItems(items);
      setIsLoading(false);
      setCurrentNFTItems(items);
    } else {
        setCurrentNFTItems(shoppingNFTItems);
    }
 }

  const getMySales = () => {
    return getSoldNFT(NFTItems);
  }

  const handleButtonGroup = (item:ButtonGroupItemType) => (ev:React.MouseEvent) => {
    const items = nftButtons.map(i => {
      if(item.id === i.id) {
        i.active = true;
      } else {
        i.active = false;
      }
      return i;
    });
    setNftButtons(items);
    showNFT();
  }

  const showNFT = () => {
    const item = nftButtons.filter(i => i.active)[0];
    switch(item.id) {
      case 'creation-button-1':
        setCurrentNFTItems(NFTItems);
        setTitle('My Creations');
        break;
      case 'sale-button-2':
        setCurrentNFTItems(getMySales());
        setTitle('My Sales');
        break;
      default:
        getOwnerNFTs();
        setTitle('My Shopping')    
    }
  }
  
  return(
    <div className='bg-gradient py-5'>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="NFT Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='bg-gradient text-white grid grid-cols-[30%_70%] w-[80vw] items-center justify-center my-0 mx-auto'>
        <div className='flex flex-col items-center justify-evenly text-xl'>
          <h3 className='py-2'>Address: {signer && shortenAddress(signer!)}</h3>
          <h3 className='py-2'>Balance: {balance} eth</h3>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='py-4'>
            <h2 className='text-3xl text-pink-600 text-center py-3'>NFT's</h2>  
            <hr className='bg-pink-400' />
          </div>
          <div className='flex items-center justify-center'>
            <ButtonGroup items={nftButtons} handleButtonGroup={handleButtonGroup} />
          </div>
        </div>
      </section>
      <div className='bg-gradient text-white flex items-center justify-center pt-5'>
      { isLoading ? <Loader className='w-[200px] h-[200px]' size={300} />  : <NFTS NFTs={currentNFTItems} title={title}/>  }
      </div>
    </div>
  )
}

export default Dashboard;