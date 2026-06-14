export type SidebarView =
  | "home"
  | "explorer"
  | "search"
  | "git"
  | "run"
  | "extensions"
  | "settings";

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileEntry[];
  language?: string;
}

export interface EditorTab {
  id: string;
  name: string;
  path: string;
  language: string;
  content: string;
  isDirty: boolean;
}

export interface RecentProject {
  id: string;
  name: string;
  path: string;
  language: string;
  lastOpened: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface WorkspaceState {
  // Layout
  sidebarView: SidebarView;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  // Workspace
  workspacePath: string | null;
  fileTree: FileEntry[];
  // Editor
  tabs: EditorTab[];
  activeTabId: string | null;
  // Data
  recentProjects: RecentProject[];
  // Chat
  messages: ChatMessage[];
  // Actions
  setSidebarView: (view: SidebarView) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  setWorkspace: (path: string, tree: FileEntry[]) => void;
  openTab: (tab: Omit<EditorTab, "isDirty">) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTabContent: (id: string, content: string) => void;
  addMessage: (msg: Omit<ChatMessage, "id">) => void;
  clearMessages: () => void;
}

// Electron IPC API exposed via preload
declare global {
  interface Window {
    electronAPI: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      openFolder: () => Promise<string | null>;
      readDir: (
        path: string
      ) => Promise<{ name: string; isDirectory: boolean; path: string }[]>;
      readFile: (path: string) => Promise<string | null>;
      writeFile: (path: string, content: string) => Promise<boolean>;
    };
  }
}
