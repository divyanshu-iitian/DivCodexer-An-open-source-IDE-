import { Puzzle, Star, Download, Check } from "lucide-react";

const EXTS = [
  { name: "GitHub Copilot", desc: "AI code completions", author: "GitHub", downloads: "12.4M", rating: 4.8, installed: true, color: "#7c3aed" },
  { name: "Prettier", desc: "Code formatter", author: "Prettier", downloads: "38.2M", rating: 4.9, installed: true, color: "#0ea5e9" },
  { name: "ESLint", desc: "Linting integration", author: "Microsoft", downloads: "29M", rating: 4.7, installed: true, color: "#8b5cf6" },
  { name: "GitLens", desc: "Supercharge Git", author: "GitKraken", downloads: "22.7M", rating: 4.8, installed: false, color: "#f59e0b" },
  { name: "Tailwind IntelliSense", desc: "Tailwind CSS tooling", author: "Tailwind Labs", downloads: "8.3M", rating: 4.9, installed: false, color: "#06b6d4" },
];

export function ExtensionsPanel() {
  return (
    <div className="flex flex-col h-full">
      <div
        className="px-3 py-2 text-xs font-semibold uppercase tracking-widest shrink-0"
        style={{ color: "oklch(0.50 0.02 280)" }}
      >
        Extensions
      </div>
      <div
        className="mx-3 mb-3 flex items-center gap-2 px-2 py-1.5 rounded shrink-0"
        style={{ background: "oklch(0.14 0.025 280)", border: "1px solid oklch(1 0 0 / 8%)" }}
      >
        <Puzzle className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.50 0.02 280)" }} />
        <input
          type="text"
          placeholder="Search Extensions..."
          className="flex-1 bg-transparent text-xs outline-none"
          style={{ color: "oklch(0.85 0.01 280)" }}
        />
      </div>
      <div className="flex-1 overflow-y-auto px-2 space-y-1.5">
        {EXTS.map((ext) => (
          <div
            key={ext.name}
            className="flex items-start gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${ext.color}22`, border: `1px solid ${ext.color}44` }}
            >
              <Puzzle className="w-4 h-4" style={{ color: ext.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium truncate" style={{ color: "oklch(0.85 0.01 280)" }}>
                  {ext.name}
                </p>
                {ext.installed ? (
                  <div className="flex items-center gap-0.5 shrink-0 ml-1">
                    <Check className="w-3 h-3" style={{ color: "oklch(0.65 0.28 290)" }} />
                  </div>
                ) : (
                  <button className="p-0.5 rounded hover:bg-white/10 shrink-0 ml-1 transition-colors">
                    <Download className="w-3 h-3" style={{ color: "oklch(0.50 0.02 280)" }} />
                  </button>
                )}
              </div>
              <p className="text-[11px] truncate" style={{ color: "oklch(0.55 0.02 280)" }}>
                {ext.desc}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5" style={{ color: "oklch(0.78 0.18 75)", fill: "oklch(0.78 0.18 75)" }} />
                  <span className="text-[10px]" style={{ color: "oklch(0.55 0.02 280)" }}>
                    {ext.rating}
                  </span>
                </div>
                <span className="text-[10px]" style={{ color: "oklch(0.55 0.02 280)" }}>
                  {ext.downloads}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
