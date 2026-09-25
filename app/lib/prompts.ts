// ── Types ────────────────────────────────────────────────────────────────────

interface RepoData {
  metadata: string;
  fileTree: string;
  keyFiles: string;
}

// ── Prompt builders ───────────────────────────────────────────────────────────

export function buildKitPrompt(
  repoPath: string,
  role: string,
  level: string,
  repoData: RepoData
): string {
  return `You are an expert developer onboarding assistant. A ${level} ${role} developer is joining a new team and needs a complete onboarding kit for the GitHub repository: ${repoPath}.

Analyze the following repository data and generate a tailored onboarding kit for someone with the role "${role}" and experience level "${level}".

--- REPOSITORY METADATA ---
${repoData.metadata}

--- FILE TREE ---
${repoData.fileTree}

--- KEY FILES ---
${repoData.keyFiles}

Return your response as a single valid JSON object. Do not include any markdown formatting, code blocks, or any text outside the JSON object.

The JSON must have exactly these five keys:

1. "map": An object with:
   - "mermaid": A valid Mermaid diagram string representing the high-level architecture of the codebase, tailored to what a ${role} developer would care about most.
   - "explanation": A 2–3 sentence plain English explanation of the codebase structure and purpose.

2. "firstHour": An array of 4–6 objects, each with:
   - "step": A number indicating the order.
   - "title": A short title for the step.
   - "description": Specific, actionable setup instructions based on the actual files found in the repo.

3. "watchOut": An array of 3–5 objects, each with:
   - "severity": One of "High", "Medium", or "Low".
   - "title": A short title for the gotcha.
   - "description": A description of a real gotcha or pitfall surfaced from the actual codebase files.

4. "firstTask": An object with:
   - "title": A short task title.
   - "file": An actual file path from the repo.
   - "difficulty": One of "Good first issue", "Moderate", or "Challenging" — chosen based on the developer's level ("${level}").
   - "description": A description of the task and what the developer will learn.
   - "relatedFiles": An array of 2–3 actual file paths from the repo that are relevant to completing the task.

5. "chatContext": A detailed string summary of the entire codebase including the tech stack, folder structure, key files and what they do, main patterns used, and anything a new developer would need to know to accurately answer questions about this codebase.`;
}

export function buildChatPrompt(
  chatContext: string,
  userQuestion: string
): string {
  return `You are a helpful codebase assistant for a developer who just joined a new team. You have been given a context summary of the codebase below.

--- CODEBASE CONTEXT ---
${chatContext}

--- DEVELOPER QUESTION ---
${userQuestion}

Answer the question accurately and concisely based on the context above.

- If you are confident in your answer, respond with a plain conversational answer.
- If you do not have enough information in the context to answer accurately, you must respond with a raw JSON object (no markdown, no code blocks) containing exactly two keys:
  {
    "needsMoreContext": true,
    "searchFor": "<3–5 words describing what to search for in the codebase>"
  }

Never guess or hallucinate file paths. Always prefer saying you need more context over giving a wrong answer.`;
}

export function buildChatWithExtraContextPrompt(
  chatContext: string,
  userQuestion: string,
  extraFiles: string
): string {
  return `You are a helpful codebase assistant for a developer who just joined a new team. You have been given a context summary of the codebase as well as additional file content retrieved directly from the repository.

--- CODEBASE CONTEXT ---
${chatContext}

--- ADDITIONAL FILE CONTENT ---
${extraFiles}

--- DEVELOPER QUESTION ---
${userQuestion}

Use both the original context summary and the additional file content above to give a complete and accurate answer. Respond with a plain conversational answer only. Do not return JSON — extra context has already been provided so a plain answer is always expected.`;
}
