export interface IItem {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  sold: string;
  image: string;
  name: string;
  description: string;
}

export interface INFTToken {
  price: string;
  description: string;
  name: string;
  image: string;
}

export interface IMetaData {
  name: string;
  description: string;
  image: string;
}
