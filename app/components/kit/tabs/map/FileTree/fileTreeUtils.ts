// app/components/kit/tabs/map/FileTree/fileTreeUtils.ts

import { FileTreeItem } from "../types/diagram";

// Convert flat array of file paths into nested tree structure
export function buildFileTree(paths: string[]): FileTreeItem[] {
  const root: FileTreeItem[] = [];

  for (const path of paths) {
    const parts = path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const existing = current.find((item) => item.name === part);

      if (existing) {
        if (!isFile && existing.children) {
          current = existing.children;
        }
      } else {
        const newItem: FileTreeItem = {
          name: part,
          path: parts.slice(0, i + 1).join("/"),
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : [],
        };
        current.push(newItem);
        if (!isFile && newItem.children) {
          current = newItem.children;
        }
      }
    }
  }

  return sortTree(root);
}

// Sort — folders first then files, both alphabetically
function sortTree(items: FileTreeItem[]): FileTreeItem[] {
  return items
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    })
    .map((item) => ({
      ...item,
      children: item.children ? sortTree(item.children) : undefined,
    }));
}

// Get file icon based on extension
export function getFileIcon(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    tsx: "⚛",
    jsx: "⚛",
    ts: "𝙏",
    js: "𝙅",
    css: "🎨",
    scss: "🎨",
    json: "{}",
    md: "📝",
    mdx: "📝",
    sql: "🗄",
    yml: "⚙",
    yaml: "⚙",
    env: "🔒",
    sh: "📜",
    png: "🖼",
    jpg: "🖼",
    svg: "🖼",
    ico: "🖼",
  };
  return map[ext] ?? "📄";
}

// Get folder color based on common folder names
export function getFolderColor(name: string): string {
  const map: Record<string, string> = {
    app: "#6366f1",
    components: "#3b82f6",
    hooks: "#8b5cf6",
    lib: "#10b981",
    api: "#f59e0b",
    utils: "#64748b",
    types: "#06b6d4",
    styles: "#ec4899",
    public: "#84cc16",
    tests: "#f97316",
    config: "#94a3b8",
  };
  return map[name.toLowerCase()] ?? "#94a3b8";
}
