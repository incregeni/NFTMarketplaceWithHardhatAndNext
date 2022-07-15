import { ethers } from "ethers";
import { marketAbi, marketAddress, nftAbi, nftAddress } from "../utils";

export const getMarketContract = (ethereum: any) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const marketContract = new ethers.Contract(marketAddress, marketAbi, signer);
  return marketContract;
};

export const getNFTContract = (ethereum: any) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
  return nftContract;
};
