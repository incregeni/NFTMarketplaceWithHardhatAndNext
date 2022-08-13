import axios from "axios";
import { BigNumber, Contract, ethers } from "ethers";
import { IItem, IMetaData } from "../interfaces";

export const getListingFee = async (
  marketContract: Contract
): Promise<string> => {
  const listingFee = await marketContract.getListingFee();
  return listingFee.toString();
};

export const getNFTBySeller = async (marketContract: Contract) => {
  return await marketContract.getNFTBySeller();
};

export const getNFTByOwner = async (marketContract: Contract) => {
  return await marketContract.getNFTByOwner();
};

export const fetchMarketItems = async ({
  marketContract,
  offSet,
  limit,
}: {
  marketContract: Contract;
  offSet: number;
  limit: number;
}) => {
  return await marketContract.fetchMarketItems(offSet, limit);
};

export const getMarketItems = async ({
  marketContract,
}: {
  marketContract: Contract;
}) => {
  return await marketContract.getMarketItems();
};

export const getItems = async (
  nftContract: Contract,
  data: any[]
): Promise<IItem[]> => {
  const items: IItem[] = await Promise.all(
    data.map(async (i: IItem) => {
      return await generateItem(i, nftContract);
    })
  );
  return items;
};

export const generateItem = async (
  item: IItem,
  nftContract: Contract
): Promise<IItem> => {
  const tokenUri = await nftContract.tokenURI(item.tokenId);
  const [path, file] = tokenUri.slice(7).split("/");
  const ipfsUri = `https://${path}.ipfs.dweb.link/${file}`;
  const meta = await axios.get(ipfsUri);
  const price = ethers.utils.formatUnits(item.price.toString(), "ether");
  const { name, description, image }: IMetaData = meta.data;
  return {
    itemId: item.itemId,
    price,
    tokenId: item.tokenId,
    seller: item.seller,
    owner: item.owner,
    sold: item.sold,
    image: `https://ipfs.io/ipfs/${image.slice(7)}`,
    description,
    name,
    createAt: item.createAt.toString(),
  };
};

export const getSoldNFT = (items: IItem[]): IItem[] => {
  return items.filter((item: IItem) => item.sold);
};

export const buyNFT = async ({
  marketContract,
  nftContract,
  itemId,
  price,
}: {
  marketContract: Contract;
  nftContract: Contract;
  itemId: string;
  price: BigNumber;
}): Promise<boolean | null> => {
  try {
    const transaction = await marketContract.buyNFT(
      nftContract.address,
      itemId,
      {
        value: price,
      }
    );

    const tx = await transaction.wait();
    console.log("TX >>> ", tx);
    return true;
  } catch (error) {
    console.log("error tx ", error);
    return null;
  }
};
