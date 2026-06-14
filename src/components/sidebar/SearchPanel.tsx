"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchResult {
  file: string;
  line: number;
  preview: string;
  match: string;
}

const MOCK_RESULTS: SearchResult[] = [
  { file: "src/store/workspace.ts", line: 5, preview: "import { create } from", match: "create" },
  { file: "src/components/layout/ActivityBar.tsx", line: 2, preview: "Home, FolderOpen,", match: "FolderOpen" },
  { file: "src/app/page.tsx", line: 1, preview: 'import IDELayout from', match: "IDELayout" },
];

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const results = query.length > 1 ? MOCK_RESULTS : [];

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Search
        </span>
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5 border border-border">
          <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {results.length === 0 && query.length > 1 && (
          <p className="text-xs text-muted-foreground px-2">No results found</p>
        )}
        {results.length === 0 && query.length <= 1 && (
          <p className="text-xs text-muted-foreground px-2">Type to search in workspace</p>
        )}
        {results.map((r, i) => (
          <div
            key={i}
            className="mb-3 cursor-pointer group"
          >
            <p className="text-xs text-primary truncate group-hover:text-primary/80 transition-colors">
              {r.file}
            </p>
            <div className="flex items-start gap-2 mt-0.5 px-1 py-1 rounded hover:bg-white/5 transition-colors">
              <span className="text-xs text-muted-foreground shrink-0 w-6 text-right">
                {r.line}
              </span>
              <p className="text-xs text-foreground/80 truncate">{r.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
