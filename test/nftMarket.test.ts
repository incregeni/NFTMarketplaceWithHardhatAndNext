import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("NFTMarket", function () {
  let Market: ContractFactory;
  let market: Contract;
  let NFT: ContractFactory;
  let nft: Contract;
  let deployer: SignerWithAddress;
  let buyer: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let marketDeployedAddress: string;
  let nftContractAddress: string;

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
    nftContractAddress = nft.address;
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

  describe("create Market Item", function () {
    it("nft should be created", async () => {
      const listingFee = (await market.getListingFee()).toString();
      const auctionPrice = ethers.utils.parseUnits("2", "ether");

      await nft.createToken("https://www.mytokenlocation.com");

      await expect(
        market.createMarketItem(nftContractAddress, 1, auctionPrice, {
          value: listingFee,
        })
      ).to.emit(market, "marketItemNFT");
    });
  });

  describe("buy NFT", function () {
    it("NFT must be sold", async () => {
      const listingFee = (await market.getListingFee()).toString();
      const auctionPrice = ethers.utils.parseUnits("2", "ether");

      await nft.createToken("https://www.mytokenlocation.com");
      await nft.createToken("https://www.mytokenlocation.com");
      await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
        value: listingFee,
      });
      await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
        value: listingFee,
      });

      const marketBuyer = await market.connect(buyer);
      await expect(
        marketBuyer.buyNFT(nftContractAddress, 1, { value: auctionPrice })
      ).to.emit(market, "marketItemNFT");
    });
  });

  describe("Get Market Items", function () {
    it("should be list all items", async () => {
      const listingFee = (await market.getListingFee()).toString();
      const auctionPrice = ethers.utils.parseUnits("2", "ether");

      await nft.createToken("https://www.mytokenlocation.com");
      await nft.createToken("https://www.mytokenlocation.com");
      await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
        value: listingFee,
      });
      await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
        value: listingFee,
      });

      let items = await market.connect(buyer).getMarketItems();

      items = await Promise.all(
        items.map(async (item: any) => {
          const tokenUri = await nft.tokenURI(item.tokenId);

          return {
            price: item.price.toString(),
            tokenId: item.tokenId.toString(),
            seller: item.seller,
            owner: item.owner,
            tokenUri,
          };
        })
      );
      assert(items.length, "2");
    });
  });

  describe("get NFT By Owner", function () {
    it("should be list owner items", async () => {
      const listingFee = (await market.getListingFee()).toString();
      const auctionPrice = ethers.utils.parseUnits("2", "ether");

      await nft.createToken("https://www.mytokenlocation.com");
      await nft.createToken("https://www.mytokenlocation.com");
      await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
        value: listingFee,
      });
      await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
        value: listingFee,
      });

      const tx = await market
        .connect(buyer)
        .buyNFT(nftContractAddress, 1, { value: auctionPrice });
      await tx.wait();

      let items = await market.connect(buyer).getNFTByOwner();

      items = await Promise.all(
        items.map(async (item: any) => {
          const tokenUri = await nft.tokenURI(item.tokenId);

          return {
            price: item.price.toString(),
            tokenId: item.tokenId.toString(),
            seller: item.seller,
            owner: item.owner,
            tokenUri,
          };
        })
      );
      assert(items[0].owner, buyer.address);
    });
  });

  describe("get NFT By Seller", function () {
    it("should be list seller items", async () => {
      const listingFee = (await market.getListingFee()).toString();
      const auctionPrice = ethers.utils.parseUnits("2", "ether");

      await nft.createToken("https://www.mytokenlocation.com");
      await nft.createToken("https://www.mytokenlocation.com");
      await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
        value: listingFee,
      });
      await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
        value: listingFee,
      });

      const tx = await market
        .connect(buyer)
        .buyNFT(nftContractAddress, 1, { value: auctionPrice });
      await tx.wait();

      let items = await market.getNFTBySeller();

      items = await Promise.all(
        items.map(async (item: any) => {
          const tokenUri = await nft.tokenURI(item.tokenId);

          return {
            price: item.price.toString(),
            tokenId: item.tokenId.toString(),
            seller: item.seller,
            owner: item.owner,
            tokenUri,
          };
        })
      );
      assert(items.length, "1");
    });
  });
});
