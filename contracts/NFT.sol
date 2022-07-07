//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private s_tokenIds;

    address s_contractAddress;

    constructor(address _contractAddress) ERC721("Poeta Tokens", "POET") {
        s_contractAddress = _contractAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        s_tokenIds.increment();
        uint256 newItemId = s_tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _setApprovalForAll(s_contractAddress, true);
        return newItemId;
    }
}
