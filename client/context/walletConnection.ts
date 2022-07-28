import { providers } from "ethers";
import { MutableRefObject } from "react";
import Web3Modal from "web3modal";

export const getSignerAndProvider = async (
  web3ModalRef: MutableRefObject<Web3Modal | null>
): Promise<any> => {
  if (web3ModalRef.current) {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 31337 && chainId !== 80001) {
      window.alert("Change your network to Mumbai Testnet or Local HardHat");
      throw new Error("Change your network to Mumbai Testnet or Local HardHat");
    }
    const signer = web3Provider.getSigner();
    return { provider, signer, web3Provider };
  } else {
    return null;
  }
};
