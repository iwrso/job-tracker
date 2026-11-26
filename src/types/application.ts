import { z } from "zod";

export const APPLICATION_STATUSES = [
  "WISHLIST",
  "APPLIED",
  "INTERVIEWING",
  "OFFER",
  "REJECTED",
] as const;

export const createApplicationSchema = z.object({
  company: z.string().min(1, "Company name is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  status: z.enum(APPLICATION_STATUSES).optional().default("APPLIED"),
  jobDescription: z.string().optional(),
  salaryRange: z.string().optional(),
  jobUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
