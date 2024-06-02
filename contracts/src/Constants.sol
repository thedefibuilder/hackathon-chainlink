/// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25;

import { AggregatorV3Interface } from "@chainlink/shared/interfaces/AggregatorV3Interface.sol";

string constant AUDIT_REQUEST_SOURCE_CODE =
    "const characterId = args[0];const apiResponse = await Functions.makeHttpRequest({"
    "url: `https://swapi.info/api/people/${characterId}/`" "});" "if (apiResponse.error) {"
    "throw Error('Request failed');" "}" "const { data } = apiResponse;" "return Functions.encodeString(data.name);";

string constant SUBMIT_VULN_REQUEST_SOURCE_CODE =
    "const characterId = args[0];const apiResponse = await Functions.makeHttpRequest({"
    "url: `https://swapi.info/api/people/${characterId}/`" "});" "if (apiResponse.error) {"
    "throw Error('Request failed');" "}" "const { data } = apiResponse;" "return Functions.encodeString(data.name);";

uint32 constant GAS_LIMIT = 300_000;

string constant AUDIT_BASE_URI = "https://chainlink.defibuilder/api/audit/"; // + auditRequestId for full URI

// Hardcoded for Avalanche Fuji C-Chain
AggregatorV3Interface constant AVAX_USD_PRICE_FEED = AggregatorV3Interface(0x5498BB86BC934c8D34FDA08E81D444153d0D06aD);
uint40 constant PRICE_FEED_HEARTBEAT = 600 seconds;
bytes32 constant DON_ID = 0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;
address constant FUNCTIONS_ROUTER = 0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0;
uint64 constant SUBSCRIPTION_ID = 8706;
uint8 constant PRICE_FEED_DECIMALS = 8;
uint8 constant NATIVE_TOKEN_DECIMALS = 18;
uint256 constant UNIT_DIFFERENCE = 10 ** NATIVE_TOKEN_DECIMALS - 10 ** PRICE_FEED_DECIMALS;
uint256 constant NATIVE_TOKEN_UNIT = 10 ** NATIVE_TOKEN_DECIMALS;
