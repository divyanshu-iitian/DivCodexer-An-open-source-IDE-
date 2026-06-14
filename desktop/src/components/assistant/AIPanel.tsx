import { useState, useRef, useEffect } from "react";
import { Bot, Send, RotateCcw, Sparkles, Code2, FileSearch, Lightbulb, X } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

const AI_REPLIES = [
  "Great question! Here's how I'd approach this:\n\n```typescript\nconst solution = async () => {\n  const result = await processData();\n  return transform(result);\n};\n```\n\nThis keeps the logic clean and handles async operations properly.",
  "I can help! The key insight here is using TypeScript's type system to catch errors at compile time.\n\nTry using a discriminated union:\n\n```typescript\ntype Result<T> = { ok: true; data: T } | { ok: false; error: string };\n```",
  "Let me break this down:\n\n1. **Identify the problem** — what's the expected vs actual behavior?\n2. **Isolate the scope** — narrow down which component is responsible\n3. **Add logging** — trace the data flow\n4. **Write a test** — pin down the exact failure condition",
  "Excellent! Here's a clean implementation:\n\n```typescript\nfunction useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debounced;\n}\n```",
];

const SUGGESTIONS = [
  { Icon: Code2, text: "Write a TypeScript utility function" },
  { Icon: FileSearch, text: "Explain the current file" },
  { Icon: Lightbulb, text: "Suggest code improvements" },
];

let replyIdx = 0;

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex gap-2 fade-in", isUser ? "flex-row-reverse" : "flex-row")}>
      {!isUser && (
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 neon-glow"
          style={{
            background: "oklch(0.65 0.28 290 / 15%)",
            border: "1px solid oklch(0.65 0.28 290 / 30%)",
          }}
        >
          <Bot className="w-3 h-3" style={{ color: "oklch(0.65 0.28 290)" }} />
        </div>
      )}
      <div
        className="max-w-[88%] rounded-xl px-3 py-2 text-xs leading-relaxed"
        style={
          isUser
            ? {
                background: "oklch(0.65 0.28 290 / 15%)",
                border: "1px solid oklch(0.65 0.28 290 / 25%)",
                color: "oklch(0.85 0.01 280)",
              }
            : {
                background: "oklch(1 0 0 / 4%)",
                border: "1px solid oklch(1 0 0 / 8%)",
                color: "oklch(0.80 0.01 280)",
              }
        }
      >
        {msg.content.split("\n").map((line, i) => {
          if (line.startsWith("```")) {
            return null;
          }
          const boldified = line.replace(
            /\*\*(.*?)\*\*/g,
            "<strong style=\"color:oklch(0.85 0.01 280)\">$1</strong>"
          );
          return (
            <p
              key={i}
              className={i > 0 ? "mt-1" : ""}
              style={{ fontFamily: line.startsWith("  ") || line.match(/^[0-9]+\./) ? undefined : undefined }}
              dangerouslySetInnerHTML={{ __html: boldified }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function AIPanel() {
  const { messages, addMessage, clearMessages, toggleAIPanel } = useWorkspaceStore();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    if (!text.trim()) return;
    addMessage({ role: "user", content: text });
    setInput("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    setTyping(false);
    addMessage({ role: "assistant", content: AI_REPLIES[replyIdx++ % AI_REPLIES.length] });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <aside
      className="flex flex-col w-72 shrink-0 h-full"
      style={{
        background: "oklch(0.09 0.02 280)",
        borderLeft: "1px solid oklch(1 0 0 / 6%)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2.5 shrink-0"
        style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center neon-glow"
            style={{
              background: "oklch(0.65 0.28 290 / 15%)",
              border: "1px solid oklch(0.65 0.28 290 / 30%)",
            }}
          >
            <Bot className="w-3 h-3" style={{ color: "oklch(0.65 0.28 290)" }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: "oklch(0.80 0.01 280)" }}>
            AI Assistant
          </span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full"
            style={{
              background: "oklch(0.65 0.28 290 / 10%)",
              color: "oklch(0.65 0.28 290)",
              border: "1px solid oklch(0.65 0.28 290 / 20%)",
            }}
          >
            <Sparkles className="w-2.5 h-2.5 inline mr-0.5" />
            AI
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearMessages}
            title="Clear chat"
            className="p-1 rounded transition-colors hover:bg-white/10"
            style={{ color: "oklch(0.50 0.02 280)" }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleAIPanel}
            title="Close"
            className="p-1 rounded transition-colors hover:bg-white/10"
            style={{ color: "oklch(0.50 0.02 280)" }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Model selector */}
      <div
        className="flex gap-1 px-3 py-2 shrink-0"
        style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
      >
        {["Sonnet", "Opus", "Haiku"].map((m) => (
          <button
            key={m}
            className="flex-1 py-1 rounded text-[10px] font-medium transition-all"
            style={
              m === "Sonnet"
                ? {
                    background: "oklch(0.65 0.28 290 / 15%)",
                    border: "1px solid oklch(0.65 0.28 290 / 30%)",
                    color: "oklch(0.75 0.28 290)",
                  }
                : {
                    color: "oklch(0.50 0.02 280)",
                    border: "1px solid transparent",
                  }
            }
            onMouseEnter={(e) => {
              if (m !== "Sonnet") (e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.01 280)";
            }}
            onMouseLeave={(e) => {
              if (m !== "Sonnet") (e.currentTarget as HTMLElement).style.color = "oklch(0.50 0.02 280)";
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {typing && (
          <div className="flex gap-2 items-start fade-in">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 neon-glow"
              style={{
                background: "oklch(0.65 0.28 290 / 15%)",
                border: "1px solid oklch(0.65 0.28 290 / 30%)",
              }}
            >
              <Bot className="w-3 h-3" style={{ color: "oklch(0.65 0.28 290)" }} />
            </div>
            <div
              className="rounded-xl px-3 py-2.5"
              style={{
                background: "oklch(1 0 0 / 4%)",
                border: "1px solid oklch(1 0 0 / 8%)",
              }}
            >
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "oklch(0.65 0.28 290)",
                      animation: `bounce-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="px-3 pb-2 shrink-0 space-y-1">
        {SUGGESTIONS.map(({ Icon, text }) => (
          <button
            key={text}
            onClick={() => send(text)}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all hover:bg-white/5 group"
            style={{
              background: "oklch(1 0 0 / 3%)",
              border: "1px solid oklch(1 0 0 / 6%)",
            }}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.65 0.28 290)" }} />
            <span className="text-[11px] truncate" style={{ color: "oklch(0.55 0.02 280)" }}>
              {text}
            </span>
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        className="p-3 shrink-0"
        style={{ borderTop: "1px solid oklch(1 0 0 / 6%)" }}
      >
        <div
          className="flex items-end gap-2 px-3 py-2 rounded-xl transition-all"
          style={{
            background: "oklch(1 0 0 / 4%)",
            border: "1px solid oklch(1 0 0 / 8%)",
          }}
          onFocusCapture={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.65 0.28 290 / 35%)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px oklch(0.65 0.28 290 / 10%)";
          }}
          onBlurCapture={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 8%)";
            (e.currentTarget as HTMLElement).style.boxShadow = "";
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask AI anything..."
            rows={1}
            className="flex-1 bg-transparent text-xs outline-none resize-none"
            style={{
              color: "oklch(0.85 0.01 280)",
              maxHeight: "80px",
              lineHeight: "1.5",
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all shrink-0"
            style={
              input.trim()
                ? {
                    background: "oklch(0.65 0.28 290)",
                    color: "white",
                    boxShadow: "0 0 12px oklch(0.65 0.28 290 / 40%)",
                  }
                : {
                    background: "oklch(1 0 0 / 5%)",
                    color: "oklch(0.40 0.02 280)",
                    cursor: "not-allowed",
                  }
            }
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p
          className="text-center text-[10px] mt-1.5"
          style={{ color: "oklch(0.40 0.02 280)" }}
        >
          Enter · Shift+Enter for newline
        </p>
      </div>
    </aside>
  );
}
