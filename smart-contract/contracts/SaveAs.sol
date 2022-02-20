// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

import "hardhat/console.sol";
import "base64-sol/base64.sol";

contract SaveAs is
    Initializable,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() payable initializer {
        initialize();
    }

    function initialize() public initializer {
        __ERC721_init("SaveAs", "MTK");
        __ERC721URIStorage_init();
        __Ownable_init();
    }

    // Either process on frontend or here...
    // Change parameters to take stuff...?
    // Change onlyOner for now
    function safeMint(address to, string memory nftName, string memory nftDesc, string memory nftURL) public {
        // If we process here, gas might be higher...
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        nftName,
                        '", "description": "',
                        nftDesc,
                        '", "image": "',
                        nftURL,
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(
            string(
                abi.encodePacked(
                    "https://nftpreview.0xdev.codes/?code=",
                    finalTokenUri
                )
            )
        );
        console.log("--------------------\n");

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, finalTokenUri);

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            tokenId,
            msg.sender
        );
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
