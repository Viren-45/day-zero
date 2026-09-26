// app/components/kit/tabs/map/CodeViewer/CodeViewer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check, Loader2, ExternalLink } from "lucide-react";
import { SelectedFile } from "../types/diagram";

const customDark = {
  ...atomOneDark,
  "hljs-keyword": { color: "#ff9500" },
  "hljs-built_in": { color: "#82aaff" },
  "hljs-type": { color: "#ffcb6b" },
  "hljs-literal": { color: "#ff5874" },
  "hljs-number": { color: "#f78c6c" },
  "hljs-regexp": { color: "#ff5874" },
  "hljs-string": { color: "#c3e88d" },
  "hljs-subst": { color: "#f07178" },
  "hljs-symbol": { color: "#82aaff" },
  "hljs-class": { color: "#ffcb6b" },
  "hljs-function": { color: "#82aaff" },
  "hljs-title": { color: "#82aaff" },
  "hljs-params": { color: "#f07178" },
  "hljs-comment": { color: "#637777", fontStyle: "italic" as const },
  "hljs-doctag": { color: "#637777" },
  "hljs-meta": { color: "#80cbc4" },
  "hljs-attr": { color: "#ffcb6b" },
  "hljs-attribute": { color: "#c3e88d" },
  "hljs-variable": { color: "#f07178" },
  "hljs-tag": { color: "#ff5874" },
  "hljs-name": { color: "#ff5874" },
  "hljs-selector-id": { color: "#82aaff" },
  "hljs-selector-class": { color: "#addb67" },
  "hljs-selector-attr": { color: "#ff9500" },
  "hljs-selector-pseudo": { color: "#addb67" },
  "hljs-addition": { color: "#addb67" },
  "hljs-deletion": { color: "#ef535090" },
  "hljs-link": { color: "#82aaff" },
};

interface Props {
  repoPath: string;
  filePath: string;
  onClose: () => void;
  onTabChange: (tab: "diagram" | "code") => void;
}

export default function CodeViewer({ repoPath, filePath }: Props) {
  const [file, setFile] = useState<SelectedFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const cache = useRef<Map<string, SelectedFile>>(new Map());

  useEffect(() => {
    if (!filePath) return;

    if (cache.current.has(filePath)) {
      setFile(cache.current.get(filePath)!);
      return;
    }

    async function fetchFile() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/file-content?repo=${encodeURIComponent(repoPath)}&path=${encodeURIComponent(filePath)}`,
        );
        if (!res.ok) throw new Error("File not found");
        const data = (await res.json()) as SelectedFile;
        cache.current.set(filePath, data);
        setFile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load file");
      } finally {
        setLoading(false);
      }
    }

    fetchFile();
  }, [filePath, repoPath]);

  function handleCopyPath() {
    navigator.clipboard.writeText(filePath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleCopyCode() {
    if (!file) return;
    navigator.clipboard.writeText(file.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  }

  const githubUrl = `https://github.com/${repoPath}/blob/HEAD/${filePath}`;

  return (
    <div className="flex flex-col h-full">
      {/* File path bar — minimal, just path + copy icon */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-[#2d2d2d] flex-shrink-0">
        {/* Filename + copy-path icon together so icon hugs the text end */}
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <code className="text-xs font-mono text-white truncate">
            {filePath}
          </code>
          <button
            onClick={handleCopyPath}
            title="Copy file path"
            className="flex-shrink-0 text-gray-500 hover:text-gray-200 transition-colors cursor-pointer p-1 rounded hover:bg-white/10"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Copy code button */}
        {file && (
          <button
            onClick={handleCopyCode}
            title="Copy code"
            className="flex-shrink-0 flex items-center gap-1 text-[10px] text-white hover:text-gray-200 transition-colors cursor-pointer px-1.5 py-1.5 rounded hover:bg-white/10"
          >
            {copiedCode ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copiedCode ? "Copied!" : "Copy code"}
          </button>
        )}

        {file && (
          <span className="text-[10px] text-white flex-shrink-0">
            {file.content.split("\n").length} lines
          </span>
        )}
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-auto">
        {loading && (
          <div className="flex items-center justify-center h-full gap-2 text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading file...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <p className="text-sm text-red-400">{error}</p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              View on GitHub instead
            </a>
          </div>
        )}

        {file && !loading && (
          <SyntaxHighlighter
            style={customDark}
            language={file.language}
            showLineNumbers
            className="syntax-highlighter"
            lineNumberStyle={{
              color: "#4a5568",
              fontSize: "11px",
              paddingRight: "16px",
              minWidth: "40px",
              userSelect: "none",
            }}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: "12.5px",
              lineHeight: "1.7",
              padding: "16px",
              background: "#1e1e1e",
              minHeight: "100%",
              textShadow: "none",
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
                background: "transparent",
              },
            }}
          >
            {file.content}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
