import { ethers } from "hardhat";
import { writeFileSync } from "fs";
import * as path from "path";

async function main() {
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const market = await NFTMarket.deploy();
  await market.deployed();

  console.log("Market deployed to:", market.address);

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(market.address);
  await nft.deployed();

  console.log("NFT deployed to:", nft.address);

  const marketAbi = {
    address: market.address,
    abi: JSON.parse(market.interface.format("json") as string),
  };

  writeFileSync(
    path.resolve(__dirname, "../client", "constants", "Marketplace-local.json"),
    JSON.stringify(marketAbi, null, 2)
  );

  const nftAbi = {
    address: nft.address,
    abi: JSON.parse(nft.interface.format("json") as string),
  };

  writeFileSync(
    path.resolve(__dirname, "../client", "constants", "NFT-local.json"),
    JSON.stringify(nftAbi, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Market deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// NFT deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
