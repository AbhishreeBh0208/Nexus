// components/workspace/Topbar.tsx

"use client";

interface TopbarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onToggleInspector: () => void;
  onToggleConsole: () => void;
}

export default function Topbar({
  sidebarCollapsed,
  onToggleSidebar,
  onToggleInspector,
  onToggleConsole,
}: TopbarProps) {
  return (
    <header className="nexus-topbar">

      <div className="nexus-topbar-left">

        <button
          className="nexus-topbar-icon"
          onClick={onToggleSidebar}
          title={
            sidebarCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          aria-label={
            sidebarCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          <span
            className={
              sidebarCollapsed
                ? "nexus-sidebar-icon collapsed"
                : "nexus-sidebar-icon"
            }
          >
            <i />
            <i />
          </span>
        </button>

        <div className="nexus-topbar-divider" />

        <div className="nexus-breadcrumb">
          <span>Workspace</span>
          <b>/</b>
          <strong>Overview</strong>
        </div>

      </div>

      <div className="nexus-topbar-center">
        <button className="nexus-command-trigger">
          <span className="nexus-search-icon">
            ⌕
          </span>

          <span>Search anything</span>

          <kbd>⌘ K</kbd>
        </button>
      </div>

      <div className="nexus-topbar-right">

        <button
          className="nexus-topbar-action"
          onClick={onToggleConsole}
        >
          Console
        </button>

        <button
          className="nexus-topbar-action"
          onClick={onToggleInspector}
        >
          Inspector
        </button>

        <div className="nexus-env">
          <span className="nexus-status-dot" />
          Production
        </div>

        <div className="nexus-topbar-divider" />

        <button className="nexus-help-button">
          ?
        </button>

        <div className="nexus-avatar">
          AB
        </div>

      </div>

    </header>
  );
}