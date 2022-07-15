export type MarketContextType = {
  isLoading: boolean;
};

declare global {
  interface Window {
    ethereum: ExternalProvider | JsonRpcFetchFunc;
  }
}
