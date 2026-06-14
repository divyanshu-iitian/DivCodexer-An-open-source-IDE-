import Editor from "@monaco-editor/react";
import { useWorkspaceStore } from "@/store/workspace";
import { EditorTabs } from "./EditorTabs";
import { WelcomeDashboard } from "@/components/dashboard/WelcomeDashboard";

const MONACO_OPTIONS = {
  minimap: { enabled: true },
  fontSize: 14,
  fontFamily: "'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace",
  fontLigatures: true,
  lineNumbers: "on" as const,
  roundedSelection: true,
  scrollBeyondLastLine: false,
  padding: { top: 12 },
  smoothScrolling: true,
  cursorSmoothCaretAnimation: "on" as const,
  bracketPairColorization: { enabled: true },
  guides: { bracketPairs: true, indentation: true },
  renderWhitespace: "selection" as const,
  suggest: { preview: true },
  automaticLayout: true,
};

export function EditorArea() {
  const { tabs, activeTabId, updateTabContent } = useWorkspaceStore();
  const activeTab = tabs.find((t) => t.id === activeTabId);

  return (
    <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
      <EditorTabs />

      {activeTab ? (
        <div className="flex-1 min-h-0">
          <Editor
            key={activeTab.id}
            height="100%"
            language={activeTab.language}
            value={activeTab.content}
            theme="vs-dark"
            options={MONACO_OPTIONS}
            onChange={(val) => {
              if (val !== undefined) {
                updateTabContent(activeTab.id, val);
              }
            }}
            beforeMount={(monaco) => {
              monaco.editor.defineTheme("divcodexer", {
                base: "vs-dark",
                inherit: true,
                rules: [
                  { token: "comment", foreground: "5a5a8a", fontStyle: "italic" },
                  { token: "keyword", foreground: "c084fc" },
                  { token: "string", foreground: "86efac" },
                  { token: "number", foreground: "fb923c" },
                  { token: "type", foreground: "7dd3fc" },
                  { token: "function", foreground: "a78bfa" },
                ],
                colors: {
                  "editor.background": "#0a0a12",
                  "editor.foreground": "#e2e2f0",
                  "editor.lineHighlightBackground": "#ffffff08",
                  "editor.selectionBackground": "#7c3aed40",
                  "editor.inactiveSelectionBackground": "#7c3aed20",
                  "editorLineNumber.foreground": "#3a3a5c",
                  "editorLineNumber.activeForeground": "#7c3aed",
                  "editorCursor.foreground": "#a78bfa",
                  "editorWhitespace.foreground": "#2a2a4a",
                  "editorIndentGuide.background": "#1e1e2e",
                  "editorIndentGuide.activeBackground": "#3a3a5c",
                  "scrollbar.shadow": "#00000000",
                  "scrollbarSlider.background": "#3a3a5c80",
                  "scrollbarSlider.hoverBackground": "#7c3aed60",
                  "scrollbarSlider.activeBackground": "#7c3aed80",
                },
              });
              monaco.editor.setTheme("divcodexer");
            }}
          />
        </div>
      ) : (
        <WelcomeDashboard />
      )}
    </div>
  );
}
