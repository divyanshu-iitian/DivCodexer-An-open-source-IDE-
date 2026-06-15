import type { TerminalSession, TerminalCreatePayload } from "@/types";

function api() {
  return window.electronAPI;
}

export async function createTerminal(
  payload: TerminalCreatePayload
): Promise<TerminalSession | null> {
  return api().terminalCreate(payload);
}

export function sendInput(id: string, data: string): void {
  api().terminalInput(id, data);
}

export function resizeTerminal(id: string, cols: number, rows: number): void {
  api().terminalResize({ id, cols, rows });
}

export function destroyTerminal(id: string): void {
  api().terminalDestroy(id);
}

export function onData(cb: (id: string, data: string) => void): () => void {
  return api().onTerminalData(cb);
}

export function onExit(cb: (id: string, code: number) => void): () => void {
  return api().onTerminalExit(cb);
}
