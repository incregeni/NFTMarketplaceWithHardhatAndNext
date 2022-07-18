import { Contract } from 'ethers';
import { useEffect, useState } from 'react' 
import { MarketContext, IMarketContext, getMarketContract, getNFTContract } from './index'
interface Props {
  children: JSX.Element | JSX.Element[];
}

type InitialStateType = {
  marketContract:Contract; 
  nftContract: Contract;
}

export const MarketProvider = ({ children }: Props) => {
  const [marketContract, setMarketContract] = useState<Contract | null>(null);
  const [nftContract, setNftContract] = useState<Contract | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setSigner(accounts[0]);
        setIsConnected(true);
        
      } else {
        console.log('No accounts found')
      }
    } catch (error) {
      console.log(error);
      setIsConnected(false);
      throw new Error('No ethereum object');
    }
  }

  const connectWallet = async () => {
      try {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setSigner(accounts[0]);
    } catch (error) {
      console.log(error);
      await window.ethereum.request({
        method: "wallet_requestPermissions",
          params: [
            {
                eth_accounts: {}
            }
        ]
      });
      setIsConnected(false);
      throw new Error('No ethereum object');
    }
  }

  useEffect(() => {
    if(typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      setHasMetamask(true);
      const { ethereum } = window;
      const marketContract = getMarketContract(ethereum);
      const nftContract = getNFTContract(ethereum);
      setInitialState({ marketContract, nftContract });
    } else {
        alert('Please install Metamask!');
        setHasMetamask(false);
    }
     
  },[]);

  const setInitialState = async ( { marketContract, nftContract }:InitialStateType) => {
    setMarketContract(marketContract);
    setNftContract(nftContract);
    await isWalletConnected();   
  } 

  return (
    <MarketContext.Provider
      value={{
        isLoading,
        isConnected,
        signer,
        connectWallet,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};
