type StepStatus = "pending" | "active" | "complete";

interface Step {
  label: string;
  status: StepStatus;
}

interface LoadingStepsProps {
  steps: Step[];
}

export default function LoadingSteps({ steps }: LoadingStepsProps) {
  return (
    <ul className="flex flex-col gap-3">
      {steps.map((step, i) => (
        <li key={i} className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {step.status === "complete" && (
              <svg
                className="w-5 h-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {step.status === "active" && (
              <svg
                className="w-5 h-5 text-indigo-400 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {step.status === "pending" && (
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="none"
              >
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </div>

          {/* Label */}
          <span
            className={`text-sm transition-colors ${
              step.status === "active"
                ? "text-white font-medium"
                : step.status === "complete"
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {step.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
