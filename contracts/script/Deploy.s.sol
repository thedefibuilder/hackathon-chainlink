// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { BaseScript } from "./Base.s.sol";
import { AuditRegistry } from "src/AuditRegistry.sol";
import { console2 } from "forge-std/src/console2.sol";

contract Deploy is BaseScript {
    function run() public broadcast {
        address vault = 0x1234567890123456789012345678901234567890;
        AuditRegistry registry = new AuditRegistry(vault);

        console2.log("Deployed AuditRegistry at address: {}", address(registry));
    }
}
