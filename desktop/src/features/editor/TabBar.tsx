import { memo } from "react";
import type { EditorTab } from "@/types";
import { LAYOUT } from "@/lib/constants";
import { getFileIcon } from "@/lib/language";

interface Props {
  tabs: EditorTab[];
  activeTabId: string | null;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}

export const TabBar = memo(function TabBar({ tabs, activeTabId, onSelect, onClose }: Props) {
  if (tabs.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        height: LAYOUT.TAB_HEIGHT,
        background: "oklch(0.08 0.02 280)",
        borderBottom: "1px solid oklch(0.15 0.03 280)",
        overflowX: "auto",
        overflowY: "hidden",
        flexShrink: 0,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0 12px",
              height: "100%",
              minWidth: "120px",
              maxWidth: "200px",
              cursor: "pointer",
              borderRight: "1px solid oklch(0.15 0.03 280)",
              background: isActive ? "oklch(0.12 0.03 280)" : "transparent",
              borderBottom: isActive ? `2px solid oklch(0.65 0.28 290)` : "2px solid transparent",
              color: isActive ? "oklch(0.90 0.01 280)" : "oklch(0.55 0.01 280)",
              fontSize: "13px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "14px" }}>{getFileIcon(tab.name)}</span>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                flex: 1,
                minWidth: 0,
              }}
            >
              {tab.isDirty && <span style={{ color: "oklch(0.65 0.28 290)" }}>● </span>}
              {tab.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(tab.id);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "oklch(0.55 0.01 280)",
                fontSize: "14px",
                padding: "0 2px",
                lineHeight: 1,
                borderRadius: "3px",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.90 0.01 280)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.55 0.01 280)")
              }
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
});
