import { Contract, providers } from "ethers";
import { IItem } from "./INFT";

export interface IMarketContext {
  isLoading: boolean;
  isConnected: boolean;
  web3Provider: providers.Web3Provider | undefined;
  signer: string | undefined;
  nftContract: Contract | null;
  marketContract: Contract | null;
  NFTItems: IItem[];
  soldNFTItems: IItem[];
  connectWallet: () => void;
  getListingFee: (marketContract: Contract) => Promise<string>;
  getNFTItemsBySeller: () => void;
}
