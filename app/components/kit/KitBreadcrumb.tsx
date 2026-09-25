"use client";

interface KitBreadcrumbProps {
  repo: string;
  role: string;
  level: string;
  activeTab: string;
}

const tabLabels: Record<string, string> = {
  map: "Your Map",
  firstHour: "First Hour",
  watchOut: "Watch Out",
  firstTask: "First Task",
  askAnything: "Ask Anything",
};

export default function KitBreadcrumb({
  repo,
  role,
  level,
  activeTab,
}: KitBreadcrumbProps) {
  const tabLabel = tabLabels[activeTab] ?? activeTab;

  return (
    <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3">
      {/* Breadcrumb trail */}
      <nav className="flex items-center gap-1.5 text-sm">
        {/* Home icon */}
        <a href="/" className="text-gray-400 transition-colors hover:text-gray-600">
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-label="Home"
          >
            <path d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7A1 1 0 0 0 3 11h1v6a1 1 0 0 0 1 1h4v-4h2v4h4a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 .707-1.707l-7-7Z" />
          </svg>
        </a>

        <Chevron />

        {/* Day Zero */}
        <a
          href="/"
          className="font-medium text-gray-500 transition-colors hover:text-gray-800"
        >
          Day Zero
        </a>

        <Chevron />

        {/* Repo */}
        <span className="font-medium text-gray-700">{repo}</span>

        <Chevron />

        {/* Active tab */}
        <span className="font-semibold text-indigo-600">{tabLabel}</span>
      </nav>

      {/* Role + Level badges */}
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-700">
          {role}
        </span>
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-700">
          {level}
        </span>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <svg
      className="h-3.5 w-3.5 text-gray-300"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
