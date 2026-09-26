// app/components/kit/tabs/chat/ChatMessage.tsx
"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Message } from "./types/chat";
import { useState } from "react";

interface Props {
  message: Message;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer border ${
        copied
          ? "bg-green-500/15 border-green-500/30 text-green-400"
          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-gray-200"
      }`}
    >
      {copied ? (
        <>
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg
            className="w-3 h-3"
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
          Copy
        </>
      )}
    </button>
  );
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end items-end gap-2">
        <div className="flex flex-col items-end gap-1 max-w-[70%]">
          <div className="bg-indigo-600 text-white rounded-2xl rounded-br-sm px-4 py-3">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <span className="text-[10px] text-gray-400 pr-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mb-4">
          <span className="text-indigo-600 text-xs font-bold">V</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mb-4">
        <span className="text-white text-[10px] font-bold">&gt;_</span>
      </div>

      <div className="flex flex-col gap-1 max-w-[75%]">
        {message.usedFallback && (
          <div className="flex items-center gap-1.5 mb-1">
            <svg
              className="w-3 h-3 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-[10px] font-medium text-indigo-500">
              Searched codebase for this answer
            </span>
          </div>
        )}

        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm overflow-hidden">
          <div
            className="px-4 py-3 prose prose-sm max-w-none
    prose-p:text-sm prose-p:leading-relaxed prose-p:text-gray-600 prose-p:my-1.5
    prose-strong:text-gray-900 prose-strong:font-semibold
    prose-headings:font-bold prose-headings:text-gray-900
    prose-h1:text-base prose-h2:text-sm prose-h3:text-sm

    prose-ol:text-sm prose-ol:text-gray-600 prose-ol:my-1.5 prose-ol:pl-4
    prose-ul:text-sm prose-ul:text-gray-600 prose-ul:my-1.5 prose-ul:pl-4
    prose-li:my-0.5 prose-li:leading-relaxed

    prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline

    prose-pre:p-0
    prose-pre:m-0
    prose-pre:bg-transparent
    prose-pre:rounded-none"
          >
            <ReactMarkdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className ?? "");
                  const codeString = String(children).replace(/\n$/, "");
                  const isBlock = !!match || codeString.includes("\n");

                  if (isBlock) {
                    const lang = match?.[1] ?? "code";
                    return (
                      <div className="my-4 rounded-xl overflow-hidden border border-[#313244] shadow-lg shadow-black/20">
                        {/* Header bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-[#313244]">
                          <div className="flex items-center gap-2.5">
                            {/* Traffic-light dots */}
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                            </div>
                            {/* Language pill */}
                            <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/25 text-[10px] font-semibold text-indigo-300 font-mono tracking-wide uppercase">
                              {lang}
                            </span>
                          </div>
                          <CopyCodeButton code={codeString} />
                        </div>
                        {/* Code content */}
                        <SyntaxHighlighter
                          style={atomDark}
                          language={lang}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            fontSize: "12.5px",
                            lineHeight: "1.7",
                            padding: "16px",
                            background: "#1e1e2e",
                          }}
                          codeTagProps={{
                            style: {
                              fontFamily:
                                "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace",
                            },
                          }}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  // Inline code
                  return (
                    <code
                      className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-xs font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        <span className="text-[10px] text-gray-400 pl-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
