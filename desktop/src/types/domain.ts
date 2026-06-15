export type SidebarView =
  | "home"
  | "explorer"
  | "search"
  | "git"
  | "run"
  | "extensions"
  | "settings";

export type PanelId = "terminal" | "problems" | "output";

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileEntry[];
}

export interface EditorTab {
  id: string;
  name: string;
  path: string;
  language: string;
  content: string;
  isDirty: boolean;
  viewState?: string;
}

export interface RecentProject {
  id: string;
  name: string;
  path: string;
  language: string;
  lastOpenedAt: number;
  color: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export type AiModel = "sonnet" | "opus" | "haiku";

export interface GitStatus {
  branch: string;
  ahead: number;
  behind: number;
  staged: GitFileChange[];
  unstaged: GitFileChange[];
  untracked: string[];
}

export interface GitFileChange {
  path: string;
  status: "M" | "A" | "D" | "R" | "C" | "U";
}

export interface TerminalSession {
  id: string;
  title: string;
  pid: number;
}

export interface ContextMenuAction {
  id: string;
  label: string;
  shortcut?: string;
  separator?: boolean;
  disabled?: boolean;
}

export interface ContextMenuState {
  x: number;
  y: number;
  targetPath: string;
  isDirectory: boolean;
}

export interface CommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  category: "file" | "command" | "symbol";
  icon?: string;
  action: () => void;
}
