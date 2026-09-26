interface LoadingProgressProps {
  progress: number;
}

export default function LoadingProgress({ progress }: LoadingProgressProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Track */}
      <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
        {/* Fill */}
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Caption */}
      <p className="text-gray-500 text-xs text-center">
        This usually takes 20–30 seconds
      </p>
    </div>
  );
}
