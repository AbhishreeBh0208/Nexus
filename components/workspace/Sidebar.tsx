// components/workspace/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  collapsed: boolean;
  width: number;
}

const sections = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Overview", href: "/workspace", icon: "grid" },
    ],
  },
  {
    title: "INFERENCE",
    items: [
      {
        label: "Playground",
        href: "/workspace/playground",
        icon: "terminal",
      },
      {
        label: "Requests",
        href: "/workspace/requests",
        icon: "activity",
      },
      {
        label: "Models",
        href: "/workspace/models",
        icon: "layers",
      },
    ],
  },
  {
    title: "INFRASTRUCTURE",
    items: [
      {
        label: "Workers",
        href: "/workspace/workers",
        icon: "server",
      },
      {
        label: "Routing",
        href: "/workspace/routing",
        icon: "route",
      },
      {
        label: "Cache",
        href: "/workspace/cache",
        icon: "database",
      },
    ],
  },
  {
    title: "OBSERVABILITY",
    items: [
      {
        label: "Metrics",
        href: "/workspace/observability/metrics",
        icon: "chart",
      },
      {
        label: "Traces",
        href: "/workspace/observability/traces",
        icon: "pulse",
      },
      {
        label: "Costs",
        href: "/workspace/observability/costs",
        icon: "dollar",
      },
    ],
  },
  {
    title: "DEVELOPERS",
    items: [
      {
        label: "API Keys",
        href: "/workspace/developers/api-keys",
        icon: "key",
      },
      {
        label: "Webhooks",
        href: "/workspace/developers/webhooks",
        icon: "webhook",
      },
      {
        label: "Docs",
        href: "/workspace/developers/docs",
        icon: "book",
      },
    ],
  },
];

function Icon({
  type,
}: {
  type: string;
}) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<string, React.ReactNode> = {
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    terminal: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m8 9 3 3-3 3" />
        <path d="M13 15h3" />
      </>
    ),
    activity: (
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
      </>
    ),
    server: (
      <>
        <rect x="4" y="4" width="16" height="6" rx="1" />
        <rect x="4" y="14" width="16" height="6" rx="1" />
        <path d="M8 7h.01M8 17h.01" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 6h5a5 5 0 0 1 5 5v5" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </>
    ),
    chart: (
      <>
        <path d="M5 19V9M12 19V5M19 19v-8" />
      </>
    ),
    pulse: (
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    ),
    dollar: (
      <>
        <path d="M12 3v18" />
        <path d="M17 7.5c0-1.7-1.8-2.5-5-2.5s-5 1-5 3 2 3 5 3 5 1.2 5 3-2 3.5-5 3.5-5-1.2-5-3" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="15" r="4" />
        <path d="m11 12 7-7 2 2-2 2 2 2-2 2-2-2-2 2" />
      </>
    ),
    webhook: (
      <>
        <path d="M18 8a4 4 0 1 0-4-4" />
        <path d="M6 16a4 4 0 1 0 4 4" />
        <path d="M14 4 9 13" />
        <path d="M10 20h4a4 4 0 0 0 4-4" />
      </>
    ),
    book: (
      <>
        <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" />
        <path d="M8 20V7a3 3 0 0 1 3-3" />
      </>
    ),
  };

  return <svg {...common}>{paths[type]}</svg>;
}

export default function Sidebar({
  collapsed,
  width,
}: SidebarProps) {
  const pathname = usePathname();

  if (collapsed) return null;

  return (
    <aside
      className="nexus-sidebar"
      style={{ width }}
    >
      <div className="nexus-workspace-switcher">
        <div className="nexus-workspace-avatar">
          A
        </div>

        <div className="nexus-workspace-info">
          <strong>Acme AI</strong>
          <span>Production</span>
        </div>

        <span className="nexus-chevron">⌄</span>
      </div>

      <div className="nexus-sidebar-scroll">
        {sections.map((section) => (
          <section
            key={section.title}
            className="nexus-sidebar-section"
          >
            <div className="nexus-section-title">
              {section.title}
            </div>

            {section.items.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nexus-sidebar-item ${
                    active ? "is-active" : ""
                  }`}
                >
                  <Icon type={item.icon} />

                  <span>{item.label}</span>

                  {active && (
                    <span className="nexus-active-indicator" />
                  )}
                </Link>
              );
            })}
          </section>
        ))}
      </div>

      <div className="nexus-sidebar-footer">
        <Link
          href="/workspace/settings"
          className="nexus-sidebar-item"
        >
          <span>⚙</span>
          <span>Settings</span>
        </Link>

        <div className="nexus-user">
          <div className="nexus-user-avatar">
            AB
          </div>

          <div>
            <strong>Abhishree</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}