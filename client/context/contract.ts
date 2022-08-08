import { Contract, ethers, providers } from "ethers";
import { MARKET_CONTRACT, NFT_CONTRACT } from "../utils";

export const getMarketContract = async (
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  signer: providers.JsonRpcSigner
): Promise<Contract> => {
  const { chainId } = await provider.getNetwork();
  const key = chainId.toString();
  const marketAddress = MARKET_CONTRACT[key].address;
  const marketAbi = MARKET_CONTRACT[key].abi;
  const marketContract = new ethers.Contract(marketAddress, marketAbi, signer);
  return marketContract;
};

export const getNFTContract = async (
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  signer: providers.JsonRpcSigner
): Promise<Contract> => {
  const { chainId } = await provider.getNetwork();
  const key = chainId.toString();
  const nftAddress = NFT_CONTRACT[key].address;
  const nftAbi = NFT_CONTRACT[key].abi;
  const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
  return nftContract;
};
