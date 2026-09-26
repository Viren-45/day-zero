// app/components/home/Navbar.tsx
import Link from "next/link";
import GetStartedButton from "./GetStartedButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">&gt;_</span>
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            Day Zero
          </span>
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            How it works
          </a>
          <a
            href="#examples"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Examples
          </a>
        </div>

        {/* CTA */}
        <GetStartedButton />
      </div>
    </nav>
  );
}
