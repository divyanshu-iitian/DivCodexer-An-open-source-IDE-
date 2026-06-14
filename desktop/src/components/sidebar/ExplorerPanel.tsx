import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FolderPlus,
  RefreshCw,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace";
import { getFileIcon, getLanguageFromPath } from "@/lib/utils";
import type { FileEntry } from "@/types";

function FileNode({ entry, depth = 0 }: { entry: FileEntry; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const { openTab } = useWorkspaceStore();

  async function handleClick() {
    if (entry.isDirectory) {
      setOpen((o) => !o);
      return;
    }
    const content = (await window.electronAPI?.readFile(entry.path)) ?? "";
    openTab({
      id: entry.path,
      name: entry.name,
      path: entry.path,
      language: getLanguageFromPath(entry.name),
      content,
    });
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center gap-1 w-full text-left px-2 py-[2px] rounded transition-colors hover:bg-white/5 text-xs"
        style={{
          paddingLeft: `${8 + depth * 12}px`,
          color: "oklch(0.65 0.02 280)",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 280)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.65 0.02 280)"; }}
      >
        {entry.isDirectory ? (
          <>
            <span className="w-3 shrink-0" style={{ color: "oklch(0.50 0.02 280)" }}>
              {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </span>
            {open
              ? <FolderOpen className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.78 0.18 75)" }} />
              : <Folder className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.78 0.18 75 / 70%)" }} />
            }
          </>
        ) : (
          <>
            <span className="w-3 shrink-0" />
            <span className="text-[11px] shrink-0">{getFileIcon(entry.name)}</span>
          </>
        )}
        <span className="truncate ml-0.5">{entry.name}</span>
      </button>
      {entry.isDirectory && open && entry.children && (
        <div>
          {entry.children.map((child) => (
            <FileNode key={child.path} entry={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const MOCK_TREE: FileEntry[] = [
  {
    name: "src",
    path: "~/project/src",
    isDirectory: true,
    children: [
      {
        name: "components",
        path: "~/project/src/components",
        isDirectory: true,
        children: [
          { name: "App.tsx", path: "~/project/src/components/App.tsx", isDirectory: false },
          { name: "index.tsx", path: "~/project/src/components/index.tsx", isDirectory: false },
        ],
      },
      { name: "main.tsx", path: "~/project/src/main.tsx", isDirectory: false },
      { name: "index.css", path: "~/project/src/index.css", isDirectory: false },
    ],
  },
  { name: "package.json", path: "~/project/package.json", isDirectory: false },
  { name: "tsconfig.json", path: "~/project/tsconfig.json", isDirectory: false },
  { name: "vite.config.ts", path: "~/project/vite.config.ts", isDirectory: false },
];

export function ExplorerPanel() {
  const { workspacePath, fileTree, setWorkspace } = useWorkspaceStore();
  const tree = fileTree.length > 0 ? fileTree : MOCK_TREE;
  const folderName = workspacePath?.split(/[/\\]/).pop() ?? "DivCodexer";

  async function openFolder() {
    const path = await window.electronAPI?.openFolder();
    if (!path) return;
    const entries = await window.electronAPI?.readDir(path);
    const mapped: FileEntry[] = (entries ?? []).map((e) => ({
      name: e.name,
      path: e.path,
      isDirectory: e.isDirectory,
    }));
    setWorkspace(path, mapped);
  }

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between px-3 py-2 shrink-0 text-xs font-semibold uppercase tracking-widest"
        style={{ color: "oklch(0.50 0.02 280)" }}
      >
        <span>Explorer</span>
        <div className="flex items-center gap-1">
          <button
            title="New Folder"
            className="p-0.5 rounded hover:bg-white/10 transition-colors"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 280)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ""; }}
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
          <button
            title="Refresh"
            className="p-0.5 rounded hover:bg-white/10 transition-colors"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 280)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ""; }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Folder name */}
      <div
        className="flex items-center gap-1 px-2 py-1 text-xs font-medium uppercase tracking-wide shrink-0"
        style={{ color: "oklch(0.65 0.02 280)" }}
      >
        <ChevronDown className="w-3 h-3" />
        <span>{folderName}</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tree.map((entry) => (
          <FileNode key={entry.path} entry={entry} />
        ))}
      </div>

      {!workspacePath && (
        <div className="p-3 shrink-0">
          <button
            onClick={openFolder}
            className="w-full py-1.5 px-3 rounded text-xs font-medium transition-all"
            style={{
              background: "oklch(0.65 0.28 290 / 15%)",
              border: "1px solid oklch(0.65 0.28 290 / 30%)",
              color: "oklch(0.75 0.28 290)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.65 0.28 290 / 25%)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.65 0.28 290 / 15%)"; }}
          >
            Open Folder
          </button>
        </div>
      )}
    </div>
  );
}
