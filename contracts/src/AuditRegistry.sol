// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

import { ERC721 } from "@oz/token/ERC721/ERC721.sol";
import { ERC721URIStorage } from "@oz/token/ERC721/extensions/ERC721URIStorage.sol";
import { ERC721Enumerable } from "@oz/token/ERC721/extensions/ERC721Enumerable.sol";
import { FunctionsClient } from "@chainlink/functions/v1_0_0/FunctionsClient.sol";
import { FunctionsRequest } from "@chainlink/functions/v1_0_0/libraries/FunctionsRequest.sol";

contract AuditRegistry is ERC721URIStorage, ERC721Enumerable, FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    error NotOwner();
    error AlreadyExists();
    error InvalidArgsLength();
    error InvalidTokenId();
    error InvalidRequestId();

    event AuditorRequestError(bytes32 requestId, string error);
    event AuditorRequestSuccess(bytes32 requestId, bytes response);

    struct RequestData {
        address owner;
        uint256 tokenId;
        string contractURI;
    }

    mapping(bytes32 requestId => RequestData data) public requests;

    string private constant source =
        "const characterId = args[0];const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://swapi.info/api/people/${characterId}/`" "});" "if (apiResponse.error) {"
        "throw Error('Request failed');" "}" "const { data } = apiResponse;" "return Functions.encodeString(data.name);";
    uint32 private constant gasLimit = 300_000;
    // Hardcoded for Avalanche Fuji C-Chain
    bytes32 private constant donId = 0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;
    address private constant functionsRouter = 0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0;
    uint64 private constant subscriptionId = 8706;

    constructor() ERC721("AI Auditor", "AUDIT") FunctionsClient(functionsRouter) {
        // solhint-disable-previous-line no-empty-blocks
    }

    function requestAuditUpdate(uint256 tokenId, string calldata contractURI) external returns (bytes32 requestId) {
        if (msg.sender != _ownerOf(tokenId)) revert NotOwner();

        requestId = _sendAuditRequest(contractURI);

        requests[requestId] = RequestData(address(0), tokenId, contractURI);
    }

    function requestNewAudit(uint256 tokenId, string calldata contractURI) external returns (bytes32 requestId) {
        if (tokenId == 0) revert InvalidTokenId();
        if (_ownerOf(tokenId) != address(0)) revert AlreadyExists();

        requestId = _sendAuditRequest(contractURI);

        requests[requestId] = RequestData(msg.sender, tokenId, contractURI);
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        if (err.length > 0) {
            emit AuditorRequestError(requestId, string(err));
            return;
        }
        RequestData storage data = requests[requestId];
        if (data.tokenId == 0) revert InvalidRequestId();

        emit AuditorRequestSuccess(requestId, response);

        _setTokenURI(data.tokenId, string(response));

        // If this is not an audit update request, mint the token
        if (data.owner != address(0)) {
            _safeMint(data.owner, data.tokenId);
        }
    }

    function _sendAuditRequest(string calldata contractURI) internal returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        string[] memory args = new string[](1);
        args[0] = contractURI;
        req.setArgs(args);
        requestId = _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit, donId);
    }

    /**
     * ---------------------------- Overrides required by solidity ----------------------------
     */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 amount) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, amount);
    }
}
