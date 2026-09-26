// app/components/kit/tabs/YourMapTab.tsx
"use client";

import ArchitectureDiagram from "./map/ArchitectureDiagram";

interface MapData {
  mermaid: string;
  explanation: string;
}

interface Props {
  map: MapData;
  chatContext: string;
}

export default function YourMapTab({ map, chatContext }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <ArchitectureDiagram mermaid={map.mermaid} chatContext={chatContext} />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-800 mb-2">Overview</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {map.explanation}
        </p>
      </div>
    </div>
  );
}
