interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

export default function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600">
        <span className="text-sm font-bold text-white">{step}</span>
      </div>
      <div>
        <p className="font-bold text-gray-800">{title}</p>
        <p className="mt-0.5 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
