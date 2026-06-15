import { useEffect, useRef, useCallback } from "react";
import MonacoEditor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import type { editor as MonacoEditorNS } from "monaco-editor";
import { useEditorStore } from "@/stores/editor";
import * as fsService from "@/services/fs";

const THEME_NAME = "divcodexer";

function defineTheme(monaco: typeof import("monaco-editor")) {
  monaco.editor.defineTheme(THEME_NAME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6272a4", fontStyle: "italic" },
      { token: "keyword", foreground: "cc77ff" },
      { token: "string", foreground: "9dda8f" },
      { token: "number", foreground: "bd93f9" },
      { token: "type", foreground: "8be9fd" },
      { token: "function", foreground: "50fa7b" },
    ],
    colors: {
      "editor.background": "#0a0b11",
      "editor.foreground": "#e0ddf5",
      "editorLineNumber.foreground": "#44415a",
      "editorLineNumber.activeForeground": "#a89bc4",
      "editor.selectionBackground": "#44415a80",
      "editor.lineHighlightBackground": "#12121e",
      "editorCursor.foreground": "#cc77ff",
      "editorWhitespace.foreground": "#44415a",
      "editorIndentGuide.background1": "#1e1b2e",
      "editorIndentGuide.activeBackground1": "#44415a",
      "scrollbarSlider.background": "#2a2740",
      "scrollbarSlider.hoverBackground": "#3d3a55",
    },
  });
}

export function EditorPane() {
  const { tabs, activeTabId, markDirty, markSaved, updateContent, getTab } =
    useEditorStore();
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);
  const editorRef = useRef<MonacoEditorNS.IStandaloneCodeEditor | null>(null);

  const activeTab = activeTabId ? getTab(activeTabId) : undefined;
  const activeTabContent = activeTab?.content;
  const activeTabViewState = activeTab?.viewState;

  const handleMount: OnMount = useCallback(
    (editor, monaco) => {
      monacoRef.current = monaco;
      editorRef.current = editor;
      defineTheme(monaco);
      monaco.editor.setTheme(THEME_NAME);

      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        const tabId = useEditorStore.getState().activeTabId;
        const tab = tabId ? useEditorStore.getState().getTab(tabId) : undefined;
        if (!tab?.isDirty) return;
        fsService.writeFile(tab.path, tab.content).then((ok) => {
          if (ok) markSaved(tab.id);
        });
      });
    },
    [markSaved]
  );

  useEffect(() => {
    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const model = editor.getModel();
    if (model && activeTabContent !== undefined && model.getValue() !== activeTabContent) {
      model.setValue(activeTabContent);
    }
    if (activeTabViewState) {
      try {
        editor.restoreViewState(
          JSON.parse(activeTabViewState) as MonacoEditorNS.ICodeEditorViewState
        );
      } catch { /* invalid view state */ }
    }
  }, [activeTab?.id, activeTabContent, activeTabViewState]);

  if (tabs.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "oklch(0.35 0.02 280)",
          fontSize: "14px",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "48px", opacity: 0.3 }}>⌨</span>
        <p style={{ margin: 0 }}>Open a file to start editing</p>
        <p style={{ margin: 0, fontSize: "12px", color: "oklch(0.30 0.02 280)" }}>
          Ctrl+P — Command Palette
        </p>
      </div>
    );
  }

  return (
    <MonacoEditor
      height="100%"
      language={activeTab?.language ?? "plaintext"}
      value={activeTab?.content ?? ""}
      theme={THEME_NAME}
      onMount={handleMount}
      onChange={(value) => {
        if (activeTabId && value !== undefined) {
          updateContent(activeTabId, value);
          markDirty(activeTabId);
        }
      }}
      options={{
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        fontLigatures: true,
        lineNumbers: "on",
        minimap: { enabled: true, scale: 1 },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        tabSize: 2,
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        bracketPairColorization: { enabled: true },
        renderLineHighlight: "line",
        padding: { top: 8, bottom: 8 },
        suggest: { showIcons: true },
        quickSuggestions: { other: true, comments: false, strings: false },
      }}
    />
  );
}
