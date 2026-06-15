import { useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import type { FileEntry, ContextMenuState } from "@/types";
import { FileTreeNode } from "./FileTreeNode";
import { ContextMenu } from "./ContextMenu";
import { useFileTree } from "./useFileTree";

interface Props {
  tree: FileEntry[];
  onOpenFile: (path: string) => void;
}

interface InlineCreate {
  dirPath: string;
  type: "file" | "dir";
  value: string;
}

export function FileTree({ tree, onOpenFile }: Props) {
  const { expandedPaths, toggleExpand, createFile, createDir, renameEntry, deleteEntry } =
    useFileTree();

  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [renameTarget, setRenameTarget] = useState<string | null>(null);
  const [inlineCreate, setInlineCreate] = useState<InlineCreate | null>(null);
  const createInputRef = useRef<HTMLInputElement>(null);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent, path: string, isDirectory: boolean) => {
      e.preventDefault();
      e.stopPropagation();
      setContextMenu({ x: e.clientX, y: e.clientY, targetPath: path, isDirectory });
    },
    []
  );

  const startInlineCreate = useCallback((dirPath: string, type: "file" | "dir") => {
    setInlineCreate({ dirPath, type, value: "" });
    setTimeout(() => createInputRef.current?.focus(), 0);
  }, []);

  const submitCreate = useCallback(async () => {
    if (!inlineCreate || !inlineCreate.value.trim()) {
      setInlineCreate(null);
      return;
    }
    const name = inlineCreate.value.trim();
    if (inlineCreate.type === "file") await createFile(inlineCreate.dirPath, name);
    else await createDir(inlineCreate.dirPath, name);
    setInlineCreate(null);
  }, [inlineCreate, createFile, createDir]);

  function renderTree(entries: FileEntry[], depth: number): React.ReactNode {
    return entries.map((entry) => {
      const isExpanded = expandedPaths.has(entry.path);
      const showCreateInput =
        inlineCreate && inlineCreate.dirPath === entry.path && isExpanded;

      return (
        <FileTreeNode
          key={entry.path}
          entry={entry}
          depth={depth}
          isExpanded={isExpanded}
          onToggle={toggleExpand}
          onOpenFile={onOpenFile}
          onContextMenu={handleContextMenu}
          renameTarget={renameTarget}
          onRenameSubmit={async (oldPath, newName) => {
            await renameEntry(oldPath, newName);
            setRenameTarget(null);
          }}
          onRenameCancel={() => setRenameTarget(null)}
          renderChildren={
            <>
              {entry.children && renderTree(entry.children, depth + 1)}
              {showCreateInput && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: (depth + 1) * 12 + 8,
                    paddingRight: "8px",
                    height: "28px",
                  }}
                >
                  <input
                    ref={createInputRef}
                    value={inlineCreate!.value}
                    placeholder={inlineCreate!.type === "file" ? "filename.ts" : "folder-name"}
                    onChange={(e) =>
                      setInlineCreate((p) => p && { ...p, value: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitCreate();
                      if (e.key === "Escape") setInlineCreate(null);
                    }}
                    onBlur={submitCreate}
                    style={{
                      background: "oklch(0.08 0.02 280)",
                      border: "1px solid oklch(0.65 0.28 290)",
                      borderRadius: "3px",
                      color: "oklch(0.90 0.01 280)",
                      fontSize: "13px",
                      padding: "1px 4px",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                </div>
              )}
            </>
          }
        />
      );
    });
  }

  return (
    <div style={{ padding: "4px 0", userSelect: "none" }}>
      {tree.length === 0 ? (
        <div
          style={{
            padding: "16px",
            color: "oklch(0.55 0.01 280)",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          No files in workspace
        </div>
      ) : (
        renderTree(tree, 0)
      )}

      {contextMenu &&
        createPortal(
          <ContextMenu
            menu={contextMenu}
            onNewFile={(dir) => {
              if (!expandedPaths.has(dir)) toggleExpand(dir);
              startInlineCreate(dir, "file");
            }}
            onNewFolder={(dir) => {
              if (!expandedPaths.has(dir)) toggleExpand(dir);
              startInlineCreate(dir, "dir");
            }}
            onRename={(path) => setRenameTarget(path)}
            onDelete={async (path) => {
              if (confirm(`Delete "${path.split(/[/\\]/).pop()}"?`)) {
                await deleteEntry(path);
              }
            }}
            onClose={() => setContextMenu(null)}
          />,
          document.body
        )}
    </div>
  );
}
