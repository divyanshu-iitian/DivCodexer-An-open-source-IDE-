"use client";

import { Play, Square, RotateCcw, Bug, Zap } from "lucide-react";

interface RunConfig {
  name: string;
  type: string;
  status: "idle" | "running" | "error";
}

const RUN_CONFIGS: RunConfig[] = [
  { name: "Next.js Dev Server", type: "launch", status: "running" },
  { name: "Unit Tests", type: "test", status: "idle" },
  { name: "E2E Tests", type: "test", status: "idle" },
  { name: "Production Build", type: "task", status: "idle" },
];

const STATUS_STYLES = {
  idle: "text-muted-foreground",
  running: "text-emerald-400",
  error: "text-red-400",
};

export function RunDebugPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Run & Debug
        </span>
      </div>

      <div className="px-3 mb-3">
        <div className="flex items-center gap-1.5">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium transition-all">
            <Play className="w-3.5 h-3.5 fill-emerald-400" />
            Run
          </button>
          <button className="flex items-center justify-center p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-border text-muted-foreground hover:text-foreground transition-all">
            <Bug className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-border text-muted-foreground hover:text-foreground transition-all">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-border text-muted-foreground hover:text-foreground transition-all">
            <Square className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">
          Configurations
        </p>
        <div className="space-y-1">
          {RUN_CONFIGS.map((cfg, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <Zap className={`w-3.5 h-3.5 shrink-0 ${STATUS_STYLES[cfg.status]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground/80 group-hover:text-foreground truncate transition-colors">
                  {cfg.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`text-[10px] ${STATUS_STYLES[cfg.status]}`}>
                    {cfg.status === "running" ? "● Running" : cfg.status === "error" ? "● Error" : "○ Idle"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
