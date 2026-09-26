"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingSteps from "@/components/loading/LoadingSteps";
import LoadingProgress from "@/components/loading/LoadingProgress";

type StepStatus = "pending" | "active" | "complete";

interface Step {
  label: string;
  status: StepStatus;
}

const INITIAL_STEPS: Step[] = [
  { label: "Fetching repository structure", status: "pending" },
  { label: "Reading file structure and key files", status: "pending" },
  { label: "Generating your architecture map", status: "pending" },
  { label: "Building your setup guide", status: "pending" },
  { label: "Finding gotchas and conventions", status: "pending" },
  { label: "Suggesting your first task", status: "pending" },
  { label: "Preparing your chat context", status: "pending" },
];

function setStep(
  steps: Step[],
  index: number,
  status: StepStatus,
): Step[] {
  return steps.map((s, i) => (i === index ? { ...s, status } : s));
}

function setStepsRange(
  steps: Step[],
  from: number,
  to: number,
  status: StepStatus,
): Step[] {
  return steps.map((s, i) =>
    i >= from && i <= to ? { ...s, status } : s,
  );
}

export default function LoadingKitPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const repo = searchParams.get("repo") ?? "";
  const role = searchParams.get("role") ?? "";
  const level = searchParams.get("level") ?? "";

  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    async function run() {
      // Step 0 active
      setSteps((prev) => setStep(prev, 0, "active"));

      await delay(800);

      // Step 0 complete, step 1 active
      setSteps((prev) => {
        let next = setStep(prev, 0, "complete");
        next = setStep(next, 1, "active");
        return next;
      });
      setProgress(15);

      await delay(800);

      // Step 1 complete, step 2 active
      setSteps((prev) => {
        let next = setStep(prev, 1, "complete");
        next = setStep(next, 2, "active");
        return next;
      });
      setProgress(28);

      // Kick off fetch
      const fetchPromise = fetch("/api/generate-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo, role, level }),
      });

      // Progress ticker — stops at 90
      intervalId = setInterval(() => {
        setProgress((p) => (p < 90 ? p + 1 : p));
      }, 400);

      // Step cycler for steps 2–6 every 3 s
      let activeStep = 2;
      const stepCycler = setInterval(() => {
        activeStep = Math.min(activeStep + 1, 6);
        setSteps((prev) => {
          let next = setStep(prev, activeStep - 1, "complete");
          next = setStep(next, activeStep, "active");
          return next;
        });
      }, 3000);

      try {
        const res = await fetchPromise;
        clearInterval(intervalId!);
        clearInterval(stepCycler);

        if (!res.ok) {
          const body = await res.json().catch(() => ({ message: res.statusText }));
          setError((body as { message?: string }).message ?? "Something went wrong.");
          return;
        }

        const data = await res.json();
        sessionStorage.setItem("kit", JSON.stringify(data));

        setSteps((prev) => setStepsRange(prev, 0, 6, "complete"));
        setProgress(100);

        await delay(600);
        const params = new URLSearchParams({ repo, role, level });
        router.push(`/kit?${params.toString()}`);
      } catch (err) {
        clearInterval(intervalId!);
        clearInterval(stepCycler);
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    }

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: "#0F0F1A" }}
      >
        <p className="text-red-400 text-sm text-center max-w-md">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#0F0F1A" }}
    >
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            &gt;_
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Day Zero
          </span>
        </div>

        {/* Repo name */}
        {repo && (
          <p className="text-indigo-400 text-xs font-mono -mt-4">{repo}</p>
        )}

        {/* Steps */}
        <LoadingSteps steps={steps} />

        {/* Progress bar */}
        <LoadingProgress progress={progress} />
      </div>
    </div>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
