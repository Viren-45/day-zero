interface LoadingHeaderProps {
  repo: string;
}

export default function LoadingHeader({ repo }: LoadingHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center gap-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-600/40">
          &gt;_
        </div>
        <span className="text-white font-semibold text-xl tracking-tight">
          Day Zero
        </span>
      </div>

      {/* Repo name */}
      {repo && (
        <div className="flex items-center gap-2 text-white/60 text-sm font-mono">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          {repo}
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        Analyzing{" "}
        <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          your codebase
        </span>
      </h1>

      <p className="text-white/60 text-sm max-w-2xl leading-relaxed">
        We&apos;re reading your repository, understanding the structure, and
        preparing your personalized developer guide.
      </p>
    </header>
  );
}
