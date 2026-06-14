"use client";

import { GitCommit, GitBranch, Plus, Minus, Edit3 } from "lucide-react";

interface Change {
  file: string;
  status: "modified" | "added" | "deleted";
}

const CHANGES: Change[] = [
  { file: "src/app/globals.css", status: "modified" },
  { file: "src/components/layout/ActivityBar.tsx", status: "added" },
  { file: "src/components/layout/IDELayout.tsx", status: "added" },
  { file: "src/store/workspace.ts", status: "added" },
  { file: "src/types/index.ts", status: "added" },
];

const STATUS_CONFIG = {
  modified: { icon: Edit3, color: "text-yellow-400", label: "M" },
  added: { icon: Plus, color: "text-emerald-400", label: "A" },
  deleted: { icon: Minus, color: "text-red-400", label: "D" },
};

export function SourceControlPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Source Control
        </span>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5 border border-border">
          <GitBranch className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-xs text-foreground">main</span>
        </div>
      </div>

      <div className="px-3 pb-2">
        <input
          placeholder="Commit message..."
          className="w-full px-2 py-1.5 text-xs bg-white/5 border border-border rounded-md text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
        />
        <button className="mt-2 w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-md bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary text-xs font-medium transition-all">
          <GitCommit className="w-3.5 h-3.5" />
          Commit
        </button>
      </div>

      <div className="px-3 py-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
          Changes ({CHANGES.length})
        </p>
        <div className="space-y-0.5">
          {CHANGES.map((change, i) => {
            const cfg = STATUS_CONFIG[change.status];
            return (
              <div
                key={i}
                className="flex items-center justify-between px-2 py-1 rounded hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <span className="text-xs text-foreground/80 truncate group-hover:text-foreground transition-colors">
                  {change.file.split("/").pop()}
                </span>
                <span className={`text-xs font-bold shrink-0 ${cfg.color}`}>
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
