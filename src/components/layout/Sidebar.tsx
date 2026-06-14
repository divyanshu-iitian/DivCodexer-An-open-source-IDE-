"use client";

import { useWorkspaceStore } from "@/store/workspace";
import { ExplorerPanel } from "@/components/sidebar/ExplorerPanel";
import { SearchPanel } from "@/components/sidebar/SearchPanel";
import { SourceControlPanel } from "@/components/sidebar/SourceControlPanel";
import { ExtensionsPanel } from "@/components/sidebar/ExtensionsPanel";
import { SettingsPanel } from "@/components/sidebar/SettingsPanel";
import { RunDebugPanel } from "@/components/sidebar/RunDebugPanel";
import { WelcomeDashboard } from "@/components/dashboard/WelcomeDashboard";
import { cn } from "@/lib/utils";

const PANELS: Record<string, React.ComponentType> = {
  home: WelcomeDashboard,
  explorer: ExplorerPanel,
  search: SearchPanel,
  "source-control": SourceControlPanel,
  "run-debug": RunDebugPanel,
  extensions: ExtensionsPanel,
  settings: SettingsPanel,
};

export function Sidebar() {
  const { activeSidebarItem, sidebarOpen } = useWorkspaceStore();

  const Panel = PANELS[activeSidebarItem];

  if (!sidebarOpen || activeSidebarItem === "home") return null;

  return (
    <div
      className={cn(
        "w-64 h-full border-r border-border bg-[oklch(0.10_0.02_280)] flex flex-col overflow-hidden slide-in shrink-0"
      )}
    >
      {Panel && <Panel />}
    </div>
  );
}
