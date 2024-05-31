/// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25;

import { IERC20, ERC20, ERC4626 } from "@oz/token/ERC20/extensions/ERC4626.sol";
import { FunctionsClient } from "@chainlink/functions/v1_0_0/FunctionsClient.sol";
import { FunctionsRequest } from "@chainlink/functions/v1_0_0/libraries/FunctionsRequest.sol";

import "src/Constants.sol";

contract AuditorsVault is ERC4626, FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    event SubmitVulnRequestSuccess(bytes32 requestId, bytes response);
    event SubmitVulnRequestError(bytes32 requestId, string error);

    constructor(address wrappedNative)
        ERC4626(IERC20(wrappedNative))
        ERC20("Auditors Guild", "GUILD")
        FunctionsClient(functionsRouter)
    {
        // solhint-disable-previous-line no-empty-blocks
    }

    function submitVulnerability() external {
        // todo:
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        if (err.length > 0) {
            emit SubmitVulnRequestError(requestId, string(err));
            return;
        }

        emit SubmitVulnRequestSuccess(requestId, response);

        // mint vault tokens
    }
}
