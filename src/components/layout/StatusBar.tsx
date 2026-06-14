"use client";

import {
  GitBranch,
  AlertCircle,
  CheckCircle2,
  Bell,
  Wifi,
  Zap,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace";

export function StatusBar() {
  const { activeWorkspace } = useWorkspaceStore();

  return (
    <div className="flex items-center justify-between h-6 px-3 border-t border-border bg-[oklch(0.09_0.02_280)] text-muted-foreground text-[11px] shrink-0">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
          <GitBranch className="w-3 h-3 text-primary" />
          <span className="text-primary">main</span>
        </button>
        <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>0 errors</span>
        </div>
        <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
          <AlertCircle className="w-3 h-3 text-yellow-400" />
          <span>2 warnings</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Zap className="w-2.5 h-2.5 text-primary" />
          <span className="text-primary/80">DivCodexer AI</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {activeWorkspace && (
          <span className="text-muted-foreground truncate max-w-[200px]">
            {activeWorkspace}
          </span>
        )}
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>Ln 1, Col 1</span>
        <div className="flex items-center gap-1">
          <Wifi className="w-3 h-3 text-emerald-400" />
          <span>Connected</span>
        </div>
        <button className="hover:text-foreground transition-colors">
          <Bell className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
