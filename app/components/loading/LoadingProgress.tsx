interface LoadingProgressProps {
  progress: number;
  completed: number;
  total: number;
}

export default function LoadingProgress({
  progress,
  completed,
  total,
}: LoadingProgressProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        {/* Track */}
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          {/* Fill */}
          <div
            className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-white/70 text-sm tabular-nums">
          {completed} / {total}
        </span>
      </div>

      {/* Caption */}
      <p className="text-white/35 text-xs">This usually takes 20–30 seconds</p>
    </div>
  );
}
