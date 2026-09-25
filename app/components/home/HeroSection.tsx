// app/components/home/HeroSection.tsx

import OnboardingForm from "./OnboardingForm";
import BackgroundDots from "./BackgroundDots";
import MockupWindow from "./mockup/MockupWindow";

export default function HeroSection() {
  return (
    <section
      id="form"
      className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-0 overflow-hidden bg-[#F0EFFF]"
    >
      <BackgroundDots />

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl lg:text-5xl font-extrabold text-gray-900 text-center leading-[1.1] tracking-tight max-w-3xl px-6">
        Understand your codebase.
        <br />
        Contribute{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">
          from day zero.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg text-gray-500 text-center max-w-xl px-6 leading-relaxed">
        A personalized onboarding kit that reads your GitHub repo, understands
        your role, and gives you everything you need to start contributing in
        minutes, not weeks.
      </p>

      {/* Form + handwritten annotations */}
      <div className="relative w-full max-w-6xl px-6 mt-10 flex items-start justify-center">
        {/* Left annotation */}
        <div className="hidden lg:flex flex-col items-end absolute left-0 bottom-70 w-44">
          <p
            className="text-gray-500 text-2xl leading-snug text-right"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Paste any public
            <br />
            GitHub repo
          </p>
          <svg
            className="mt-1 mr-2 w-16 h-10 text-gray-400"
            viewBox="0 0 64 40"
            fill="none"
          >
            <path
              d="M4 4 C20 4, 50 20, 60 36"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M54 32 L60 36 L56 30"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* The actual form */}
        <OnboardingForm />

        {/* Right annotation */}
        <div className="hidden lg:flex flex-col items-start absolute right-[-10] bottom-0 w-44">
          <svg
            className="mb-1 ml-2 w-16 h-10 text-gray-400"
            viewBox="0 0 64 40"
            fill="none"
          >
            <path
              d="M60 4 C44 4, 14 20, 4 36"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M10 32 L4 36 L8 30"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            className="text-gray-500 text-2xl leading-snug"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Get your kit
            <br />
            in seconds
          </p>
        </div>
      </div>

      {/* App preview mockup */}
      <div className="w-full max-w-5xl px-6 mt-14 mb-8">
        <MockupWindow />
      </div>
    </section>
  );
}
