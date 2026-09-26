// app/components/kit/tabs/chat/ChatTypingIndicator.tsx

export default function ChatTypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      {/* Bot avatar */}
      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[10px] font-bold">&gt;_</span>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <span
          className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
