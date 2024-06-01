// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { console2 } from "forge-std/src/console2.sol";

import { AuditRegistry } from "src/AuditRegistry.sol";
import { WrappedNative } from "src/WrappedNative.sol";
import { AuditorsVault } from "src/AuditorsVault.sol";
import { BaseScript } from "script/Base.s.sol";

contract Deploy is BaseScript {
    function run() public broadcast {
        WrappedNative wNative = new WrappedNative();
        AuditorsVault vault = new AuditorsVault(address(wNative));
        AuditRegistry registry = new AuditRegistry(address(vault), wNative);

        console2.log("Deployed AuditRegistry at address: {}", address(registry));
    }
}
