import { Contract } from 'ethers';
import { useEffect, useState } from 'react' 
import { MarketContext, MarketContextType, getMarketContract, getNFTContract } from './index'
import { EtherumType } from '../@types'
interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MarketProvider = ({ children }: Props) => {
  const [ethereum, setEthereum] = useState<EtherumType | null>(null);
  const [marketContract, setMarketContract] = useState<Contract | null>(null);
  const [nftContract, setNftContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if(typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      const { ethereum } = window;
      const marketContract = getMarketContract(ethereum);
      const nfContract = getNFTContract(ethereum);
      setEthereum(ethereum);
      setMarketContract(marketContract);
      setNftContract(nfContract);   
    } else {
        alert('Please install Metamask!');
    }
     
  },[]);

  return (
    <MarketContext.Provider
      value={{
        isLoading,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};
