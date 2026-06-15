import { memo } from "react";
import { useUiStore } from "@/stores/ui";
import type { SidebarView } from "@/types";
import { LAYOUT } from "@/lib/constants";

const NAV_ITEMS: { id: SidebarView; icon: string; title: string }[] = [
  { id: "explorer", icon: "⊞", title: "Explorer" },
  { id: "search", icon: "⌕", title: "Search" },
  { id: "git", icon: "⎇", title: "Source Control" },
  { id: "run", icon: "▷", title: "Run & Debug" },
  { id: "extensions", icon: "⧉", title: "Extensions" },
];

const NavButton = memo(function NavButton({
  icon,
  title,
  isActive,
  onClick,
}: {
  icon: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
        background: isActive ? "oklch(0.65 0.28 290 / 15%)" : "transparent",
        color: isActive ? "oklch(0.75 0.28 290)" : "oklch(0.45 0.01 280)",
        fontSize: 18,
        boxShadow: isActive ? "inset 2px 0 0 oklch(0.65 0.28 290)" : "none",
        transition: "all 0.12s",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.85 0.01 280)";
          (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 5%)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.45 0.01 280)";
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }
      }}
    >
      {icon}
    </button>
  );
});

export const ActivityBar = memo(function ActivityBar() {
  const { sidebarView, setSidebarView, aiPanelOpen, toggleAiPanel } = useUiStore();

  return (
    <aside
      style={{
        width: LAYOUT.ACTIVITY_BAR_WIDTH,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        background: "oklch(0.08 0.02 280)",
        borderRight: "1px solid oklch(0.14 0.03 280)",
        paddingTop: 8,
        paddingBottom: 8,
        gap: 2,
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ id, icon, title }) => (
          <NavButton
            key={id}
            icon={icon}
            title={title}
            isActive={sidebarView === id}
            onClick={() => setSidebarView(id)}
          />
        ))}
      </div>

      <NavButton
        icon="✦"
        title="AI Assistant"
        isActive={aiPanelOpen}
        onClick={toggleAiPanel}
      />
      <NavButton
        icon="⚙"
        title="Settings"
        isActive={sidebarView === "settings"}
        onClick={() => setSidebarView("settings")}
      />
    </aside>
  );
});
