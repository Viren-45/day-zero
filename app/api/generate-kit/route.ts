import { fetchRepoMetadata, fetchFileTree, fetchKeyFiles } from "@/lib/github";
import { generateKit } from "@/lib/claude";
import { buildKitPrompt } from "@/lib/prompts";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { repo, role, level } = body as {
      repo?: string;
      role?: string;
      level?: string;
    };

    if (!repo || !role || !level) {
      return Response.json(
        { message: "repo, role, and level are required" },
        { status: 400 },
      );
    }

    const repoPath = repo.replace("https://github.com/", "").replace(/\/$/, "");

    const metadata = await fetchRepoMetadata(repoPath);
    const fileTree = await fetchFileTree(repoPath, metadata.defaultBranch);
    const keyFiles = await fetchKeyFiles(
      repoPath,
      metadata.defaultBranch,
      fileTree,
    );

    const repoData = {
      metadata: JSON.stringify(metadata),
      fileTree: fileTree.join("\n"),
      keyFiles: keyFiles
        .map((kf) => `${kf.filename}:\n${kf.content}`)
        .join("\n\n"),
    };

    const prompt = buildKitPrompt(repoPath, role, level, repoData);
    const kit = await generateKit(prompt);

    return Response.json(
      {
        ...kit,
        repoPath,
        role,
        level,
      },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    if (message === "Repository not found or is private") {
      return Response.json({ message }, { status: 404 });
    }

    return Response.json({ message }, { status: 500 });
  }
}
