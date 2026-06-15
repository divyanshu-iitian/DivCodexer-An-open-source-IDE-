import type { ElectronAPI } from "./ipc";

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

declare module "react" {
  interface CSSProperties {
    WebkitAppRegion?: "drag" | "no-drag";
  }
}
