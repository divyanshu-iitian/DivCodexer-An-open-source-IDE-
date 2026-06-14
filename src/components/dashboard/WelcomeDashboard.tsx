"use client";

import {
  FolderOpen,
  GitBranch,
  FilePlus,
  LayoutGrid,
  Clock,
  FileCode,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  {
    icon: FolderOpen,
    title: "Open Folder",
    description: "Open a local project folder",
    color: "#7c3aed",
    gradient: "from-violet-600/20 to-violet-500/5",
    border: "border-violet-500/20",
  },
  {
    icon: GitBranch,
    title: "Clone Repository",
    description: "Clone from Git URL",
    color: "#0ea5e9",
    gradient: "from-sky-500/20 to-sky-400/5",
    border: "border-sky-500/20",
  },
  {
    icon: FilePlus,
    title: "New File",
    description: "Create a new file",
    color: "#10b981",
    gradient: "from-emerald-500/20 to-emerald-400/5",
    border: "border-emerald-500/20",
  },
  {
    icon: LayoutGrid,
    title: "New Workspace",
    description: "Set up a new workspace",
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-amber-400/5",
    border: "border-amber-500/20",
  },
];

const LANG_DOTS: Record<string, string> = {
  TypeScript: "bg-blue-400",
  Go: "bg-cyan-400",
  Python: "bg-yellow-400",
  Rust: "bg-orange-400",
  JavaScript: "bg-yellow-300",
};

export function WelcomeDashboard() {
  const { recentProjects, recentFiles } = useWorkspaceStore();

  return (
    <div className="flex-1 overflow-y-auto p-8 fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center neon-glow">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="neon-text">Div</span>
            <span className="text-foreground">Codexer</span>
          </h1>
        </div>
        <p className="text-sm text-muted-foreground ml-11">
          AI-powered IDE for modern development
        </p>
      </div>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Start
        </h2>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {QUICK_ACTIONS.map(({ icon: Icon, title, description, color, gradient, border }) => (
            <button
              key={title}
              className={cn(
                "group flex flex-col gap-3 p-4 rounded-xl text-left",
                "bg-gradient-to-br border transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
                gradient,
                border
              )}
              style={{ boxShadow: `0 0 0 0 ${color}` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 24px ${color}22`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  background: `${color}22`,
                  border: `1px solid ${color}44`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Recent Projects
            </h2>
            <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-1.5">
            {recentProjects.map((project) => (
              <button
                key={project.id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg glass glass-hover text-left group transition-all"
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{
                    background: `${project.color}22`,
                    border: `1px solid ${project.color}44`,
                    color: project.color,
                  }}
                >
                  {project.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {project.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{project.path}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        LANG_DOTS[project.language] ?? "bg-gray-400"
                      )}
                    />
                    <span className="text-[10px] text-muted-foreground">{project.language}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    <Clock className="w-2.5 h-2.5" />
                    <span className="text-[10px]">{project.lastOpened}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Files */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Recent Files
            </h2>
            <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-1.5">
            {recentFiles.map((file) => (
              <button
                key={file.id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg glass glass-hover text-left group transition-all"
              >
                <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-primary/10 border border-primary/20">
                  <FileCode className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{file.path}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary/80 font-mono">
                    .{file.language}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    <Clock className="w-2.5 h-2.5" />
                    <span className="text-[10px]">{file.lastModified}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Footer tips */}
      <div className="mt-10 p-4 rounded-xl glass border border-primary/10">
        <div className="flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-foreground">AI Assistant is ready</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Press{" "}
              <kbd className="px-1 py-0.5 text-[10px] rounded bg-white/10 font-mono">
                Ctrl+I
              </kbd>{" "}
              to open the AI panel and start coding with intelligent assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
