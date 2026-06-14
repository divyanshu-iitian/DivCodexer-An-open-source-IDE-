import { FolderOpen, GitBranch, FilePlus, LayoutGrid, Clock, FileCode, ChevronRight, Sparkles, Zap } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace";

const QUICK_ACTIONS = [
  { Icon: FolderOpen, title: "Open Folder",        desc: "Open a local project",    color: "#7c3aed", bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.25)" },
  { Icon: GitBranch,  title: "Clone Repository",   desc: "Clone from Git URL",      color: "#0ea5e9", bg: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.25)" },
  { Icon: FilePlus,   title: "New File",            desc: "Create a blank file",     color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.25)" },
  { Icon: LayoutGrid, title: "New Workspace",       desc: "Start a fresh workspace", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
];

const LANG_DOT: Record<string, string> = {
  TypeScript: "#3b82f6",
  Go: "#06b6d4",
  Python: "#f59e0b",
  Rust: "#f97316",
  JavaScript: "#eab308",
};

export function WelcomeDashboard() {
  const { recentProjects } = useWorkspaceStore();

  async function handleOpenFolder() {
    const path = await window.electronAPI?.openFolder();
    if (path) {
      // Open workspace via store
    }
  }

  return (
    <div
      className="flex-1 overflow-y-auto p-8 fade-in min-h-0"
      style={{ background: "oklch(0.08 0.02 280)" }}
    >
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center neon-glow"
            style={{
              background: "oklch(0.65 0.28 290 / 15%)",
              border: "1px solid oklch(0.65 0.28 290 / 30%)",
            }}
          >
            <Zap className="w-5 h-5" style={{ color: "oklch(0.75 0.28 290)" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight leading-none">
              <span style={{ color: "oklch(0.75 0.28 290)", textShadow: "0 0 20px oklch(0.65 0.28 290 / 40%)" }}>
                Div
              </span>
              <span style={{ color: "oklch(0.90 0.01 280)" }}>Codexer</span>
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "oklch(0.50 0.02 280)" }}>
              AI-powered desktop IDE
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "oklch(0.50 0.02 280)" }}
        >
          Start
        </h2>
        <div className="grid grid-cols-2 gap-3" style={{ maxWidth: "520px" }}>
          {QUICK_ACTIONS.map(({ Icon, title, desc, color, bg, border }) => (
            <button
              key={title}
              onClick={title === "Open Folder" ? handleOpenFolder : undefined}
              className="flex flex-col gap-3 p-4 rounded-xl text-left transition-all duration-200 group"
              style={{ background: bg, border: `1px solid ${border}` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${color}22`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${color}22`, border: `1px solid ${color}44` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "oklch(0.85 0.01 280)" }}>
                  {title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 280)" }}>
                  {desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section className="mb-10" style={{ maxWidth: "520px" }}>
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.50 0.02 280)" }}
          >
            Recent Projects
          </h2>
          <button
            className="flex items-center gap-1 text-xs transition-colors"
            style={{ color: "oklch(0.65 0.28 290)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.28 290)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.65 0.28 290)"; }}
          >
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-1">
          {recentProjects.map((project) => (
            <button
              key={project.id}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all group"
              style={{ border: "1px solid transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 4%)";
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 8%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
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
                <p
                  className="text-sm font-medium truncate transition-colors"
                  style={{ color: "oklch(0.80 0.01 280)" }}
                >
                  {project.name}
                </p>
                <p className="text-xs truncate" style={{ color: "oklch(0.50 0.02 280)" }}>
                  {project.path}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="flex items-center gap-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: LANG_DOT[project.language] ?? "#9ca3af" }}
                  />
                  <span className="text-[10px]" style={{ color: "oklch(0.50 0.02 280)" }}>
                    {project.language}
                  </span>
                </div>
                <div className="flex items-center gap-1" style={{ color: "oklch(0.45 0.02 280)" }}>
                  <Clock className="w-2.5 h-2.5" />
                  <span className="text-[10px]">{project.lastOpened}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Files */}
      <section style={{ maxWidth: "520px" }}>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "oklch(0.50 0.02 280)" }}
        >
          Recent Files
        </h2>
        <div className="space-y-1">
          {["App.tsx", "workspace.ts", "IDELayout.tsx", "globals.css"].map((f) => (
            <button
              key={f}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all"
              style={{ border: "1px solid transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 4%)";
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 8%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
            >
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style={{
                  background: "oklch(0.65 0.28 290 / 10%)",
                  border: "1px solid oklch(0.65 0.28 290 / 20%)",
                }}
              >
                <FileCode className="w-3.5 h-3.5" style={{ color: "oklch(0.65 0.28 290)" }} />
              </div>
              <span className="text-xs flex-1 text-left" style={{ color: "oklch(0.70 0.02 280)" }}>
                {f}
              </span>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0"
                style={{
                  background: "oklch(0.65 0.28 290 / 10%)",
                  color: "oklch(0.65 0.28 290 / 80%)",
                }}
              >
                .{f.split(".").pop()}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* AI Tip */}
      <div
        className="mt-8 p-4 rounded-xl"
        style={{
          background: "oklch(0.65 0.28 290 / 6%)",
          border: "1px solid oklch(0.65 0.28 290 / 15%)",
          maxWidth: "520px",
        }}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.65 0.28 290)" }} />
          <div>
            <p className="text-xs font-medium" style={{ color: "oklch(0.85 0.01 280)" }}>
              AI Assistant ready
            </p>
            <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 280)" }}>
              Press <kbd
                className="px-1 py-0.5 rounded text-[10px] font-mono mx-0.5"
                style={{ background: "oklch(1 0 0 / 10%)" }}
              >Ctrl+I</kbd> to open the AI panel and start coding with intelligent assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
