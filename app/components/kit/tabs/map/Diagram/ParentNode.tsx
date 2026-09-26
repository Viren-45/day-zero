"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import * as Icons from "lucide-react";
import { ChevronDown, ChevronRight, FileCode } from "lucide-react";
import { ParentNodeData } from "../types/diagram";

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

// Renders a single graph node (top-level or child). Children are separate
// React Flow nodes connected by edges, not nested inside the parent card.
export default function ParentNode({ data, id }: NodeProps) {
  const { node, color, depth, hasChildren, isExpanded, onToggle, onFileClick } =
    data as unknown as ParentNodeData;

  const isRoot = depth === 0;
  const handleStyle = {
    background: color,
    width: 8,
    height: 8,
    border: "2px solid white",
  };

  return (
    <div
      className={`rounded-2xl shadow-lg transition-all duration-200 ${
        hasChildren ? "cursor-pointer" : ""
      }`}
      style={{
        width: isRoot ? 240 : 210,
        border: `2px solid ${color}60`,
        background: isRoot
          ? `linear-gradient(135deg, ${color}f0, ${color}c0)`
          : `linear-gradient(135deg, ${color}d0, ${color}a0)`,
      }}
      onClick={() => {
        if (hasChildren) onToggle(id);
      }}
    >
      <Handle type="target" position={Position.Top} style={handleStyle} />

      <div className="flex items-start gap-2.5 p-3 select-none">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/25">
          {getIcon(node.icon, "w-4 h-4 text-white")}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`${
              isRoot ? "text-sm font-bold" : "text-xs font-semibold"
            } text-white leading-tight truncate`}
          >
            {node.name}
          </p>
          <p className="text-[11px] text-white/70 leading-tight truncate">
            {node.subtitle}
          </p>

          {node.files.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {node.files.slice(0, 2).map((file) => (
                <button
                  key={file}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileClick(file);
                  }}
                  className="nodrag nopan text-[9px] text-white/90 bg-white/20 hover:bg-white/35 px-1.5 py-0.5 rounded truncate max-w-[90px] transition-colors cursor-pointer"
                >
                  {file.split("/").pop()}
                </button>
              ))}
            </div>
          )}
        </div>

        {hasChildren && (
          <span className="flex-shrink-0 text-white/80 mt-0.5">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} style={handleStyle} />
    </div>
  );
}
