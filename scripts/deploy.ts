import { ethers } from "hardhat";

async function main() {
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const market = await NFTMarket.deploy();
  await market.deployed();

  console.log("Market deployed to:", market.address);

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(market.address);
  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Market deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// NFT deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
