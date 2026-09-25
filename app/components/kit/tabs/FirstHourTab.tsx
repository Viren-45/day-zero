import StepCard from "@/components/kit/shared/StepCard";

interface FirstHourItem {
  step: number;
  title: string;
  description: string;
}

interface FirstHourTabProps {
  firstHour: FirstHourItem[];
}

export default function FirstHourTab({ firstHour }: FirstHourTabProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Your First Hour</h2>
      <div className="mt-4 flex flex-col gap-3">
        {firstHour.map((item) => (
          <StepCard
            key={item.step}
            step={item.step}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
