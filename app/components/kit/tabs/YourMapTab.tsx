// app/components/kit/tabs/YourMapTab.tsx
"use client";

import { useState, useCallback } from "react";
import { Architecture } from "./map/types/diagram";
import FileTree from "./map/FileTree/FileTree";
import ArchitectureDiagram from "./map/Diagram/ArchitectureDiagram";
import CodeViewer from "./map/CodeViewer/CodeViewer";
import NodeDetail from "./map/NodeDetail";
import { Download, Copy, ExternalLink } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function RepoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

interface Props {
  map: Architecture;
  fileTree: string[];
  repoPath: string;
  chatContext: string;
}

type ActiveTab = "diagram" | "code";

export default function YourMapTab({ map, fileTree, repoPath }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("diagram");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = selectedNodeId
    ? (map.nodes.find((n) => n.id === selectedNodeId) ?? null)
    : null;

  const handleFileClick = useCallback((filePath: string) => {
    setSelectedFile(filePath);
    setActiveTab("code");
  }, []);

  const handleNodeSelect = useCallback((nodeId: string | null) => {
    setSelectedNodeId(nodeId);
  }, []);

  const handleCloseCode = useCallback(() => {
    setSelectedFile(null);
    setActiveTab("diagram");
  }, []);

  return (
    // Fill the remaining screen exactly — no extra padding
    <div className="absolute inset-0 flex overflow-hidden">
      {/* ── Left: File Tree — floating with border on all sides ── */}
      <div className="absolute left-4 top-4 bottom-4 w-60 z-10 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
          {/* GitHub icon row */}
          <div className="flex items-center gap-1.5 mb-2">
            <GithubIcon className="w-4 h-4 text-gray-500" />
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              GitHub
            </span>
          </div>
          {/* Repo name + icon */}
          <div className="flex items-center gap-1.5">
            <RepoIcon className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            <p className="text-xs font-semibold text-gray-700 truncate leading-tight">
              {repoPath}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <FileTree
            paths={fileTree}
            onFileClick={handleFileClick}
            selectedFile={selectedFile ?? undefined}
          />
        </div>
      </div>

      {/* ── Right: Main content — offset by file tree width ── */}
      <div className="flex-1 flex flex-col overflow-hidden pl-[268px]">
        {/* ── Top bar: tabs + action buttons on same row ── */}
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
          {/* Tab switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("diagram")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "diagram"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => selectedFile && setActiveTab("code")}
              disabled={!selectedFile}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "code"
                  ? "bg-white text-gray-900 shadow-sm"
                  : selectedFile
                    ? "text-gray-500 hover:text-gray-700"
                    : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Code
              {selectedFile && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  {selectedFile.split("/").pop()}
                </span>
              )}
            </button>
          </div>

          {/* Action buttons — change per tab */}
          <div className="flex items-center gap-2">
            {activeTab === "diagram" && (
              <>
                <button
                  onClick={() => {
                    // Export PNG — triggers from DiagramToolbar internally
                    document.getElementById("export-png-btn")?.click();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:border-gray-300 transition-colors cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export PNG
                </button>
                <button
                  onClick={() => {
                    document.getElementById("copy-mermaid-btn")?.click();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:border-gray-300 transition-colors cursor-pointer shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Mermaid
                </button>
              </>
            )}
            {activeTab === "code" && selectedFile && (
              <>
                <a
                  href={`https://github.com/${repoPath}/blob/HEAD/${selectedFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:border-gray-300 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in GitHub
                </a>
              </>
            )}
          </div>
        </div>

        {/* ── Content area ── */}
        <div
          className={`flex-1 flex flex-col px-4 pb-4 gap-3 ${
            activeTab === "diagram" ? "overflow-y-auto" : "overflow-hidden"
          }`}
        >
          {/* Diagram tab */}
          {activeTab === "diagram" && (
            <>
              {/* Diagram — fixed height, detail card scrolls in below it */}
              <div className="h-[65vh] min-h-[420px] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-[#F8FAFC]">
                <ArchitectureDiagram
                  architecture={map}
                  onFileClick={handleFileClick}
                  onNodeSelect={handleNodeSelect}
                />
              </div>

              {/* Node detail / explanation — floating card, height auto */}
              <div className="flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {selectedNode ? (
                  <NodeDetail
                    node={selectedNode}
                    onFileClick={handleFileClick}
                  />
                ) : (
                  <div className="px-6 py-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                      Overview
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {map.explanation}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Code tab */}
          {activeTab === "code" && selectedFile && (
            <div className="flex-1 overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-[#1e1e1e]">
              <CodeViewer
                repoPath={repoPath}
                filePath={selectedFile}
                onClose={handleCloseCode}
                onTabChange={setActiveTab}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
