import { Contract } from 'ethers';
import { useEffect, useState } from 'react' 
import { MarketContext, IMarketContext, getMarketContract, getNFTContract, isWalletConnectedHandler, connectWalletHandler } from './index'
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
  const [signer, setSigner] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  
  const isWalletConnected = async () => {
    const signer = await isWalletConnectedHandler();
    setIsConnected( signer ? true : false);
    setSigner(signer); 
  }

  const connectWallet = async () => {
    const signer = await connectWalletHandler();
    setIsConnected( signer ? true : false);
    setSigner(signer); 
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
