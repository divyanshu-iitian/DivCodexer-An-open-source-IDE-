import { TitleBar } from "./TitleBar";
import { ActivityBar } from "./ActivityBar";
import { Sidebar } from "./Sidebar";
import { StatusBar } from "./StatusBar";
import { EditorArea } from "@/features/editor";
import { AssistantPanel } from "@/features/assistant";
import { TerminalPane } from "@/features/terminal";
import { useUiStore } from "@/stores/ui";
import { LAYOUT } from "@/lib/constants";

export function IDELayout() {
  const { aiPanelOpen, bottomPanelOpen } = useUiStore();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "oklch(0.08 0.02 280)",
      }}
    >
      <TitleBar />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <ActivityBar />
        <Sidebar />

        {/* Center column: Editor + Bottom Panel */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {/* Editor */}
          <div style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden" }}>
            <EditorArea />
          </div>

          {/* Bottom Panel (Terminal) */}
          {bottomPanelOpen && (
            <div
              style={{
                height: LAYOUT.BOTTOM_PANEL_HEIGHT,
                flexShrink: 0,
                borderTop: "1px solid oklch(0.14 0.03 280)",
                background: "oklch(0.08 0.02 280)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TerminalPane />
            </div>
          )}
        </div>

        {/* AI Panel */}
        {aiPanelOpen && (
          <div
            style={{
              width: LAYOUT.AI_PANEL_WIDTH,
              flexShrink: 0,
              borderLeft: "1px solid oklch(0.14 0.03 280)",
              background: "oklch(0.09 0.02 280)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AssistantPanel />
          </div>
        )}
      </div>

      <StatusBar />
    </div>
  );
}
