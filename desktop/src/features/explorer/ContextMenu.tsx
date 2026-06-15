import { useEffect, useRef } from "react";
import type { ContextMenuState } from "@/types";

interface Props {
  menu: ContextMenuState;
  onNewFile: (dirPath: string) => void;
  onNewFolder: (dirPath: string) => void;
  onRename: (path: string) => void;
  onDelete: (path: string) => void;
  onClose: () => void;
}

export function ContextMenu({ menu, onNewFile, onNewFolder, onRename, onDelete, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const menuStyle: React.CSSProperties = {
    position: "fixed",
    top: menu.y,
    left: menu.x,
    zIndex: 9999,
    background: "oklch(0.13 0.03 280)",
    border: "1px solid oklch(0.22 0.05 280)",
    borderRadius: "6px",
    padding: "4px 0",
    minWidth: "160px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
  };

  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    fontSize: "12px",
    color: "oklch(0.85 0.01 280)",
    cursor: "pointer",
    userSelect: "none",
  };

  const sepStyle: React.CSSProperties = {
    borderTop: "1px solid oklch(0.22 0.05 280)",
    margin: "4px 0",
  };

  function item(label: string, action: () => void, danger = false) {
    return (
      <div
        key={label}
        style={{
          ...itemStyle,
          color: danger ? "oklch(0.65 0.2 15)" : itemStyle.color,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "oklch(0.18 0.04 280)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "transparent";
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          action();
          onClose();
        }}
      >
        {label}
      </div>
    );
  }

  return (
    <div ref={ref} style={menuStyle}>
      {menu.isDirectory && item("New File", () => onNewFile(menu.targetPath))}
      {menu.isDirectory && item("New Folder", () => onNewFolder(menu.targetPath))}
      {menu.isDirectory && <div style={sepStyle} />}
      {item("Rename", () => onRename(menu.targetPath))}
      {item("Delete", () => onDelete(menu.targetPath), true)}
    </div>
  );
}
