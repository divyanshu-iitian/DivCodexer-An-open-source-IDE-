import { memo } from "react";
import { useWorkspaceStore } from "@/stores/workspace";
import { useEditorStore } from "@/stores/editor";
import { useUiStore } from "@/stores/ui";
import { LAYOUT } from "@/lib/constants";

export const StatusBar = memo(function StatusBar() {
  const { gitStatus, workspacePath } = useWorkspaceStore();
  const { tabs, activeTabId } = useEditorStore();
  const { toggleBottomPanel } = useUiStore();
  const activeTab = activeTabId ? tabs.find((t) => t.id === activeTabId) : undefined;

  const textStyle: React.CSSProperties = {
    fontSize: 11,
    color: "oklch(0.55 0.01 280)",
    whiteSpace: "nowrap",
  };

  const btnStyle: React.CSSProperties = {
    ...textStyle,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0 4px",
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    gap: 4,
  };

  return (
    <div
      style={{
        height: LAYOUT.STATUS_BAR_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "oklch(0.55 0.28 290)",
        paddingLeft: 8,
        paddingRight: 8,
        flexShrink: 0,
        gap: 4,
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          style={{ ...btnStyle, color: "#fff", gap: 4 }}
          onClick={() => toggleBottomPanel()}
          title="Toggle Terminal"
        >
          <span>⎇</span>
          <span>{gitStatus?.branch ?? (workspacePath ? "main" : "no git")}</span>
        </button>
      </div>

      {/* Center */}
      <div style={{ ...textStyle, color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: 11 }}>
        ✦ DivCodexer AI
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ ...textStyle, color: "rgba(255,255,255,0.8)" }}>
          {activeTab?.language ?? "plaintext"}
        </span>
        <span style={{ ...textStyle, color: "rgba(255,255,255,0.8)" }}>UTF-8</span>
        <button
          style={{ ...btnStyle, color: "rgba(255,255,255,0.8)" }}
          onClick={() => toggleBottomPanel()}
          title="Toggle Terminal"
        >
          Terminal ⌨
        </button>
      </div>
    </div>
  );
});
