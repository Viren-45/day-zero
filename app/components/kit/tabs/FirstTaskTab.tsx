// app/components/kit/tabs/FirstTaskTab.tsx
"use client";

import { useState } from "react";

interface FirstTask {
  title: string;
  file: string;
  difficulty: string;
  description: string;
  relatedFiles: string[];
}

interface Props {
  firstTask: FirstTask;
}

const difficultyConfig: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  "Good first issue": {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },
  Moderate: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  Challenging: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

export default function FirstTaskTab({ firstTask }: Props) {
  const difficulty =
    difficultyConfig[firstTask.difficulty] ??
    difficultyConfig["Good first issue"];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Your First Task
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          A suggested starting point tailored to your role and experience level.
        </p>
      </div>

      {/* Main task card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        {/* Card top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${difficulty.bg} ${difficulty.text} ${difficulty.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${difficulty.dot}`} />
            {firstTask.difficulty}
          </span>
          <span className="text-xs text-gray-400">Suggested contribution</span>
        </div>

        {/* Card body */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-extrabold text-gray-900 mb-4">
            {firstTask.title}
          </h3>

          {/* File path */}
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-5">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-indigo-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <code className="text-sm font-mono text-indigo-700">
                {firstTask.file}
              </code>
            </div>
            <CopyButton text={firstTask.file} />
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              What to do
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {firstTask.description}
            </p>
          </div>
        </div>
      </div>

      {/* Related files */}
      {firstTask.relatedFiles.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-sm font-bold text-gray-800">Read these first</p>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {firstTask.relatedFiles.length}{" "}
              {firstTask.relatedFiles.length === 1 ? "file" : "files"}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {firstTask.relatedFiles.map((file) => (
              <div
                key={file}
                className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-400 transition-colors flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <code className="text-xs font-mono text-gray-600 group-hover:text-indigo-600 transition-colors">
                    {file}
                  </code>
                </div>
                <CopyButton text={file} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
