// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

import { ERC1155 } from "@oz/token/ERC1155/ERC1155.sol";
import { ERC1155URIStorage } from "@oz/token/ERC1155/extensions/ERC1155URIStorage.sol";
import { FunctionsClient } from "@chainlink/functions/v1_0_0/FunctionsClient.sol";
import { FunctionsRequest } from "@chainlink/functions/v1_0_0/libraries/FunctionsRequest.sol";

contract AuditRegistry is ERC1155URIStorage, FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    mapping(uint256 tokenId => string sourceCodeURI) public sourceCodeURIs;

    constructor(address functionsRouter) ERC1155("") FunctionsClient(functionsRouter) {
        // solhint-disable-previous-line no-empty-blocks
    }

    function requestAudit(string memory sourceCodeURI) external returns (bytes32 requestId) {
        // solhint-disable-previous-line no-empty-blocks

        // send audit request
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        // solhint-disable-previous-line no-empty-blocks

        // process audit response

        // mint token
    }
}
