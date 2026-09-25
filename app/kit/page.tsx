"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { fakeKit } from "@/lib/fakeKit";
import Navbar from "@/components/home/Navbar";
import KitBreadcrumb from "@/components/kit/KitBreadcrumb";
import KitSidebar from "@/components/kit/KitSidebar";
import YourMapTab from "@/components/kit/tabs/YourMapTab";
import FirstHourTab from "@/components/kit/tabs/FirstHourTab";
import WatchOutTab from "@/components/kit/tabs/WatchOutTab";
import FirstTaskTab from "@/components/kit/tabs/FirstTaskTab";
import AskAnythingTab from "@/components/kit/tabs/AskAnythingTab";

export default function KitPage() {
  const searchParams = useSearchParams();

  // Read from URL — not used yet (using fakeKit)
  const _repo = searchParams.get("repo");
  const _role = searchParams.get("role");
  const _level = searchParams.get("level");

  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Global navbar — fixed, sits above everything */}
      <Navbar />

      {/* Content pushed below the fixed navbar */}
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Left sidebar — full height, non-scrolling */}
        <KitSidebar
          repo={fakeKit.repo}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Right column: breadcrumb on top, scrollable content below */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Breadcrumb sits only above the right content area */}
          <KitBreadcrumb
            repo={fakeKit.repo}
            role={fakeKit.role}
            level={fakeKit.level}
            activeTab={activeTab}
          />

          {/* Scrollable tab content */}
          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === "map" && <YourMapTab map={fakeKit.map} />}
            {activeTab === "firstHour" && (
              <FirstHourTab firstHour={fakeKit.firstHour} />
            )}
            {activeTab === "watchOut" && (
              <WatchOutTab watchOut={fakeKit.watchOut} />
            )}
            {activeTab === "firstTask" && (
              <FirstTaskTab firstTask={fakeKit.firstTask} />
            )}
            {activeTab === "askAnything" && (
              <AskAnythingTab chatContext={fakeKit.chatContext} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
