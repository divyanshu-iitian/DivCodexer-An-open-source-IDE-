import { GitCommit, GitBranch, Plus, Minus, Edit3, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Change { file: string; status: "M" | "A" | "D"; }

const CHANGES: Change[] = [
  { file: "src/App.tsx", status: "M" },
  { file: "src/components/layout/IDELayout.tsx", status: "A" },
  { file: "src/store/workspace.ts", status: "A" },
  { file: "electron/main.ts", status: "A" },
  { file: "package.json", status: "M" },
];

const STATUS_META = {
  M: { label: "M", color: "oklch(0.78 0.18 75)", Icon: Edit3 },
  A: { label: "A", color: "oklch(0.72 0.20 145)", Icon: Plus },
  D: { label: "D", color: "oklch(0.65 0.25 27)", Icon: Minus },
};

export function GitPanel() {
  const [msg, setMsg] = useState("");

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between px-3 py-2 shrink-0 text-xs font-semibold uppercase tracking-widest"
        style={{ color: "oklch(0.50 0.02 280)" }}
      >
        <span>Source Control</span>
        <button title="Refresh" className="p-0.5 rounded hover:bg-white/10 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Branch */}
      <div className="px-3 mb-3 shrink-0">
        <div
          className="flex items-center gap-2 px-2 py-1.5 rounded"
          style={{ background: "oklch(0.14 0.025 280)", border: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <GitBranch className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.65 0.28 290)" }} />
          <span className="text-xs" style={{ color: "oklch(0.85 0.01 280)" }}>main</span>
        </div>
      </div>

      {/* Commit */}
      <div className="px-3 mb-3 shrink-0 space-y-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Commit message…"
          className="w-full px-2 py-1.5 rounded text-xs outline-none transition-colors"
          style={{
            background: "oklch(0.14 0.025 280)",
            border: "1px solid oklch(1 0 0 / 8%)",
            color: "oklch(0.85 0.01 280)",
          }}
          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.65 0.28 290 / 40%)"; }}
          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 8%)"; }}
        />
        <button
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-all"
          style={{
            background: "oklch(0.65 0.28 290 / 15%)",
            border: "1px solid oklch(0.65 0.28 290 / 30%)",
            color: "oklch(0.75 0.28 290)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.65 0.28 290 / 25%)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.65 0.28 290 / 15%)"; }}
        >
          <GitCommit className="w-3.5 h-3.5" />
          Commit
        </button>
      </div>

      {/* Changes */}
      <div
        className="px-3 mb-1 text-xs uppercase tracking-wide font-medium shrink-0"
        style={{ color: "oklch(0.50 0.02 280)" }}
      >
        Changes ({CHANGES.length})
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {CHANGES.map((ch, i) => {
          const meta = STATUS_META[ch.status];
          return (
            <div
              key={i}
              className="flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-white/5 transition-colors"
            >
              <span
                className="text-xs truncate"
                style={{ color: "oklch(0.70 0.02 280)" }}
              >
                {ch.file.split("/").pop()}
              </span>
              <span
                className="text-xs font-bold shrink-0 ml-2"
                style={{ color: meta.color }}
              >
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
