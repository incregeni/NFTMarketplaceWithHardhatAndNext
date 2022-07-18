import { createContext } from "react";
import { IMarketContext } from "./index";

export const contextDefaultValues: IMarketContext = {
  isLoading: false,
  isConnected: false,
  signer: undefined,
  connectWallet() {},
};

export const MarketContext =
  createContext<IMarketContext>(contextDefaultValues);
