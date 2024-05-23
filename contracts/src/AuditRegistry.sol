// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

import { ERC1155 } from "@oz/token/ERC1155/ERC1155.sol";
import { ERC1155URIStorage } from "@oz/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract AuditRegistry is ERC1155URIStorage {
    mapping(uint256 tokenId => string sourceCodeURI) public sourceCodeURIs;

    constructor(string memory uri) ERC1155(uri) {
        // solhint-disable-previous-line no-empty-blocks
    }

    function requestAudit(string memory sourceCodeURI) external {
        // solhint-disable-previous-line no-empty-blocks

        // send audit request
    }
}
