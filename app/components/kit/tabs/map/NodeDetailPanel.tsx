// app/components/kit/tabs/map/NodeDetailPanel.tsx
"use client";

import { CustomNodeType } from "./types/diagram";

interface Props {
  node: CustomNodeType | null;
  chatContext: string;
  onClose: () => void;
}

function extractContext(chatContext: string, label: string): string {
  const sentences = chatContext.split(/[.!?]+/).filter(Boolean);
  const relevant = sentences.filter((s) =>
    s.toLowerCase().includes(label.toLowerCase()),
  );
  if (relevant.length > 0) return relevant.slice(0, 3).join(". ").trim() + ".";
  return "No additional context found for this component in the codebase summary.";
}

export default function NodeDetailPanel({ node, chatContext, onClose }: Props) {
  if (!node) return null;

  const context = extractContext(chatContext, node.data.label);

  return (
    <div
      className="absolute right-0 top-0 h-full w-72 bg-white border-l border-gray-200 shadow-xl z-10 flex flex-col"
      style={{ animation: "slideIn 0.2s ease-out" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-gray-100"
        style={{ backgroundColor: node.data.bg }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{node.data.icon}</span>
          <div>
            <p className="text-sm font-bold" style={{ color: node.data.text }}>
              {node.data.label}
            </p>
            {node.data.subtitle && (
              <p
                className="text-[11px]"
                style={{ color: node.data.text, opacity: 0.65 }}
              >
                {node.data.subtitle}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            About this component
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">{context}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Reference ID
          </p>
          <code
            className="text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: node.data.bg,
              color: node.data.text,
            }}
          >
            {node.id}
          </code>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Want to know more? Use{" "}
            <span className="text-indigo-500 font-medium">Ask Anything</span> to
            dive deeper into this component.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
