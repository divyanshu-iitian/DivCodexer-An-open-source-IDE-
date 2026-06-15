import { useEffect, useCallback } from "react";
import { useWorkspaceStore } from "@/stores/workspace";
import { useEditorStore } from "@/stores/editor";
import { FileTree } from "./FileTree";
import * as fsService from "@/services/fs";
import { getLanguage } from "@/lib/language";
import { basename } from "@/lib/utils";

export function ExplorerPanel() {
  const { workspacePath, fileTree, openWorkspace } = useWorkspaceStore();
  const { openTab } = useEditorStore();

  useEffect(() => {
    if (workspacePath && fileTree.length === 0) {
      fsService.buildFileTree(workspacePath).then((tree) => {
        openWorkspace(workspacePath, tree);
      });
    }
  }, [workspacePath, fileTree.length, openWorkspace]);

  const handleOpenFile = useCallback(
    async (path: string) => {
      const content = await fsService.readFile(path);
      if (content === null) return;
      openTab({
        name: basename(path),
        path,
        language: getLanguage(path),
        content,
      });
    },
    [openTab]
  );

  const handleOpenFolder = useCallback(async () => {
    const path = await fsService.openFolderDialog();
    if (!path) return;
    const tree = await fsService.buildFileTree(path);
    openWorkspace(path, tree);
  }, [openWorkspace]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "oklch(0.55 0.01 280)",
          borderBottom: "1px solid oklch(0.15 0.03 280)",
        }}
      >
        <span>Explorer</span>
        <button
          onClick={handleOpenFolder}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "oklch(0.65 0.28 290)",
            fontSize: "16px",
            lineHeight: 1,
            padding: "0 2px",
          }}
          title="Open Folder"
        >
          ⊕
        </button>
      </div>

      {workspacePath ? (
        <>
          <div
            style={{
              padding: "4px 12px 2px",
              fontSize: "11px",
              color: "oklch(0.55 0.01 280)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {basename(workspacePath)}
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <FileTree tree={fileTree} onOpenFile={handleOpenFile} />
          </div>
        </>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "24px",
          }}
        >
          <p style={{ fontSize: "13px", color: "oklch(0.55 0.01 280)", textAlign: "center", margin: 0 }}>
            No folder open
          </p>
          <button
            onClick={handleOpenFolder}
            style={{
              background: "oklch(0.65 0.28 290)",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              cursor: "pointer",
              fontSize: "13px",
              padding: "8px 16px",
              fontWeight: 500,
            }}
          >
            Open Folder
          </button>
        </div>
      )}
    </div>
  );
}
