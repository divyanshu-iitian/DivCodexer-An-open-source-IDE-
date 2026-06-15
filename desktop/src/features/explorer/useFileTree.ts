import { useState, useCallback } from "react";
import { useWorkspaceStore } from "@/stores/workspace";
import * as fsService from "@/services/fs";
import { basename, dirname } from "@/lib/utils";

export function useFileTree() {
  const { workspacePath, refreshFileTree } = useWorkspaceStore();
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    if (!workspacePath) return;
    const tree = await fsService.buildFileTree(workspacePath);
    refreshFileTree(tree);
  }, [workspacePath, refreshFileTree]);

  const toggleExpand = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const createFile = useCallback(
    async (dirPath: string, name: string) => {
      const filePath = `${dirPath}/${name}`;
      const ok = await fsService.createFile(filePath);
      if (ok) await refresh();
      return ok;
    },
    [refresh]
  );

  const createDir = useCallback(
    async (parentPath: string, name: string) => {
      const dirPath = `${parentPath}/${name}`;
      const ok = await fsService.createDir(dirPath);
      if (ok) await refresh();
      return ok;
    },
    [refresh]
  );

  const renameEntry = useCallback(
    async (oldPath: string, newName: string) => {
      const newPath = `${dirname(oldPath)}/${newName}`;
      const ok = await fsService.rename(oldPath, newPath);
      if (ok) await refresh();
      return ok;
    },
    [refresh]
  );

  const deleteEntry = useCallback(
    async (path: string) => {
      const ok = await fsService.deleteEntry(path);
      if (ok) await refresh();
      return ok;
    },
    [refresh]
  );

  return {
    expandedPaths,
    refresh,
    toggleExpand,
    createFile,
    createDir,
    renameEntry,
    deleteEntry,
    basename,
  };
}
