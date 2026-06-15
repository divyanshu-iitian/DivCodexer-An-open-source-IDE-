import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  // Window
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),

  // File system
  openFolder: (): Promise<string | null> => ipcRenderer.invoke("fs:openFolder"),
  readDir: (dirPath: string) => ipcRenderer.invoke("fs:readDir", dirPath),
  readFile: (filePath: string) => ipcRenderer.invoke("fs:readFile", filePath),
  writeFile: (filePath: string, content: string) =>
    ipcRenderer.invoke("fs:writeFile", filePath, content),
  createFile: (filePath: string) => ipcRenderer.invoke("fs:createFile", filePath),
  createDir: (dirPath: string) => ipcRenderer.invoke("fs:createDir", dirPath),
  rename: (oldPath: string, newPath: string) =>
    ipcRenderer.invoke("fs:rename", oldPath, newPath),
  delete: (entryPath: string) => ipcRenderer.invoke("fs:delete", entryPath),
  exists: (entryPath: string) => ipcRenderer.invoke("fs:exists", entryPath),

  // Git
  gitStatus: (cwd: string) => ipcRenderer.invoke("git:status", cwd),
  gitCommit: (cwd: string, message: string) =>
    ipcRenderer.invoke("git:commit", cwd, message),
  gitPush: (cwd: string) => ipcRenderer.invoke("git:push", cwd),
  gitPull: (cwd: string) => ipcRenderer.invoke("git:pull", cwd),
  gitStage: (cwd: string, paths: string[]) =>
    ipcRenderer.invoke("git:stage", cwd, paths),
  gitUnstage: (cwd: string, paths: string[]) =>
    ipcRenderer.invoke("git:unstage", cwd, paths),
  gitDiscard: (cwd: string, filePath: string) =>
    ipcRenderer.invoke("git:discard", cwd, filePath),

  // Terminal
  terminalCreate: (payload: { cols: number; rows: number; cwd?: string }) =>
    ipcRenderer.invoke("terminal:create", payload),
  terminalInput: (id: string, data: string) =>
    ipcRenderer.send("terminal:input", id, data),
  terminalResize: (payload: { id: string; cols: number; rows: number }) =>
    ipcRenderer.send("terminal:resize", payload),
  terminalDestroy: (id: string) => ipcRenderer.send("terminal:destroy", id),
  onTerminalData: (cb: (id: string, data: string) => void) => {
    const handler = (_e: Electron.IpcRendererEvent, id: string, data: string) =>
      cb(id, data);
    ipcRenderer.on("terminal:data", handler);
    return () => ipcRenderer.removeListener("terminal:data", handler);
  },
  onTerminalExit: (cb: (id: string, code: number) => void) => {
    const handler = (_e: Electron.IpcRendererEvent, id: string, code: number) =>
      cb(id, code);
    ipcRenderer.on("terminal:exit", handler);
    return () => ipcRenderer.removeListener("terminal:exit", handler);
  },

  // Persistence
  storeGet: <T>(key: string): Promise<T | null> =>
    ipcRenderer.invoke("store:get", key),
  storeSet: <T>(key: string, value: T): Promise<void> =>
    ipcRenderer.invoke("store:set", key, value),
});
