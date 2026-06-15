import { useCallback } from "react";
import { useWorkspaceStore } from "@/stores/workspace";
import { TerminalTab } from "./TerminalTab";
import * as termService from "@/services/terminal";
export function TerminalPane() {
  const { terminals, activeTerminalId, addTerminal, removeTerminal, setActiveTerminal, workspacePath } =
    useWorkspaceStore();

  const createTerminal = useCallback(async () => {
    const session = await termService.createTerminal({
      cols: 100,
      rows: 30,
      cwd: workspacePath ?? undefined,
    });
    if (session) addTerminal(session);
  }, [workspacePath, addTerminal]);

  const destroyTerminal = useCallback(
    (id: string) => {
      termService.destroyTerminal(id);
      removeTerminal(id);
    },
    [removeTerminal]
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Terminal tab bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "32px",
          background: "oklch(0.08 0.02 280)",
          borderBottom: "1px solid oklch(0.15 0.03 280)",
          padding: "0 8px",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        {terminals.map((t) => {
          const isActive = t.id === activeTerminalId;
          return (
            <div
              key={t.id}
              onClick={() => setActiveTerminal(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0 8px",
                height: "24px",
                borderRadius: "4px",
                cursor: "pointer",
                background: isActive ? "oklch(0.16 0.04 280)" : "transparent",
                color: isActive ? "oklch(0.85 0.01 280)" : "oklch(0.55 0.01 280)",
                fontSize: "12px",
              }}
            >
              <span>⊡</span>
              <span>bash</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  destroyTerminal(t.id);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                  fontSize: "12px",
                  padding: "0 2px",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
        <button
          onClick={createTerminal}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "oklch(0.55 0.01 280)",
            fontSize: "18px",
            lineHeight: 1,
            padding: "0 4px",
            marginLeft: "4px",
          }}
          title="New Terminal"
        >
          +
        </button>
      </div>

      {/* Terminal content */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {terminals.length === 0 ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <p style={{ color: "oklch(0.45 0.01 280)", fontSize: "13px", margin: 0 }}>
              No terminal sessions
            </p>
            <button
              onClick={createTerminal}
              style={{
                background: "oklch(0.65 0.28 290)",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "13px",
                padding: "6px 14px",
              }}
            >
              New Terminal
            </button>
          </div>
        ) : (
          terminals.map((t) => (
            <div
              key={t.id}
              style={{
                position: "absolute",
                inset: 0,
                display: t.id === activeTerminalId ? "block" : "none",
              }}
            >
              <TerminalTab sessionId={t.id} isVisible={t.id === activeTerminalId} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
