// app/components/kit/tabs/chat/ChatWindow.tsx
"use client";

import { useEffect, useRef } from "react";
import { Message } from "./types/chat";
import ChatMessage from "./ChatMessage";
import ChatTypingIndicator from "./ChatTypingIndicator";
import { Shield, Database, Code2 } from "lucide-react";

interface Props {
  messages: Message[];
  isLoading: boolean;
  onSuggestedQuestion: (question: string) => void;
}

const SUGGESTED = [
  {
    icon: Shield,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    title: "Where does authentication happen?",
    subtitle: "Find auth logic and related files",
  },
  {
    icon: Database,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    title: "What database is being used?",
    subtitle: "See database setup and models",
  },
  {
    icon: Code2,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    title: "How is the API structured?",
    subtitle: "Explore routes and controllers",
  },
];

export default function ChatWindow({
  messages,
  isLoading,
  onSuggestedQuestion,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-between px-4 pt-10 pb-6"
        style={{
          background:
            "radial-gradient(ellipse at 15% 20%, #ede9fe 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, #ede9fe 0%, transparent 50%)",
        }}
      >
        {/* Logo + heading */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white text-xl font-bold">&gt;_</span>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-gray-900">
              Ask me{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">
                anything
              </span>
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm leading-relaxed">
              I know this codebase inside out. Ask about files, patterns,
              architecture, or where to start.
            </p>
          </div>
        </div>

        {/* Suggested cards — anchored above the input */}
        <div className="w-full px-2 pb-2">
          <div className="grid grid-cols-3 gap-3">
            {SUGGESTED.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.title}
                  onClick={() => onSuggestedQuestion(s.title)}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm hover:border-indigo-200 hover:shadow-md transition-all text-left cursor-pointer group"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${s.iconBg}`}
                  >
                    <Icon className={`w-4 h-4 ${s.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-indigo-600 transition-colors">
                      {s.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                      {s.subtitle}
                    </p>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                    <svg className="w-3 h-3 text-gray-400 group-hover:text-indigo-500 transition-colors" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6h8M6 2l4 4-4 4" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isLoading && <ChatTypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
