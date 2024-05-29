// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 <0.9.0;

import { Script } from "forge-std/src/Script.sol";

abstract contract BaseScript is Script {
    /// @dev The address of the transaction broadcaster.
    address internal broadcaster;

    constructor() {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        broadcaster = vm.rememberKey(privateKey);
    }

    modifier broadcast() {
        vm.startBroadcast(broadcaster);
        _;
        vm.stopBroadcast();
    }
}
