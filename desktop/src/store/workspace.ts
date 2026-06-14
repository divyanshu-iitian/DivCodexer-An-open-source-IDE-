import { create } from "zustand";
import type {
  WorkspaceState,
  SidebarView,
  EditorTab,
  FileEntry,
  ChatMessage,
  RecentProject,
} from "@/types";

const MOCK_PROJECTS: RecentProject[] = [
  { id: "1", name: "divcodexer", path: "~/Desktop/DivCodexer", language: "TypeScript", lastOpened: "Just now", color: "#7c3aed" },
  { id: "2", name: "api-gateway", path: "~/projects/api-gateway", language: "Go", lastOpened: "1 hour ago", color: "#0ea5e9" },
  { id: "3", name: "ml-pipeline", path: "~/projects/ml-pipeline", language: "Python", lastOpened: "Yesterday", color: "#f59e0b" },
  { id: "4", name: "design-system", path: "~/projects/design-system", language: "TypeScript", lastOpened: "2 days ago", color: "#ec4899" },
  { id: "5", name: "rust-cli", path: "~/projects/rust-cli", language: "Rust", lastOpened: "3 days ago", color: "#f97316" },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "0",
    role: "assistant",
    content:
      "Hi! I'm **DivCodexer AI**. I can help you write code, debug issues, explain concepts, and more.\n\nWhat would you like to build today?",
  },
];

let msgSeq = 1;

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  sidebarView: "home",
  sidebarOpen: true,
  aiPanelOpen: true,
  workspacePath: null,
  fileTree: [],
  tabs: [],
  activeTabId: null,
  recentProjects: MOCK_PROJECTS,
  messages: INITIAL_MESSAGES,

  setSidebarView: (view: SidebarView) =>
    set((s) => ({
      sidebarView: view,
      sidebarOpen: s.sidebarView === view ? !s.sidebarOpen : true,
    })),

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleAIPanel: () => set((s) => ({ aiPanelOpen: !s.aiPanelOpen })),

  setWorkspace: (path: string, tree: FileEntry[]) =>
    set({ workspacePath: path, fileTree: tree }),

  openTab: (tab: Omit<EditorTab, "isDirty">) => {
    const existing = get().tabs.find((t) => t.path === tab.path);
    if (existing) {
      set({ activeTabId: existing.id });
      return;
    }
    const newTab: EditorTab = { ...tab, isDirty: false };
    set((s) => ({ tabs: [...s.tabs, newTab], activeTabId: newTab.id }));
  },

  closeTab: (id: string) =>
    set((s) => {
      const tabs = s.tabs.filter((t) => t.id !== id);
      let activeTabId = s.activeTabId;
      if (activeTabId === id) {
        const idx = s.tabs.findIndex((t) => t.id === id);
        activeTabId = tabs[idx - 1]?.id ?? tabs[0]?.id ?? null;
      }
      return { tabs, activeTabId };
    }),

  setActiveTab: (id: string) => set({ activeTabId: id }),

  updateTabContent: (id: string, content: string) =>
    set((s) => ({
      tabs: s.tabs.map((t) =>
        t.id === id ? { ...t, content, isDirty: true } : t
      ),
    })),

  addMessage: (msg: Omit<ChatMessage, "id">) =>
    set((s) => ({
      messages: [...s.messages, { ...msg, id: String(msgSeq++) }],
    })),

  clearMessages: () => set({ messages: INITIAL_MESSAGES }),
}));
