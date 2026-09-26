// app/components/kit/tabs/map/FileTree/FileTreeNode.tsx
"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { FileTreeItem } from "../types/diagram";
import { getFileIcon, getFolderColor } from "./fileTreeUtils";

interface Props {
  item: FileTreeItem;
  depth: number;
  onFileClick: (path: string) => void;
  selectedFile?: string;
  highlightedFiles?: string[];
}

export default function FileTreeNode({
  item,
  depth,
  onFileClick,
  selectedFile,
  highlightedFiles = [],
}: Props) {
  const [isOpen, setIsOpen] = useState(depth === 0);

  const isFolder = item.type === "folder";
  const isSelected = selectedFile === item.path;
  const isHighlighted = highlightedFiles.includes(item.path);

  const indentPx = depth * 12;

  if (isFolder) {
    return (
      <div>
        {/* Folder row */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-1.5 px-2 py-1 hover:bg-gray-100 transition-colors rounded-lg group cursor-pointer"
          style={{ paddingLeft: `${8 + indentPx}px` }}
        >
          <span className="flex-shrink-0 text-gray-400">
            {isOpen ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </span>
          <span className="flex-shrink-0">
            {isOpen ? (
              <FolderOpen
                className="w-3.5 h-3.5"
                style={{ color: getFolderColor(item.name) }}
              />
            ) : (
              <Folder
                className="w-3.5 h-3.5"
                style={{ color: getFolderColor(item.name) }}
              />
            )}
          </span>
          <span className="text-sm font-medium text-gray-700 truncate">
            {item.name}
          </span>
        </button>

        {/* Children */}
        {isOpen && item.children && (
          <div>
            {item.children.map((child) => (
              <FileTreeNode
                key={child.path}
                item={child}
                depth={depth + 1}
                onFileClick={onFileClick}
                selectedFile={selectedFile}
                highlightedFiles={highlightedFiles}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // File row
  return (
    <button
      onClick={() => onFileClick(item.path)}
      className={`w-full flex items-center gap-2 px-2 py-1 rounded-lg transition-all cursor-pointer text-left ${
        isSelected
          ? "bg-indigo-100 text-indigo-700"
          : isHighlighted
            ? "bg-amber-50 text-amber-700"
            : "hover:bg-gray-100 text-gray-600"
      }`}
      style={{ paddingLeft: `${8 + indentPx}px` }}
    >
      <span className="text-[11px] flex-shrink-0">
        {getFileIcon(item.name)}
      </span>
      <span className={`text-sm truncate ${isSelected ? "font-semibold" : ""}`}>
        {item.name}
      </span>
    </button>
  );
}
