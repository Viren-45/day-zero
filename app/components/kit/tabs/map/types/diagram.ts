// app/components/kit/tabs/map/types/diagram.ts

// ── Node types ────────────────────────────────────────────────────────────────

export interface ArchitectureChildNode {
  id: string;
  name: string;
  subtitle: string;
  icon: string; // Lucide icon name from iconList.ts
  files: string[]; // actual file paths from repo
  description: string;
  children?: ArchitectureChildNode[]; // Claude decides depth
}

export interface ArchitectureNode {
  id: string;
  name: string;
  subtitle: string;
  type: string; // Claude decides freely e.g. "authentication", "database"
  color: string; // hex color Claude decides e.g. "#6366f1"
  icon: string; // Lucide icon name from iconList.ts
  description: string;
  files: string[]; // actual file paths from repo
  children?: ArchitectureChildNode[];
}

// ── Edge types ────────────────────────────────────────────────────────────────

export interface ArchitectureEdge {
  source: string; // node id
  target: string; // node id
  relation: string; // Claude decides e.g. "calls", "reads/writes", "authenticates"
}

// ── Full architecture ─────────────────────────────────────────────────────────

export interface Architecture {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  explanation: string;
}

// ── File tree ─────────────────────────────────────────────────────────────────

export interface FileTreeItem {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileTreeItem[];
}

// ── React Flow node data ──────────────────────────────────────────────────────

// Used for both top-level and child nodes in the graph
export interface ParentNodeData extends Record<string, unknown> {
  node: {
    id: string;
    name: string;
    subtitle: string;
    icon: string;
    files: string[];
  };
  color: string;
  rootId: string; // id of the top-level node this belongs to
  depth: number; // 0 = top-level
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: (id: string) => void; // receives the flow node id
  onFileClick: (filePath: string) => void;
}

export interface ChildNodeData extends Record<string, unknown> {
  node: ArchitectureChildNode;
  depth: number;
  onFileClick: (filePath: string) => void;
}

// ── Code viewer ───────────────────────────────────────────────────────────────

export interface SelectedFile {
  path: string;
  content: string;
  language: string;
}
