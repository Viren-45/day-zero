interface AskAnythingTabProps {
  chatContext: string;
}

export default function AskAnythingTab(_props: AskAnythingTabProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-800">Ask Anything</h2>
      <p className="mt-4 text-base text-gray-500">
        Chat with your codebase — coming soon.
      </p>
    </div>
  );
}
