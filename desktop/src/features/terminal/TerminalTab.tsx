import { useEffect, useRef, memo } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import * as termService from "@/services/terminal";
import "@xterm/xterm/css/xterm.css";

interface Props {
  sessionId: string;
  isVisible: boolean;
}

export const TerminalTab = memo(function TerminalTab({ sessionId, isVisible }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new Terminal({
      theme: {
        background: "#0a0b11",
        foreground: "#e0ddf5",
        cursor: "#cc77ff",
        selectionBackground: "#44415a80",
        black: "#21222c",
        red: "#ff5555",
        green: "#50fa7b",
        yellow: "#f1fa8c",
        blue: "#bd93f9",
        magenta: "#ff79c6",
        cyan: "#8be9fd",
        white: "#f8f8f2",
        brightBlack: "#6272a4",
        brightRed: "#ff6e6e",
        brightGreen: "#69ff94",
        brightYellow: "#ffffa5",
        brightBlue: "#d6acff",
        brightMagenta: "#ff92df",
        brightCyan: "#a4ffff",
        brightWhite: "#ffffff",
      },
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 13,
      lineHeight: 1.5,
      cursorBlink: true,
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.open(containerRef.current);
    fitAddon.fit();

    termRef.current = term;
    fitRef.current = fitAddon;

    term.onData((data) => termService.sendInput(sessionId, data));

    const removeData = termService.onData((id, data) => {
      if (id === sessionId) term.write(data);
    });

    const removeExit = termService.onExit((id) => {
      if (id === sessionId) term.write("\r\n[Process exited]\r\n");
    });

    const ro = new ResizeObserver(() => {
      fitAddon.fit();
      termService.resizeTerminal(sessionId, term.cols, term.rows);
    });
    ro.observe(containerRef.current);

    return () => {
      removeData();
      removeExit();
      ro.disconnect();
      term.dispose();
    };
  }, [sessionId]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => fitRef.current?.fit(), 10);
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        padding: "4px",
        boxSizing: "border-box",
        display: isVisible ? "block" : "none",
      }}
    />
  );
});
