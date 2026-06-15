import { ipcMain } from "electron";
import simpleGit from "simple-git";

export function registerGitHandlers(): void {
  ipcMain.handle("git:status", async (_e, cwd: string) => {
    try {
      const git = simpleGit(cwd);
      const isRepo = await git.checkIsRepo();
      if (!isRepo) return null;

      const [status, branch] = await Promise.all([
        git.status(),
        git.branch(),
      ]);

      const ahead = status.ahead ?? 0;
      const behind = status.behind ?? 0;

      const staged = status.staged.map((f) => ({
        path: f,
        status: (status.created.includes(f) ? "A" : "M") as "A" | "M" | "D" | "R" | "C" | "U",
      }));

      const unstaged = [
        ...status.modified.filter((f) => !status.staged.includes(f)).map((f) => ({ path: f, status: "M" as const })),
        ...status.deleted.filter((f) => !status.staged.includes(f)).map((f) => ({ path: f, status: "D" as const })),
      ];

      return {
        branch: branch.current,
        ahead,
        behind,
        staged,
        unstaged,
        untracked: status.not_added,
      };
    } catch {
      return null;
    }
  });

  ipcMain.handle("git:commit", async (_e, cwd: string, message: string) => {
    try {
      const git = simpleGit(cwd);
      await git.commit(message);
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("git:push", async (_e, cwd: string) => {
    try {
      const git = simpleGit(cwd);
      await git.push();
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("git:pull", async (_e, cwd: string) => {
    try {
      const git = simpleGit(cwd);
      await git.pull();
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("git:stage", async (_e, cwd: string, paths: string[]) => {
    try {
      const git = simpleGit(cwd);
      await git.add(paths);
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("git:unstage", async (_e, cwd: string, paths: string[]) => {
    try {
      const git = simpleGit(cwd);
      await git.reset(["HEAD", "--", ...paths]);
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle("git:discard", async (_e, cwd: string, filePath: string) => {
    try {
      const git = simpleGit(cwd);
      await git.checkout(["--", filePath]);
      return true;
    } catch {
      return false;
    }
  });
}
