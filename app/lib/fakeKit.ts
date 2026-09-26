// app/lib/fakeKit.ts

export const fakeKit = {
  repo: "Viren-45/fintrak",
  repoPath: "Viren-45/fintrak",
  role: "Full Stack",
  level: "Mid Level",

  fileTree: [
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/(auth)/login/page.tsx",
    "src/app/(auth)/login/actions.ts",
    "src/app/(auth)/signup/page.tsx",
    "src/app/(auth)/signup/actions.ts",
    "src/app/(app)/dashboard/page.tsx",
    "src/app/(app)/transactions/page.tsx",
    "src/app/(app)/budgets/page.tsx",
    "src/app/(app)/goals/page.tsx",
    "src/app/api/ai/route.ts",
    "src/app/api/voice/token/route.ts",
    "src/components/dashboard/SpendingChart.tsx",
    "src/components/transactions/TransactionList.tsx",
    "src/components/auth/LoginForm.tsx",
    "src/components/sidebar/Sidebar.tsx",
    "src/components/ai/AiAdvisor.tsx",
    "src/hooks/useAccounts.ts",
    "src/hooks/useTransactions.ts",
    "src/hooks/useGoals.ts",
    "src/hooks/useDashboard.ts",
    "src/hooks/useChat.ts",
    "src/lib/supabase/client.ts",
    "src/lib/supabase/server.ts",
    "src/lib/supabase/admin.ts",
    "src/lib/calculations.ts",
    "src/lib/formatting.ts",
    "next.config.js",
    "package.json",
    "tsconfig.json",
  ],

  map: {
    explanation:
      "Fintrak is a personal finance tracker built with Next.js 16 and Supabase that provides real-time transaction management, budgeting, goal tracking, and AI-powered financial insights. The architecture follows Next.js App Router patterns with server components, server actions for authentication, API routes for AI integration, and React hooks for client-side data management.",

    nodes: [
      {
        id: "nextjs",
        name: "Next.js App",
        subtitle: "(App Router)",
        type: "framework",
        color: "#6366f1",
        icon: "Layout",
        description:
          "Core Next.js application handling routing, server components, and page rendering for all financial features.",
        files: ["src/app/layout.tsx", "src/app/page.tsx", "next.config.js"],
        children: [
          {
            id: "nextjs-pages",
            name: "Pages",
            subtitle: "(Route Handlers)",
            icon: "FileCode",
            description:
              "Individual page components for dashboard, transactions, budgets and goals.",
            files: [
              "src/app/(app)/dashboard/page.tsx",
              "src/app/(app)/transactions/page.tsx",
              "src/app/(app)/budgets/page.tsx",
              "src/app/(app)/goals/page.tsx",
            ],
          },
          {
            id: "nextjs-actions",
            name: "Server Actions",
            subtitle: "(Mutations)",
            icon: "Zap",
            description:
              "Server-side form actions for authentication and settings updates.",
            files: [
              "src/app/(auth)/login/actions.ts",
              "src/app/(auth)/signup/actions.ts",
            ],
          },
          {
            id: "nextjs-api",
            name: "API Routes",
            subtitle: "(Edge Functions)",
            icon: "Webhook",
            description:
              "API endpoints for AI advisor and voice token generation.",
            files: [
              "src/app/api/ai/route.ts",
              "src/app/api/voice/token/route.ts",
            ],
          },
        ],
      },
      {
        id: "supabase",
        name: "Supabase",
        subtitle: "(Auth + Database)",
        type: "backend",
        color: "#10b981",
        icon: "Database",
        description:
          "Handles authentication, PostgreSQL database, and file storage for all user financial data.",
        files: [
          "src/lib/supabase/client.ts",
          "src/lib/supabase/server.ts",
          "src/lib/supabase/admin.ts",
        ],
        children: [
          {
            id: "supabase-auth",
            name: "Authentication",
            subtitle: "(SSR helpers)",
            icon: "Shield",
            description:
              "Session management with SSR support for client and server contexts.",
            files: [
              "src/lib/supabase/server.ts",
              "src/app/(auth)/login/actions.ts",
            ],
          },
          {
            id: "supabase-db",
            name: "PostgreSQL",
            subtitle: "(Primary database)",
            icon: "HardDrive",
            description:
              "All financial data including transactions, budgets, goals and accounts.",
            files: ["src/lib/supabase/client.ts", "src/lib/supabase/admin.ts"],
          },
        ],
      },
      {
        id: "components",
        name: "UI Components",
        subtitle: "(shadcn/ui)",
        type: "frontend",
        color: "#3b82f6",
        icon: "Monitor",
        description:
          "React components built with shadcn/ui and Tailwind CSS for all financial dashboards and forms.",
        files: [
          "src/components/dashboard/SpendingChart.tsx",
          "src/components/transactions/TransactionList.tsx",
          "src/components/sidebar/Sidebar.tsx",
          "src/components/auth/LoginForm.tsx",
        ],
      },
      {
        id: "hooks",
        name: "Custom Hooks",
        subtitle: "(React Query)",
        type: "data",
        color: "#8b5cf6",
        icon: "Workflow",
        description:
          "Custom React hooks using React Query for data fetching, caching and real-time updates from Supabase.",
        files: [
          "src/hooks/useAccounts.ts",
          "src/hooks/useTransactions.ts",
          "src/hooks/useGoals.ts",
          "src/hooks/useDashboard.ts",
        ],
      },
      {
        id: "ai",
        name: "AI Services",
        subtitle: "(Claude + Gemini)",
        type: "ai",
        color: "#f59e0b",
        icon: "Brain",
        description:
          "AI-powered financial advisor using Claude and Gemini APIs with voice input support.",
        files: [
          "src/app/api/ai/route.ts",
          "src/components/ai/AiAdvisor.tsx",
          "src/hooks/useChat.ts",
        ],
        children: [
          {
            id: "ai-claude",
            name: "Claude API",
            subtitle: "(Financial advice)",
            icon: "Sparkles",
            description:
              "Anthropic Claude for intelligent financial guidance and weekly digests.",
            files: ["src/app/api/ai/route.ts"],
          },
          {
            id: "ai-voice",
            name: "Voice Input",
            subtitle: "(Web Audio API)",
            icon: "MessageSquare",
            description:
              "Voice capture and playback for hands-free transaction logging.",
            files: ["src/app/api/voice/token/route.ts"],
          },
        ],
      },
      {
        id: "utils",
        name: "Utilities",
        subtitle: "(Calculations)",
        type: "utility",
        color: "#64748b",
        icon: "Package",
        description:
          "Shared utility functions for financial calculations, data formatting and account metadata.",
        files: ["src/lib/calculations.ts", "src/lib/formatting.ts"],
      },
    ],

    edges: [
      { source: "nextjs", target: "supabase", relation: "reads/writes" },
      { source: "nextjs", target: "ai", relation: "calls" },
      { source: "hooks", target: "supabase", relation: "fetches" },
      { source: "components", target: "hooks", relation: "uses" },
      { source: "nextjs", target: "components", relation: "renders" },
      { source: "ai", target: "supabase", relation: "reads" },
      { source: "nextjs", target: "utils", relation: "imports" },
    ],
  },

  firstHour: [
    {
      step: 1,
      title: "Clone and install dependencies",
      description:
        "Run git clone https://github.com/Viren-45/fintrak and then npm install to get all dependencies installed locally.",
    },
    {
      step: 2,
      title: "Set up environment variables",
      description:
        "Copy .env.example to .env.local and fill in your Supabase URL, anon key, and service role key. Also add your Anthropic API key for the AI advisor.",
    },
    {
      step: 3,
      title: "Run the development server",
      description:
        "Run npm run dev to start the local development server. The app will be available at localhost:3000.",
    },
    {
      step: 4,
      title: "Set up Supabase locally",
      description:
        "Create a Supabase project, run the SQL migrations from the /supabase folder, and enable email authentication in your Supabase dashboard.",
    },
  ],

  watchOut: [
    {
      severity: "High" as const,
      title: "Supabase Client Context Matters",
      description:
        "There are three Supabase clients — client.ts for browser, server.ts for server components, admin.ts for admin operations. Using the wrong one will cause auth errors or permission issues.",
    },
    {
      severity: "High" as const,
      title: "API Route Authentication",
      description:
        "API routes at src/app/api/ do not automatically inherit the user session. You must manually verify the session using the Supabase server client inside each route.",
    },
    {
      severity: "Medium" as const,
      title: "QuickAddProvider Context",
      description:
        "The QuickAddProvider wraps the entire app layout. Components that use the useQuickAdd hook must be inside this provider or they will throw a context error.",
    },
    {
      severity: "Low" as const,
      title: "React Query Setup",
      description:
        "React Query is configured in the root layout. If you add a new data fetching hook make sure to follow the existing pattern of using the Supabase client from the hook context.",
    },
  ],

  firstTask: {
    title: "Add a New Transaction Filter to the Transactions Page",
    file: "src/components/transactions/TransactionFilters.tsx",
    difficulty: "Moderate",
    description:
      "Implement a date range filter in the TransactionFilters component that allows users to filter transactions by start and end dates. This task involves adding date input UI using shadcn/ui components, integrating the filter state with the useTransactions hook, and ensuring the filter works with existing transaction tabs.",
    relatedFiles: [
      "src/hooks/useTransactions.ts",
      "src/components/transactions/TransactionList.tsx",
      "src/app/(app)/transactions/page.tsx",
    ],
  },

  chatContext:
    "Fintrak is a Next.js 16-based personal finance tracker built with TypeScript and Supabase. The tech stack includes React 19, Next.js App Router with Server Components, shadcn/ui for UI components, Tailwind CSS for styling, Recharts for financial charts, TanStack React Query for data fetching, Supabase for authentication and database, Claude API and Google Gemini for AI financial advice, and Web Audio API for voice input. The folder structure organizes code by feature domain inside src/. Authentication uses server actions in src/app/(auth)/. Main app pages live in src/app/(app)/. API routes are in src/app/api/. Reusable components are in src/components/ organized by feature. Custom React Query hooks are in src/hooks/. Supabase clients are in src/lib/supabase/ with separate client, server, and admin variants. Key patterns include Server Actions for auth mutations, React Query hooks for data fetching and caching, component composition with shadcn/ui, and context providers for global state.",
};
