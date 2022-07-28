import { ethers, network } from "hardhat";
import { writeFileSync, readFileSync } from "fs";
import * as path from "path";

async function main() {
  const chainId = network.config.chainId;
  console.log("chain", chainId);
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const market = await NFTMarket.deploy();
  await market.deployed();

  console.log("Market deployed to:", market.address);

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(market.address);
  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
  const marketJson = JSON.parse(
    readFileSync(
      path.resolve(__dirname, "../client", "lib", "Marketplace.json"),
      "utf8"
    )
  );

  const marketAbi = {
    address: market.address,
    abi: JSON.parse(market.interface.format("json") as string),
  };

  marketJson[chainId!.toString()] = marketAbi;

  writeFileSync(
    path.resolve(__dirname, "../client", "lib", "Marketplace.json"),
    JSON.stringify(marketJson, null, 2)
  );

  const nftJson = JSON.parse(
    readFileSync(
      path.resolve(__dirname, "../client", "lib", "NFT.json"),
      "utf8"
    )
  );

  const nftAbi = {
    address: nft.address,
    abi: JSON.parse(nft.interface.format("json") as string),
  };

  nftJson[chainId!.toString()] = nftAbi;

  writeFileSync(
    path.resolve(__dirname, "../client", "lib", "NFT.json"),
    JSON.stringify(nftJson, null, 2)
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

//chain 80001
//Market deployed to: 0x2D0b827Ca7ee5d173A45AeE7663ed90cD1Fbf156
//NFT deployed to: 0x424C5495DF69a4d5448b777Af291a645fdaB777f
