// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { console2 } from "forge-std/src/console2.sol";

import { AuditRegistry } from "src/AuditRegistry.sol";
import { WrappedNative } from "src/WrappedNative.sol";
import { AuditorsVault } from "src/AuditorsVault.sol";
import { BaseScript } from "script/Base.s.sol";

contract Deploy is BaseScript {
    function run() public broadcast {
        // Deployed WrappedNative at address 0x3e770515D6Ed2197817dF6eeB26853df4E739080
        // Deployed AuditorsVault at address 0xbFcfaad9a78C0a05cf2ad7D43273DEDd35C4eB75
        // Deployed AuditRegistry at address 0x326031eFb581279489f0747f106A5e2f9d76dc9d

        WrappedNative wNative = WrappedNative(payable(0x3e770515D6Ed2197817dF6eeB26853df4E739080));
        AuditorsVault vault = AuditorsVault(0xbFcfaad9a78C0a05cf2ad7D43273DEDd35C4eB75);
        AuditRegistry registry = new AuditRegistry(address(vault), wNative);

        console2.log("Deployed WrappedNative at address", address(wNative));
        console2.log("Deployed AuditorsVault at address", address(vault));
        console2.log("Deployed AuditRegistry at address", address(registry));
    }
}
