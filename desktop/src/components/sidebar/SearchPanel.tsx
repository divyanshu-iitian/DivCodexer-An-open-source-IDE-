import { useState } from "react";
import { Search, Replace, CaseSensitive, Regex } from "lucide-react";

interface Result { file: string; line: number; text: string; }

const MOCK: Result[] = [
  { file: "src/App.tsx", line: 5, text: "import { IDELayout } from './components/layout'" },
  { file: "src/store/workspace.ts", line: 12, text: "const MOCK_PROJECTS: RecentProject[] = [" },
  { file: "vite.config.ts", line: 3, text: "import react from '@vitejs/plugin-react'" },
];

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const results = query.length > 1 ? MOCK : [];

  return (
    <div className="flex flex-col h-full">
      <div
        className="px-3 py-2 text-xs font-semibold uppercase tracking-widest shrink-0"
        style={{ color: "oklch(0.50 0.02 280)" }}
      >
        Search
      </div>

      <div className="px-3 space-y-2 shrink-0">
        {/* Search input */}
        <div
          className="flex items-center gap-2 px-2 py-1.5 rounded"
          style={{ background: "oklch(0.14 0.025 280)", border: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.50 0.02 280)" }} />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: "oklch(0.85 0.01 280)" }}
          />
          <div className="flex items-center gap-0.5">
            <button title="Case Sensitive" className="p-0.5 rounded hover:bg-white/10">
              <CaseSensitive className="w-3 h-3" style={{ color: "oklch(0.50 0.02 280)" }} />
            </button>
            <button title="Regex" className="p-0.5 rounded hover:bg-white/10">
              <Regex className="w-3 h-3" style={{ color: "oklch(0.50 0.02 280)" }} />
            </button>
          </div>
        </div>

        {/* Replace input */}
        <div
          className="flex items-center gap-2 px-2 py-1.5 rounded"
          style={{ background: "oklch(0.14 0.025 280)", border: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <Replace className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.50 0.02 280)" }} />
          <input
            type="text"
            placeholder="Replace..."
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: "oklch(0.85 0.01 280)" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-3 px-2">
        {query.length <= 1 && (
          <p className="text-xs px-2" style={{ color: "oklch(0.50 0.02 280)" }}>
            Type at least 2 characters to search
          </p>
        )}
        {results.length === 0 && query.length > 1 && (
          <p className="text-xs px-2" style={{ color: "oklch(0.50 0.02 280)" }}>
            No results found
          </p>
        )}
        {results.map((r, i) => (
          <div key={i} className="mb-3">
            <p
              className="text-xs px-2 mb-0.5 truncate"
              style={{ color: "oklch(0.65 0.28 290)" }}
            >
              {r.file}
            </p>
            <div
              className="flex gap-2 px-2 py-1 rounded cursor-pointer hover:bg-white/5 transition-colors"
            >
              <span
                className="text-xs w-6 shrink-0 text-right"
                style={{ color: "oklch(0.50 0.02 280)" }}
              >
                {r.line}
              </span>
              <span
                className="text-xs truncate font-mono"
                style={{ color: "oklch(0.75 0.01 280)" }}
              >
                {r.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
