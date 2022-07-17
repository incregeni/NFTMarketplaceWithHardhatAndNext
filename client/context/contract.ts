import { ethers } from "ethers";
import { marketAbi, marketAddress, nftAbi, nftAddress } from "../utils";

export const getMarketContract = (
  ethereum:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const marketContract = new ethers.Contract(marketAddress, marketAbi, signer);
  return marketContract;
};

export const getNFTContract = (
  ethereum:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
  return nftContract;
};
