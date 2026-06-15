import { useState, useRef, useEffect, memo, useCallback } from "react";
import { useWorkspaceStore } from "@/stores/workspace";
import { AI_MODELS } from "@/lib/constants";
import type { AiModel } from "@/types";

const AI_REPLIES = [
  "I can help with that! Let me analyze your code...",
  "Great question! Here's how I would approach this:",
  "I see what you're trying to do. Consider this approach:",
  "That's a common pattern. Here's the best practice:",
  "I can suggest a few optimizations for your code:",
];

const MessageBubble = memo(function MessageBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          padding: "10px 12px",
          borderRadius: isUser ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
          background: isUser
            ? "oklch(0.65 0.28 290)"
            : "oklch(0.14 0.04 280)",
          color: isUser ? "#fff" : "oklch(0.85 0.01 280)",
          fontSize: "13px",
          lineHeight: 1.5,
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
          border: isUser ? "none" : "1px solid oklch(0.22 0.05 280)",
        }}
      >
        {content}
      </div>
    </div>
  );
});

const ModelSelector = memo(function ModelSelector({
  value,
  onChange,
}: {
  value: AiModel;
  onChange: (model: AiModel) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as AiModel)}
      style={{
        background: "oklch(0.12 0.03 280)",
        border: "1px solid oklch(0.22 0.05 280)",
        borderRadius: "5px",
        color: "oklch(0.75 0.15 290)",
        fontSize: "11px",
        padding: "3px 6px",
        cursor: "pointer",
        outline: "none",
      }}
    >
      {AI_MODELS.map((m) => (
        <option key={m.id} value={m.id}>
          {m.label}
        </option>
      ))}
    </select>
  );
});

export function AssistantPanel() {
  const { messages, addMessage, clearMessages, activeModel, setModel } = useWorkspaceStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const msgIdCounter = useRef(0);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput("");
    addMessage({ role: "user", content: text });

    setIsTyping(true);
    const delay = 600 + Math.floor(msgIdCounter.current % 7) * 150;
    msgIdCounter.current += 1;

    setTimeout(() => {
      const reply = AI_REPLIES[msgIdCounter.current % AI_REPLIES.length];
      addMessage({ role: "assistant", content: reply });
      setIsTyping(false);
    }, delay);
  }, [input, isTyping, addMessage]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid oklch(0.15 0.03 280)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "oklch(0.55 0.01 280)",
          }}
        >
          AI Assistant
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ModelSelector value={activeModel} onChange={setModel} />
          <button
            onClick={clearMessages}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "oklch(0.45 0.01 280)",
              fontSize: "14px",
            }}
            title="Clear chat"
          >
            ⟳
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
        }}
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} content={m.content} />
        ))}
        {isTyping && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "12px" }}>
            <div
              style={{
                background: "oklch(0.14 0.04 280)",
                border: "1px solid oklch(0.22 0.05 280)",
                borderRadius: "12px 12px 12px 2px",
                padding: "10px 16px",
                color: "oklch(0.65 0.28 290)",
                fontSize: "16px",
                letterSpacing: "4px",
              }}
            >
              ···
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "8px 12px",
          borderTop: "1px solid oklch(0.15 0.03 280)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            background: "oklch(0.10 0.02 280)",
            border: "1px solid oklch(0.20 0.04 280)",
            borderRadius: "8px",
            padding: "6px 8px",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask DivCodexer AI… (Enter to send)"
            rows={2}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "oklch(0.85 0.01 280)",
              fontSize: "13px",
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || isTyping}
            style={{
              alignSelf: "flex-end",
              background: input.trim() && !isTyping ? "oklch(0.65 0.28 290)" : "oklch(0.25 0.05 280)",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
              fontSize: "16px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
