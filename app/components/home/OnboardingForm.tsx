"use client";
// app/components/home/OnboardingForm.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const EXAMPLES = [
  { label: "facebook/react", url: "https://github.com/facebook/react" },
  { label: "vercel/next.js", url: "https://github.com/vercel/next.js" },
  { label: "supabase/supabase", url: "https://github.com/supabase/supabase" },
];

export default function OnboardingForm() {
  const router = useRouter();
  const [repo, setRepo] = useState("");
  const [role, setRole] = useState("Full Stack");
  const [level, setLevel] = useState("Mid Level");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!repo.trim()) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    const repoPath = parseGitHubRepo(repo);
    if (!repoPath) {
      setError("Please enter a valid GitHub URL like github.com/owner/repo");
      return;
    }

    const params = new URLSearchParams({ repo: repoPath, role, level });
    router.push(`/loading-kit?${params.toString()}`);
  }

  function handleExample(url: string) {
    setRepo(url);
  }

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      {/* GitHub URL input */}
      <div className="flex flex-col gap-1">
        <div className={`flex items-center gap-3 bg-white border rounded-2xl px-5 py-4 shadow-sm transition ${error ? "border-red-400 ring-2 ring-red-300" : "border-gray-200 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-transparent"}`}>
          {/* GitHub icon */}
          <svg
            className="w-5 h-5 text-gray-500 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <input
            type="text"
            value={repo}
            onChange={(e) => { setRepo(e.target.value); if (error) setError(""); }}
            placeholder="github.com/your-repo-url"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs pl-2">{error}</p>
        )}
      </div>

      {/* Role + Level dropdowns side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 pl-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition appearance-none cursor-pointer"
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full Stack</option>
            <option>DevOps</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 pl-1">
            Level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition appearance-none cursor-pointer"
          >
            <option>Junior</option>
            <option>Mid Level</option>
            <option>Senior</option>
          </select>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleSubmit}
        className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md cursor-pointer"
      >
        Generate My Kit →
      </button>

      {/* Example chips */}
      <div className="flex items-center gap-3 flex-wrap justify-center pt-1">
        <span className="text-xs text-gray-500">Try an example:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.url}
            onClick={() => handleExample(ex.url)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors shadow-sm"
          >
            <svg
              className="w-3.5 h-3.5 text-gray-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
