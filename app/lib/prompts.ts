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
  repoData: RepoData,
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
   - "mermaid": A valid Mermaid diagram using ONLY this exact format: node definitions like A[Short Label] and edges like A --> B[Short Label]. Maximum 8 nodes. Do NOT use subgraph blocks. Do NOT use HTML tags like br. Do NOT use quoted labels with double quotes inside brackets. Every node label must be short plain text inside simple square brackets only.
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
  userQuestion: string,
): string {
  return `You are a helpful codebase assistant for a developer who just joined the team. You have been given a context summary of the codebase below.

--- CODEBASE CONTEXT ---
${chatContext}

--- DEVELOPER QUESTION ---
${userQuestion}

Rules you must follow without exception:

1. If the answer is clearly available in the codebase context above, answer directly and confidently in plain conversational text.

2. If the answer is NOT fully covered in the context above, or if you are even slightly unsure, you MUST respond with ONLY this exact JSON and absolutely nothing else — no explanation, no apology, no other text:
{ "needsMoreContext": true, "searchFor": "<3 to 5 words describing what to search for in the codebase>" }

3. NEVER say you don't have access to the codebase. NEVER say you only have a summary. NEVER apologize for not knowing. NEVER try to answer from general knowledge when the answer should come from the codebase. If you are not sure, always trigger the JSON fallback — the system will search the real codebase files and get the answer.

4. The JSON fallback is always better than a wrong or vague answer. Use it liberally.`;
}

export function buildChatWithExtraContextPrompt(
  chatContext: string,
  userQuestion: string,
  extraFiles: string,
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
