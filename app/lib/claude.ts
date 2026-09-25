const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5";

const baseHeaders = {
  "x-api-key": ANTHROPIC_API_KEY ?? "",
  "anthropic-version": "2023-06-01",
  "Content-Type": "application/json",
};

// ── generateKit ───────────────────────────────────────────────────────────────

export async function generateKit(
  prompt: string,
): Promise<Record<string, unknown>> {
  try {
    const res = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Claude API error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const rawText: string = data.content?.[0]?.text ?? "";

    const cleaned = rawText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    try {
      return JSON.parse(cleaned) as Record<string, unknown>;
    } catch {
      throw new Error("Failed to parse kit response from Claude");
    }
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "Failed to parse kit response from Claude"
    ) {
      throw err;
    }
    throw new Error(
      `generateKit failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

// ── askWithContext ────────────────────────────────────────────────────────────
// chatContext is already embedded inside the prompt string via buildChatPrompt.
// It is accepted here as a parameter so the call signature stays consistent
// with askWithExtraContext and makes the data-flow explicit at the call site.

export async function askWithContext(
  prompt: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _chatContext: string,
): Promise<string> {
  try {
    const res = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        system: "You are a helpful codebase assistant.",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Claude API error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return (data.content?.[0]?.text ?? "") as string;
  } catch (err) {
    throw new Error(
      `askWithContext failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

// ── askWithExtraContext ───────────────────────────────────────────────────────
// Both chatContext and extraContext are already embedded inside the prompt
// string via buildChatWithExtraContextPrompt. They are accepted here so the
// call site is explicit about what data is being used.

export async function askWithExtraContext(
  prompt: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _chatContext: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _extraContext: string,
): Promise<string> {
  try {
    const res = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1500,
        system:
          "You are a helpful codebase assistant who has been given additional file content from the codebase to answer accurately.",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Claude API error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return (data.content?.[0]?.text ?? "") as string;
  } catch (err) {
    throw new Error(
      `askWithExtraContext failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
