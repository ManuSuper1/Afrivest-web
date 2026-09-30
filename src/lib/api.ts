import { fetchSSE } from "./sse-client";
import { MarketEntryRequest, SSEEvent } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function startResearchStream(
  request: MarketEntryRequest,
  onEvent: (event: SSEEvent) => void
) {
  return fetchSSE(
    `${API_URL}/reports/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    },
    onEvent
  );
}
