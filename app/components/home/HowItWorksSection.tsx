// app/components/home/HowItWorksSection.tsx

const steps = [
  {
    step: "01",
    title: "Paste a GitHub URL",
    description:
      "Drop in any public repository URL. Day Zero fetches the structure, key files, and architecture so you don't have to read through everything yourself.",
  },
  {
    step: "02",
    title: "Pick your role and level",
    description:
      "Tell us whether you're Frontend, Backend, Full Stack, or DevOps and whether you're Junior, Mid, or Senior. Your kit is built around you, not a generic developer.",
  },
  {
    step: "03",
    title: "Get your personalized kit",
    description:
      "Receive an architecture overview, a first-hour setup guide, hidden gotchas, a suggested first task, and a live chat - all grounded in the actual codebase.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">
            How it works
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900">
            From repo URL to contributing -{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">
              in three steps
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((s) => (
            <div key={s.step} className="flex flex-col gap-4">
              <span className="text-5xl font-black text-indigo-100 leading-none select-none">
                {s.step}
              </span>
              <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
