import { memo, useState, useRef, useEffect } from "react";
import type { FileEntry } from "@/types";
import { getFileIcon } from "@/lib/language";
import { LAYOUT } from "@/lib/constants";

interface Props {
  entry: FileEntry;
  depth: number;
  isExpanded: boolean;
  onToggle: (path: string) => void;
  onOpenFile: (path: string) => void;
  onContextMenu: (e: React.MouseEvent, path: string, isDir: boolean) => void;
  renameTarget: string | null;
  onRenameSubmit: (oldPath: string, newName: string) => void;
  onRenameCancel: () => void;
  renderChildren?: React.ReactNode;
}

export const FileTreeNode = memo(function FileTreeNode({
  entry,
  depth,
  isExpanded,
  onToggle,
  onOpenFile,
  onContextMenu,
  renameTarget,
  onRenameSubmit,
  onRenameCancel,
  renderChildren,
}: Props) {
  const indent = depth * 12 + 8;
  const icon = entry.isDirectory ? (isExpanded ? "▾" : "▸") : getFileIcon(entry.name);
  const isRenaming = renameTarget === entry.path;
  const [renameValue, setRenameValue] = useState(entry.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming) {
      setRenameValue(entry.name);
      setTimeout(() => inputRef.current?.select(), 0);
    }
  }, [isRenaming, entry.name]);

  function handleClick() {
    if (entry.isDirectory) onToggle(entry.path);
    else onOpenFile(entry.path);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          paddingLeft: indent,
          paddingRight: "8px",
          height: `${LAYOUT.TAB_HEIGHT - 8}px`,
          cursor: "pointer",
          borderRadius: "3px",
          userSelect: "none",
          color: entry.isDirectory
            ? "oklch(0.85 0.01 280)"
            : "oklch(0.80 0.01 280)",
          fontSize: "13px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "oklch(0.16 0.03 280)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "transparent";
        }}
        onClick={handleClick}
        onContextMenu={(e) => onContextMenu(e, entry.path, entry.isDirectory)}
      >
        <span style={{ fontSize: entry.isDirectory ? "10px" : "14px", width: "16px", textAlign: "center" }}>
          {icon}
        </span>
        {isRenaming ? (
          <input
            ref={inputRef}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onRenameSubmit(entry.path, renameValue.trim());
              if (e.key === "Escape") onRenameCancel();
            }}
            onBlur={() => onRenameCancel()}
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
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {entry.name}
          </span>
        )}
      </div>
      {entry.isDirectory && isExpanded && renderChildren}
    </div>
  );
});
