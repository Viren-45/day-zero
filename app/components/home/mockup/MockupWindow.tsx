// app/components/home/mockup/MockupWindow.tsx
// Main wrapper — assembles sidebar, diagram and chat into a macOS-style window

import MockupSidebar from "./MockupSidebar";
import MockupDiagram from "./MockupDiagram";
import MockupChat from "./MockupChat";

export default function MockupWindow() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />

        {/* Mini logo */}
        <div className="flex items-center gap-2 ml-3">
          <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">&gt;_</span>
          </div>
          <span className="text-sm font-semibold text-gray-700">Day Zero</span>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-[200px_1fr_1fr] h-[380px]">
        <MockupSidebar />
        <MockupDiagram />
        <MockupChat />
      </div>
    </div>
  );
}
