// app/components/home/mockup/MockupSidebar.tsx

const tabs = [
  { icon: "⬡", label: "Your Map", active: true },
  { icon: "⏱", label: "First Hour", active: false },
  { icon: "⚠", label: "Watch Out", active: false },
  { icon: "✓", label: "First Task", active: false },
  { icon: "💬", label: "Ask Anything", active: false },
];

export default function MockupSidebar() {
  return (
    <aside className="border-r border-gray-100 p-4 flex flex-col gap-1">
      <button className="flex items-center gap-2 text-xs text-indigo-600 font-medium mb-3 hover:text-indigo-700">
        <span className="text-base leading-none">+</span> New Kit
      </button>

      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 px-2">
        Current Session
      </p>

      {tabs.map((tab) => (
        <div
          key={tab.label}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
            tab.active
              ? "bg-indigo-50 text-indigo-700 font-semibold"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <span className="text-base leading-none w-4 text-center">
            {tab.icon}
          </span>
          {tab.label}
        </div>
      ))}
    </aside>
  );
}
