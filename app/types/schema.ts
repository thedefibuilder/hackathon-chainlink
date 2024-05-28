import { z } from "zod";

export const SmartContractSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Title is requierd"),
  authorName: z.string().min(3, "The author name is requierd"),
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
