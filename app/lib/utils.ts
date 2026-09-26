// app/lib/utils.ts

export function parseGitHubRepo(input: string): string | null {
  const cleaned = input
    .trim()
    .replace("https://github.com/", "")
    .replace("http://github.com/", "")
    .replace("github.com/", "")
    .replace(/\/$/, "");

  // Must match owner/repo format
  const parts = cleaned.split("/");
  if (parts.length < 2 || !parts[0] || !parts[1]) return null;

  return `${parts[0]}/${parts[1]}`;
}
