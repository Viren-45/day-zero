// app/components/kit/tabs/map/FileTree/FileTree.tsx
"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { buildFileTree } from "./fileTreeUtils";
import FileTreeNode from "./FileTreeNode";

interface Props {
  paths: string[];
  onFileClick: (path: string) => void;
  selectedFile?: string;
  highlightedFiles?: string[];
}

export default function FileTree({
  paths,
  onFileClick,
  selectedFile,
  highlightedFiles = [],
}: Props) {
  const [search, setSearch] = useState("");

  const tree = useMemo(() => buildFileTree(paths), [paths]);

  const filteredPaths = useMemo(() => {
    if (!search.trim()) return null;
    return paths.filter((p) => p.toLowerCase().includes(search.toLowerCase()));
  }, [search, paths]);

  const filteredTree = useMemo(() => {
    if (!filteredPaths) return tree;
    return buildFileTree(filteredPaths);
  }, [filteredPaths, tree]);

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-3 py-2 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-100 transition-all">
          <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="flex-1 text-xs bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-2 px-1">
        {filteredTree.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">
            No files found
          </p>
        ) : (
          filteredTree.map((item) => (
            <FileTreeNode
              key={item.path}
              item={item}
              depth={0}
              onFileClick={onFileClick}
              selectedFile={selectedFile}
              highlightedFiles={highlightedFiles}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-gray-100 flex-shrink-0">
        <p className="text-[10px] text-gray-400">{paths.length} files</p>
      </div>
    </div>
  );
}
