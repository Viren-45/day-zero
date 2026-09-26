"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { examples } from "@/lib/sampleRepos";

interface KitSidebarProps {
  repo: string;
  role: string;
  level: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { key: "map", emoji: "🗺️", label: "Your Map" },
  { key: "firstHour", emoji: "⏱️", label: "First Hour" },
  { key: "watchOut", emoji: "⚠️", label: "Watch Out" },
  { key: "firstTask", emoji: "✅", label: "First Task" },
  { key: "askAnything", emoji: "💬", label: "Ask Anything" },
];

export default function KitSidebar({
  repo,
  role,
  level,
  activeTab,
  setActiveTab,
}: KitSidebarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isSample = examples.some((ex) => ex.repo === repo);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function selectRepo(target: string) {
    setOpen(false);
    if (target === repo) return; // already open — don't regenerate

    // Drop the cached kit so the loading flow builds a fresh one
    try {
      sessionStorage.removeItem("kit");
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams({
      repo: target,
      role: role || "Full Stack",
      level: level || "Mid Level",
    });
    router.push(`/loading-kit?${params.toString()}`);
  }

  function renderRepoOption(name: string) {
    const selected = name === repo;
    return (
      <button
        type="button"
        onClick={() => selectRepo(name)}
        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
          selected
            ? "cursor-default bg-indigo-50 font-medium text-indigo-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="flex-1 truncate">{name}</span>
        {selected && <Check className="h-4 w-4 shrink-0 text-indigo-600" />}
      </button>
    );
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-200 bg-[#F9F9F9]">
      {/* Repo pill */}
      <div ref={menuRef} className="relative border-b border-gray-200 px-3 py-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left shadow-sm transition-colors hover:border-indigo-200"
        >
          {/* GitHub icon */}
          <svg
            className="h-4 w-4 shrink-0 text-gray-600"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="flex-1 truncate text-sm font-medium text-gray-800">
            {repo}
          </span>
          {/* Chevron down */}
          <svg
            className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {open && (
          <div className="absolute left-3 right-3 top-full z-20 mt-1 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
            {!isSample && (
              <>
                <p className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  Your repo
                </p>
                {renderRepoOption(repo)}
                <div className="my-2 border-t border-gray-100" />
              </>
            )}
            <p className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Samples
            </p>
            {examples.map((ex) => (
              <div key={ex.repo}>{renderRepoOption(ex.repo)}</div>
            ))}
          </div>
        )}
      </div>

      {/* Tab list */}
      <div className="px-3 pt-4">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Current Kit
        </p>
        <nav className="flex flex-col gap-1">
          {tabs.map(({ key, emoji, label }) => {
            const isActive = key === activeTab;
            return (
              <div
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border-l-4 px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "border-indigo-600 bg-indigo-50 font-medium text-indigo-700"
                    : "border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
