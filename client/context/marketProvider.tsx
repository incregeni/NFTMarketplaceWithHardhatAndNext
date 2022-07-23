import { Contract, ethers, providers } from 'ethers';
import { useEffect, useRef, useState } from 'react' 
import Web3Modal from 'web3modal';
import { MarketContext, getMarketContract, getNFTContract, getListingFee, getItems, getNFTBySeller, getSoldNFT } from './index'
import { IItem } from '../interfaces'
import { getSignerAndProvider } from './walletConnection';
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
  const [NFTItems, setNFTItems] = useState<IItem []>([])
  const [soldNFTItems, setSoldNFTItems] = useState<IItem []>([])
  const [isConnected, setIsConnected] = useState(false);
  const [web3Provider, setWeb3Provider] = useState<providers.Web3Provider | undefined>(undefined);
  const [signer, setSigner] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const web3ModalRef = useRef<Web3Modal | null>(null);
  
  const providerEvents = (
    web3ModalRef: React.MutableRefObject<Web3Modal | null>,
    provider: any
  ) => {
    provider.on("accountsChanged", (accounts: string[]) => {
      console.log(accounts);
      web3ModalRef.current?.clearCachedProvider();
      setIsConnected(false);
    });
  
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId: number) => {
      console.log(chainId);
    });
  
    // Subscribe to provider connection
    provider.on("connect", (info: { chainId: number }) => {
      console.log(info);
    });
  
    // Subscribe to provider disconnection
    provider.on("disconnect", (error: { code: number; message: string }) => {
      console.log(error);
      web3ModalRef.current?.clearCachedProvider();
      setIsConnected(false);
    });
  };

  const isWalletConnected = async () => {
    const cache = web3ModalRef.current?.cachedProvider;
    if(!cache) return;
    const proxy = await web3ModalRef.current?.connectTo(cache!)
    const provider = new ethers.providers.Web3Provider(proxy);
    const accounts =  await provider.listAccounts();
    setIsConnected(true); 
    setSigner(accounts[0]);
    setWeb3Provider(provider);
    providerEvents(web3ModalRef, proxy)
  }

  const connectWallet = async () => {
    try {
      const { signer, provider, Web3Provider } = await getSignerAndProvider(web3ModalRef);
      const accounts = await signer.provider.listAccounts();
      setIsConnected(true)
      setSigner(accounts[0]);
      setWeb3Provider(web3Provider);
      providerEvents(web3ModalRef, provider);
    } catch (error) {
      console.log(" error", error);
    }
  };

  useEffect(() => {
    web3ModalRef.current =  new Web3Modal({
      network: "hadrhatLocal",
      cacheProvider: true,
      providerOptions: {},
      theme: "dark"
    });
  }, []);

  useEffect(() => {
    if(typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      const { ethereum } = window;
      const marketContract = getMarketContract(ethereum);
      const nftContract = getNFTContract(ethereum);
      setInitialState({ marketContract, nftContract });
    } else {
        alert('Please install Metamask!');
    }
     
  },[]);

  const setInitialState = async ( { marketContract, nftContract }:InitialStateType) => {
    setMarketContract(marketContract);
    setNftContract(nftContract);
    await isWalletConnected();   
  } 

  const getNFTItemsBySeller = async () => {
    if(!marketContract) return;
     setIsLoading(true);
     const itemsBySeller = await getNFTBySeller(marketContract!);
     const items = await getItems(nftContract!, itemsBySeller);
     const soldNFT = getSoldNFT(items);
     setNFTItems(items);
     setSoldNFTItems(soldNFT);
     setIsLoading(false);
  }

  return (
    <MarketContext.Provider
      value={{
        isLoading,
        isConnected,
        web3Provider,
        signer,
        nftContract,
        marketContract,
        NFTItems,
        soldNFTItems,
        getListingFee,
        connectWallet,
        getNFTItemsBySeller,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};
