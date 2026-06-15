import { create } from "zustand";
import type { ChatMessage, FileEntry, GitStatus, RecentProject, AiModel, TerminalSession } from "@/types";
import { generateId } from "@/lib/utils";
import { projectColor } from "@/lib/utils";

const INITIAL_MESSAGE: ChatMessage = {
  id: "init",
  role: "assistant",
  content:
    "Hi! I'm **DivCodexer AI**. I can help you write code, debug issues, explain concepts, and more.\n\nWhat would you like to build today?",
  timestamp: Date.now(),
};

interface WorkspaceState {
  // Current workspace
  workspacePath: string | null;
  fileTree: FileEntry[];
  gitStatus: GitStatus | null;

  // Recent projects (persisted)
  recentProjects: RecentProject[];

  // AI Chat
  messages: ChatMessage[];
  activeModel: AiModel;

  // Terminals
  terminals: TerminalSession[];
  activeTerminalId: string | null;

  // Actions – workspace
  openWorkspace: (path: string, tree: FileEntry[]) => void;
  refreshFileTree: (tree: FileEntry[]) => void;
  setGitStatus: (status: GitStatus | null) => void;

  // Actions – recent projects
  addRecentProject: (path: string, language: string) => void;
  setRecentProjects: (projects: RecentProject[]) => void;

  // Actions – chat
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;
  setModel: (model: AiModel) => void;

  // Actions – terminals
  addTerminal: (session: TerminalSession) => void;
  removeTerminal: (id: string) => void;
  setActiveTerminal: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspacePath: null,
  fileTree: [],
  gitStatus: null,
  recentProjects: [],
  messages: [INITIAL_MESSAGE],
  activeModel: "sonnet",
  terminals: [],
  activeTerminalId: null,

  openWorkspace: (path, tree) => {
    set({ workspacePath: path, fileTree: tree });
    get().addRecentProject(path, "TypeScript");
  },

  refreshFileTree: (tree) => set({ fileTree: tree }),

  setGitStatus: (status) => set({ gitStatus: status }),

  addRecentProject: (path, language) => {
    const name = path.split(/[/\\]/).pop() ?? path;
    set((s) => {
      const filtered = s.recentProjects.filter((p) => p.path !== path);
      const project: RecentProject = {
        id: generateId(),
        name,
        path,
        language,
        lastOpenedAt: Date.now(),
        color: projectColor(path),
      };
      return { recentProjects: [project, ...filtered].slice(0, 10) };
    });
  },

  setRecentProjects: (projects) => set({ recentProjects: projects }),

  addMessage: (msg) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { ...msg, id: generateId(), timestamp: Date.now() },
      ],
    })),

  clearMessages: () => set({ messages: [INITIAL_MESSAGE] }),

  setModel: (model) => set({ activeModel: model }),

  addTerminal: (session) =>
    set((s) => ({
      terminals: [...s.terminals, session],
      activeTerminalId: session.id,
    })),

  removeTerminal: (id) =>
    set((s) => {
      const terminals = s.terminals.filter((t) => t.id !== id);
      const activeTerminalId =
        s.activeTerminalId === id
          ? (terminals[terminals.length - 1]?.id ?? null)
          : s.activeTerminalId;
      return { terminals, activeTerminalId };
    }),

  setActiveTerminal: (id) => set({ activeTerminalId: id }),
}));
