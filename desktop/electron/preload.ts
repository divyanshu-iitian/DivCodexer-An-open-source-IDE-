import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  // Window controls
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),

  // File system
  openFolder: (): Promise<string | null> =>
    ipcRenderer.invoke("fs:openFolder"),
  readDir: (
    dirPath: string
  ): Promise<{ name: string; isDirectory: boolean; path: string }[]> =>
    ipcRenderer.invoke("fs:readDir", dirPath),
  readFile: (filePath: string): Promise<string | null> =>
    ipcRenderer.invoke("fs:readFile", filePath),
  writeFile: (filePath: string, content: string): Promise<boolean> =>
    ipcRenderer.invoke("fs:writeFile", filePath, content),
});
