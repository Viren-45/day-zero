// app/kit/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/home/Navbar";
import KitBreadcrumb from "@/components/kit/KitBreadcrumb";
import KitSidebar from "@/components/kit/KitSidebar";
import YourMapTab from "@/components/kit/tabs/YourMapTab";
import FirstHourTab from "@/components/kit/tabs/FirstHourTab";
import WatchOutTab from "@/components/kit/tabs/WatchOutTab";
import FirstTaskTab from "@/components/kit/tabs/FirstTaskTab";
import AskAnythingTab from "@/components/kit/tabs/AskAnythingTab";

interface Kit {
  repo: string;
  role: string;
  level: string;
  map: { mermaid: string; explanation: string };
  firstHour: { step: number; title: string; description: string }[];
  watchOut: {
    severity: "High" | "Medium" | "Low";
    title: string;
    description: string;
  }[];
  firstTask: {
    title: string;
    file: string;
    difficulty: string;
    description: string;
    relatedFiles: string[];
  };
  chatContext: string;
  repoPath: string;
}

export default function KitPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const repo = searchParams.get("repo") ?? "";
  const role = searchParams.get("role") ?? "";
  const level = searchParams.get("level") ?? "";

  const [kit, setKit] = useState<Kit | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("map");

  useEffect(() => {
    async function loadKit() {
      // Try sessionStorage first
      try {
        const cached = sessionStorage.getItem("kit");
        if (cached) {
          setKit(JSON.parse(cached) as Kit);
          setLoading(false);
          return;
        }
      } catch {
        // sessionStorage unavailable or parse failed — fall through to API
      }

      // Fallback — re-fetch from API using URL params
      if (!repo) {
        router.push("/");
        return;
      }

      try {
        const res = await fetch("/api/generate-kit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ repo, role, level }),
        });

        if (!res.ok) {
          router.push("/");
          return;
        }

        const data = (await res.json()) as Kit;
        sessionStorage.setItem("kit", JSON.stringify(data));
        setKit(data);
      } catch {
        router.push("/");
      } finally {
        setLoading(false);
      }
    }

    loadKit();
  }, [repo, role, level, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500">Loading your kit...</p>
        </div>
      </div>
    );
  }

  if (!kit) return null;

  return (
    <div className="flex h-screen flex-col bg-white">
      <Navbar />

      <div className="flex flex-1 overflow-hidden pt-16">
        <KitSidebar
          repo={kit.repoPath ?? kit.repo}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <KitBreadcrumb
            repo={kit.repoPath ?? kit.repo}
            role={kit.role}
            level={kit.level}
            activeTab={activeTab}
          />

          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === "map" && (
              <YourMapTab map={kit.map} chatContext={kit.chatContext} />
            )}
            {activeTab === "firstHour" && (
              <FirstHourTab firstHour={kit.firstHour} />
            )}
            {activeTab === "watchOut" && (
              <WatchOutTab watchOut={kit.watchOut} />
            )}
            {activeTab === "firstTask" && (
              <FirstTaskTab firstTask={kit.firstTask} />
            )}
            {activeTab === "askAnything" && (
              <AskAnythingTab chatContext={kit.chatContext} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
