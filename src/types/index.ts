export type SidebarItem =
  | "home"
  | "explorer"
  | "search"
  | "source-control"
  | "run-debug"
  | "extensions"
  | "settings";

export interface RecentProject {
  id: string;
  name: string;
  path: string;
  language: string;
  lastOpened: string;
  color: string;
}

export interface RecentFile {
  id: string;
  name: string;
  path: string;
  language: string;
  lastModified: string;
}

export interface WorkspaceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
}

export interface WorkspaceState {
  activeWorkspace: string | null;
  activeSidebarItem: SidebarItem;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  recentProjects: RecentProject[];
  recentFiles: RecentFile[];
  setActiveWorkspace: (workspace: string | null) => void;
  setActiveSidebarItem: (item: SidebarItem) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
}
