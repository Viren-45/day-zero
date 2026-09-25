import { searchRepoFiles } from "@/lib/github";
import { askWithContext, askWithExtraContext } from "@/lib/claude";
import { buildChatPrompt, buildChatWithExtraContextPrompt } from "@/lib/prompts";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { question, chatContext, repoPath } = body as {
      question?: string;
      chatContext?: string;
      repoPath?: string;
    };

    if (!question || !chatContext) {
      return Response.json(
        { message: "question and chatContext are required" },
        { status: 400 },
      );
    }

    const prompt = buildChatPrompt(chatContext, question);
    const rawResponse = await askWithContext(prompt, chatContext);

    let parsed: Record<string, unknown> | null = null;
    try {
      parsed = JSON.parse(rawResponse) as Record<string, unknown>;
    } catch {
      // rawResponse is plain text — fall through to the plain-text return below
    }

    if (parsed !== null && parsed.needsMoreContext === true) {
      const searchFor = parsed.searchFor as string;
      const results = await searchRepoFiles(repoPath ?? "", searchFor);

      let extraFiles = "";

      if (results.length > 0) {
        const fileContents = await Promise.all(
          results.map(async (result) => {
            const res = await fetch(
              `https://raw.githubusercontent.com/${repoPath}/HEAD/${result.filePath}`,
            );
            if (!res.ok) return null;
            const text = await res.text();
            return text.slice(0, 2000);
          }),
        );

        extraFiles = fileContents
          .filter((content): content is string => content !== null)
          .join("\n\n");
      }

      const finalPrompt = buildChatWithExtraContextPrompt(
        chatContext,
        question,
        extraFiles,
      );
      const finalResponse = await askWithExtraContext(
        finalPrompt,
        chatContext,
        extraFiles,
      );

      return Response.json({ answer: finalResponse, usedFallback: true }, { status: 200 });
    }

    return Response.json({ answer: rawResponse, usedFallback: false }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ message }, { status: 500 });
  }
}
