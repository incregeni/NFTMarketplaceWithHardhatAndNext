import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers, network } from "hardhat";
import { NFT, NFTMarket } from "../typechain-types";

describe("NFTMarket", function () {
  let Market: ContractFactory;
  let market: Contract;
  let NFT: ContractFactory;
  let nft: Contract;
  let deployer: SignerWithAddress;
  let buyer: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let marketDeployedAddress: string;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    buyer = accounts[1];
    Market = await ethers.getContractFactory("NFTMarket");
    market = await Market.deploy();
    await market.deployed();
    marketDeployedAddress = market.address;

    NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy(marketDeployedAddress);
    await nft.deployed();
  });

  describe("constructor", function () {
    it("intitiallizes the nft market correctly", async () => {
      const owner = await market.getOwner();
      assert.equal(owner, deployer.address);
    });
  });

  describe("Listing Fee", function () {
    it("listing fee should be 0.0025 ethers", async () => {
      const listingFee = (await market.getListingFee()).toString();
      const fee = ethers.utils.formatEther(listingFee);
      assert.equal(fee, "0.0025");
    });

    it("set valid listing fee", async () => {
      const price = ethers.utils.parseUnits("0.005", "ether");
      await market.setListingFee(price);
      const listingFee = (await market.getListingFee()).toString();
      const fee = ethers.utils.formatEther(listingFee);
      assert.equal(fee, "0.005");
    });

    it("denied listing fee", async () => {
      const price = ethers.utils.parseUnits("0.005", "ether");
      await expect(
        market.connect(buyer).setListingFee(price)
      ).to.be.revertedWith("NFTMarket__SetListingFee");
    });
  });
});
