import { providers } from "ethers";
import Web3Modal from "web3modal";

export const connect = async (): Promise<
  providers.Web3Provider | undefined
> => {
  try {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {},
      theme: "dark",
    });
    const web3ModalInstance = await web3Modal.connect();
    const web3ModalProvider = new providers.Web3Provider(web3ModalInstance);
    if (web3ModalProvider) {
      return web3ModalProvider;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Wallet conn: ", error);
    return undefined;
  }
};
