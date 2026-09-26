// app/components/kit/tabs/WatchOutTab.tsx
"use client";

import SeverityBadge from "@/components/kit/shared/SeverityBadge";

type Severity = "High" | "Medium" | "Low";

interface WatchOutItem {
  severity: Severity;
  title: string;
  description: string;
}

interface Props {
  watchOut: WatchOutItem[];
}

const severityOrder: Record<Severity, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

const leftBorder: Record<Severity, string> = {
  High: "border-l-red-400",
  Medium: "border-l-amber-400",
  Low: "border-l-blue-400",
};

const iconBg: Record<Severity, string> = {
  High: "bg-red-50 text-red-500",
  Medium: "bg-amber-50 text-amber-500",
  Low: "bg-blue-50 text-blue-500",
};

const icons: Record<Severity, string> = {
  High: "🔴",
  Medium: "🟡",
  Low: "🔵",
};

export default function WatchOutTab({ watchOut }: Props) {
  const sorted = [...watchOut].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  );

  const high = sorted.filter((i) => i.severity === "High");
  const medium = sorted.filter((i) => i.severity === "Medium");
  const low = sorted.filter((i) => i.severity === "Low");

  const groups = [
    { label: "High Risk", items: high, severity: "High" as Severity },
    { label: "Medium Risk", items: medium, severity: "Medium" as Severity },
    { label: "Low Risk", items: low, severity: "Low" as Severity },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900">Watch Out</h2>
        <p className="mt-2 text-sm text-gray-500">
          Potential gotchas, tricky patterns, and things to be careful about in
          this codebase.
        </p>
      </div>

      {/* Summary pills */}
      <div className="flex items-center gap-3 mb-8">
        {high.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-100">
            <span className="text-sm">🔴</span>
            <span className="text-sm font-semibold text-red-700">
              {high.length} High
            </span>
          </div>
        )}
        {medium.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-100">
            <span className="text-sm">🟡</span>
            <span className="text-sm font-semibold text-amber-700">
              {medium.length} Medium
            </span>
          </div>
        )}
        {low.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100">
            <span className="text-sm">🔵</span>
            <span className="text-sm font-semibold text-blue-700">
              {low.length} Low
            </span>
          </div>
        )}
        <span className="text-xs text-gray-400 ml-auto">
          {watchOut.length} total {watchOut.length === 1 ? "issue" : "issues"}{" "}
          found
        </span>
      </div>

      {/* Grouped cards */}
      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <div key={group.label}>
            {/* Group label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm">{icons[group.severity]}</span>
              <h3 className="text-sm font-bold text-gray-700">{group.label}</h3>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
              {group.items.map((item, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${leftBorder[item.severity]} p-5 shadow-sm hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg[item.severity]}`}
                      >
                        <span className="text-sm">{icons[item.severity]}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {item.title}
                      </h4>
                    </div>
                    <SeverityBadge severity={item.severity} />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed pl-11">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
