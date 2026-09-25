"use client";

interface KitSidebarProps {
  repo: string;
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

export default function KitSidebar({ repo, activeTab, setActiveTab }: KitSidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-200 bg-[#F9F9F9]">
      {/* Repo pill */}
      <div className="border-b border-gray-200 px-3 py-3">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
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
            className="h-4 w-4 shrink-0 text-gray-400"
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
        </div>
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
