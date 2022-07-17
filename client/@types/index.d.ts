import { ethers } from "ethers";

export type MarketContextType = {
  isLoading: boolean;
};

export type EtherumType =
  | ethers.providers.ExternalProvider
  | ethers.providers.JsonRpcFetchFunc;
declare global {
  interface Window {
    ethereum: EtherumType;
  }
}
