import { searchRepoFiles } from "@/lib/github";
import { askWithContext, askWithExtraContext } from "@/lib/claude";
import {
  buildChatPrompt,
  buildChatWithExtraContextPrompt,
} from "@/lib/prompts";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { question, chatContext, repoPath, history } = body as {
      question?: string;
      chatContext?: string;
      repoPath?: string;
      history?: { role: "user" | "assistant"; content: string }[];
    };

    if (!question || !chatContext) {
      return Response.json(
        { message: "question and chatContext are required" },
        { status: 400 },
      );
    }

    const prompt = buildChatPrompt(chatContext, question);
    const rawResponse = await askWithContext(
      prompt,
      chatContext,
      history ?? [],
    );

    let parsed: Record<string, unknown> | null = null;
    try {
      // Strip markdown code fences Claude sometimes wraps JSON in
      const cleanedResponse = rawResponse
        .trim()
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();

      // Also attempt to extract a JSON object if there's surrounding text
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      const candidate = jsonMatch ? jsonMatch[0] : cleanedResponse;

      if (candidate.startsWith("{")) {
        parsed = JSON.parse(candidate) as Record<string, unknown>;
      }
    } catch {
      // rawResponse is plain text — fall through
    }

    console.log("[ask-anything] rawResponse preview:", rawResponse.slice(0, 120));
    console.log("[ask-anything] parsed:", parsed);
    console.log("[ask-anything] needsMoreContext:", parsed?.needsMoreContext);

    if (parsed !== null && parsed.needsMoreContext === true) {
      const searchFor = parsed.searchFor as string;

      console.log("=== FALLBACK TRIGGERED ===");
      console.log("searchFor:", searchFor);
      console.log("repoPath:", repoPath);

      const results = await searchRepoFiles(repoPath ?? "", searchFor);

      console.log("search results:", JSON.stringify(results));

      let extraFiles = "";

      if (results.length > 0) {
        const fileContents = await Promise.all(
          results.map(async (result) => {
            const res = await fetch(
              `https://raw.githubusercontent.com/${repoPath}/HEAD/${result.filePath}`,
            );
            console.log(
              "fetching file:",
              result.filePath,
              "status:",
              res.status,
            );
            if (!res.ok) return null;
            const text = await res.text();
            return `// ${result.filePath}\n${text.slice(0, 2000)}`;
          }),
        );

        extraFiles = fileContents
          .filter((content): content is string => content !== null)
          .join("\n\n");
      }

      console.log("extraFiles length:", extraFiles.length);

      const finalPrompt = buildChatWithExtraContextPrompt(
        chatContext,
        question,
        extraFiles ||
          "No additional files found. Answer as best you can from the original context.",
      );
      const finalResponse = await askWithExtraContext(
        finalPrompt,
        chatContext,
        extraFiles,
        history ?? [],
      );

      console.log("finalResponse:", finalResponse.slice(0, 100));

      return Response.json(
        { answer: finalResponse, usedFallback: true },
        { status: 200 },
      );
    }

    return Response.json(
      { answer: rawResponse, usedFallback: false },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ message }, { status: 500 });
  }
}
