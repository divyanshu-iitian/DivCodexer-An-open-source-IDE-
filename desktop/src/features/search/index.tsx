import { useState, useCallback } from "react";
import { useWorkspaceStore } from "@/stores/workspace";
import { useEditorStore } from "@/stores/editor";
import * as fsService from "@/services/fs";
import { getLanguage } from "@/lib/language";

interface SearchResult {
  file: string;
  line: number;
  text: string;
}

async function searchInDir(
  dirPath: string,
  query: string,
  results: SearchResult[] = [],
  depth = 0
): Promise<SearchResult[]> {
  if (depth > 3 || results.length > 200) return results;
  try {
    const entries = await fsService.readDir(dirPath);
    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      if (entry.isDirectory) {
        await searchInDir(entry.path, query, results, depth + 1);
      } else {
        const content = await fsService.readFile(entry.path);
        if (!content) continue;
        const lines = content.split("\n");
        const lower = query.toLowerCase();
        lines.forEach((line, i) => {
          if (line.toLowerCase().includes(lower)) {
            results.push({ file: entry.path, line: i + 1, text: line.trim() });
          }
        });
      }
      if (results.length > 200) break;
    }
  } catch {
    // skip unreadable directories
  }
  return results;
}

export function SearchPanel() {
  const { workspacePath } = useWorkspaceStore();
  const { openTab } = useEditorStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const doSearch = useCallback(async () => {
    if (!workspacePath || !query.trim()) return;
    setSearching(true);
    const found = await searchInDir(workspacePath, query.trim());
    setResults(found);
    setSearching(false);
  }, [workspacePath, query]);

  const openResult = useCallback(
    async (r: SearchResult) => {
      const content = await fsService.readFile(r.file);
      if (content === null) return;
      const name = r.file.split(/[/\\]/).pop() ?? r.file;
      openTab({
        name,
        path: r.file,
        language: getLanguage(r.file),
        content,
      });
    },
    [openTab]
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid oklch(0.15 0.03 280)",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "oklch(0.55 0.01 280)",
        }}
      >
        Search
      </div>
      <div style={{ padding: "8px 12px" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
            placeholder="Search in files..."
            style={{
              flex: 1,
              background: "oklch(0.10 0.02 280)",
              border: "1px solid oklch(0.20 0.04 280)",
              borderRadius: "5px",
              color: "oklch(0.85 0.01 280)",
              fontSize: "12px",
              padding: "5px 8px",
              outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.65 0.28 290)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.20 0.04 280)")}
          />
          <button
            onClick={doSearch}
            disabled={searching || !query.trim()}
            style={{
              background: "oklch(0.65 0.28 290)",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              cursor: searching || !query.trim() ? "not-allowed" : "pointer",
              fontSize: "12px",
              padding: "5px 10px",
              opacity: searching || !query.trim() ? 0.6 : 1,
            }}
          >
            {searching ? "…" : "Search"}
          </button>
        </div>
        {results.length > 0 && (
          <div style={{ marginTop: "4px", fontSize: "11px", color: "oklch(0.45 0.01 280)" }}>
            {results.length} result{results.length !== 1 ? "s" : ""}
            {results.length === 200 ? " (truncated)" : ""}
          </div>
        )}
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {results.map((r, i) => (
          <div
            key={i}
            onClick={() => openResult(r)}
            style={{
              padding: "6px 12px",
              cursor: "pointer",
              borderBottom: "1px solid oklch(0.13 0.02 280)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background = "oklch(0.14 0.03 280)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background = "transparent")
            }
          >
            <div
              style={{
                fontSize: "11px",
                color: "oklch(0.65 0.28 290)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginBottom: "2px",
              }}
            >
              {r.file.split(/[/\\]/).pop()} : {r.line}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "oklch(0.75 0.01 280)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: "monospace",
              }}
            >
              {r.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
