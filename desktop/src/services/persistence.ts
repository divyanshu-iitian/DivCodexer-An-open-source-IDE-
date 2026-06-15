import type { RecentProject } from "@/types";
import { STORE_KEYS } from "@/lib/constants";

function api() {
  return window.electronAPI;
}

export async function loadRecentProjects(): Promise<RecentProject[]> {
  const data = await api().storeGet<RecentProject[]>(STORE_KEYS.RECENT_PROJECTS);
  return data ?? [];
}

export async function saveRecentProjects(projects: RecentProject[]): Promise<void> {
  await api().storeSet(STORE_KEYS.RECENT_PROJECTS, projects);
}

export async function loadLastWorkspace(): Promise<string | null> {
  return api().storeGet<string>(STORE_KEYS.LAST_WORKSPACE);
}

export async function saveLastWorkspace(path: string): Promise<void> {
  await api().storeSet(STORE_KEYS.LAST_WORKSPACE, path);
}
