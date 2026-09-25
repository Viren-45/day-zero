import SeverityBadge from "@/components/kit/shared/SeverityBadge";

interface WatchOutItem {
  severity: "High" | "Medium" | "Low";
  title: string;
  description: string;
}

interface WatchOutTabProps {
  watchOut: WatchOutItem[];
}

export default function WatchOutTab({ watchOut }: WatchOutTabProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">⚠️ Watch Out</h2>
      <div className="mt-4 flex flex-col gap-3">
        {watchOut.map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="absolute right-4 top-4">
              <SeverityBadge severity={item.severity} />
            </div>
            <p className="pr-20 font-bold text-gray-800">{item.title}</p>
            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
