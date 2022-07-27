import { Contract, providers } from "ethers";
import { IItem } from "./INFT";

export interface IMarketContext {
  isConnected: boolean;
  web3Provider: providers.Web3Provider | undefined;
  signer: string | undefined;
  nftContract: Contract | null;
  marketContract: Contract | null;
  connectWallet: () => void;
  getListingFee: (marketContract: Contract) => Promise<string>;
}
