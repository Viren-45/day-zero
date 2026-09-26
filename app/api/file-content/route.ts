// app/api/file-content/route.ts

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function getLanguage(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    py: "python",
    css: "css",
    scss: "scss",
    json: "json",
    md: "markdown",
    mdx: "markdown",
    sql: "sql",
    yml: "yaml",
    yaml: "yaml",
    sh: "bash",
    bash: "bash",
    env: "bash",
    prisma: "prisma",
    graphql: "graphql",
    html: "html",
    xml: "xml",
    toml: "toml",
    rs: "rust",
    go: "go",
    rb: "ruby",
    php: "php",
    java: "java",
    swift: "swift",
    kt: "kotlin",
    cpp: "cpp",
    c: "c",
    cs: "csharp",
  };
  return map[ext] ?? "text";
}

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const repo = searchParams.get("repo");
    const path = searchParams.get("path");
    const branch = searchParams.get("branch") ?? "HEAD";

    if (!repo || !path) {
      return Response.json(
        { message: "repo and path are required" },
        { status: 400 },
      );
    }

    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;

    const res = await fetch(url, {
      headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
    });

    if (!res.ok) {
      return Response.json(
        { message: `File not found: ${path}` },
        { status: 404 },
      );
    }

    const content = await res.text();

    return Response.json({
      path,
      content,
      language: getLanguage(path),
      lines: content.split("\n").length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ message }, { status: 500 });
  }
}
