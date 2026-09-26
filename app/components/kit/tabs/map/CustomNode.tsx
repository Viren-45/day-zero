// app/components/kit/tabs/map/CustomNode.tsx
"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import { CustomNodeData, CustomNodeType } from "./types/diagram";

export default function CustomNode({
  data,
  selected,
}: NodeProps<CustomNodeType>) {
  const nodeData = data as CustomNodeData;

  return (
    <div
      className="rounded-xl px-4 py-3 min-w-[140px] max-w-[180px] cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: nodeData.bg,
        border: `2px solid ${selected ? nodeData.text : nodeData.border}`,
        boxShadow: selected
          ? `0 0 0 3px ${nodeData.border}`
          : "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#CBD5E1", width: 8, height: 8 }}
      />

      <div className="flex items-center gap-2 mb-1">
        <span className="text-base leading-none">{nodeData.icon}</span>
        <span
          className="text-xs font-bold leading-tight"
          style={{ color: nodeData.text }}
        >
          {nodeData.label}
        </span>
      </div>

      {nodeData.subtitle && (
        <p
          className="text-[10px] leading-tight ml-6"
          style={{ color: nodeData.text, opacity: 0.65 }}
        >
          {nodeData.subtitle}
        </p>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#CBD5E1", width: 8, height: 8 }}
      />
    </div>
  );
}
