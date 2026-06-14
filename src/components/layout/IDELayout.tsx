"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ActivityBar } from "@/components/layout/ActivityBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatusBar } from "@/components/layout/StatusBar";
import { AIAssistantPanel } from "@/components/assistant/AIAssistantPanel";
import { WelcomeDashboard } from "@/components/dashboard/WelcomeDashboard";
import { useWorkspaceStore } from "@/store/workspace";

export function IDELayout() {
  const { activeSidebarItem, aiPanelOpen } = useWorkspaceStore();

  return (
    <TooltipProvider delay={300}>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
        {/* Main content area */}
        <div className="flex flex-1 min-h-0">
          {/* Activity Bar */}
          <ActivityBar />

          {/* Sidebar (dynamic panel) */}
          <Sidebar />

          {/* Main workspace */}
          <main className="flex-1 min-w-0 overflow-hidden flex flex-col">
            {activeSidebarItem === "home" ? (
              <WelcomeDashboard />
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <p className="text-sm">No file open</p>
                  <p className="text-xs">Select a file from the explorer to start editing</p>
                </div>
              </div>
            )}
          </main>

          {/* AI Assistant Panel */}
          {aiPanelOpen && <AIAssistantPanel />}
        </div>

        {/* Status Bar */}
        <StatusBar />
      </div>
    </TooltipProvider>
  );
}
