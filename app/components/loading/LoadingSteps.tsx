type StepStatus = "pending" | "active" | "complete";

interface Step {
  label: string;
  description: string;
  status: StepStatus;
}

interface LoadingStepsProps {
  steps: Step[];
}

export default function LoadingSteps({ steps }: LoadingStepsProps) {
  return (
    <ul className="flex flex-col gap-3.5">
      {steps.map((step, i) => (
        <li key={i} className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            {step.status === "complete" && (
              <svg
                className="w-6 h-6 text-emerald-400"
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
                className="w-6 h-6 text-indigo-400 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                />
              </svg>
            )}
            {step.status === "pending" && (
              <svg className="w-6 h-6 text-white/20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </div>

          {/* Label + description */}
          <div className="min-w-0 flex-1">
            <p
              className={`text-[13px] leading-tight transition-colors ${
                step.status === "pending" ? "text-white/50" : "text-white"
              } ${step.status === "active" ? "font-medium" : ""}`}
            >
              {step.label}
            </p>
            <p
              className={`text-[11px] mt-0.5 transition-colors ${
                step.status === "pending" ? "text-white/25" : "text-white/45"
              }`}
            >
              {step.description}
            </p>
          </div>

          {/* Pending / active indicator */}
          {step.status !== "complete" && (
            <span className="text-white/40 text-sm tracking-widest">···</span>
          )}
        </li>
      ))}
    </ul>
  );
}
