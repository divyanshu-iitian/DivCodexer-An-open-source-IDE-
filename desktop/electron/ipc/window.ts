import { BrowserWindow, ipcMain } from "electron";

export function registerWindowHandlers(): void {
  ipcMain.on("window:minimize", () => {
    BrowserWindow.getFocusedWindow()?.minimize();
  });

  ipcMain.on("window:maximize", () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win?.isMaximized()) {
      win.unmaximize();
    } else {
      win?.maximize();
    }
  });

  ipcMain.on("window:close", () => {
    BrowserWindow.getFocusedWindow()?.close();
  });
}
