import { Play, Square, Bug, RotateCcw, Zap } from "lucide-react";

const CONFIGS = [
  { name: "Dev Server", type: "launch", status: "running" as const },
  { name: "Unit Tests", type: "test", status: "idle" as const },
  { name: "E2E Tests", type: "test", status: "idle" as const },
  { name: "Build Prod", type: "task", status: "idle" as const },
];

const STATUS_COLOR = {
  running: "oklch(0.72 0.20 145)",
  idle:    "oklch(0.50 0.02 280)",
  error:   "oklch(0.65 0.25 27)",
};

export function RunPanel() {
  return (
    <div className="flex flex-col h-full">
      <div
        className="px-3 py-2 text-xs font-semibold uppercase tracking-widest shrink-0"
        style={{ color: "oklch(0.50 0.02 280)" }}
      >
        Run & Debug
      </div>

      {/* Controls */}
      <div className="px-3 mb-3 flex items-center gap-1.5 shrink-0">
        <button
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-all"
          style={{
            background: "oklch(0.72 0.20 145 / 15%)",
            border: "1px solid oklch(0.72 0.20 145 / 30%)",
            color: "oklch(0.72 0.20 145)",
          }}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Run
        </button>
        {[Bug, RotateCcw, Square].map((Icon, i) => (
          <button
            key={i}
            className="flex items-center justify-center w-8 h-7 rounded transition-colors hover:bg-white/10"
            style={{ color: "oklch(0.50 0.02 280)", border: "1px solid oklch(1 0 0 / 8%)" }}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Configs */}
      <div
        className="px-3 mb-1 text-xs uppercase tracking-wide font-medium shrink-0"
        style={{ color: "oklch(0.50 0.02 280)" }}
      >
        Configurations
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {CONFIGS.map((cfg) => (
          <div
            key={cfg.name}
            className="flex items-center gap-2 px-2 py-2 rounded cursor-pointer hover:bg-white/5 transition-colors"
          >
            <Zap
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: STATUS_COLOR[cfg.status] }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-xs truncate"
                style={{ color: "oklch(0.75 0.01 280)" }}
              >
                {cfg.name}
              </p>
              <p className="text-[10px]" style={{ color: STATUS_COLOR[cfg.status] }}>
                {cfg.status === "running" ? "● Running" : "○ Idle"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
