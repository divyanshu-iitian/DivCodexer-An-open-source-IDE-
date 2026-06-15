const EXT_TO_LANGUAGE: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  py: "python",
  go: "go",
  rs: "rust",
  css: "css",
  scss: "scss",
  less: "less",
  html: "html",
  htm: "html",
  json: "json",
  jsonc: "jsonc",
  md: "markdown",
  mdx: "mdx",
  yaml: "yaml",
  yml: "yaml",
  sh: "shell",
  bash: "shell",
  zsh: "shell",
  toml: "toml",
  c: "c",
  h: "c",
  cpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  java: "java",
  rb: "ruby",
  php: "php",
  swift: "swift",
  kt: "kotlin",
  kts: "kotlin",
  cs: "csharp",
  fs: "fsharp",
  fsx: "fsharp",
  lua: "lua",
  r: "r",
  sql: "sql",
  graphql: "graphql",
  gql: "graphql",
  proto: "protobuf",
  tf: "terraform",
  hcl: "hcl",
  xml: "xml",
  svg: "xml",
  vue: "vue",
  svelte: "svelte",
  astro: "astro",
};

const ICON_MAP: Record<string, string> = {
  typescript: "📘",
  javascript: "📒",
  python: "🐍",
  go: "🐹",
  rust: "🦀",
  css: "🎨",
  scss: "🎨",
  less: "🎨",
  html: "🌐",
  json: "📋",
  jsonc: "📋",
  markdown: "📝",
  mdx: "📝",
  yaml: "⚙️",
  shell: "💻",
  toml: "⚙️",
  c: "🔧",
  cpp: "🔧",
  java: "☕",
  ruby: "💎",
  php: "🐘",
  swift: "🍎",
  kotlin: "🎯",
  csharp: "🔷",
  sql: "🗄️",
  graphql: "🔗",
  vue: "💚",
  svelte: "🔥",
};

export function getLanguage(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return EXT_TO_LANGUAGE[ext] ?? "plaintext";
}

export function getFileIcon(filename: string): string {
  const lang = getLanguage(filename);
  return ICON_MAP[lang] ?? "📄";
}

export function isBinaryFile(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const BINARY_EXTS = new Set([
    "png", "jpg", "jpeg", "gif", "bmp", "ico", "webp", "svg",
    "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
    "zip", "tar", "gz", "rar", "7z",
    "exe", "dll", "so", "dylib",
    "woff", "woff2", "ttf", "eot",
    "mp3", "mp4", "wav", "ogg", "webm",
  ]);
  return BINARY_EXTS.has(ext);
}
