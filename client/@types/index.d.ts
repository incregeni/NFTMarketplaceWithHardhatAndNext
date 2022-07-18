import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}
