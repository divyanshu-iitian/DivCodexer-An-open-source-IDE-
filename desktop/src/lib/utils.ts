export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getLanguageFromPath(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    py: "python",
    go: "go",
    rs: "rust",
    css: "css",
    scss: "scss",
    html: "html",
    json: "json",
    md: "markdown",
    yaml: "yaml",
    yml: "yaml",
    sh: "shell",
    toml: "toml",
    c: "c",
    cpp: "cpp",
    java: "java",
    rb: "ruby",
    php: "php",
  };
  return map[ext] ?? "plaintext";
}

export function getFileIcon(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const icons: Record<string, string> = {
    ts: "📘",
    tsx: "⚛️",
    js: "📒",
    jsx: "⚛️",
    py: "🐍",
    go: "🐹",
    rs: "🦀",
    css: "🎨",
    html: "🌐",
    json: "📋",
    md: "📝",
    yaml: "⚙️",
    yml: "⚙️",
  };
  return icons[ext] ?? "📄";
}
