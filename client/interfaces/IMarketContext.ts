import { Contract } from "ethers";

export interface IMarketContext {
  isLoading: boolean;
  isConnected: boolean;
  signer: string | undefined;
  nftContract: Contract | null;
  marketContract: Contract | null;
  connectWallet: () => void;
}
