import { memo } from "react";
import { useWorkspaceStore } from "@/stores/workspace";
import { LAYOUT } from "@/lib/constants";
import { basename } from "@/lib/utils";

export const TitleBar = memo(function TitleBar() {
  const { workspacePath } = useWorkspaceStore();

  const btnBase: React.CSSProperties = {
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    flexShrink: 0,
    padding: 0,
  };

  return (
    <div
      style={{
        height: LAYOUT.TITLE_BAR_HEIGHT,
        display: "flex",
        alignItems: "center",
        background: "oklch(0.07 0.02 280)",
        borderBottom: "1px solid oklch(0.14 0.03 280)",
        userSelect: "none",
        WebkitAppRegion: "drag" as React.CSSProperties["WebkitAppRegion"],
        paddingLeft: 12,
        paddingRight: 12,
        flexShrink: 0,
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          WebkitAppRegion: "no-drag" as React.CSSProperties["WebkitAppRegion"],
          flexShrink: 0,
        }}
      >
        <button
          style={{ ...btnBase, background: "#ff5f57" }}
          onClick={() => window.electronAPI.close()}
          title="Close"
        />
        <button
          style={{ ...btnBase, background: "#febc2e" }}
          onClick={() => window.electronAPI.minimize()}
          title="Minimize"
        />
        <button
          style={{ ...btnBase, background: "#28c840" }}
          onClick={() => window.electronAPI.maximize()}
          title="Maximize"
        />
      </div>

      <div
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 12,
          color: "oklch(0.45 0.01 280)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {workspacePath ? `${basename(workspacePath)} — DivCodexer` : "DivCodexer — AI IDE"}
      </div>
    </div>
  );
});
