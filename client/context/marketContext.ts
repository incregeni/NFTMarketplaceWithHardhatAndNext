import { Contract } from "ethers";
import { createContext } from "react";
import { IMarketContext } from "./index";

export const contextDefaultValues: IMarketContext = {
  isLoading: false,
  isConnected: false,
  web3Provider: undefined,
  signer: undefined,
  nftContract: null,
  marketContract: null,
  getListingFee(marketContract: Contract): Promise<string> {
    return new Promise(() => "");
  },
  connectWallet() {},
};

export const MarketContext =
  createContext<IMarketContext>(contextDefaultValues);
