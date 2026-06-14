import { create } from "zustand";
import type { WorkspaceState, RecentProject, RecentFile, SidebarItem } from "@/types";

const RECENT_PROJECTS: RecentProject[] = [
  {
    id: "1",
    name: "divcodexer",
    path: "~/Desktop/DivCodexer",
    language: "TypeScript",
    lastOpened: "2 minutes ago",
    color: "#7c3aed",
  },
  {
    id: "2",
    name: "api-gateway",
    path: "~/projects/api-gateway",
    language: "Go",
    lastOpened: "1 hour ago",
    color: "#0ea5e9",
  },
  {
    id: "3",
    name: "ml-pipeline",
    path: "~/projects/ml-pipeline",
    language: "Python",
    lastOpened: "Yesterday",
    color: "#f59e0b",
  },
  {
    id: "4",
    name: "design-system",
    path: "~/projects/design-system",
    language: "TypeScript",
    lastOpened: "2 days ago",
    color: "#ec4899",
  },
  {
    id: "5",
    name: "rust-cli",
    path: "~/projects/rust-cli",
    language: "Rust",
    lastOpened: "3 days ago",
    color: "#f97316",
  },
];

const RECENT_FILES: RecentFile[] = [
  {
    id: "1",
    name: "page.tsx",
    path: "src/app/page.tsx",
    language: "tsx",
    lastModified: "5 minutes ago",
  },
  {
    id: "2",
    name: "workspace.ts",
    path: "src/store/workspace.ts",
    language: "ts",
    lastModified: "10 minutes ago",
  },
  {
    id: "3",
    name: "IDELayout.tsx",
    path: "src/components/layout/IDELayout.tsx",
    language: "tsx",
    lastModified: "30 minutes ago",
  },
  {
    id: "4",
    name: "globals.css",
    path: "src/app/globals.css",
    language: "css",
    lastModified: "1 hour ago",
  },
];

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeWorkspace: null,
  activeSidebarItem: "home",
  sidebarOpen: true,
  aiPanelOpen: true,
  recentProjects: RECENT_PROJECTS,
  recentFiles: RECENT_FILES,
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  setActiveSidebarItem: (item: SidebarItem) =>
    set((state) => ({
      activeSidebarItem: item,
      sidebarOpen: state.activeSidebarItem === item ? !state.sidebarOpen : true,
    })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
}));
