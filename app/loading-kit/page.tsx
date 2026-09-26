"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingSteps from "@/components/loading/LoadingSteps";
import LoadingProgress from "@/components/loading/LoadingProgress";
import LoadingHeader from "@/components/loading/LoadingHeader";

type StepStatus = "pending" | "active" | "complete";

interface Step {
  label: string;
  description: string;
  status: StepStatus;
}

const INITIAL_STEPS: Step[] = [
  {
    label: "Fetching repository structure",
    description: "Reading files and directories",
    status: "pending",
  },
  {
    label: "Reading file structure and key files",
    description:
      "Analyzing important files (package.json, configs, routes, etc.)",
    status: "pending",
  },
  {
    label: "Generating your architecture map",
    description: "Detecting frameworks, services and dependencies",
    status: "pending",
  },
  {
    label: "Building your setup guide",
    description: "Identifying environment, installation and run steps",
    status: "pending",
  },
  {
    label: "Finding gotchas and conventions",
    description: "Scanning for common issues and project-specific rules",
    status: "pending",
  },
  {
    label: "Suggesting your first task",
    description: "Finding a safe and meaningful first contribution",
    status: "pending",
  },
  {
    label: "Preparing your chat context",
    description: "Indexing key files for Ask Anything",
    status: "pending",
  },
];

function setStep(steps: Step[], index: number, status: StepStatus): Step[] {
  return steps.map((s, i) => (i === index ? { ...s, status } : s));
}

function setStepsRange(
  steps: Step[],
  from: number,
  to: number,
  status: StepStatus,
): Step[] {
  return steps.map((s, i) => (i >= from && i <= to ? { ...s, status } : s));
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
          const body = await res
            .json()
            .catch(() => ({ message: res.statusText }));
          setError(
            (body as { message?: string }).message ?? "Something went wrong.",
          );
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

  const completed = steps.filter((s) => s.status === "complete").length;

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col items-center px-6 py-6 bg-[#0A0B1E] bg-no-repeat lg:bg-[url('/loading-bg-main.png')] lg:bg-cover lg:bg-left">
      <LoadingHeader repo={repo} />

      {/* Below lg: plain background, centred. From lg: the steps start to the
          right of the illustration, which occupies ~48% of the rendered image
          (the image is drawn at max(100vw, 16:9 of 100vh) wide). */}
      <div className="w-full flex-1 min-h-0 flex items-center mt-6 lg:mt-4">
        <div className="w-full min-w-0 max-w-xl mx-auto lg:mx-0 lg:ml-[calc(max(100vw,177.78vh)*0.48)] flex flex-col gap-5">
          <LoadingSteps steps={steps} />
          <LoadingProgress
            progress={progress}
            completed={completed}
            total={steps.length}
          />
        </div>
      </div>
    </div>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
