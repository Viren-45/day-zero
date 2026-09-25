// app/components/home/mockup/MockupDiagram.tsx

const row1 = [
  {
    id: "webapp",
    label: "Web App",
    sub: "(Next.js)",
    color: "bg-blue-100 border-blue-300 text-blue-800",
  },
  {
    id: "api",
    label: "API Routes",
    sub: "(app/api)",
    color: "bg-purple-100 border-purple-300 text-purple-800",
  },
  {
    id: "auth",
    label: "Auth",
    sub: "(NextAuth.js)",
    color: "bg-green-100 border-green-300 text-green-800",
  },
];

const row2 = [
  {
    id: "db",
    label: "Database",
    sub: "(PostgreSQL)",
    color: "bg-red-100 border-red-300 text-red-800",
  },
  {
    id: "external",
    label: "External APIs",
    sub: "(Stripe, etc.)",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
  },
  {
    id: "storage",
    label: "File Storage",
    sub: "(S3)",
    color: "bg-orange-100 border-orange-300 text-orange-800",
  },
];

function Node({
  label,
  sub,
  color,
}: {
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <div
      className={`border rounded-lg px-3 py-2 text-center min-w-[90px] ${color}`}
    >
      <p className="text-xs font-semibold leading-tight">{label}</p>
      <p className="text-[10px] leading-tight opacity-70">{sub}</p>
    </div>
  );
}

export default function MockupDiagram() {
  return (
    <div className="border-r border-gray-100 p-5 flex flex-col gap-3 overflow-hidden">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-gray-800">
          Architecture Diagram
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          High-level view of this codebase and how the pieces fit together.
        </p>
      </div>

      {/* Row 1 — nodes with arrows */}
      <div className="flex items-center gap-2">
        {row1.map((node, i) => (
          <div key={node.id} className="flex items-center gap-2">
            <Node {...node} />
            {i < row1.length - 1 && (
              <span className="text-gray-300 text-sm">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Vertical connectors */}
      <div className="flex gap-2 pl-[46px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center"
            style={{ minWidth: 90, marginRight: i < 2 ? 16 : 0 }}
          >
            <div className="w-px h-3 bg-gray-200" />
            <span className="text-gray-300 text-xs">↓</span>
          </div>
        ))}
      </div>

      {/* Row 2 — nodes no arrows */}
      <div className="flex items-center gap-2">
        {row2.map((node) => (
          <Node key={node.id} {...node} />
        ))}
      </div>
    </div>
  );
}
