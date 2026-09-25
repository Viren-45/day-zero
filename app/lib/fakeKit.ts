// app/lib/fakeKit.ts

export const fakeKit = {
  repo: "vercel/next.js",
  role: "Frontend",
  level: "Mid Level",

  map: {
    mermaid: `graph TD
  A[Client] --> B[Next.js App]
  B --> C[API Routes]
  B --> D[React Components]
  C --> E[Database]`,
    explanation:
      "Next.js is a React framework that enables server-side rendering and static site generation. The codebase is organized around the App Router with React Server Components at the core.",
  },

  firstHour: [
    {
      step: 1,
      title: "Clone and install dependencies",
      description:
        "Run git clone https://github.com/vercel/next.js and then npm install to get all dependencies installed locally.",
    },
    {
      step: 2,
      title: "Set up environment variables",
      description:
        "Copy .env.example to .env.local and fill in the required values. Check the contributing guide for which variables are mandatory.",
    },
    {
      step: 3,
      title: "Run the development server",
      description:
        "Run npm run dev to start the local development server. The app will be available at localhost:3000.",
    },
    {
      step: 4,
      title: "Run the test suite",
      description:
        "Run npm test to make sure everything is working correctly before making any changes.",
    },
  ],

  watchOut: [
    {
      severity: "High" as const,
      title: "Legacy auth module",
      description:
        "The auth logic in /lib/auth-old.ts is deprecated but still used in two places. Do not extend it — use the new /lib/auth.ts instead.",
    },
    {
      severity: "Medium" as const,
      title: "Missing test coverage",
      description:
        "The checkout flow in /app/checkout has no unit tests. Be extra careful when touching anything in this folder.",
    },
    {
      severity: "Low" as const,
      title: "Deprecated API calls",
      description:
        "Three components still use the v1 API endpoints which are marked for removal. They still work but will break in the next major version.",
    },
  ],

  firstTask: {
    title: "Improve error handling in the login component",
    file: "app/auth/login.tsx",
    difficulty: "Good first issue",
    description:
      "The login form currently swallows authentication errors silently and shows no feedback to the user. Add proper error state handling and display a user-friendly error message when login fails.",
    relatedFiles: [
      "lib/auth.ts",
      "app/api/auth/route.ts",
      "components/ui/Alert.tsx",
    ],
  },

  chatContext:
    "This is the vercel/next.js repository. It is a React framework for building web applications with server-side rendering, static generation, and the App Router.",
};
