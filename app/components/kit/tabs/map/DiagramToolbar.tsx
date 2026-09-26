// app/components/kit/tabs/map/DiagramToolbar.tsx
"use client";

import {
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import { toPng } from "html-to-image";

interface Props {
  mermaid: string;
}

export default function DiagramToolbar({ mermaid }: Props) {
  const { getNodes } = useReactFlow();

  async function handleExportPng() {
    const nodes = getNodes();
    const bounds = getNodesBounds(nodes);
    const viewport = getViewportForBounds(bounds, 1200, 800, 0.5, 2, 0.1);

    const el = document.querySelector(
      ".react-flow__viewport",
    ) as HTMLElement | null;
    if (!el) return;

    const dataUrl = await toPng(el, {
      backgroundColor: "#F8FAFC",
      width: 1200,
      height: 800,
      style: {
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    });

    const link = document.createElement("a");
    link.download = "architecture-diagram.png";
    link.href = dataUrl;
    link.click();
  }

  function handleCopyMermaid() {
    navigator.clipboard.writeText(mermaid);
  }

  return (
    <div className="flex items-center gap-2 justify-end mb-3">
      <button
        onClick={handleExportPng}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:border-gray-300 hover:text-gray-800 transition-colors cursor-pointer shadow-sm"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
          />
        </svg>
        Export PNG
      </button>
      <button
        onClick={handleCopyMermaid}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:border-gray-300 hover:text-gray-800 transition-colors cursor-pointer shadow-sm"
      >
        <svg
          className="w-3.5 h-3.5"
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
        Copy Mermaid
      </button>
    </div>
  );
}
