import {
  Home,
  FolderOpen,
  Search,
  GitBranch,
  Play,
  Puzzle,
  Settings,
  Bot,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace";
import type { SidebarView } from "@/types";
import { cn } from "@/lib/utils";

const TOP_NAV: { id: SidebarView; Icon: React.ComponentType<{ className?: string }>; title: string }[] = [
  { id: "home",       Icon: Home,       title: "Home" },
  { id: "explorer",   Icon: FolderOpen, title: "Explorer" },
  { id: "search",     Icon: Search,     title: "Search" },
  { id: "git",        Icon: GitBranch,  title: "Source Control" },
  { id: "run",        Icon: Play,       title: "Run & Debug" },
  { id: "extensions", Icon: Puzzle,     title: "Extensions" },
];

export function ActivityBar() {
  const { sidebarView, setSidebarView, aiPanelOpen, toggleAIPanel } = useWorkspaceStore();

  return (
    <aside
      className="flex flex-col items-center w-12 shrink-0 py-1"
      style={{
        background: "oklch(0.09 0.02 280)",
        borderRight: "1px solid oklch(1 0 0 / 6%)",
      }}
    >
      {/* Top icons */}
      <div className="flex flex-col items-center gap-0.5 flex-1 pt-1">
        {TOP_NAV.map(({ id, Icon, title }) => {
          const isActive = sidebarView === id;
          return (
            <button
              key={id}
              title={title}
              onClick={() => setSidebarView(id)}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-150",
                isActive
                  ? "activity-active"
                  : "hover:bg-white/5"
              )}
              style={
                isActive
                  ? {}
                  : { color: "oklch(0.50 0.02 280)" }
              }
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 280)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "oklch(0.50 0.02 280)";
              }}
            >
              <Icon className="w-[18px] h-[18px]" />
            </button>
          );
        })}
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-0.5 pb-2">
        <button
          title="AI Assistant"
          onClick={toggleAIPanel}
          className={cn(
            "relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-150",
            aiPanelOpen ? "activity-active" : "hover:bg-white/5"
          )}
          style={aiPanelOpen ? {} : { color: "oklch(0.50 0.02 280)" }}
          onMouseEnter={(e) => { if (!aiPanelOpen) (e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 280)"; }}
          onMouseLeave={(e) => { if (!aiPanelOpen) (e.currentTarget as HTMLElement).style.color = "oklch(0.50 0.02 280)"; }}
        >
          <Bot className="w-[18px] h-[18px]" />
        </button>
        <button
          title="Settings"
          onClick={() => setSidebarView("settings")}
          className={cn(
            "relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-150",
            sidebarView === "settings" ? "activity-active" : "hover:bg-white/5"
          )}
          style={sidebarView === "settings" ? {} : { color: "oklch(0.50 0.02 280)" }}
          onMouseEnter={(e) => { if (sidebarView !== "settings") (e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 280)"; }}
          onMouseLeave={(e) => { if (sidebarView !== "settings") (e.currentTarget as HTMLElement).style.color = "oklch(0.50 0.02 280)"; }}
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>
      </div>
    </aside>
  );
}
