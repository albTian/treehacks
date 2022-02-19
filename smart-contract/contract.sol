// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Factory is CloneFactory {
     NFT[] public nfts;
     address masterContract;

     constructor(address _masterContract){
         masterContract = _masterContract;
     }

     function createChild(string data) external{
        NFT nft = NFT(createClone(masterContract));
        nft.init(data);
        nfts.push(nft);
     }

     function getNfts() external view returns(NFT[] memory){
         return nfts;
     }
}

contract NFT is ERC721, Ownable {
    string public imgAddress;
    constructor() ERC721("MyToken", "MTK") {}

    function _baseURI() internal pure override returns (string memory) {
        return imgAddress;
    }

    function init(string _data) external {
        imgAddress = _data;
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}