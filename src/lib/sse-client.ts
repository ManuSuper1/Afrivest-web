import { SSEEvent } from "./types";

export async function fetchSSE(
  url: string,
  options: RequestInit,
  onEvent: (event: SSEEvent) => void
) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("text/event-stream")) {
    throw new Error(`Expected an SSE response, received "${contentType || "unknown"}".`);
  }

  if (!response.body) {
    throw new Error("ReadableStream not yet supported in this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let terminalEventReceived = false;

  const dispatchFrame = (frame: string) => {
    let eventType = "message";
    const data: string[] = [];

    for (const line of frame.split(/\r\n|\r|\n/)) {
      if (!line || line.startsWith(":")) continue;

      const separator = line.indexOf(":");
      const field = separator === -1 ? line : line.substring(0, separator);
      const value = separator === -1 ? "" : line.substring(separator + 1).replace(/^ /, "");

      if (field === "event") {
        eventType = value;
      } else if (field === "data") {
        data.push(value);
      }
    }

    if (eventType !== "update" || data.length === 0) return;

    let parsed: SSEEvent;
    try {
      parsed = JSON.parse(data.join("\n")) as SSEEvent;
    } catch (error) {
      console.error("Failed to parse SSE update:", error);
      throw new Error("The API sent an invalid SSE update.");
    }

    onEvent(parsed);
    if (parsed.type === "done" || parsed.type === "error") {
      terminalEventReceived = true;
    }
  };

  const consumeFrames = (flush: boolean) => {
    while (buffer.length > 0) {
      const crlfBoundary = buffer.indexOf("\r\n\r\n");
      const lfBoundary = buffer.indexOf("\n\n");
      const crBoundary = buffer.indexOf("\r\r");
      const boundaries = [
        { index: crlfBoundary, length: 4 },
        { index: lfBoundary, length: 2 },
        { index: crBoundary, length: 2 },
      ].filter((boundary) => boundary.index !== -1);

      if (boundaries.length === 0) {
        if (flush && buffer.trim()) {
          dispatchFrame(buffer);
          buffer = "";
        }
        return;
      }

      const boundary = boundaries.reduce((first, candidate) =>
        candidate.index < first.index ? candidate : first
      );
      const frame = buffer.substring(0, boundary.index);
      buffer = buffer.substring(boundary.index + boundary.length);
      dispatchFrame(frame);
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      consumeFrames(false);
    }

    buffer += decoder.decode();
    consumeFrames(true);
  } finally {
    reader.releaseLock();
  }

  if (!terminalEventReceived) {
    throw new Error("The API stream closed before research completed. Check the API logs and try again.");
  }
}
