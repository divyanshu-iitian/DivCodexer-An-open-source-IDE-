import { Minus, Square, X, Zap } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace";

export function TitleBar() {
  const { workspacePath } = useWorkspaceStore();
  const folderName = workspacePath?.split(/[/\\]/).pop() ?? "DivCodexer";

  function minimize() { window.electronAPI?.minimize(); }
  function maximize() { window.electronAPI?.maximize(); }
  function close()    { window.electronAPI?.close(); }

  return (
    <div
      className="drag-region flex items-center h-9 px-3 shrink-0 select-none"
      style={{ background: "oklch(0.09 0.02 280)", borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
    >
      {/* Brand */}
      <div className="no-drag flex items-center gap-1.5 mr-4">
        <Zap className="w-3.5 h-3.5" style={{ color: "oklch(0.75 0.28 290)" }} />
        <span
          className="text-xs font-bold tracking-wide"
          style={{ color: "oklch(0.75 0.28 290)" }}
        >
          DivCodexer
        </span>
      </div>

      {/* Current folder */}
      <span className="text-xs" style={{ color: "oklch(0.55 0.02 280)" }}>
        {folderName}
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Window controls */}
      <div className="no-drag flex items-center gap-1">
        <button
          onClick={minimize}
          className="flex items-center justify-center w-7 h-6 rounded transition-colors"
          style={{ color: "oklch(0.55 0.02 280)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 8%)"; (e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 280)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "oklch(0.55 0.02 280)"; }}
          title="Minimize"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={maximize}
          className="flex items-center justify-center w-7 h-6 rounded transition-colors"
          style={{ color: "oklch(0.55 0.02 280)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 8%)"; (e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 280)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "oklch(0.55 0.02 280)"; }}
          title="Maximize"
        >
          <Square className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={close}
          className="flex items-center justify-center w-7 h-6 rounded transition-colors"
          style={{ color: "oklch(0.55 0.02 280)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.65 0.25 27 / 80%)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "oklch(0.55 0.02 280)"; }}
          title="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
