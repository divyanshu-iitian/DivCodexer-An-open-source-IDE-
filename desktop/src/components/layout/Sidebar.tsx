import { useWorkspaceStore } from "@/store/workspace";
import { ExplorerPanel } from "@/components/sidebar/ExplorerPanel";
import { SearchPanel } from "@/components/sidebar/SearchPanel";
import { GitPanel } from "@/components/sidebar/GitPanel";
import { RunPanel } from "@/components/sidebar/RunPanel";
import { ExtensionsPanel } from "@/components/sidebar/ExtensionsPanel";
import { SettingsPanel } from "@/components/sidebar/SettingsPanel";

const PANELS = {
  explorer:   ExplorerPanel,
  search:     SearchPanel,
  git:        GitPanel,
  run:        RunPanel,
  extensions: ExtensionsPanel,
  settings:   SettingsPanel,
};

export function Sidebar() {
  const { sidebarView, sidebarOpen } = useWorkspaceStore();

  if (!sidebarOpen || sidebarView === "home") return null;

  const Panel = PANELS[sidebarView as keyof typeof PANELS];
  if (!Panel) return null;

  return (
    <aside
      className="w-60 h-full shrink-0 overflow-hidden slide-in flex flex-col"
      style={{
        background: "oklch(0.10 0.02 280)",
        borderRight: "1px solid oklch(1 0 0 / 6%)",
      }}
    >
      <Panel />
    </aside>
  );
}
