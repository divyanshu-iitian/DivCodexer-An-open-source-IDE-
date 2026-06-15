import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useEditorStore } from "@/stores/editor";
import { TabBar } from "./TabBar";
import { EditorPane } from "./EditorPane";
import { CommandPalette } from "./CommandPalette";
import type { CommandPaletteItem } from "@/types";

export function EditorArea() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useEditorStore();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const buildCommands = useCallback((): CommandPaletteItem[] => {
    const fileCommands: CommandPaletteItem[] = tabs.map((t) => ({
      id: `file:${t.id}`,
      label: t.name,
      description: t.path,
      category: "file" as const,
      action: () => setActiveTab(t.id),
    }));

    const builtinCommands: CommandPaletteItem[] = [
      {
        id: "cmd:close-tab",
        label: "Close Current Tab",
        description: "Close the active editor tab",
        category: "command" as const,
        action: () => activeTabId && closeTab(activeTabId),
      },
      {
        id: "cmd:close-all",
        label: "Close All Tabs",
        description: "Close all open editor tabs",
        category: "command" as const,
        action: () => tabs.forEach((t) => closeTab(t.id)),
      },
    ];

    return [...fileCommands, ...builtinCommands];
  }, [tabs, activeTabId, setActiveTab, closeTab]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    },
    []
  );

  return (
    <div
      style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelect={setActiveTab}
        onClose={closeTab}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <EditorPane />
      </div>

      {paletteOpen &&
        createPortal(
          <CommandPalette items={buildCommands()} onClose={() => setPaletteOpen(false)} />,
          document.body
        )}
    </div>
  );
}
