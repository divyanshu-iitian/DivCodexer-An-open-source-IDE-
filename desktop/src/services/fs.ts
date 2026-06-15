import type { FsDirEntry, FileEntry } from "@/types";

function api() {
  return window.electronAPI;
}

export async function openFolderDialog(): Promise<string | null> {
  return api().openFolder();
}

export async function readDir(path: string): Promise<FsDirEntry[]> {
  return api().readDir(path);
}

export async function readFile(path: string): Promise<string | null> {
  return api().readFile(path);
}

export async function writeFile(path: string, content: string): Promise<boolean> {
  return api().writeFile(path, content);
}

export async function createFile(path: string): Promise<boolean> {
  return api().createFile(path);
}

export async function createDir(path: string): Promise<boolean> {
  return api().createDir(path);
}

export async function rename(oldPath: string, newPath: string): Promise<boolean> {
  return api().rename(oldPath, newPath);
}

export async function deleteEntry(path: string): Promise<boolean> {
  return api().delete(path);
}

export async function exists(path: string): Promise<boolean> {
  return api().exists(path);
}

export async function buildFileTree(
  dirPath: string,
  depth = 0,
  maxDepth = 4
): Promise<FileEntry[]> {
  const entries = await readDir(dirPath);
  const sorted = entries.sort((a, b) => {
    if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return Promise.all(
    sorted.map(async (e): Promise<FileEntry> => {
      if (e.isDirectory && depth < maxDepth) {
        const children = await buildFileTree(e.path, depth + 1, maxDepth);
        return { ...e, children };
      }
      return e;
    })
  );
}
