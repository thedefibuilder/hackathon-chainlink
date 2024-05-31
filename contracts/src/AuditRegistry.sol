// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25;

import { Address } from "@oz/utils/Address.sol";
import { ERC721 } from "@oz/token/ERC721/ERC721.sol";
import { ERC721URIStorage } from "@oz/token/ERC721/extensions/ERC721URIStorage.sol";
import { ERC721Enumerable } from "@oz/token/ERC721/extensions/ERC721Enumerable.sol";
import { FunctionsClient } from "@chainlink/functions/v1_0_0/FunctionsClient.sol";
import { FunctionsRequest } from "@chainlink/functions/v1_0_0/libraries/FunctionsRequest.sol";
import { AggregatorV3Interface } from "@chainlink/shared/interfaces/AggregatorV3Interface.sol";

import { WrappedNative } from "src/WrappedNative.sol";

contract AuditRegistry is ERC721URIStorage, ERC721Enumerable, FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;
    using Address for address payable;

    error NotOwner();
    error AlreadyExists();
    error PriceFetchFailed();
    error InsufficientFee();
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

    // 1.337 USD per generation
    uint256 public constant generationFeeInUSD = 1.337e8;
    address payable public immutable auditorsVault;
    WrappedNative public immutable wrappedNative;
    mapping(bytes32 requestId => RequestData data) public requests;

    // TODO: convert constants to separate file
    string private constant source =
        "const characterId = args[0];const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://swapi.info/api/people/${characterId}/`" "});" "if (apiResponse.error) {"
        "throw Error('Request failed');" "}" "const { data } = apiResponse;" "return Functions.encodeString(data.name);";
    uint32 private constant gasLimit = 300_000;
    // Hardcoded for Avalanche Fuji C-Chain
    AggregatorV3Interface public constant avaxUsdPriceFeed =
        AggregatorV3Interface(0x5498BB86BC934c8D34FDA08E81D444153d0D06aD);
    uint40 private constant priceFeedHeartbeat = 600 seconds;
    bytes32 private constant donId = 0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;
    address private constant functionsRouter = 0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0;
    uint64 private constant subscriptionId = 8706;
    uint8 private constant priceFeedDecimals = 8;
    uint8 private constant nativeTokenDecimals = 18;
    uint256 private constant unitDifference = 10 ** nativeTokenDecimals - 10 ** priceFeedDecimals;
    uint256 private constant nativeTokenUnit = 10 ** nativeTokenDecimals;

    constructor(
        address vault,
        WrappedNative wNative
    )
        ERC721("DeFi Builder AI", "BUILD")
        FunctionsClient(functionsRouter)
    {
        auditorsVault = payable(vault);
        wrappedNative = wNative;
    }

    function requestAuditUpdate(
        uint256 tokenId,
        string calldata contractURI
    )
        external
        payable
        returns (bytes32 requestId)
    {
        uint256 price = calculateAuditPriceInNative();
        if (msg.value < price) revert InsufficientFee();
        if (msg.sender != _ownerOf(tokenId)) revert NotOwner();

        requestId = _sendAuditRequest(contractURI);

        requests[requestId] = RequestData(address(0), tokenId, contractURI);

        _refundUser(price);
        _sendFeeToVault(price);
    }

    function requestNewAudit(
        uint256 tokenId,
        string calldata contractURI
    )
        external
        payable
        returns (bytes32 requestId)
    {
        uint256 price = calculateAuditPriceInNative();
        if (msg.value < price) revert InsufficientFee();
        if (tokenId == 0) revert InvalidTokenId();
        if (_ownerOf(tokenId) != address(0)) revert AlreadyExists();

        requestId = _sendAuditRequest(contractURI);

        requests[requestId] = RequestData(msg.sender, tokenId, contractURI);

        _refundUser(price);
        _sendFeeToVault(price);
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

    function calculateAuditPriceInNative() public view returns (uint256) {
        (, int256 answer,, uint256 updatedAt,) = avaxUsdPriceFeed.latestRoundData();
        if (answer <= 0 || updatedAt + priceFeedHeartbeat < block.timestamp) revert PriceFetchFailed();
        return generationFeeInUSD * uint256(answer) * unitDifference / nativeTokenUnit;
    }

    function _sendAuditRequest(string calldata contractURI) internal returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        string[] memory args = new string[](1);
        args[0] = contractURI;
        req.setArgs(args);
        requestId = _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit, donId);
    }

    function _sendFeeToVault(uint256 price) internal {
        wrappedNative.deposit{ value: price }();
        wrappedNative.transfer(auditorsVault, price);
    }

    function _refundUser(uint256 neededAmount) internal {
        if (msg.value > neededAmount) {
            unchecked {
                payable(msg.sender).sendValue(msg.value - neededAmount);
            }
        }
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
