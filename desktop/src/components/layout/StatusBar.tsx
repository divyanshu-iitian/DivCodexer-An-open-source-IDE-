import { GitBranch, CheckCircle2, AlertTriangle, Wifi, Zap, Bell } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace";

export function StatusBar() {
  const { tabs, activeTabId } = useWorkspaceStore();
  const activeTab = tabs.find((t) => t.id === activeTabId);

  return (
    <div
      className="flex items-center justify-between h-6 px-3 shrink-0 text-[11px] select-none"
      style={{
        background: "oklch(0.09 0.02 280)",
        borderTop: "1px solid oklch(1 0 0 / 6%)",
        color: "oklch(0.55 0.02 280)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-1 transition-colors hover:text-white"
          title="Branch"
        >
          <GitBranch className="w-3 h-3" style={{ color: "oklch(0.65 0.28 290)" }} />
          <span style={{ color: "oklch(0.65 0.28 290)" }}>main</span>
        </button>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" style={{ color: "oklch(0.72 0.20 145)" }} />
          <span>0 errors</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" style={{ color: "oklch(0.78 0.18 75)" }} />
          <span>2 warnings</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-1">
        <Zap className="w-2.5 h-2.5" style={{ color: "oklch(0.65 0.28 290)" }} />
        <span style={{ color: "oklch(0.65 0.28 290 / 80%)" }}>DivCodexer AI</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span>{activeTab?.language ?? "TypeScript"}</span>
        <span>UTF-8</span>
        <span>Ln 1, Col 1</span>
        <div className="flex items-center gap-1">
          <Wifi className="w-3 h-3" style={{ color: "oklch(0.72 0.20 145)" }} />
          <span>Ready</span>
        </div>
        <button className="transition-colors hover:text-white">
          <Bell className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
