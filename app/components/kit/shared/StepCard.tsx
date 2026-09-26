// app/components/kit/shared/StepCard.tsx

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  total?: number;
}

export default function StepCard({
  step,
  title,
  description,
  total,
}: StepCardProps) {
  return (
    <div className="relative flex gap-5">
      {/* Left column — number + vertical line */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 shadow-md shadow-indigo-200 z-10">
          <span className="text-sm font-bold text-white">{step}</span>
        </div>
        {total && step < total && (
          <div className="mt-1 w-px flex-1 bg-linear-to-b from-indigo-200 to-transparent min-h-8" />
        )}
      </div>

      {/* Right column — content card */}
      <div className="flex-1 pb-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">
              Step {step}
            </span>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
          <div className="w-8 h-0.5 bg-indigo-100 rounded mb-3" />
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
