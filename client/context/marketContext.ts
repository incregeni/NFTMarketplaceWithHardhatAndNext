import { Contract } from "ethers";
import { createContext } from "react";
import { IMarketContext } from "./index";

export const contextDefaultValues: IMarketContext = {
  isConnected: false,
  web3Provider: undefined,
  signer: undefined,
  nftContract: null,
  marketContract: null,
  NFTFilterItems: [],
  totalNFTItems: 0,
  offSetNFTItems: 0,
  getMarketPlaceItems() {},
  filterNFT(searchText: string) {},
  getListingFee(marketContract: Contract): Promise<string> {
    return new Promise(() => "");
  },
  connectWallet() {},
};

export const MarketContext =
  createContext<IMarketContext>(contextDefaultValues);
