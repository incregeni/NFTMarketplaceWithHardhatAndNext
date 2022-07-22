import { Contract, providers } from "ethers";

export interface IMarketContext {
  isLoading: boolean;
  isConnected: boolean;
  web3Provider: providers.Web3Provider | undefined;
  signer: string | undefined;
  nftContract: Contract | null;
  marketContract: Contract | null;
  connectWallet: () => void;
  getListingFee: (marketContract: Contract) => Promise<string>;
}
