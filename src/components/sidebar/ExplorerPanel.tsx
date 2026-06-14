"use client";

import {
  ChevronDown,
  ChevronRight,
  FileCode,
  Folder,
  FolderOpen,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  language?: string;
}

const FILE_TREE: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "app",
        type: "folder",
        children: [
          { name: "globals.css", type: "file", language: "css" },
          { name: "layout.tsx", type: "file", language: "tsx" },
          { name: "page.tsx", type: "file", language: "tsx" },
        ],
      },
      {
        name: "components",
        type: "folder",
        children: [
          {
            name: "layout",
            type: "folder",
            children: [
              { name: "ActivityBar.tsx", type: "file", language: "tsx" },
              { name: "IDELayout.tsx", type: "file", language: "tsx" },
              { name: "Sidebar.tsx", type: "file", language: "tsx" },
              { name: "StatusBar.tsx", type: "file", language: "tsx" },
            ],
          },
          {
            name: "dashboard",
            type: "folder",
            children: [
              { name: "WelcomeDashboard.tsx", type: "file", language: "tsx" },
            ],
          },
          {
            name: "assistant",
            type: "folder",
            children: [
              { name: "AIAssistantPanel.tsx", type: "file", language: "tsx" },
            ],
          },
        ],
      },
      {
        name: "store",
        type: "folder",
        children: [{ name: "workspace.ts", type: "file", language: "ts" }],
      },
      {
        name: "types",
        type: "folder",
        children: [{ name: "index.ts", type: "file", language: "ts" }],
      },
    ],
  },
  { name: "package.json", type: "file", language: "json" },
  { name: "tsconfig.json", type: "file", language: "json" },
  { name: "next.config.ts", type: "file", language: "ts" },
];

const LANG_COLORS: Record<string, string> = {
  tsx: "text-blue-400",
  ts: "text-blue-300",
  css: "text-pink-400",
  json: "text-yellow-400",
  js: "text-yellow-300",
  default: "text-gray-400",
};

function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";
  const color = LANG_COLORS[node.language ?? "default"] ?? LANG_COLORS.default;

  return (
    <div>
      <button
        onClick={() => isFolder && setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1.5 w-full text-left px-2 py-0.5 text-sm rounded hover:bg-white/5 transition-colors",
          "text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingLeft: `${8 + depth * 12}px` }}
      >
        {isFolder ? (
          <>
            <span className="text-muted-foreground w-3.5 shrink-0">
              {open ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </span>
            {open ? (
              <FolderOpen className="w-4 h-4 text-yellow-400/80 shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-yellow-400/60 shrink-0" />
            )}
          </>
        ) : (
          <>
            <span className="w-3.5 shrink-0" />
            <FileCode className={cn("w-4 h-4 shrink-0", color)} />
          </>
        )}
        <span className="truncate text-xs">{node.name}</span>
      </button>
      {isFolder && open && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ExplorerPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Explorer
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-1">
        <div className="mb-1">
          <div className="px-3 py-1 flex items-center gap-1">
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              DivCodexer
            </span>
          </div>
          {FILE_TREE.map((node) => (
            <FileTreeNode key={node.name} node={node} />
          ))}
        </div>
      </div>
    </div>
  );
}
