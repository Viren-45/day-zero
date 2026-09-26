// app/components/kit/tabs/map/MermaidParser.ts

import {
  ParsedNode,
  ParsedEdge,
  NodeColor,
  CustomNodeType,
  CustomEdgeType,
  DiagramData,
} from "./types/diagram";

function getNodeColor(label: string): NodeColor {
  const l = label.toLowerCase();
  if (
    l.includes("client") ||
    l.includes("browser") ||
    l.includes("page") ||
    l.includes("frontend") ||
    l.includes("component") ||
    l.includes("ui") ||
    l.includes("hook")
  )
    return { bg: "#EFF6FF", border: "#BFDBFE", text: "#1D4ED8", icon: "🖥" };
  if (
    l.includes("api") ||
    l.includes("route") ||
    l.includes("server") ||
    l.includes("handler") ||
    l.includes("action") ||
    l.includes("backend")
  )
    return { bg: "#F5F3FF", border: "#DDD6FE", text: "#7C3AED", icon: "</>" };
  if (
    l.includes("auth") ||
    l.includes("security") ||
    l.includes("session") ||
    l.includes("login") ||
    l.includes("supabase")
  )
    return { bg: "#F0FDF4", border: "#BBF7D0", text: "#15803D", icon: "🛡" };
  if (
    l.includes("database") ||
    l.includes("db") ||
    l.includes("postgres") ||
    l.includes("storage") ||
    l.includes("mysql") ||
    l.includes("mongo")
  )
    return { bg: "#FFF1F2", border: "#FECDD3", text: "#BE123C", icon: "🗄" };
  if (
    l.includes("ai") ||
    l.includes("claude") ||
    l.includes("gemini") ||
    l.includes("voice") ||
    l.includes("external") ||
    l.includes("service")
  )
    return { bg: "#FEFCE8", border: "#FDE68A", text: "#B45309", icon: "☁" };
  if (l.includes("cache") || l.includes("redis"))
    return { bg: "#FFF7ED", border: "#FED7AA", text: "#C2410C", icon: "⚡" };
  if (
    l.includes("util") ||
    l.includes("lib") ||
    l.includes("style") ||
    l.includes("tailwind") ||
    l.includes("chart") ||
    l.includes("recharts")
  )
    return { bg: "#F0F9FF", border: "#BAE6FD", text: "#0369A1", icon: "🔧" };
  return { bg: "#F8FAFC", border: "#E2E8F0", text: "#475569", icon: "📦" };
}

const SKIP_KEYWORDS = new Set([
  "graph",
  "flowchart",
  "subgraph",
  "end",
  "TB",
  "TD",
  "LR",
  "RL",
  "BT",
  "true",
  "false",
]);

// Extract the content inside the first bracket pair [...] or (...) or {...}
function extractBracketContent(
  line: string,
): { id: string; content: string } | null {
  // Match ID followed by [, (, or { then capture everything until the matching close
  const match = line.match(/^\s*([A-Za-z0-9_]+)\s*[\[({]([\s\S]*?)[\]})]\s*$/);
  if (!match) return null;
  const id = match[1];
  if (SKIP_KEYWORDS.has(id)) return null;
  return { id, content: match[2] };
}

function cleanContent(raw: string): { label: string; subtitle?: string } {
  // Remove surrounding quotes
  let cleaned = raw.replace(/^["']|["']$/g, "").trim();
  // Replace <br/> with newline
  cleaned = cleaned.replace(/<br\s*\/?>/gi, "\n");
  // Remove any remaining HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, "").trim();

  const parts = cleaned
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  return {
    label: parts[0] ?? raw.trim(),
    subtitle: parts[1] ?? undefined,
  };
}

function parseNodeLine(line: string): ParsedNode | null {
  // Skip lines with arrows — those are edges not node definitions
  if (/-->|->|===|---/.test(line)) return null;

  const extracted = extractBracketContent(line);
  if (!extracted) return null;

  const { label, subtitle } = cleanContent(extracted.content);
  if (!label) return null;

  return { id: extracted.id, label, subtitle };
}

function parseEdgeLine(line: string): ParsedEdge | null {
  // Match: A --> B or A -->|label| B or A --> B
  const match = line.match(
    /^\s*([A-Za-z0-9_]+)\s*--?>(?:\|([^|]*)\|)?\s*([A-Za-z0-9_]+)/,
  );
  if (!match) return null;
  if (SKIP_KEYWORDS.has(match[1]) || SKIP_KEYWORDS.has(match[3])) return null;
  return {
    from: match[1],
    to: match[3],
    label: match[2]?.trim() ?? undefined,
  };
}

function layoutNodes(nodes: ParsedNode[]): CustomNodeType[] {
  const COLS = 3;
  const X_GAP = 230;
  const Y_GAP = 140;
  const X_START = 60;
  const Y_START = 60;

  return nodes.map((n, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const color = getNodeColor(n.label);

    return {
      id: n.id,
      type: "custom",
      position: { x: X_START + col * X_GAP, y: Y_START + row * Y_GAP },
      data: {
        label: n.label,
        subtitle: n.subtitle,
        ...color,
      },
    };
  });
}

export function parseMermaid(mermaid: string): DiagramData {
  const lines = mermaid
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const nodeMap = new Map<string, ParsedNode>();
  const parsedEdges: ParsedEdge[] = [];

  // Pass 1 — collect all node label definitions (including inside subgraphs)
  for (const line of lines) {
    // Skip directive lines
    if (/^(graph|flowchart)\s/i.test(line)) continue;
    if (/^end\s*$/i.test(line)) continue;

    // Handle subgraph — extract its label as a node
    const sgMatch = line.match(
      /^subgraph\s+([A-Za-z0-9_]+)\s*(?:\[["']?(.*?)["']?\])?/i,
    );
    if (sgMatch) {
      const id = sgMatch[1];
      const rawLabel = sgMatch[2]?.trim() || id;
      const { label, subtitle } = cleanContent(rawLabel);
      if (!nodeMap.has(id)) {
        nodeMap.set(id, { id, label, subtitle });
      }
      continue;
    }

    // Skip edge lines in pass 1
    if (/-->|->/.test(line)) continue;

    // Try to parse as node definition
    const node = parseNodeLine(line);
    if (node) {
      nodeMap.set(node.id, node);
    }
  }

  // Pass 2 — collect edges AND extract inline node labels from edge lines
  for (const line of lines) {
    if (/^(graph|flowchart|subgraph)\s/i.test(line)) continue;
    if (/^end\s*$/i.test(line)) continue;

    // Check if this is an edge line
    if (!/-->|->/.test(line)) continue;

    // Extract inline node definitions from edge lines
    // e.g. "A --> B[Label]" or "A[Label] --> B[Label]"
    const inlineNodeRegex = /([A-Za-z0-9_]+)\[([^\]]+)\]/g;
    let inlineMatch;
    while ((inlineMatch = inlineNodeRegex.exec(line)) !== null) {
      const id = inlineMatch[1];
      if (SKIP_KEYWORDS.has(id)) continue;
      if (!nodeMap.has(id)) {
        const { label, subtitle } = cleanContent(inlineMatch[2]);
        nodeMap.set(id, { id, label, subtitle });
      }
    }

    // Now parse the edge itself
    const edge = parseEdgeLine(line);
    if (edge) {
      parsedEdges.push(edge);
      // Register bare IDs that had no label anywhere
      if (!nodeMap.has(edge.from)) {
        nodeMap.set(edge.from, { id: edge.from, label: edge.from });
      }
      if (!nodeMap.has(edge.to)) {
        nodeMap.set(edge.to, { id: edge.to, label: edge.to });
      }
    }
  }

  const nodes = layoutNodes(Array.from(nodeMap.values()));

  const edges: CustomEdgeType[] = parsedEdges.map((e, i) => ({
    id: `e${i}-${e.from}-${e.to}`,
    source: e.from,
    target: e.to,
    label: e.label,
    type: "smoothstep",
    style: { stroke: "#CBD5E1", strokeWidth: 1.5 },
    labelStyle: { fontSize: 10, fill: "#94A3B8" },
  }));

  return { nodes, edges };
}
