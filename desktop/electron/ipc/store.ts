import { app, ipcMain } from "electron";
import * as fs from "fs";
import * as path from "path";

const storeDir = app.getPath("userData");
const storeFile = path.join(storeDir, "divcodexer-store.json");

function readStore(): Record<string, unknown> {
  try {
    return JSON.parse(fs.readFileSync(storeFile, "utf-8")) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function writeStore(data: Record<string, unknown>): void {
  fs.mkdirSync(storeDir, { recursive: true });
  fs.writeFileSync(storeFile, JSON.stringify(data, null, 2), "utf-8");
}

export function registerStoreHandlers(): void {
  ipcMain.handle("store:get", (_e, key: string) => {
    const store = readStore();
    return store[key] ?? null;
  });

  ipcMain.handle("store:set", (_e, key: string, value: unknown) => {
    const store = readStore();
    store[key] = value;
    writeStore(store);
  });
}
