import { useEffect, useCallback } from "react";
import { useEditorStore } from "@/stores/editor";
import { useUiStore } from "@/stores/ui";
import * as fsService from "@/services/fs";

export function useShortcuts() {
  const { getTab, activeTabId, markSaved } = useEditorStore();
  const { toggleAiPanel, toggleBottomPanel } = useUiStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (!ctrl) return;

      if (e.key === "s") {
        e.preventDefault();
        const tab = activeTabId ? getTab(activeTabId) : undefined;
        if (tab?.isDirty) {
          fsService.writeFile(tab.path, tab.content).then((ok) => {
            if (ok) markSaved(tab.id);
          });
        }
      }

      if (e.key === "i") {
        e.preventDefault();
        toggleAiPanel();
      }

      if (e.key === "`") {
        e.preventDefault();
        toggleBottomPanel();
      }
    },
    [activeTabId, getTab, markSaved, toggleAiPanel, toggleBottomPanel]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
