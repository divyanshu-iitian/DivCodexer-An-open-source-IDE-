import { useEffect } from "react";
import { useWorkspaceStore } from "@/stores/workspace";
import * as persistence from "@/services/persistence";
import * as fsService from "@/services/fs";

export function usePersistence() {
  const { setRecentProjects, openWorkspace } = useWorkspaceStore();

  useEffect(() => {
    async function init() {
      const [recentProjects, lastWorkspace] = await Promise.all([
        persistence.loadRecentProjects(),
        persistence.loadLastWorkspace(),
      ]);

      if (recentProjects.length > 0) {
        setRecentProjects(recentProjects);
      }

      if (lastWorkspace) {
        try {
          const tree = await fsService.buildFileTree(lastWorkspace);
          openWorkspace(lastWorkspace, tree);
        } catch {
          // workspace may no longer exist
        }
      }
    }
    init();
  }, [setRecentProjects, openWorkspace]);

  // Save recent projects whenever they change
  useEffect(() => {
    return useWorkspaceStore.subscribe((state, prev) => {
      if (state.recentProjects !== prev.recentProjects) {
        persistence.saveRecentProjects(state.recentProjects);
      }
      if (state.workspacePath !== prev.workspacePath && state.workspacePath) {
        persistence.saveLastWorkspace(state.workspacePath);
      }
    });
  }, []);
}
