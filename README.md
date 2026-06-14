# DivCodexer — AI-Powered IDE

A modern, AI-powered code editor inspired by Cursor, Windsurf, and VS Code. Built with Next.js 16, React 19, TypeScript, TailwindCSS, Monaco Editor, and Zustand.

## Features

- **VS Code-style layout** — Activity Bar, Sidebar, Main Workspace, AI Assistant Panel, Status Bar
- **Dark theme with purple neon accents** — glassmorphism cards, smooth animations
- **AI Assistant Panel** — interactive chat interface with model selection (Sonnet / Opus / Haiku)
- **Welcome Dashboard** — quick-action cards (Open Folder, Clone Repository, New File, New Workspace)
- **Recent Projects & Files** — mock data with language indicators and timestamps
- **Dynamic Sidebar** — Explorer, Search, Source Control, Run & Debug, Extensions, Settings panels
- **Zustand state management** — workspace store for sidebar state, recent projects, AI panel toggle
- **Responsive layout** — fluid grid, no hard-coded pixel widths

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TailwindCSS v4 |
| Components | shadcn/ui (base-ui) |
| Editor | Monaco Editor (`@monaco-editor/react`) |
| State | Zustand |
| Icons | Lucide React |
| Language | TypeScript 5 |

## Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/divyanshu-iitian/DivCodexer-An-open-source-IDE-.git
cd DivCodexer-An-open-source-IDE-
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Architecture

```
src/
├── app/
│   ├── globals.css          # Dark theme, neon utilities, glassmorphism
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Entry point → IDELayout
│
├── components/
│   ├── layout/
│   │   ├── IDELayout.tsx    # Root IDE shell (TooltipProvider + all panels)
│   │   ├── ActivityBar.tsx  # Left icon bar with navigation
│   │   ├── Sidebar.tsx      # Dynamic panel router
│   │   └── StatusBar.tsx    # Bottom status bar
│   │
│   ├── sidebar/
│   │   ├── ExplorerPanel.tsx      # File tree
│   │   ├── SearchPanel.tsx        # Workspace search
│   │   ├── SourceControlPanel.tsx # Git status + commit
│   │   ├── RunDebugPanel.tsx      # Run configurations
│   │   ├── ExtensionsPanel.tsx    # Extension marketplace
│   │   └── SettingsPanel.tsx      # Settings groups
│   │
│   ├── dashboard/
│   │   └── WelcomeDashboard.tsx   # Home view with quick actions + recents
│   │
│   └── assistant/
│       └── AIAssistantPanel.tsx   # AI chat with model selector
│
├── store/
│   └── workspace.ts         # Zustand store (sidebar, AI panel, recents)
│
└── types/
    └── index.ts             # Shared TypeScript types
```

## Keyboard Shortcuts (planned)

| Shortcut | Action |
|---|---|
| `Ctrl+I` | Toggle AI Assistant |
| `Ctrl+B` | Toggle Sidebar |
| `Ctrl+Shift+E` | Explorer |
| `Ctrl+Shift+F` | Search |
| `Ctrl+Shift+G` | Source Control |

## Screenshots

The IDE opens on a Welcome Dashboard with:
- **Quick Action cards** — Open Folder, Clone Repository, New File, New Workspace
- **Recent Projects** — 5 mock projects with language color dots and relative timestamps
- **Recent Files** — 4 recently edited files with language badges
- **AI Assistant** — always-visible right panel with chat, suggestions, and model picker

## License

MIT
