import { Contract, ethers } from "ethers";
import { MARKET_CONTRACT, NFT_CONTRACT } from "../utils";

export const getMarketContract = async (
  ethereum:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
): Promise<Contract> => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const { chainId } = await provider.getNetwork();
  if (chainId !== 31337 && chainId !== 80001) {
    window.alert("Change your network to Mumbai Testnet or Local HardHat");
    throw new Error("Change your network to Mumbai Testnet or Local HardHat");
  }
  const key = chainId.toString();
  const marketAddress = MARKET_CONTRACT[key].address;
  const marketAbi = MARKET_CONTRACT[key].abi;
  const signer = provider.getSigner();
  const marketContract = new ethers.Contract(marketAddress, marketAbi, signer);
  return marketContract;
};

export const getNFTContract = async (
  ethereum:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
): Promise<Contract> => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const { chainId } = await provider.getNetwork();
  if (chainId !== 31337 && chainId !== 80001) {
    window.alert("Change your network to Mumbai Testnet or Local HardHat");
    throw new Error("Change your network to Mumbai Testnet or Local HardHat");
  }
  const key = chainId.toString();
  const nftAddress = NFT_CONTRACT[key].address;
  const nftAbi = NFT_CONTRACT[key].abi;
  const signer = provider.getSigner();
  const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
  return nftContract;
};

export const getDefaultMarketContractProvider = async (): Promise<Contract> => {
  console.log(">> DEFAULT");
  const RPC = process.env.RPC;
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const { chainId } = await provider.getNetwork();
  if (chainId !== 31337 && chainId !== 80001) {
    window.alert("Change your network to Mumbai Testnet or Local HardHat");
    throw new Error("Change your network to Mumbai Testnet or Local HardHat");
  }
  const key = chainId.toString();
  const marketAddress = MARKET_CONTRACT[key].address;
  const marketAbi = MARKET_CONTRACT[key].abi;
  const signer = provider.getSigner(process.env.SIGNER);
  const marketContract = new ethers.Contract(marketAddress, marketAbi, signer);
  console.log("KEY ", key);
  return marketContract;
};

export const getDefaultNFTContractProvider = async (): Promise<Contract> => {
  const RPC = process.env.RPC;
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const { chainId } = await provider.getNetwork();
  if (chainId !== 31337 && chainId !== 80001) {
    window.alert("Change your network to Mumbai Testnet or Local HardHat");
    throw new Error("Change your network to Mumbai Testnet or Local HardHat");
  }
  const key = chainId.toString();
  const nftAddress = NFT_CONTRACT[key].address;
  const marketAbi = NFT_CONTRACT[key].abi;
  const signer = provider.getSigner(process.env.SIGNER);
  const nftContract = new ethers.Contract(nftAddress, marketAbi, signer);
  return nftContract;
};
