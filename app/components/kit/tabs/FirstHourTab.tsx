// app/components/kit/tabs/FirstHourTab.tsx

import StepCard from "@/components/kit/shared/StepCard";

interface FirstHourItem {
  step: number;
  title: string;
  description: string;
}

interface Props {
  firstHour: FirstHourItem[];
}

export default function FirstHourTab({ firstHour }: Props) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Your First Hour
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Follow these steps in order to get up and running as fast as possible.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col">
        {firstHour.map((item) => (
          <StepCard
            key={item.step}
            step={item.step}
            title={item.title}
            description={item.description}
            total={firstHour.length}
          />
        ))}
      </div>
    </div>
  );
}
