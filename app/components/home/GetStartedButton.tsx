"use client";
// app/components/home/GetStartedButton.tsx

export const FOCUS_FORM_EVENT = "dayzero:focus-form";

export default function GetStartedButton() {
  function handleClick(e: React.MouseEvent) {
    const form = document.getElementById("form");
    if (!form) return;

    e.preventDefault();
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    // Let OnboardingForm focus the input and show its hint
    window.dispatchEvent(new Event(FOCUS_FORM_EVENT));
  }

  return (
    <a
      href="#form"
      onClick={handleClick}
      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
    >
      Get Started
    </a>
  );
}
