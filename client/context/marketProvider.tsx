import { Contract, providers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  MarketContext,
  getMarketContract,
  getNFTContract,
  getListingFee,
  fetchMarketItems,
  getItems,
  IItem,
} from "./index";
import { connect } from "./walletConnection";
interface Props {
  children: JSX.Element | JSX.Element[];
}

type InitialStateType = {
  marketContract: Contract;
  nftContract: Contract;
  account: string;
  web3Provider: providers.Web3Provider;
};

export const MarketProvider = ({ children }: Props) => {
  const [marketContract, setMarketContract] = useState<Contract | null>(null);
  const [nftContract, setNftContract] = useState<Contract | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [web3Provider, setWeb3Provider] = useState<
    providers.Web3Provider | undefined
  >(undefined);
  const [signer, setSigner] = useState<string | undefined>(undefined);
  const [NFTMarketItems, setNFTMarketItems] = useState<IItem[] | []>([]);
  const [NFTFilterItems, setNFTFilterItems] = useState<IItem[] | []>([]);
  const [totalNFTItems, setTotalNFTItems] = useState(0);
  const [limitNFTItems, setLimitNFTItems] = useState(6);
  const [offSetNFTItems, setOffSetNFTItems] = useState(0);

  const router = useRouter();
  
  const providerEvents = () => {
    window.ethereum.on("accountsChanged", async () => {
       setIsConnected(false)
       setWeb3Provider(undefined);
       setNftContract(null);
       setMarketContract(null);
      router.push('/');
    });
  
  };

  const connectWallet = async () => {
    try {
      if (
        typeof window != "undefined" &&
        typeof window.ethereum != "undefined" && window.ethereum.isMetaMask
      ) {
        const web3Provider = await connect();
        if (!web3Provider) {
          toast.error("An error was ocurred when try to connect your wallet");
          return;
        }
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 31337 && chainId !== 80001) {
          window.alert(
            "Change your network to Mumbai Testnet or Local HardHat"
          );
          throw new Error(
            "Change your network to Mumbai Testnet or Local HardHat"
          );
        }
        const signer = web3Provider.getSigner();
        const accounts = await signer.provider.listAccounts();
        const marketContract = await getMarketContract(web3Provider, signer);
        const nftContract = await getNFTContract(web3Provider, signer);
        setInitialState({ web3Provider, account: accounts[0], marketContract, nftContract });
      } else {
        toast.info("Please install metamask!");
      }
    } catch (error) {
      console.error(" error", error);
      toast.error("An error was ocurred when try to connect your wallet");
    }
  };

  const setInitialState = async ({
    marketContract,
    nftContract,
    account,
    web3Provider
  }: InitialStateType) => {
    setWeb3Provider(web3Provider);
    setSigner(account);
    setIsConnected(true);
    setMarketContract(marketContract);
    setNftContract(nftContract);
    providerEvents();
  };

  const getMarketPlaceItems = async () => {
    if(!marketContract || !nftContract) return;
    const [nfts, offset, total] = await fetchMarketItems({marketContract: marketContract, offSet: offSetNFTItems, limit: limitNFTItems });
    const genItems = await getItems(nftContract, nfts);
    await setNFTMarketItems((prev:IItem[]) => {
      return  [...prev, ...genItems]
    });
    setTotalNFTItems(parseInt(total.toString()));
    setOffSetNFTItems(parseInt(offset.toString()));
  } 
  
  useEffect(() => {
    setNFTFilterItems(prev =>  NFTMarketItems)
  },[NFTMarketItems]);

  const filterNFT = (searchText:string) => {
    const filtered = NFTMarketItems.filter((nft:IItem) => nft.name.includes(searchText))
    setNFTFilterItems([...filtered]);
  }

  return (
    <MarketContext.Provider
      value={{
        isConnected,
        web3Provider,
        signer,
        nftContract,
        marketContract,
        NFTMarketItems,
        NFTFilterItems,
        totalNFTItems,
        offSetNFTItems,
        filterNFT,
        getMarketPlaceItems,
        getListingFee,
        connectWallet,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};
