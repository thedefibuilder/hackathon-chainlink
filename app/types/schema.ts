import { z } from "zod";

const SeverityEnum = z.enum(["Critical", "Medium", "High", "Low"]);

export const SmartContractSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Title is requierd"),
  repoLink: z.string().min(3, "Repo link is requierd"),
  filesInScope: z.array(z.string()).min(1, "Files in scope is requierd"),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
});

export const ReviewAISchema = z.object({
  id: z.number().optional(),
  rewardCritical: z.preprocess((val) => Number(val), z.number().max(10000)),
  rewardHigh: z.preprocess((val) => Number(val), z.number().max(10000)),
  rewardMedium: z.preprocess((val) => Number(val), z.number().max(10000)),
  rewardLow: z.preprocess((val) => Number(val), z.number().max(10000)),
});

export const SearchSchema = z.object({
  id: z.number().optional(),
  search: z.string().min(5, "Is requierd"),
});

const CoinSchema = z.object({
  value: z.string(),
  id: z.number(),
  imageSrc: z.string().optional(),
});

export const DeployContractSchema = z.object({
  id: z.number().optional(),
  coins: z.string(),
  title: z.string().min(3, "Title is requierd"),
  nativeToken: z.string().min(3, "Token is requierd"),
  trustedForwarder: z.string().min(3, "Trusted forwarder is requierd"),
  tokenAddress: z.string().min(3, "The token address is requierd"),
  vrf: z.string().min(3, "The vrfV2Wrapper address is requierd"),
});
export const AddVulnerabilitiesSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Title is requierd"),
  severity: SeverityEnum,
  description: z.string().min(3, "Description is requierd"),
  recomandation: z.string().min(3, "Description is requierd"),
  permalink: z.string().min(3, "The permalink is requierd"),
});
