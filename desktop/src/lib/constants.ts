// ── Layout ─────────────────────────────────────────────────────────────────
export const LAYOUT = {
  TITLE_BAR_HEIGHT: 36,
  ACTIVITY_BAR_WIDTH: 48,
  SIDEBAR_WIDTH: 240,
  AI_PANEL_WIDTH: 288,
  STATUS_BAR_HEIGHT: 24,
  BOTTOM_PANEL_HEIGHT: 220,
  BOTTOM_PANEL_MIN_HEIGHT: 100,
  BOTTOM_PANEL_MAX_HEIGHT: 600,
  TAB_HEIGHT: 36,
} as const;

// ── Color palette (oklch) ──────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds
  BG_BASE: "oklch(0.08 0.02 280)",
  BG_SURFACE: "oklch(0.10 0.02 280)",
  BG_ELEVATED: "oklch(0.13 0.025 280)",
  BG_INPUT: "oklch(0.15 0.025 280)",
  BG_HOVER: "oklch(1 0 0 / 5%)",
  BG_ACTIVE: "oklch(1 0 0 / 8%)",

  // Neon purple accent
  NEON: "oklch(0.65 0.28 290)",
  NEON_DIM: "oklch(0.65 0.28 290 / 60%)",
  NEON_SUBTLE: "oklch(0.65 0.28 290 / 15%)",
  NEON_BORDER: "oklch(0.65 0.28 290 / 30%)",
  NEON_TEXT: "oklch(0.75 0.28 290)",

  // Text
  TEXT_PRIMARY: "oklch(0.90 0.01 280)",
  TEXT_SECONDARY: "oklch(0.70 0.02 280)",
  TEXT_MUTED: "oklch(0.50 0.02 280)",
  TEXT_DISABLED: "oklch(0.35 0.02 280)",

  // Borders
  BORDER: "oklch(1 0 0 / 7%)",
  BORDER_STRONG: "oklch(1 0 0 / 12%)",

  // Semantic
  SUCCESS: "oklch(0.72 0.20 145)",
  WARNING: "oklch(0.78 0.18 75)",
  ERROR: "oklch(0.65 0.25 27)",
  INFO: "oklch(0.72 0.20 220)",

  // Editor
  EDITOR_BG: "#0a0a12",
  EDITOR_FG: "#e2e2f0",
} as const;

// ── Typography ─────────────────────────────────────────────────────────────
export const TYPOGRAPHY = {
  FONT_SANS: "'Inter', ui-sans-serif, system-ui, sans-serif",
  FONT_MONO: "'JetBrains Mono', 'Geist Mono', 'Fira Code', ui-monospace, monospace",
  SIZE_XS: "11px",
  SIZE_SM: "12px",
  SIZE_BASE: "13px",
  SIZE_MD: "14px",
} as const;

// ── Spacing ────────────────────────────────────────────────────────────────
export const SPACING = {
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "6": "24px",
  "8": "32px",
} as const;

// ── Radius ─────────────────────────────────────────────────────────────────
export const RADIUS = {
  SM: "4px",
  MD: "6px",
  LG: "8px",
  XL: "12px",
  FULL: "9999px",
} as const;

// ── Animation ──────────────────────────────────────────────────────────────
export const TRANSITION = {
  FAST: "0.1s ease",
  BASE: "0.15s ease",
  SLOW: "0.25s ease",
} as const;

// ── Language colors ────────────────────────────────────────────────────────
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3b82f6",
  JavaScript: "#eab308",
  Python: "#f59e0b",
  Go: "#06b6d4",
  Rust: "#f97316",
  CSS: "#ec4899",
  HTML: "#f97316",
  JSON: "#84cc16",
  Markdown: "#a78bfa",
  Shell: "#22c55e",
} as const;

// ── Project accent colors (cycling) ───────────────────────────────────────
export const PROJECT_COLORS = [
  "#7c3aed",
  "#0ea5e9",
  "#f59e0b",
  "#ec4899",
  "#f97316",
  "#10b981",
  "#6366f1",
] as const;

// ── AI models ─────────────────────────────────────────────────────────────
export const AI_MODELS = [
  { id: "sonnet" as const, label: "Sonnet", description: "Fast and capable" },
  { id: "opus" as const, label: "Opus", description: "Most powerful" },
  { id: "haiku" as const, label: "Haiku", description: "Fastest" },
] as const;

// ── Persistence keys ───────────────────────────────────────────────────────
export const STORE_KEYS = {
  RECENT_PROJECTS: "recentProjects",
  LAST_WORKSPACE: "lastWorkspace",
  UI_STATE: "uiState",
} as const;
