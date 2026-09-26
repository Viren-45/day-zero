// app/components/kit/tabs/AskAnythingTab.tsx
"use client";

import { useState } from "react";
import { Message } from "./chat/types/chat";
import ChatWindow from "./chat/ChatWindow";
import ChatInput from "./chat/ChatInput";

interface Props {
  chatContext: string;
}

const SEARCHING_ID = "searching-indicator";

export default function AskAnythingTab({ chatContext }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function getRepoPath(): string {
    try {
      const kit = sessionStorage.getItem("kit");
      if (kit) {
        const parsed = JSON.parse(kit) as { repoPath?: string };
        return parsed.repoPath ?? "";
      }
    } catch {
      /* ignore */
    }
    return "";
  }

  // Safety net — if answer is still raw JSON somehow, never show it to user
  function isSafeAnswer(answer: string): boolean {
    try {
      const trimmed = answer.trim();
      if (trimmed.startsWith("{")) {
        const parsed = JSON.parse(trimmed) as Record<string, unknown>;
        if (parsed.needsMoreContext === true) return false;
      }
    } catch {
      /* not JSON, safe to show */
    }
    return true;
  }

  async function handleSubmit(question?: string) {
    const q = (question ?? input).trim();
    if (!q || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: q,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Show friendly searching indicator immediately
    const searchingMessage: Message = {
      id: SEARCHING_ID,
      role: "bot",
      content: "🔍 Searching the codebase...",
      usedFallback: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, searchingMessage]);

    try {
      const res = await fetch("/api/ask-anything", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          chatContext,
          repoPath: getRepoPath(),
          history: messages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
          })),
        }),
      });

      const data = (await res.json()) as {
        answer: string;
        usedFallback: boolean;
      };

      // Remove searching indicator and add real response
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: "bot",
        content: isSafeAnswer(data.answer)
          ? data.answer
          : "I searched the codebase but couldn't find a specific answer for that. Try rephrasing your question or ask about a specific file or feature.",
        usedFallback: data.usedFallback,
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== SEARCHING_ID),
        botMessage,
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== SEARCHING_ID),
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: "Sorry, something went wrong. Please try again.",
          usedFallback: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col -m-8 h-[calc(100vh-7rem)]">
      <div className="flex flex-col flex-1 mx-4 my-4 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-sm font-extrabold text-gray-900">Ask Anything</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Powered by AI with live codebase search
          </p>
        </div>

        {/* Messages */}
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSuggestedQuestion={(q) => handleSubmit(q)}
        />

        {/* Input */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={() => handleSubmit()}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
