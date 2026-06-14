import { TitleBar } from "./TitleBar";
import { ActivityBar } from "./ActivityBar";
import { Sidebar } from "./Sidebar";
import { StatusBar } from "./StatusBar";
import { EditorArea } from "@/components/editor/EditorArea";
import { AIPanel } from "@/components/assistant/AIPanel";
import { useWorkspaceStore } from "@/store/workspace";

export function IDELayout() {
  const { aiPanelOpen } = useWorkspaceStore();

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
      {/* Title bar (Electron custom frame) */}
      <TitleBar />

      {/* Main body */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Left: Activity Bar */}
        <ActivityBar />

        {/* Left: Sidebar (dynamic) */}
        <Sidebar />

        {/* Center: Editor / Dashboard */}
        <EditorArea />

        {/* Right: AI Panel */}
        {aiPanelOpen && <AIPanel />}
      </div>

      {/* Bottom: Status Bar */}
      <StatusBar />
    </div>
  );
}
