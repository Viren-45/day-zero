// app/lib/prompts.ts
import { ICON_LIST_FOR_PROMPT } from "@/components/kit/tabs/map/icons/iconList";

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

1. "map": An object with exactly these three keys:
   - "explanation": A 2-3 sentence plain English explanation of the codebase structure and purpose.

   - "nodes": An array of 5 to 8 architecture nodes. Each node must have exactly these keys:
       - "id": A short unique string with no spaces e.g. "nextjs" or "supabase-auth"
       - "name": A short display name e.g. "Next.js App"
       - "subtitle": A short descriptor in parentheses e.g. "(App Router)" or "(PostgreSQL)"
       - "type": A free-form string you decide based on what this node represents e.g. "framework", "database", "authentication", "external-service"
       - "color": A hex color you choose that visually represents this node type e.g. "#6366f1" for a framework, "#10b981" for a database
       - "icon": One icon name chosen from this exact list only: ${ICON_LIST_FOR_PROMPT}
       - "description": 1-2 sentences explaining what this node does in this specific codebase
       - "files": An array of 2-5 actual file paths from the FILE TREE that belong to this node
       - "children": You MUST include a children array on every node that has meaningful sub-components. Do NOT omit children — they are required for nodes with internal structure. Each child must have: "id", "name", "subtitle", "icon" (from the same icon list only), "files" (1-3 actual file paths), "description". Children can optionally have their own "children" array for one more level of nesting if it adds clarity. Do not add children only if the node is truly atomic with no meaningful sub-parts.

       Here is an example of a node with children — follow this exact structure:
       {
         "id": "nextjs",
         "name": "Next.js App",
         "subtitle": "(App Router)",
         "type": "framework",
         "color": "#6366f1",
         "icon": "Layout",
         "description": "Core framework handling routing, server components and rendering.",
         "files": ["next.config.js", "src/app/layout.tsx"],
         "children": [
           {
             "id": "nextjs-pages",
             "name": "Feature Pages",
             "subtitle": "(Dashboard, Transactions)",
             "icon": "FileCode",
             "description": "Individual page components for each app route.",
             "files": ["src/app/(app)/dashboard/page.tsx", "src/app/(app)/transactions/page.tsx"]
           },
           {
             "id": "nextjs-actions",
             "name": "Server Actions",
             "subtitle": "(Auth mutations)",
             "icon": "Zap",
             "description": "Server-side form handlers for auth and settings.",
             "files": ["src/app/(auth)/login/actions.ts", "src/app/(auth)/signup/actions.ts"]
           },
           {
             "id": "nextjs-api",
             "name": "API Routes",
             "subtitle": "(Edge functions)",
             "icon": "Webhook",
             "description": "API endpoints for AI and external integrations.",
             "files": ["src/app/api/ai/route.ts"]
           }
         ]
       }

   - "edges": An array of connections between top-level nodes only (not children). Each edge has:
       - "source": The id of the source node (must match a top-level node id)
       - "target": The id of the target node (must match a top-level node id)
       - "relation": A short plain English relation label e.g. "calls", "reads/writes", "authenticates", "uses", "imports"

2. "firstHour": An array of 4-6 objects, each with:
   - "step": A number indicating the order.
   - "title": A short title for the step.
   - "description": Specific, actionable setup instructions based on the actual files found in the repo.

3. "watchOut": An array of 3-5 objects, each with:
   - "severity": One of "High", "Medium", or "Low".
   - "title": A short title for the gotcha.
   - "description": A description of a real gotcha or pitfall surfaced from the actual codebase files.

4. "firstTask": An object with:
   - "title": A short task title.
   - "file": An actual file path from the repo.
   - "difficulty": One of "Good first issue", "Moderate", or "Challenging" based on the developer level "${level}".
   - "description": A description of the task and what the developer will learn.
   - "relatedFiles": An array of 2-3 actual file paths from the repo that are relevant to completing the task.

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
