// components/workspace/WorkspaceShell.tsx

"use client";

import React, {
  ReactNode,
  useEffect,
  useState,
} from "react";

import Sidebar from "./Sidebar";
import ToolRail from "./ToolRail";
import Topbar from "./Topbar";
import ResizeHandle from "./ResizeHandle";
import FloatingPanel from "./FloatingPanel";

interface WorkspaceShellProps {
  children: ReactNode;
}

const DEFAULT_LAYOUT = {
  sidebarWidth: 250,
  inspectorWidth: 310,
  consoleHeight: 210,
  sidebarCollapsed: false,
  inspectorCollapsed: false,
  consoleCollapsed: false,
};

export default function WorkspaceShell({
  children,
}: WorkspaceShellProps) {

  const [sidebarWidth, setSidebarWidth] =
    useState(DEFAULT_LAYOUT.sidebarWidth);

  const [inspectorWidth, setInspectorWidth] =
    useState(DEFAULT_LAYOUT.inspectorWidth);

  const [consoleHeight, setConsoleHeight] =
    useState(DEFAULT_LAYOUT.consoleHeight);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [inspectorCollapsed, setInspectorCollapsed] =
    useState(false);

  const [consoleCollapsed, setConsoleCollapsed] =
    useState(false);

  const [activeTool, setActiveTool] =
    useState("overview");

  const [floatingInspector, setFloatingInspector] =
    useState(false);

  /*
   * Restore layout
   */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem("nexus-workspace-layout");

      if (!saved) return;

      const layout = JSON.parse(saved);

      setSidebarWidth(
        layout.sidebarWidth ??
          DEFAULT_LAYOUT.sidebarWidth
      );

      setInspectorWidth(
        layout.inspectorWidth ??
          DEFAULT_LAYOUT.inspectorWidth
      );

      setConsoleHeight(
        layout.consoleHeight ??
          DEFAULT_LAYOUT.consoleHeight
      );

      setSidebarCollapsed(
        layout.sidebarCollapsed ??
          DEFAULT_LAYOUT.sidebarCollapsed
      );

      setInspectorCollapsed(
        layout.inspectorCollapsed ??
          DEFAULT_LAYOUT.inspectorCollapsed
      );

      setConsoleCollapsed(
        layout.consoleCollapsed ??
          DEFAULT_LAYOUT.consoleCollapsed
      );
    } catch {
      // Ignore malformed local layout data.
    }
  }, []);

  /*
   * Persist layout
   */

  useEffect(() => {
    localStorage.setItem(
      "nexus-workspace-layout",
      JSON.stringify({
        sidebarWidth,
        inspectorWidth,
        consoleHeight,
        sidebarCollapsed,
        inspectorCollapsed,
        consoleCollapsed,
      })
    );
  }, [
    sidebarWidth,
    inspectorWidth,
    consoleHeight,
    sidebarCollapsed,
    inspectorCollapsed,
    consoleCollapsed,
  ]);

  /*
   * Keyboard shortcuts
   */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const modifier =
        event.metaKey || event.ctrlKey;

      if (!modifier) return;

      if (event.key === "b") {
        event.preventDefault();

        setSidebarCollapsed(
          (value) => !value
        );
      }

      if (event.key === "j") {
        event.preventDefault();

        setConsoleCollapsed(
          (value) => !value
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  return (
    <div className="nexus-workspace-shell">

      <ToolRail
        activeTool={activeTool}
        onSelect={setActiveTool}
      />

      <div className="nexus-application">

        <Topbar
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() =>
            setSidebarCollapsed(
              (value) => !value
            )
          }
          onToggleInspector={() =>
            setInspectorCollapsed(
              (value) => !value
            )
          }
          onToggleConsole={() =>
            setConsoleCollapsed(
              (value) => !value
            )
          }
        />

        <div className="nexus-workspace-body">

          {!sidebarCollapsed && (
            <>
              <Sidebar
                collapsed={sidebarCollapsed}
                width={sidebarWidth}
              />

              <ResizeHandle
                direction="horizontal"
                onResize={(delta) => {
                  setSidebarWidth(
                    (width) =>
                      Math.min(
                        380,
                        Math.max(
                          190,
                          width + delta
                        )
                      )
                  );
                }}
              />
            </>
          )}

          <main className="nexus-main-workspace">

            <div className="nexus-workspace-tabs">

              <div className="nexus-tab is-active">
                <span className="nexus-tab-dot" />
                Overview
                <button>×</button>
              </div>

              <button className="nexus-new-tab">
                +
              </button>

              <div className="nexus-tabs-spacer" />

              <button
                className="nexus-layout-button"
                onClick={() =>
                  setFloatingInspector(
                    true
                  )
                }
              >
                Float Inspector
              </button>

            </div>

            <div className="nexus-canvas">

              {children}

            </div>

            {!consoleCollapsed && (
              <>
                <ResizeHandle
                  direction="vertical"
                  onResize={(delta) => {
                    setConsoleHeight(
                      (height) =>
                        Math.min(
                          440,
                          Math.max(
                            120,
                            height - delta
                          )
                        )
                    );
                  }}
                />

                <section
                  className="nexus-console"
                  style={{
                    height: consoleHeight,
                  }}
                >

                  <div className="nexus-console-header">

                    <div className="nexus-console-tabs">

                      <button className="is-active">
                        Terminal
                      </button>

                      <button>
                        Requests
                      </button>

                      <button>
                        Events
                      </button>

                      <button>
                        Logs
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        setConsoleCollapsed(
                          true
                        )
                      }
                    >
                      −
                    </button>

                  </div>

                  <div className="nexus-console-content">

                    <div className="nexus-log-line">
                      <span>12:42:31</span>
                      <b>router</b>
                      <em>route.selected</em>
                      <code>
                        model=gpt-4.1
                      </code>
                    </div>

                    <div className="nexus-log-line">
                      <span>12:42:31</span>
                      <b>worker</b>
                      <em>request.started</em>
                      <code>
                        worker=us-east-02
                      </code>
                    </div>

                    <div className="nexus-log-line">
                      <span>12:42:31</span>
                      <b>cache</b>
                      <em>miss</em>
                      <code>
                        key=8f91...
                      </code>
                    </div>

                    <div className="nexus-log-line">
                      <span>12:42:31</span>
                      <b>model</b>
                      <em>response.complete</em>
                      <code>
                        latency=182ms
                      </code>
                    </div>

                  </div>

                </section>
              </>
            )}

          </main>

          {!inspectorCollapsed && (
            <>
              <ResizeHandle
                direction="horizontal"
                onResize={(delta) => {
                  setInspectorWidth(
                    (width) =>
                      Math.min(
                        480,
                        Math.max(
                          230,
                          width - delta
                        )
                      )
                  );
                }}
              />

              <aside
                className="nexus-inspector"
                style={{
                  width: inspectorWidth,
                }}
              >

                <div className="nexus-inspector-header">

                  <div>
                    <span>INSPECTOR</span>
                    <strong>Workspace</strong>
                  </div>

                  <div className="nexus-inspector-actions">
                    <button
                      onClick={() =>
                        setFloatingInspector(
                          true
                        )
                      }
                    >
                      ↗
                    </button>

                    <button
                      onClick={() =>
                        setInspectorCollapsed(
                          true
                        )
                      }
                    >
                      ×
                    </button>
                  </div>

                </div>

                <div className="nexus-inspector-content">

                  <div className="nexus-inspector-block">

                    <span className="nexus-inspector-label">
                      ENVIRONMENT
                    </span>

                    <div className="nexus-inspector-value">
                      <span className="nexus-status-dot" />
                      Production
                    </div>

                  </div>

                  <div className="nexus-inspector-block">

                    <span className="nexus-inspector-label">
                      REGION
                    </span>

                    <div className="nexus-inspector-value">
                      US East
                    </div>

                  </div>

                  <div className="nexus-inspector-block">

                    <span className="nexus-inspector-label">
                      ACTIVE ROUTE
                    </span>

                    <div className="nexus-inspector-code">
                      nexus-router/default
                    </div>

                  </div>

                  <div className="nexus-inspector-block">

                    <span className="nexus-inspector-label">
                      SYSTEM STATUS
                    </span>

                    <div className="nexus-health-row">
                      <span className="nexus-status-dot" />
                      All systems operational
                    </div>
                  </div>

                </div>

              </aside>
            </>
          )}

        </div>

      </div>

      {floatingInspector && (
        <FloatingPanel
          title="Inspector"
          onClose={() =>
            setFloatingInspector(
              false
            )
          }
        >
          <div className="nexus-floating-section">
            <span>ENVIRONMENT</span>
            <strong>Production</strong>
          </div>

          <div className="nexus-floating-section">
            <span>ROUTER</span>
            <strong>
              nexus-router/default
            </strong>
          </div>

          <div className="nexus-floating-section">
            <span>LATENCY</span>
            <strong>182ms P95</strong>
          </div>
        </FloatingPanel>
      )}

    </div>
  );
}