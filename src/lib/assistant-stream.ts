/** Per-mounted-chat lock; no persistence, retries or request-content keys. */
export function createAssistantRequestLock() {
  let active = false;
  return {
    acquire() { if (active) return false; active = true; return true; },
    release() { active = false; },
  };
}

/** Parse complete SSE lines only; EOF is not proof of a completed response. */
export async function consumeAssistantStream(
  body: ReadableStream<Uint8Array>,
  onContent: (content: string) => void,
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let completed = false;
  const consumeLines = () => {
    let newline: number;
    while ((newline = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, newline).replace(/\r$/, "");
      buffer = buffer.slice(newline + 1);
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") { completed = true; return; }
      const parsed = JSON.parse(data);
      if (parsed.error) throw new Error("ASSISTANT_STREAM_ERROR");
      const content = parsed.choices?.[0]?.delta?.content;
      if (typeof content === "string" && content) onContent(content);
    }
  };
  try {
    while (!completed) {
      const { done, value } = await reader.read();
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      if (done && buffer) buffer += "\n";
      consumeLines();
      if (done) break;
    }
    if (!completed) throw new Error("ASSISTANT_STREAM_INTERRUPTED");
  } finally {
    // Do not wait indefinitely for an upstream connection after DONE/error.
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}