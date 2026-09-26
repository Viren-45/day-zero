// app/components/kit/tabs/map/NodeDetail.tsx
"use client";

import * as Icons from "lucide-react";
import { FileCode, FileText } from "lucide-react";
import { ArchitectureNode } from "./types/diagram";

interface Props {
  node: ArchitectureNode | null;
  onFileClick: (path: string) => void;
}

function getIcon(name: string, className?: string) {
  const Icon = Icons[name as keyof typeof Icons] as React.ComponentType<{
    className?: string;
  }>;
  return Icon ? (
    <Icon className={className} />
  ) : (
    <FileCode className={className} />
  );
}

export default function NodeDetail({ node, onFileClick }: Props) {
  if (!node) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-2">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400">Click a node to see details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      {/* Node header */}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${node.color}20` }}
        >
          {getIcon(node.icon, "w-5 h-5")}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-gray-900">{node.name}</h3>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                background: `${node.color}15`,
                color: node.color,
              }}
            >
              {node.type}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{node.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 leading-relaxed">
        {node.description}
      </p>

      {/* Key files */}
      {node.files.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Key Files
          </p>
          <div className="flex flex-col gap-1">
            {node.files.map((file) => (
              <button
                key={file}
                onClick={() => onFileClick(file)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-left group cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500 flex-shrink-0 transition-colors" />
                <code className="text-[11px] text-gray-600 group-hover:text-indigo-600 transition-colors truncate font-mono">
                  {file}
                </code>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Children summary */}
      {node.children && node.children.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Sub Components
          </p>
          <div className="flex flex-col gap-1.5">
            {node.children.map((child) => (
              <div
                key={child.id}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100"
                style={{ borderLeftColor: node.color, borderLeftWidth: 3 }}
              >
                <span style={{ color: node.color }}>
                  {getIcon(child.icon, "w-3.5 h-3.5")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {child.name}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate">
                    {child.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
