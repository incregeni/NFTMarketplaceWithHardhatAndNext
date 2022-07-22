import { providers } from "ethers";
import { MutableRefObject } from "react";
import Web3Modal from "web3modal";

export const getSignerAndProvider = async (
  web3ModalRef: MutableRefObject<Web3Modal | null>
): Promise<any> => {
  if (web3ModalRef.current) {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    return { provider, signer, web3Provider };
  } else {
    return null;
  }
};
