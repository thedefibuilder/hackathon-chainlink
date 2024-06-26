/// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25;

import { IERC20, ERC20, ERC4626 } from "@oz/token/ERC20/extensions/ERC4626.sol";
import { Ownable } from "@oz/access/Ownable.sol";
import { FunctionsClient } from "@chainlink/functions/v1_0_0/FunctionsClient.sol";
import { FunctionsRequest } from "@chainlink/functions/v1_0_0/libraries/FunctionsRequest.sol";

import "src/Constants.sol";

contract AuditorsVault is Ownable, ERC4626, FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    error InvalidRequestId();

    event SubmitVulnRequestSuccess(bytes32 requestId, bytes response);
    event SubmitVulnRequestError(bytes32 requestId, string error);

    struct RequestData {
        bytes32 requestId;
        address auditor;
    }

    string public functionsCode;
    mapping(bytes32 requestId => RequestData data) public requests;

    constructor(address wrappedNative)
        Ownable(msg.sender)
        ERC4626(IERC20(wrappedNative))
        ERC20("Auditors Guild", "GUILD")
        FunctionsClient(FUNCTIONS_ROUTER)
    {
        functionsCode = SUBMIT_VULN_REQUEST_SOURCE_CODE;
    }

    function submitVulnerability(string calldata vulnerabilityURI) external returns (bytes32 requestId) {
        requestId = _sendSubmitVulnRequest(vulnerabilityURI);

        requests[requestId] = RequestData(requestId, msg.sender);
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        if (err.length > 0) {
            emit SubmitVulnRequestError(requestId, string(err));
            return;
        }

        emit SubmitVulnRequestSuccess(requestId, response);

        RequestData memory data = requests[requestId];
        if (data.auditor == address(0)) revert InvalidRequestId();

        uint256 amount = abi.decode(response, (uint256));
        _mint(data.auditor, amount);
    }

    // NOTE: This function is only for debugging purposes
    function setCode(string calldata code) external onlyOwner {
        functionsCode = code;
    }

    function _sendSubmitVulnRequest(string calldata vulnerabilityURI) internal returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(functionsCode);
        string[] memory args = new string[](1);
        args[0] = vulnerabilityURI;
        req.setArgs(args);
        requestId = _sendRequest(req.encodeCBOR(), SUBSCRIPTION_ID, GAS_LIMIT, DON_ID);
    }
}
