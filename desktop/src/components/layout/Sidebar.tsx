import { memo } from "react";
import { useUiStore } from "@/stores/ui";
import { ExplorerPanel } from "@/features/explorer";
import { SearchPanel } from "@/features/search";
import { GitPanel } from "@/features/git";
import { LAYOUT } from "@/lib/constants";

function RunPanel() {
  return (
    <div style={{ padding: 16, color: "oklch(0.45 0.01 280)", fontSize: 13, textAlign: "center" }}>
      Run & Debug — coming soon
    </div>
  );
}

function ExtensionsPanel() {
  return (
    <div style={{ padding: 16, color: "oklch(0.45 0.01 280)", fontSize: 13, textAlign: "center" }}>
      Extensions — coming soon
    </div>
  );
}

function SettingsPanel() {
  return (
    <div style={{ padding: 16, color: "oklch(0.45 0.01 280)", fontSize: 13 }}>
      <p style={{ margin: "0 0 8px", fontWeight: 600, color: "oklch(0.65 0.01 280)" }}>Settings</p>
      <p style={{ margin: 0, fontSize: 12 }}>Configuration panel coming soon.</p>
    </div>
  );
}

const PANELS: Record<string, React.ComponentType> = {
  explorer: ExplorerPanel,
  search: SearchPanel,
  git: GitPanel,
  run: RunPanel,
  extensions: ExtensionsPanel,
  settings: SettingsPanel,
};

export const Sidebar = memo(function Sidebar() {
  const { sidebarView, sidebarOpen } = useUiStore();

  if (!sidebarOpen) return null;

  const Panel = PANELS[sidebarView];
  if (!Panel) return null;

  return (
    <aside
      style={{
        width: LAYOUT.SIDEBAR_WIDTH,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        background: "oklch(0.09 0.02 280)",
        borderRight: "1px solid oklch(0.14 0.03 280)",
        overflow: "hidden",
      }}
    >
      <Panel />
    </aside>
  );
});
