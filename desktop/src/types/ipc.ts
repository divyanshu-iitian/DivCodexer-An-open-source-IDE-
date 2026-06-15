import type { GitStatus, TerminalSession } from "./domain";

// ── Channel names ──────────────────────────────────────────────────────────
export const IPC_CHANNELS = {
  // Window
  WINDOW_MINIMIZE: "window:minimize",
  WINDOW_MAXIMIZE: "window:maximize",
  WINDOW_CLOSE: "window:close",

  // File system
  FS_OPEN_FOLDER: "fs:openFolder",
  FS_READ_DIR: "fs:readDir",
  FS_READ_FILE: "fs:readFile",
  FS_WRITE_FILE: "fs:writeFile",
  FS_CREATE_FILE: "fs:createFile",
  FS_CREATE_DIR: "fs:createDir",
  FS_RENAME: "fs:rename",
  FS_DELETE: "fs:delete",
  FS_EXISTS: "fs:exists",

  // Git
  GIT_STATUS: "git:status",
  GIT_COMMIT: "git:commit",
  GIT_PUSH: "git:push",
  GIT_PULL: "git:pull",
  GIT_STAGE: "git:stage",
  GIT_UNSTAGE: "git:unstage",
  GIT_DISCARD: "git:discard",

  // Terminal
  TERMINAL_CREATE: "terminal:create",
  TERMINAL_INPUT: "terminal:input",
  TERMINAL_RESIZE: "terminal:resize",
  TERMINAL_DESTROY: "terminal:destroy",
  TERMINAL_DATA: "terminal:data",
  TERMINAL_EXIT: "terminal:exit",

  // Persistence
  STORE_GET: "store:get",
  STORE_SET: "store:set",
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

// ── Payload types ──────────────────────────────────────────────────────────
export interface FsDirEntry {
  name: string;
  path: string;
  isDirectory: boolean;
}

export interface TerminalCreatePayload {
  cols: number;
  rows: number;
  cwd?: string;
}

export interface TerminalResizePayload {
  id: string;
  cols: number;
  rows: number;
}

// ── ElectronAPI surface (mirrors contextBridge exposure) ───────────────────
export interface ElectronAPI {
  // Window
  minimize(): void;
  maximize(): void;
  close(): void;

  // File system
  openFolder(): Promise<string | null>;
  readDir(path: string): Promise<FsDirEntry[]>;
  readFile(path: string): Promise<string | null>;
  writeFile(path: string, content: string): Promise<boolean>;
  createFile(path: string): Promise<boolean>;
  createDir(path: string): Promise<boolean>;
  rename(oldPath: string, newPath: string): Promise<boolean>;
  delete(path: string): Promise<boolean>;
  exists(path: string): Promise<boolean>;

  // Git
  gitStatus(cwd: string): Promise<GitStatus | null>;
  gitCommit(cwd: string, message: string): Promise<boolean>;
  gitPush(cwd: string): Promise<boolean>;
  gitPull(cwd: string): Promise<boolean>;
  gitStage(cwd: string, paths: string[]): Promise<boolean>;
  gitUnstage(cwd: string, paths: string[]): Promise<boolean>;
  gitDiscard(cwd: string, path: string): Promise<boolean>;

  // Terminal
  terminalCreate(payload: TerminalCreatePayload): Promise<TerminalSession | null>;
  terminalInput(id: string, data: string): void;
  terminalResize(payload: TerminalResizePayload): void;
  terminalDestroy(id: string): void;
  onTerminalData(cb: (id: string, data: string) => void): () => void;
  onTerminalExit(cb: (id: string, code: number) => void): () => void;

  // Persistence
  storeGet<T>(key: string): Promise<T | null>;
  storeSet<T>(key: string, value: T): Promise<void>;
}
