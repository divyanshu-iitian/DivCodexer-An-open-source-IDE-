import { X, Circle } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace";
import { getFileIcon } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function EditorTabs() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useWorkspaceStore();

  if (tabs.length === 0) return null;

  return (
    <div
      className="flex items-end h-9 overflow-x-auto shrink-0 select-none"
      style={{
        background: "oklch(0.09 0.02 280)",
        borderBottom: "1px solid oklch(1 0 0 / 6%)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 h-8 text-xs shrink-0 border-t-2 transition-all group",
              isActive
                ? "border-t-[oklch(0.65_0.28_290)]"
                : "border-t-transparent hover:bg-white/5"
            )}
            style={{
              background: isActive ? "oklch(0.11 0.02 280)" : "transparent",
              borderRight: "1px solid oklch(1 0 0 / 6%)",
              color: isActive ? "oklch(0.85 0.01 280)" : "oklch(0.55 0.02 280)",
            }}
          >
            <span className="text-[11px]">{getFileIcon(tab.name)}</span>
            <span className="truncate max-w-[120px]">{tab.name}</span>
            {tab.isDirty ? (
              <Circle className="w-2 h-2 fill-current ml-1" style={{ color: "oklch(0.65 0.28 290)" }} />
            ) : (
              <span
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
              >
                <X className="w-3 h-3" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
