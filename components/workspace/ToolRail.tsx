// components/workspace/ToolRail.tsx

"use client";

import React from "react";

interface ToolRailProps {
  activeTool: string;
  onSelect: (tool: string) => void;
}

const tools = [
  {
    id: "overview",
    label: "Overview",
    icon: "grid",
  },
  {
    id: "playground",
    label: "Playground",
    icon: "terminal",
  },
  {
    id: "requests",
    label: "Requests",
    icon: "activity",
  },
  {
    id: "models",
    label: "Models",
    icon: "layers",
  },
  {
    id: "workers",
    label: "Workers",
    icon: "server",
  },
  {
    id: "routing",
    label: "Routing",
    icon: "route",
  },
  {
    id: "observability",
    label: "Observability",
    icon: "pulse",
  },
];

function ToolIcon({
  type,
}: {
  type: string;
}) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "terminal":
      return (
        <svg {...common}>
          <path d="M4 5h16v14H4z" />
          <path d="m8 9 3 3-3 3" />
          <path d="M13 15h3" />
        </svg>
      );

    case "activity":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-7 4 14 2-7h6" />
        </svg>
      );

    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16 9 5 9-5" />
        </svg>
      );

    case "server":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="6" rx="1" />
          <rect x="4" y="14" width="16" height="6" rx="1" />
          <path d="M8 7h.01M8 17h.01" />
        </svg>
      );

    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M8 6h5a5 5 0 0 1 5 5v5" />
        </svg>
      );

    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
          />
          <path d="M9 4v16M4 9h16" />
        </svg>
      );
  }
}

export default function ToolRail({
  activeTool,
  onSelect,
}: ToolRailProps) {
  return (
    <aside className="nexus-tool-rail">
      <div className="nexus-tool-logo">
        <span className="nexus-logo-mark">N</span>
      </div>

      <div className="nexus-tool-divider" />

      <nav className="nexus-tool-list">
        {tools.map((tool) => {
          const active = activeTool === tool.id;

          return (
            <button
              key={tool.id}
              className={`nexus-tool-button ${
                active ? "is-active" : ""
              }`}
              onClick={() => onSelect(tool.id)}
              title={tool.label}
              aria-label={tool.label}
            >
              <ToolIcon type={tool.icon} />
            </button>
          );
        })}
      </nav>

      <div className="nexus-tool-bottom">
        <button
          className="nexus-tool-button"
          title="Settings"
          aria-label="Settings"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.5v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4v-2.5h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V4h2.5v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.5h-.1a1.7 1.7 0 0 0-1.6 1.4Z" />
          </svg>
        </button>

        <button
          className="nexus-tool-button"
          title="Help"
          aria-label="Help"
        >
          ?
        </button>
      </div>
    </aside>
  );
}