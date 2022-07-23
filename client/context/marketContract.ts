import axios from "axios";
import { Contract, ethers } from "ethers";
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

export const getItems = async (
  nftContract: Contract,
  data: any[]
): Promise<IItem[]> => {
  const items: IItem[] = await Promise.all(
    data.map(async (i: IItem) => {
      console.log("ITEM:: ", i);
      const tokenUri = await nftContract.tokenURI(i.tokenId);
      console.log("token ", tokenUri);
      const meta = await axios.get(tokenUri);
      console.log(meta);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
      const { name, description, image }: IMetaData = meta.data;
      return {
        itemId: i.itemId,
        price,
        tokenId: i.tokenId,
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image,
        description,
        name,
      };
    })
  );
  return items;
};

export const getSoldNFT = (items: IItem[]): IItem[] => {
  return items.filter((item: IItem) => item.sold);
};
