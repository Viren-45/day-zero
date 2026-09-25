const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const authHeaders = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

// ── Types ────────────────────────────────────────────────────────────────────

export interface RepoMetadata {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  defaultBranch: string;
}

export interface KeyFile {
  filename: string;
  content: string;
}

export interface SearchResult {
  filename: string;
  filePath: string;
}

// ── Excluded folders ─────────────────────────────────────────────────────────

const EXCLUDED = ["node_modules/", ".git/", "dist/", "build/", ".next/"];

// ── fetchRepoMetadata ────────────────────────────────────────────────────────

export async function fetchRepoMetadata(
  repoPath: string,
): Promise<RepoMetadata> {
  const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
    headers: authHeaders,
  });

  if (res.status === 404 || res.status === 403) {
    throw new Error("Repository not found or is private");
  }

  if (!res.ok) {
    throw new Error("Repository not found or is private");
  }

  const data = await res.json();

  return {
    name: data.name,
    description: data.description ?? null,
    language: data.language ?? null,
    stars: data.stargazers_count,
    defaultBranch: data.default_branch ?? "main",
  };
}

// ── fetchFileTree ────────────────────────────────────────────────────────────
// Accepts defaultBranch so we never guess — caller gets it from fetchRepoMetadata

export async function fetchFileTree(
  repoPath: string,
  defaultBranch: string,
): Promise<string[]> {
  const res = await fetch(
    `https://api.github.com/repos/${repoPath}/git/trees/${defaultBranch}?recursive=1`,
    { headers: authHeaders },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch file tree: ${res.status}`);
  }

  const data = await res.json();

  const files: string[] = (data.tree as { type: string; path: string }[])
    .filter((item) => item.type === "blob")
    .map((item) => item.path)
    .filter((path) => !EXCLUDED.some((excluded) => path.startsWith(excluded)))
    .slice(0, 150);

  return files;
}

// ── fetchKeyFiles ────────────────────────────────────────────────────────────
// Accepts fileTree so we don't make a second GitHub API call internally

export async function fetchKeyFiles(
  repoPath: string,
  defaultBranch: string,
  fileTree: string[],
): Promise<KeyFile[]> {
  const candidates = [
    "README.md",
    "readme.md",
    "package.json",
    "requirements.txt",
    "Cargo.toml",
    "go.mod",
  ];

  // Add any root-level config files found in the already-fetched tree
  const configFiles = fileTree.filter((path) =>
    /^[^/]+\.config\.[jt]s$/.test(path),
  );

  const allCandidates = [...new Set([...candidates, ...configFiles])];

  const results: KeyFile[] = [];

  for (const filename of allCandidates) {
    const res = await fetch(
      `https://raw.githubusercontent.com/${repoPath}/${defaultBranch}/${filename}`,
    );
    if (!res.ok) continue;
    const text = await res.text();
    results.push({ filename, content: text.slice(0, 3000) });
  }

  return results;
}

// ── searchRepoFiles ──────────────────────────────────────────────────────────

export async function searchRepoFiles(
  repoPath: string,
  query: string,
): Promise<SearchResult[]> {
  try {
    const q = encodeURIComponent(`${query} repo:${repoPath}`);
    const res = await fetch(`https://api.github.com/search/code?q=${q}`, {
      headers: authHeaders,
    });

    if (!res.ok) return [];

    const data = await res.json();

    return (
      (data.items as { name: string; path: string }[])
        ?.slice(0, 5)
        .map((item) => ({ filename: item.name, filePath: item.path })) ?? []
    );
  } catch {
    return [];
  }
}
