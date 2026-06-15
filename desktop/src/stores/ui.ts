import { create } from "zustand";
import type { SidebarView, PanelId } from "@/types";

interface UiState {
  sidebarView: SidebarView;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  bottomPanelOpen: boolean;
  activeBottomPanel: PanelId;

  setSidebarView: (view: SidebarView) => void;
  toggleSidebar: () => void;
  toggleAiPanel: () => void;
  toggleBottomPanel: () => void;
  setActiveBottomPanel: (panel: PanelId) => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  sidebarView: "explorer",
  sidebarOpen: true,
  aiPanelOpen: true,
  bottomPanelOpen: false,
  activeBottomPanel: "terminal",

  setSidebarView: (view) =>
    set((s) => ({
      sidebarView: view,
      sidebarOpen: s.sidebarView === view ? !s.sidebarOpen : true,
    })),

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleAiPanel: () => set((s) => ({ aiPanelOpen: !s.aiPanelOpen })),
  toggleBottomPanel: () => set((s) => ({ bottomPanelOpen: !s.bottomPanelOpen })),

  setActiveBottomPanel: (panel) => {
    const { bottomPanelOpen, activeBottomPanel } = get();
    if (activeBottomPanel === panel && bottomPanelOpen) {
      set({ bottomPanelOpen: false });
    } else {
      set({ activeBottomPanel: panel, bottomPanelOpen: true });
    }
  },
}));
