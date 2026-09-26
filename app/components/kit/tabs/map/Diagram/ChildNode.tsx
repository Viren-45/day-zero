// app/components/kit/tabs/map/Diagram/ChildNode.tsx
// Not used as a React Flow node — children render inside ParentNode
// This file is kept for potential future use as standalone child nodes
"use client";

import * as Icons from "lucide-react";
import { FileCode } from "lucide-react";
import { ArchitectureChildNode } from "../types/diagram";

interface Props {
  child: ArchitectureChildNode;
  color: string;
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

export default function ChildNode({ child, color, onFileClick }: Props) {
  return (
    <div
      className="flex items-start gap-2 px-3 py-2 rounded-xl border transition-all hover:shadow-sm"
      style={{ borderColor: `${color}40`, background: `${color}10` }}
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}30` }}
      >
        {getIcon(child.icon, "w-3.5 h-3.5")}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-800 truncate">
          {child.name}
        </p>
        <p className="text-[10px] text-gray-500 truncate">{child.subtitle}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {child.files.slice(0, 2).map((f) => (
            <button
              key={f}
              onClick={() => onFileClick(f)}
              className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-500 transition-colors truncate max-w-[100px] cursor-pointer"
            >
              {f.split("/").pop()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
