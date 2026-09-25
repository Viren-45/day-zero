interface FirstTaskTabProps {
  firstTask: {
    title: string;
    file: string;
    difficulty: string;
    description: string;
    relatedFiles: string[];
  };
}

export default function FirstTaskTab({ firstTask }: FirstTaskTabProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Your First Task</h2>
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* Difficulty badge */}
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {firstTask.difficulty}
        </span>

        {/* Title */}
        <h3 className="mt-3 text-xl font-bold text-gray-800">
          {firstTask.title}
        </h3>

        {/* File path */}
        <code className="mt-2 inline-block rounded bg-indigo-50 px-2 py-1 text-sm font-mono text-indigo-700">
          {firstTask.file}
        </code>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          {firstTask.description}
        </p>

        {/* Related files */}
        {firstTask.relatedFiles.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Read these first
            </p>
            <div className="flex flex-wrap gap-2">
              {firstTask.relatedFiles.map((file) => (
                <code
                  key={file}
                  className="rounded bg-gray-100 px-2 py-1 text-xs font-mono text-gray-600"
                >
                  {file}
                </code>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
