import { dialog, ipcMain } from "electron";
import * as fs from "fs";
import * as path from "path";

export function registerFsHandlers(): void {
  ipcMain.handle("fs:openFolder", async () => {
    const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
    return null;
  });

  ipcMain.handle("fs:readDir", (_e, dirPath: string) => {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      return entries.map((e) => ({
        name: e.name,
        path: path.join(dirPath, e.name),
        isDirectory: e.isDirectory(),
      }));
    } catch {
      return [];
    }
  });

  ipcMain.handle("fs:readFile", (_e, filePath: string) => {
    try {
      return fs.readFileSync(filePath, "utf-8");
    } catch {
      return null;
    }
  });

  ipcMain.handle("fs:writeFile", (_e, filePath: string, content: string) => {
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content, "utf-8");
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("fs:createFile", (_e, filePath: string) => {
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, "", "utf-8");
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("fs:createDir", (_e, dirPath: string) => {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("fs:rename", (_e, oldPath: string, newPath: string) => {
    try {
      fs.renameSync(oldPath, newPath);
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("fs:delete", (_e, entryPath: string) => {
    try {
      const stat = fs.statSync(entryPath);
      if (stat.isDirectory()) {
        fs.rmSync(entryPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(entryPath);
      }
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("fs:exists", (_e, entryPath: string) => {
    return fs.existsSync(entryPath);
  });
}
