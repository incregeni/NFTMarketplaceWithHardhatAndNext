import { ethers } from "ethers";

export type MarketContextType = {
  isLoading: boolean;
};

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}
