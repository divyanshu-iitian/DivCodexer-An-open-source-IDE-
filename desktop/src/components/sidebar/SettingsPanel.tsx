import { Moon, Palette, Keyboard, Shield, Code2, ChevronRight } from "lucide-react";

const GROUPS = [
  {
    title: "Appearance",
    Icon: Palette,
    items: ["Color Theme", "Icon Theme", "Font Size", "Font Family", "Minimap"],
  },
  {
    title: "Editor",
    Icon: Code2,
    items: ["Tab Size", "Word Wrap", "Line Numbers", "Auto Save", "Format On Save"],
  },
  {
    title: "Keyboard",
    Icon: Keyboard,
    items: ["Keyboard Shortcuts", "Key Bindings"],
  },
  {
    title: "Security",
    Icon: Shield,
    items: ["Workspace Trust", "Telemetry"],
  },
];

export function SettingsPanel() {
  return (
    <div className="flex flex-col h-full">
      <div
        className="px-3 py-2 text-xs font-semibold uppercase tracking-widest shrink-0"
        style={{ color: "oklch(0.50 0.02 280)" }}
      >
        Settings
      </div>

      {/* Theme badge */}
      <div className="px-3 mb-3 shrink-0">
        <div
          className="flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
          style={{
            background: "oklch(0.65 0.28 290 / 8%)",
            border: "1px solid oklch(0.65 0.28 290 / 20%)",
          }}
        >
          <Moon className="w-4 h-4 shrink-0" style={{ color: "oklch(0.65 0.28 290)" }} />
          <div className="flex-1">
            <p className="text-xs font-medium" style={{ color: "oklch(0.85 0.01 280)" }}>
              Dark Neon
            </p>
            <p className="text-[10px]" style={{ color: "oklch(0.55 0.02 280)" }}>
              Currently active
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-3">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <div
              className="flex items-center gap-1.5 px-2 py-1 mb-1"
              style={{ color: "oklch(0.75 0.28 290)" }}
            >
              <group.Icon className="w-3.5 h-3.5" />
              <span className="text-xs font-medium" style={{ color: "oklch(0.75 0.01 280)" }}>
                {group.title}
              </span>
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <button
                  key={item}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded text-xs cursor-pointer hover:bg-white/5 transition-colors"
                  style={{ color: "oklch(0.60 0.02 280)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 280)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.60 0.02 280)"; }}
                >
                  {item}
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
