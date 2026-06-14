"use client";

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
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useWorkspaceStore } from "@/store/workspace";
import type { SidebarItem } from "@/types";
import { cn } from "@/lib/utils";

const TOP_ITEMS: { id: SidebarItem; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "explorer", icon: FolderOpen, label: "Explorer" },
  { id: "search", icon: Search, label: "Search" },
  { id: "source-control", icon: GitBranch, label: "Source Control" },
  { id: "run-debug", icon: Play, label: "Run & Debug" },
  { id: "extensions", icon: Puzzle, label: "Extensions" },
];

function ActivityButton({
  onClick,
  isActive,
  label,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-200",
          isActive
            ? "activity-icon-active"
            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
        )}
        aria-label={label}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function ActivityBar() {
  const { activeSidebarItem, setActiveSidebarItem, toggleAIPanel, aiPanelOpen } =
    useWorkspaceStore();

  return (
    <div className="flex flex-col items-center w-12 h-full border-r border-border bg-[oklch(0.09_0.02_280)] py-2 shrink-0">
      {/* Top icons */}
      <div className="flex flex-col items-center gap-1 flex-1">
        {TOP_ITEMS.map(({ id, icon: Icon, label }) => (
          <ActivityButton
            key={id}
            onClick={() => setActiveSidebarItem(id)}
            isActive={activeSidebarItem === id}
            label={label}
          >
            <Icon className="w-5 h-5" />
          </ActivityButton>
        ))}
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-1 mt-auto pb-2">
        <ActivityButton
          onClick={toggleAIPanel}
          isActive={aiPanelOpen}
          label="AI Assistant"
        >
          <Bot className="w-5 h-5" />
        </ActivityButton>

        <ActivityButton
          onClick={() => setActiveSidebarItem("settings")}
          isActive={activeSidebarItem === "settings"}
          label="Settings"
        >
          <Settings className="w-5 h-5" />
        </ActivityButton>
      </div>
    </div>
  );
}
