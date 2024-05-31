/// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25;

import { AggregatorV3Interface } from "@chainlink/shared/interfaces/AggregatorV3Interface.sol";

string constant sendAuditRequestSourceCode =
    "const characterId = args[0];const apiResponse = await Functions.makeHttpRequest({"
    "url: `https://swapi.info/api/people/${characterId}/`" "});" "if (apiResponse.error) {"
    "throw Error('Request failed');" "}" "const { data } = apiResponse;" "return Functions.encodeString(data.name);";
uint32 constant gasLimit = 300_000;

// Hardcoded for Avalanche Fuji C-Chain
AggregatorV3Interface constant avaxUsdPriceFeed = AggregatorV3Interface(0x5498BB86BC934c8D34FDA08E81D444153d0D06aD);
uint40 constant priceFeedHeartbeat = 600 seconds;
bytes32 constant donId = 0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;
address constant functionsRouter = 0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0;
uint64 constant subscriptionId = 8706;
uint8 constant priceFeedDecimals = 8;
uint8 constant nativeTokenDecimals = 18;
uint256 constant unitDifference = 10 ** nativeTokenDecimals - 10 ** priceFeedDecimals;
uint256 constant nativeTokenUnit = 10 ** nativeTokenDecimals;
