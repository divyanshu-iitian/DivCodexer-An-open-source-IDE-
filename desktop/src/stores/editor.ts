import { create } from "zustand";
import type { EditorTab } from "@/types";
import { generateId } from "@/lib/utils";

interface EditorState {
  tabs: EditorTab[];
  activeTabId: string | null;

  openTab: (tab: Omit<EditorTab, "id" | "isDirty">) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  markDirty: (id: string) => void;
  markSaved: (id: string) => void;
  updateContent: (id: string, content: string) => void;
  saveViewState: (id: string, viewState: string) => void;
  getTab: (id: string) => EditorTab | undefined;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  tabs: [],
  activeTabId: null,

  openTab: (tab) => {
    const existing = get().tabs.find((t) => t.path === tab.path);
    if (existing) {
      set({ activeTabId: existing.id });
      return;
    }
    const newTab: EditorTab = { ...tab, id: generateId(), isDirty: false };
    set((s) => ({ tabs: [...s.tabs, newTab], activeTabId: newTab.id }));
  },

  closeTab: (id) =>
    set((s) => {
      const tabs = s.tabs.filter((t) => t.id !== id);
      let activeTabId = s.activeTabId;
      if (activeTabId === id) {
        const idx = s.tabs.findIndex((t) => t.id === id);
        activeTabId = tabs[Math.min(idx, tabs.length - 1)]?.id ?? null;
      }
      return { tabs, activeTabId };
    }),

  setActiveTab: (id) => set({ activeTabId: id }),

  markDirty: (id) =>
    set((s) => ({
      tabs: s.tabs.map((t) => (t.id === id ? { ...t, isDirty: true } : t)),
    })),

  markSaved: (id) =>
    set((s) => ({
      tabs: s.tabs.map((t) => (t.id === id ? { ...t, isDirty: false } : t)),
    })),

  updateContent: (id, content) =>
    set((s) => ({
      tabs: s.tabs.map((t) =>
        t.id === id ? { ...t, content, isDirty: true } : t
      ),
    })),

  saveViewState: (id, viewState) =>
    set((s) => ({
      tabs: s.tabs.map((t) => (t.id === id ? { ...t, viewState } : t)),
    })),

  getTab: (id) => get().tabs.find((t) => t.id === id),
}));
