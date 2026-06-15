import type { GitStatus } from "@/types";

function api() {
  return window.electronAPI;
}

export async function getStatus(cwd: string): Promise<GitStatus | null> {
  return api().gitStatus(cwd);
}

export async function commit(cwd: string, message: string): Promise<boolean> {
  return api().gitCommit(cwd, message);
}

export async function push(cwd: string): Promise<boolean> {
  return api().gitPush(cwd);
}

export async function pull(cwd: string): Promise<boolean> {
  return api().gitPull(cwd);
}

export async function stageFiles(cwd: string, paths: string[]): Promise<boolean> {
  return api().gitStage(cwd, paths);
}

export async function unstageFiles(cwd: string, paths: string[]): Promise<boolean> {
  return api().gitUnstage(cwd, paths);
}

export async function discardChanges(cwd: string, path: string): Promise<boolean> {
  return api().gitDiscard(cwd, path);
}
