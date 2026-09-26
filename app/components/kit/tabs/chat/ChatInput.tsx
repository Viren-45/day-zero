// app/components/kit/tabs/chat/ChatInput.tsx
"use client";

import { Paperclip } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: Props) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSubmit();
    }
  }

  return (
    <div className="px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <Paperclip className="w-4 h-4 text-gray-400 flex-shrink-0" />

        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about this codebase..."
            disabled={isLoading}
            rows={1}
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none resize-none disabled:opacity-50 leading-5"
            style={{ maxHeight: "80px" }}
          />
        </div>

        {/* Shift+Enter hint — visible only when input is empty */}
        {!value && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <kbd className="px-1.5 py-0.5 rounded border border-gray-300 bg-white text-[11px] text-gray-500 font-mono shadow-sm">
              Shift
            </kbd>
            <span className="text-[11px] text-gray-400">+</span>
            <kbd className="px-1.5 py-0.5 rounded border border-gray-300 bg-white text-[11px] text-gray-500 font-mono shadow-sm">
              Enter
            </kbd>
            <span className="text-[11px] text-gray-400 ml-1">new line</span>
          </div>
        )}

        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="flex-shrink-0 w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isLoading ? (
            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
