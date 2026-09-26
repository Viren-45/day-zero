// app/components/kit/tabs/map/icons/iconList.ts

// ── Approved Lucide icon names for Claude to choose from ─────────────────────
// Claude picks from this list when deciding icons for architecture nodes.
// Add more names here as needed — must match exact Lucide export names.

export const ARCHITECTURE_ICONS = [
  // Frontend / UI
  "Monitor",
  "Smartphone",
  "Globe",
  "Layout",
  "Layers",
  "PanelLeft",
  "AppWindow",

  // Backend / Server
  "Server",
  "Cpu",
  "Terminal",
  "Code2",
  "FileCode",
  "Braces",

  // Routing / Flow
  "GitBranch",
  "Workflow",
  "Share2",
  "ArrowLeftRight",
  "Webhook",
  "Link",

  // Auth / Security
  "Shield",
  "Lock",
  "Key",
  "Fingerprint",
  "UserCheck",

  // Database / Storage
  "Database",
  "HardDrive",
  "Archive",
  "Table",
  "FolderOpen",

  // Cloud / External
  "Cloud",
  "CloudUpload",
  "Zap",
  "Plug",
  "Package",

  // AI / Intelligence
  "Bot",
  "Brain",
  "Sparkles",
  "Wand2",

  // Payments / Communication
  "CreditCard",
  "Mail",
  "Bell",
  "MessageSquare",
] as const;

export type ArchitectureIconName = (typeof ARCHITECTURE_ICONS)[number];

// ── Icon display list for prompts ─────────────────────────────────────────────
// This string gets injected into the Claude prompt so it knows which names are valid

export const ICON_LIST_FOR_PROMPT = ARCHITECTURE_ICONS.join(", ");
