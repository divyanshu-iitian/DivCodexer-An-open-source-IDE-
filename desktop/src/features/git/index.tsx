import { useState, useEffect, useCallback } from "react";
import { useWorkspaceStore } from "@/stores/workspace";
import * as gitService from "@/services/git";

export function GitPanel() {
  const { workspacePath, gitStatus, setGitStatus } = useWorkspaceStore();
  const [commitMsg, setCommitMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!workspacePath) return;
    const status = await gitService.getStatus(workspacePath);
    setGitStatus(status);
  }, [workspacePath, setGitStatus]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function stageAll() {
    if (!workspacePath || !gitStatus) return;
    const paths = [
      ...gitStatus.unstaged.map((f) => f.path),
      ...gitStatus.untracked,
    ];
    if (paths.length === 0) return;
    setLoading(true);
    await gitService.stageFiles(workspacePath, paths);
    await refresh();
    setLoading(false);
  }

  async function unstage(path: string) {
    if (!workspacePath) return;
    await gitService.unstageFiles(workspacePath, [path]);
    await refresh();
  }

  async function discard(path: string) {
    if (!workspacePath) return;
    if (!confirm(`Discard changes to "${path}"?`)) return;
    await gitService.discardChanges(workspacePath, path);
    await refresh();
  }

  async function commit() {
    if (!workspacePath || !commitMsg.trim()) return;
    setLoading(true);
    setError(null);
    const ok = await gitService.commit(workspacePath, commitMsg.trim());
    if (ok) {
      setCommitMsg("");
      await refresh();
    } else {
      setError("Commit failed — nothing staged?");
    }
    setLoading(false);
  }

  async function push() {
    if (!workspacePath) return;
    setLoading(true);
    setError(null);
    const ok = await gitService.push(workspacePath);
    if (!ok) setError("Push failed — check remote.");
    setLoading(false);
  }

  async function pull() {
    if (!workspacePath) return;
    setLoading(true);
    setError(null);
    const ok = await gitService.pull(workspacePath);
    if (!ok) setError("Pull failed — conflicts?");
    else await refresh();
    setLoading(false);
  }

  const statusColor = (s: string) => {
    if (s === "M") return "oklch(0.75 0.15 60)";
    if (s === "A") return "oklch(0.70 0.20 150)";
    if (s === "D") return "oklch(0.65 0.20 15)";
    return "oklch(0.65 0.01 280)";
  };

  const h2 = (label: string) => (
    <div
      style={{
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "oklch(0.55 0.01 280)",
        padding: "8px 12px 4px",
      }}
    >
      {label}
    </div>
  );

  if (!workspacePath) {
    return (
      <div style={{ padding: "16px", color: "oklch(0.45 0.01 280)", fontSize: "13px", textAlign: "center" }}>
        Open a folder to use Git
      </div>
    );
  }

  if (!gitStatus) {
    return (
      <div style={{ padding: "16px", color: "oklch(0.45 0.01 280)", fontSize: "13px", textAlign: "center" }}>
        Not a git repository
      </div>
    );
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid oklch(0.15 0.03 280)",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "oklch(0.55 0.01 280)" }}>
          Source Control
        </span>
        <button onClick={refresh} style={{ background: "none", border: "none", cursor: "pointer", color: "oklch(0.65 0.28 290)", fontSize: "14px" }} title="Refresh">
          ↻
        </button>
      </div>

      {/* Branch / ahead/behind */}
      <div style={{ padding: "8px 12px", fontSize: "12px", color: "oklch(0.75 0.15 290)" }}>
        ⎇ {gitStatus.branch}
        {(gitStatus.ahead > 0 || gitStatus.behind > 0) && (
          <span style={{ color: "oklch(0.65 0.01 280)", marginLeft: "8px" }}>
            {gitStatus.ahead > 0 && `↑${gitStatus.ahead}`}{" "}
            {gitStatus.behind > 0 && `↓${gitStatus.behind}`}
          </span>
        )}
      </div>

      {/* Commit message */}
      <div style={{ padding: "0 12px 8px" }}>
        <textarea
          value={commitMsg}
          onChange={(e) => setCommitMsg(e.target.value)}
          placeholder="Commit message..."
          rows={3}
          style={{
            width: "100%",
            background: "oklch(0.10 0.02 280)",
            border: "1px solid oklch(0.20 0.04 280)",
            borderRadius: "6px",
            color: "oklch(0.85 0.01 280)",
            fontSize: "12px",
            padding: "6px 8px",
            resize: "none",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "inherit",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.65 0.28 290)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.20 0.04 280)")}
        />
        <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
          <button
            onClick={commit}
            disabled={loading || !commitMsg.trim()}
            style={{
              flex: 1,
              background: "oklch(0.65 0.28 290)",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              cursor: loading || !commitMsg.trim() ? "not-allowed" : "pointer",
              fontSize: "12px",
              padding: "5px 0",
              opacity: loading || !commitMsg.trim() ? 0.6 : 1,
            }}
          >
            Commit
          </button>
          <button
            onClick={push}
            disabled={loading}
            style={{
              background: "oklch(0.18 0.04 280)",
              border: "1px solid oklch(0.28 0.06 280)",
              borderRadius: "5px",
              color: "oklch(0.75 0.01 280)",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "12px",
              padding: "5px 10px",
              opacity: loading ? 0.6 : 1,
            }}
          >
            Push
          </button>
          <button
            onClick={pull}
            disabled={loading}
            style={{
              background: "oklch(0.18 0.04 280)",
              border: "1px solid oklch(0.28 0.06 280)",
              borderRadius: "5px",
              color: "oklch(0.75 0.01 280)",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "12px",
              padding: "5px 10px",
              opacity: loading ? 0.6 : 1,
            }}
          >
            Pull
          </button>
        </div>
        {error && (
          <p style={{ color: "oklch(0.65 0.20 15)", fontSize: "11px", margin: "4px 0 0" }}>
            {error}
          </p>
        )}
      </div>

      {/* Staged changes */}
      {gitStatus.staged.length > 0 && (
        <>
          {h2(`Staged Changes (${gitStatus.staged.length})`)}
          {gitStatus.staged.map((f) => (
            <div
              key={f.path}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "3px 12px",
                fontSize: "12px",
                color: "oklch(0.80 0.01 280)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden" }}>
                <span style={{ color: statusColor(f.status), fontWeight: 700, flexShrink: 0 }}>
                  {f.status}
                </span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {f.path.split(/[/\\]/).pop()}
                </span>
              </div>
              <button
                onClick={() => unstage(f.path)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "oklch(0.55 0.01 280)", fontSize: "12px" }}
                title="Unstage"
              >
                −
              </button>
            </div>
          ))}
        </>
      )}

      {/* Unstaged changes */}
      {(gitStatus.unstaged.length > 0 || gitStatus.untracked.length > 0) && (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px 4px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "oklch(0.55 0.01 280)" }}>
              Changes ({gitStatus.unstaged.length + gitStatus.untracked.length})
            </span>
            <button
              onClick={stageAll}
              style={{ background: "none", border: "none", cursor: "pointer", color: "oklch(0.65 0.28 290)", fontSize: "11px" }}
              title="Stage All"
            >
              Stage All
            </button>
          </div>
          {gitStatus.unstaged.map((f) => (
            <div
              key={f.path}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "3px 12px",
                fontSize: "12px",
                color: "oklch(0.80 0.01 280)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden" }}>
                <span style={{ color: statusColor(f.status), fontWeight: 700, flexShrink: 0 }}>
                  {f.status}
                </span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {f.path.split(/[/\\]/).pop()}
                </span>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  onClick={() => gitService.stageFiles(workspacePath, [f.path]).then(refresh)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "oklch(0.55 0.01 280)", fontSize: "12px" }}
                  title="Stage"
                >
                  +
                </button>
                <button
                  onClick={() => discard(f.path)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "oklch(0.55 0.01 280)", fontSize: "12px" }}
                  title="Discard"
                >
                  ↺
                </button>
              </div>
            </div>
          ))}
          {gitStatus.untracked.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "3px 12px",
                fontSize: "12px",
                color: "oklch(0.80 0.01 280)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden" }}>
                <span style={{ color: "oklch(0.70 0.20 150)", fontWeight: 700, flexShrink: 0 }}>U</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.split(/[/\\]/).pop()}
                </span>
              </div>
              <button
                onClick={() => gitService.stageFiles(workspacePath, [p]).then(refresh)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "oklch(0.55 0.01 280)", fontSize: "12px" }}
                title="Stage"
              >
                +
              </button>
            </div>
          ))}
        </>
      )}

      {gitStatus.staged.length === 0 &&
        gitStatus.unstaged.length === 0 &&
        gitStatus.untracked.length === 0 && (
          <div style={{ padding: "16px", color: "oklch(0.45 0.01 280)", fontSize: "12px", textAlign: "center" }}>
            No changes
          </div>
        )}
    </div>
  );
}
