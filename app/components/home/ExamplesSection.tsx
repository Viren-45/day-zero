// app/components/home/ExamplesSection.tsx

const examples = [
  {
    repo: "facebook/react",
    url: "https://github.com/facebook/react",
    description: "The library for building user interfaces.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: "230k",
  },
  {
    repo: "vercel/next.js",
    url: "https://github.com/vercel/next.js",
    description: "The React framework for the web.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: "128k",
  },
  {
    repo: "supabase/supabase",
    url: "https://github.com/supabase/supabase",
    description: "The open source Firebase alternative.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: "73k",
  },
];

export default function ExamplesSection() {
  return (
    <section id="examples" className="bg-[#F0EFFF] py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">
            Examples
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Try it on a real codebase
          </h2>
          <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto">
            Click any repo below to instantly generate a kit - no GitHub URL
            needed.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examples.map((ex) => (
            <a
              key={ex.repo}
              href={`/kit?repo=${encodeURIComponent(ex.url)}&role=Full Stack&level=Mid Level`}
              className="group flex flex-col gap-3 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
            >
              {/* Repo name */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {ex.repo}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed">
                {ex.description}
              </p>

              {/* Footer meta */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: ex.languageColor }}
                  />
                  <span className="text-xs text-gray-500">{ex.language}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {ex.stars}
                </div>
              </div>

              {/* Try it CTA */}
              <div className="mt-2 w-full py-2 rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 text-xs font-semibold text-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                Generate Kit →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
