import { useState, useEffect, useRef, useCallback } from "react";
import Fuse from "fuse.js";
import type { CommandPaletteItem } from "@/types";

interface Props {
  items: CommandPaletteItem[];
  onClose: () => void;
}

export function CommandPalette({ items, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = new Fuse(items, {
    keys: ["label", "description", "category"],
    threshold: 0.4,
    minMatchCharLength: 1,
  });

  const results = query
    ? fuse.search(query).map((r) => r.item)
    : items.slice(0, 20);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = results[selectedIndex];
        if (item) {
          item.action();
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [results, selectedIndex, onClose]
  );

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "20vh",
        background: "rgba(0,0,0,0.6)",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "560px",
          background: "oklch(0.12 0.03 280)",
          border: "1px solid oklch(0.22 0.05 280)",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
        }}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command or search..."
          style={{
            display: "block",
            width: "100%",
            padding: "14px 16px",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid oklch(0.22 0.05 280)",
            color: "oklch(0.90 0.01 280)",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <div style={{ maxHeight: "320px", overflowY: "auto" }}>
          {results.length === 0 ? (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "oklch(0.55 0.01 280)",
                fontSize: "13px",
              }}
            >
              No results
            </div>
          ) : (
            results.map((item, i) => (
              <div
                key={item.id}
                onMouseDown={() => {
                  item.action();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  cursor: "pointer",
                  background:
                    i === selectedIndex ? "oklch(0.18 0.05 280)" : "transparent",
                  borderLeft:
                    i === selectedIndex
                      ? "2px solid oklch(0.65 0.28 290)"
                      : "2px solid transparent",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", color: "oklch(0.90 0.01 280)" }}>
                    {item.label}
                  </div>
                  {item.description && (
                    <div style={{ fontSize: "11px", color: "oklch(0.55 0.01 280)", marginTop: "2px" }}>
                      {item.description}
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "oklch(0.45 0.01 280)",
                    background: "oklch(0.15 0.03 280)",
                    borderRadius: "4px",
                    padding: "2px 6px",
                    flexShrink: 0,
                  }}
                >
                  {item.category}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
