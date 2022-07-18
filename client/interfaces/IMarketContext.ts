export interface IMarketContext {
  isLoading: boolean;
  isConnected: boolean;
  signer: string | undefined;
  connectWallet: () => void;
}
