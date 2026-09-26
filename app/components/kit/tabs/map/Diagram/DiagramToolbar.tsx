// app/components/kit/tabs/map/Diagram/DiagramToolbar.tsx
"use client";

import {
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Architecture } from "../types/diagram";

interface Props {
  architecture: Architecture;
}

// Convert Architecture JSON to Mermaid string for export
function toMermaid(architecture: Architecture): string {
  const lines = ["graph LR"];

  for (const node of architecture.nodes) {
    lines.push(`  ${node.id}[${node.name}]`);
  }

  for (const edge of architecture.edges) {
    lines.push(`  ${edge.source} -->|${edge.relation}| ${edge.target}`);
  }

  return lines.join("\n");
}

export default function DiagramToolbar({ architecture }: Props) {
  const { getNodes } = useReactFlow();
  const [copied, setCopied] = useState(false);

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
    navigator.clipboard.writeText(toMermaid(architecture));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Hidden buttons — triggered via document.getElementById from YourMapTab
  return (
    <div className="hidden">
      <button id="export-png-btn" onClick={handleExportPng} />
      <button id="copy-mermaid-btn" onClick={handleCopyMermaid} />
    </div>
  );
}
