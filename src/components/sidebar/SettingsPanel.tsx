"use client";

import { Moon, Palette, Keyboard, Shield, Bell, Code2 } from "lucide-react";

interface SettingGroup {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

const SETTING_GROUPS: SettingGroup[] = [
  {
    title: "Appearance",
    icon: Palette,
    items: ["Color Theme", "Icon Theme", "Font Size", "Font Family"],
  },
  {
    title: "Editor",
    icon: Code2,
    items: ["Tab Size", "Word Wrap", "Line Numbers", "Minimap", "Auto Save"],
  },
  {
    title: "Keyboard",
    icon: Keyboard,
    items: ["Keyboard Shortcuts", "Key Bindings"],
  },
  {
    title: "Privacy & Security",
    icon: Shield,
    items: ["Telemetry", "Workspace Trust", "Extensions"],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: ["Update Notifications", "Extension Notifications"],
  },
];

export function SettingsPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Settings
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-2 space-y-3">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md glass cursor-pointer hover:neon-border transition-all">
          <Moon className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs font-medium text-foreground">Dark Mode</p>
            <p className="text-[11px] text-muted-foreground">Currently active</p>
          </div>
        </div>

        {SETTING_GROUPS.map((group) => (
          <div key={group.title}>
            <div className="flex items-center gap-2 px-2 py-1 mb-1">
              <group.icon className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">{group.title}</span>
            </div>
            <div className="space-y-0.5 pl-2">
              {group.items.map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 rounded transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
