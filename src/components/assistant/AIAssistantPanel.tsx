"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Code2,
  FileSearch,
  Lightbulb,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi! I'm **DivCodexer AI**, your intelligent coding assistant. I can help you:\n\n• Write and debug code\n• Explain complex concepts\n• Review and refactor code\n• Answer architecture questions\n\nWhat would you like to build today?",
    timestamp: new Date(),
  },
];

const AI_REPLIES = [
  "That's a great question! Here's how I'd approach it:\n\n```typescript\nconst solution = () => {\n  // Implementation here\n  return result;\n};\n```\n\nThis pattern is clean and follows React best practices.",
  "I can help with that! The key insight here is to leverage TypeScript's type system to catch errors at compile time rather than runtime.",
  "Interesting problem! Let me break it down:\n\n1. First, identify the core requirements\n2. Design the data model\n3. Implement the solution\n4. Add tests for edge cases",
];

const SUGGESTIONS = [
  { icon: Code2, text: "Write a React hook" },
  { icon: FileSearch, text: "Explain this file" },
  { icon: Lightbulb, text: "Suggest improvements" },
];

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-2.5 fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-1 neon-glow">
          <Bot className="w-3.5 h-3.5 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed",
          isUser
            ? "bg-primary/20 border border-primary/30 text-foreground"
            : "glass border border-border text-foreground"
        )}
      >
        {message.content.split("\n").map((line, i) => {
          const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          return (
            <p
              key={i}
              className={i > 0 ? "mt-1" : ""}
              dangerouslySetInnerHTML={{ __html: bold }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function AIAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [model, setModel] = useState("claude-sonnet-4-6");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(10);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userId = (++msgIdRef.current).toString();
    const userMsg: Message = {
      id: userId,
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200));

    const aiMsg: Message = {
      id: (++msgIdRef.current).toString(),
      role: "assistant",
      content: AI_REPLIES[msgIdRef.current % AI_REPLIES.length],
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full w-72 border-l border-border bg-[oklch(0.09_0.02_280)] shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center neon-glow">
            <Bot className="w-3 h-3 text-primary" />
          </div>
          <span className="text-xs font-semibold text-foreground">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMessages(INITIAL_MESSAGES)}
            className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            title="Clear chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-border text-muted-foreground text-[10px] transition-colors">
            <Sparkles className="w-2.5 h-2.5 text-primary" />
            {model.split("-").slice(1, 3).join(" ")}
            <ChevronDown className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Model selector */}
      <div className="px-3 py-2 border-b border-border">
        <div className="flex gap-1">
          {["claude-sonnet-4-6", "claude-opus-4-8", "claude-haiku-4-5"].map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={cn(
                "flex-1 py-1 rounded text-[10px] font-medium transition-all",
                model === m
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {m.split("-")[1].charAt(0).toUpperCase() + m.split("-")[1].slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && (
          <div className="flex gap-2.5 items-start fade-in">
            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 neon-glow">
              <Bot className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="glass border border-border rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="px-3 pb-2">
        <div className="flex flex-col gap-1">
          {SUGGESTIONS.map(({ icon: Icon, text }) => (
            <button
              key={text}
              onClick={() => sendMessage(text)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-left glass glass-hover transition-all group"
            >
              <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors truncate">
                {text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <div className="flex items-end gap-2 px-3 py-2 rounded-xl glass border border-border focus-within:border-primary/40 focus-within:neon-glow transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI anything..."
            rows={1}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none resize-none leading-relaxed"
            style={{ maxHeight: "80px" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className={cn(
              "flex items-center justify-center w-7 h-7 rounded-lg transition-all shrink-0",
              input.trim()
                ? "bg-primary hover:bg-primary/80 text-primary-foreground neon-glow"
                : "bg-white/5 text-muted-foreground cursor-not-allowed"
            )}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground/50 text-center mt-1.5">
          Enter to send · Shift+Enter for newline
        </p>
      </div>
    </div>
  );
}
