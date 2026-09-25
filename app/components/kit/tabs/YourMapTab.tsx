interface YourMapTabProps {
  map: {
    mermaid: string;
    explanation: string;
  };
}

export default function YourMapTab({ map }: YourMapTabProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Architecture Map</h2>
      <p className="mt-4 text-base leading-relaxed text-gray-600">
        {map.explanation}
      </p>
      <p className="mt-4 text-sm italic text-gray-400">
        Visual diagram coming soon.
      </p>
    </div>
  );
}
