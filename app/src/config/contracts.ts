import { Address } from "viem";
import { registryAbi } from "./abi/registry";
import { vaultAbi } from "./abi/vault";

export const contracts = {
  registry: {
    abi: registryAbi,
    address: "0x2a5252c7EC0261fe5480d0B83A562540A8C34d27" as Address,
  },
  vault: {
    abi: vaultAbi,
    address: "0xbFcfaad9a78C0a05cf2ad7D43273DEDd35C4eB75" as Address,
  },
};
