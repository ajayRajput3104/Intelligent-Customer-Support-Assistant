import { CleanAiResponse } from "@/types/schemas";
import { TransformedAiResponseSchema } from "@/types/schemas";
import axios from "axios";

export async function getAiResponse(message: string): Promise<CleanAiResponse> {
  try {
    const response = await axios.post(
      `https://multi-ai-agent-customer-support-api.onrender.com/api/v1/query`,
      {
        query: message,
      }
    );
    const rawData = response.data;
    const validateAndTransformedData =
      TransformedAiResponseSchema.parse(rawData);
    return validateAndTransformedData;
  } catch (error) {
    console.error("Error fetching or parsing AI Response", error);
    if (axios.isAxiosError(error) && error.response) {
      const apiErrorMessage =
        error.response.data?.message || "An unknown API Error occurred";
      throw new Error(apiErrorMessage);
    }
    throw error;
  }
}
