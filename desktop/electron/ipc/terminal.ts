import { BrowserWindow, ipcMain } from "electron";
import * as pty from "node-pty";
import { generateId } from "../utils";

interface PtySession {
  id: string;
  pty: pty.IPty;
}

const sessions = new Map<string, PtySession>();

function getShell(): string {
  if (process.platform === "win32") return "powershell.exe";
  return process.env.SHELL ?? "/bin/bash";
}

function broadcast(channel: string, ...args: unknown[]): void {
  BrowserWindow.getAllWindows().forEach((w) => {
    w.webContents.send(channel, ...args);
  });
}

export function registerTerminalHandlers(): void {
  ipcMain.handle(
    "terminal:create",
    (
      _e,
      payload: { cols: number; rows: number; cwd?: string }
    ) => {
      try {
        const id = generateId();
        const shell = getShell();
        const proc = pty.spawn(shell, [], {
          name: "xterm-256color",
          cols: payload.cols || 80,
          rows: payload.rows || 24,
          cwd: payload.cwd ?? process.env.HOME ?? process.cwd(),
          env: process.env as Record<string, string>,
        });

        proc.onData((data) => {
          broadcast("terminal:data", id, data);
        });

        proc.onExit(({ exitCode }) => {
          broadcast("terminal:exit", id, exitCode ?? 0);
          sessions.delete(id);
        });

        sessions.set(id, { id, pty: proc });

        return { id, title: shell, pid: proc.pid };
      } catch {
        return null;
      }
    }
  );

  ipcMain.on("terminal:input", (_e, id: string, data: string) => {
    sessions.get(id)?.pty.write(data);
  });

  ipcMain.on(
    "terminal:resize",
    (_e, payload: { id: string; cols: number; rows: number }) => {
      sessions.get(payload.id)?.pty.resize(payload.cols, payload.rows);
    }
  );

  ipcMain.on("terminal:destroy", (_e, id: string) => {
    const session = sessions.get(id);
    if (session) {
      session.pty.kill();
      sessions.delete(id);
    }
  });
}

export function destroyAllTerminals(): void {
  sessions.forEach((s) => s.pty.kill());
  sessions.clear();
}
