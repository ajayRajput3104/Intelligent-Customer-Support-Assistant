import { z } from "zod";

// Schema for the raw, nested response from your AI API
const RawAiResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    category: z.enum(["Technical", "Billing", "General", "Unknown"]),
    sentiment: z.string(), // Keeping sentiment as a string for flexibility
    response: z.string(),
  }),
  message: z.string().optional(),
});

// Schema that transforms the raw response into the clean format our app uses
export const TransformedAiResponseSchema = RawAiResponseSchema.transform(
  (raw) => ({
    response: raw.data.response,
    analysis: {
      // Attempt to extract the primary sentiment word, default to Neutral
      sentiment: (raw.data.sentiment.match(/Positive|Neutral|Negative/)?.[0] ??
        "Neutral") as "Positive" | "Neutral" | "Negative" | "Unknown",
      category: raw.data.category,
    },
  })
);

// CHANGE: Explicitly define the CleanAiResponse type by inferring it from the Zod schema.
// This is the type that our application will use internally.
export type CleanAiResponse = z.infer<typeof TransformedAiResponseSchema>;
