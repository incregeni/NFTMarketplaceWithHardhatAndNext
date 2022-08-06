//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error NFTMarket__Price(string message);
error NFTMarket__ListingFee(uint256 requiered, string message);
error NFTMarket__SetListingFee(string message);
error NFTMarket__ItemId(string message);

contract NFTMarket is ReentrancyGuard {
    event marketItemNFT(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        uint256 createAt,
        bool sold
    );

    using Counters for Counters.Counter;
    Counters.Counter private s_itemIds;
    Counters.Counter private s_itemsSold;

    address payable private s_owner;
    uint256 private s_listingFee;

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        uint256 createAt;
        bool sold;
    }

    mapping(uint256 => MarketItem) private s_MarketItems;

    constructor() {
        s_owner = payable(msg.sender);
        s_listingFee = 0.0025 ether;
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        if (price <= 0)
            revert NFTMarket__Price({message: "Price must be above zero"});
        if (msg.value != s_listingFee)
            revert NFTMarket__ListingFee({
                requiered: s_listingFee,
                message: "Price must be equal to listing price"
            });

        s_itemIds.increment();
        uint256 itemId = s_itemIds.current();
        uint256 createAt = block.timestamp;

        s_MarketItems[itemId] = MarketItem({
            itemId: itemId,
            nftContract: nftContract,
            tokenId: tokenId,
            seller: payable(msg.sender),
            owner: payable(address(0)),
            price: price,
            createAt: createAt,
            sold: false
        });

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit marketItemNFT(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            createAt,
            false
        );
    }

    function buyNFT(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = s_MarketItems[itemId].price;
        uint256 tokenId = s_MarketItems[itemId].tokenId;
        if (msg.value != price)
            revert NFTMarket__Price({
                message: "Please submit the asking price in order to complete purchase"
            });
        s_MarketItems[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        s_MarketItems[itemId].owner = payable(msg.sender);
        s_MarketItems[itemId].sold = true;
        s_itemsSold.increment();
        payable(s_owner).transfer(s_listingFee);
        emit marketItemNFT(
            itemId,
            nftContract,
            tokenId,
            s_MarketItems[itemId].seller,
            msg.sender,
            price,
            s_MarketItems[itemId].createAt,
            true
        );
    }

    function getMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemsCount = s_itemIds.current();
        uint256 unsoldItemsCount = itemsCount - s_itemsSold.current();
        MarketItem[] memory items = new MarketItem[](unsoldItemsCount);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemsCount; i++) {
            if (!s_MarketItems[i + 1].sold) {
                uint256 currentItemId = s_MarketItems[i + 1].itemId;
                MarketItem storage marketItem = s_MarketItems[currentItemId];
                items[currentIndex] = marketItem;
                currentIndex++;
            }
        }

        return items;
    }

    function getNFTByOwner() public view returns (MarketItem[] memory) {
        uint256 totalItemsCount = s_itemIds.current();
        uint256 itemCount = getItemOwnerCount(totalItemsCount);
        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemsCount; i++) {
            if (s_MarketItems[i + 1].owner == msg.sender) {
                uint256 currentId = s_MarketItems[i + 1].itemId;
                MarketItem storage currentItem = s_MarketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function getNFTBySeller() public view returns (MarketItem[] memory) {
        uint256 totalItemsCount = s_itemIds.current();
        uint256 itemCount = getItemSellerCount(totalItemsCount);
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemsCount; i++) {
            if (s_MarketItems[i + 1].seller == msg.sender) {
                uint256 currentId = s_MarketItems[i + 1].itemId;
                MarketItem storage currentItem = s_MarketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function getItemOwnerCount(uint256 totalItemsCount)
        private
        view
        returns (uint256)
    {
        uint256 itemCount = 0;
        for (uint256 i = 0; i < totalItemsCount; i++) {
            if (s_MarketItems[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        return itemCount;
    }

    function getItemSellerCount(uint256 totalItemsCount)
        private
        view
        returns (uint256)
    {
        uint256 itemCount = 0;
        for (uint256 i = 0; i < totalItemsCount; i++) {
            if (s_MarketItems[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
        return itemCount;
    }

    function getOwner() public view returns (address) {
        return s_owner;
    }

    function getListingFee() public view returns (uint256) {
        return s_listingFee;
    }

    function setListingFee(uint256 _price) public {
        if (msg.sender != s_owner)
            revert NFTMarket__SetListingFee({message: "Premission denied"});
        s_listingFee = _price;
    }

    function getItemById(uint256 _id) public view returns (MarketItem memory) {
        if (_id < 1 && _id > s_itemIds.current())
            revert NFTMarket__ItemId({message: "Premission denied"});
        return s_MarketItems[_id];
    }

    function fetchMarketItems(uint256 offset, uint256 limit)
        public
        view
        returns (
            MarketItem[] memory,
            uint256 nextOffset,
            uint256 total
        )
    {
        uint256 itemsCount = s_itemIds.current();
        uint256 unsoldItemsCount = itemsCount - s_itemsSold.current();

        if (limit == 0) {
            limit = 1;
        }

        if (limit > unsoldItemsCount - offset) {
            limit = unsoldItemsCount - offset;
        }

        MarketItem[] memory items = new MarketItem[](limit);

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemsCount && currentIndex < limit; i++) {
            if (!s_MarketItems[offset + i + 1].sold) {
                uint256 currentItemId = s_MarketItems[offset + i + 1].itemId;
                MarketItem storage marketItem = s_MarketItems[currentItemId];
                items[currentIndex] = marketItem;
                currentIndex++;
            }
        }
        return (items, offset + limit, unsoldItemsCount);
    }

    function fetchMarketItemsByTime(uint256 time, uint256 limit)
        public
        view
        returns (MarketItem[] memory)
    {
        uint256 itemsCount = s_itemIds.current();
        uint256 unsoldItemsCount = itemsCount - s_itemsSold.current();
        uint256 offset = unsoldItemsCount - 2;
        if (limit == 0) {
            limit = 1;
        }

        if (limit > unsoldItemsCount - offset) {
            limit = unsoldItemsCount - offset;
        }

        MarketItem[] memory items = new MarketItem[](limit);

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemsCount && currentIndex < limit; i++) {
            if (!s_MarketItems[offset + i + 1].sold) {
                uint256 currentItemId = s_MarketItems[offset + i + 1].itemId;
                MarketItem storage marketItem = s_MarketItems[currentItemId];
                if (
                    time == 0 ||
                    (marketItem.createAt <= block.timestamp &&
                        marketItem.createAt >= time)
                ) {
                    items[currentIndex] = marketItem;
                    currentIndex++;
                }
            }
        }
        return items;
    }
}
