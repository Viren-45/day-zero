// app/components/home/mockup/MockupChat.tsx

export default function MockupChat() {
  return (
    <div className="flex flex-col p-4">
      {/* User message */}
      <div className="flex justify-end mb-1">
        <div className="flex items-start gap-2">
          <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[200px]">
            <p className="text-xs text-gray-700">
              Where does authentication happen?
            </p>
          </div>
          <div className="w-7 h-7 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-700 text-xs font-semibold">V</span>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <p className="text-[10px] text-gray-400 text-right mb-3">10:24 AM</p>

      {/* Bob message */}
      <div className="flex items-start gap-2 mb-auto">
        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[10px] font-bold">&gt;_</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1">
            Bob <span className="font-normal text-gray-400">10:25 AM</span>
          </p>
          <div className="bg-indigo-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[220px]">
            <p className="text-xs text-gray-700 leading-relaxed">
              Authentication is handled by NextAuth.js in{" "}
              <code className="bg-indigo-100 text-indigo-700 px-1 py-0.5 rounded text-[10px]">
                app/api/auth/[...nextauth].ts
              </code>
              . This file configures the auth providers and handles the session
              strategy.
            </p>
          </div>
        </div>
      </div>

      {/* Typing indicator */}
      <div className="flex gap-1 ml-9 mt-1">
        <span
          className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>

      {/* Input bar */}
      <div className="mt-3 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50">
        <p className="text-xs text-gray-400 flex-1">
          Ask anything about this codebase...
        </p>
        <button className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
          <span className="text-white text-[10px]">↑</span>
        </button>
      </div>
    </div>
  );
}
