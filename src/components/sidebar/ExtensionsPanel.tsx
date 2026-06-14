"use client";

import { Puzzle, Star, Download } from "lucide-react";

interface Extension {
  name: string;
  description: string;
  author: string;
  downloads: string;
  rating: number;
  installed: boolean;
  color: string;
}

const EXTENSIONS: Extension[] = [
  {
    name: "GitHub Copilot",
    description: "AI-powered code completions",
    author: "GitHub",
    downloads: "12.4M",
    rating: 4.8,
    installed: true,
    color: "#7c3aed",
  },
  {
    name: "Prettier",
    description: "Code formatter for consistency",
    author: "Prettier",
    downloads: "38.2M",
    rating: 4.9,
    installed: true,
    color: "#0ea5e9",
  },
  {
    name: "ESLint",
    description: "Integrates ESLint into the IDE",
    author: "Microsoft",
    downloads: "29.1M",
    rating: 4.7,
    installed: true,
    color: "#8b5cf6",
  },
  {
    name: "GitLens",
    description: "Supercharge Git capabilities",
    author: "GitKraken",
    downloads: "22.7M",
    rating: 4.8,
    installed: false,
    color: "#f59e0b",
  },
  {
    name: "Tailwind CSS IntelliSense",
    description: "Intelligent Tailwind CSS tooling",
    author: "Tailwind Labs",
    downloads: "8.3M",
    rating: 4.9,
    installed: false,
    color: "#06b6d4",
  },
];

export function ExtensionsPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Extensions
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-2 space-y-2">
        {EXTENSIONS.map((ext) => (
          <div
            key={ext.name}
            className="px-2 py-2 rounded-lg glass glass-hover cursor-pointer group"
          >
            <div className="flex items-start gap-2">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${ext.color}22`, border: `1px solid ${ext.color}44` }}
              >
                <Puzzle className="w-4 h-4" style={{ color: ext.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-foreground truncate">{ext.name}</p>
                  {ext.installed ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary shrink-0 ml-1">
                      Installed
                    </span>
                  ) : (
                    <button className="shrink-0 ml-1 p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                      <Download className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{ext.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] text-muted-foreground">{ext.rating}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{ext.downloads}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
