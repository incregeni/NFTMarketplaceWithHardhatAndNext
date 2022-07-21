import { Contract } from "ethers";

export const getListingFee = async (
  marketContract: Contract
): Promise<string> => {
  const listingFee = await marketContract.getListingFee();
  return listingFee.toString();
};
