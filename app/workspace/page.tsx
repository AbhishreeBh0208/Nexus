"use client";

import Link from "next/link";

/* -------------------------------------------------------------------------- */
/* ICONS                                                                      */
/* -------------------------------------------------------------------------- */

function ArrowUp() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M6.5 10V3M6.5 3L3.5 6M6.5 3L9.5 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M6.5 3V10M6.5 10L3.5 7M6.5 10L9.5 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 8H4L5.5 4L8.2 12L10 7L11.5 9H14.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="2"
        width="12"
        height="4"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="2"
        y="10"
        width="12"
        height="4"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="4.5" cy="4" r=".7" fill="currentColor" />
      <circle cx="4.5" cy="12" r=".7" fill="currentColor" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle
        cx="3"
        cy="8"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="13"
        cy="4"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="13"
        cy="12"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4.5 8H7C9 8 9 4 11.5 4M7 8C9 8 9 12 11.5 12"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* METRIC CARD                                                                */
/* -------------------------------------------------------------------------- */

function MetricCard({
  label,
  value,
  change,
  direction = "up",
  neutral = false,
}: {
  label: string;
  value: string;
  change: string;
  direction?: "up" | "down";
  neutral?: boolean;
}) {
  return (
    <div className="overview-metric">
      <div className="overview-metric-top">
        <span>{label}</span>
        <span className="overview-metric-icon">
          {label === "TOTAL REQUESTS" && <ActivityIcon />}
          {label === "SUCCESS RATE" && <span className="metric-check">✓</span>}
          {label === "P95 LATENCY" && <span className="metric-clock">◷</span>}
          {label === "EST. COST" && <span className="metric-dollar">$</span>}
        </span>
      </div>

      <strong>{value}</strong>

      <div
        className={`overview-metric-change ${
          neutral
            ? "is-neutral"
            : direction === "down"
              ? "is-down"
              : "is-up"
        }`}
      >
        {!neutral &&
          (direction === "down" ? <ArrowDown /> : <ArrowUp />)}
        <span>{change}</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* REQUEST CHART                                                               */
/* -------------------------------------------------------------------------- */

function RequestChart() {
  const bars = [
    35, 44, 38, 52, 48, 63, 57, 72, 66, 78, 69, 84, 74, 91, 82, 88,
    73, 79, 68, 86, 76, 94, 83, 97, 87, 92, 78, 89, 82, 96, 88, 100,
  ];

  return (
    <div className="overview-chart">
      <div className="chart-y-axis">
        <span>100K</span>
        <span>75K</span>
        <span>50K</span>
        <span>25K</span>
        <span>0</span>
      </div>

      <div className="chart-main">
        <div className="chart-grid-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="chart-bars">
          {bars.map((height, index) => (
            <div
              className="chart-bar"
              key={index}
              style={{ height: `${height}%` }}
            >
              <i />
            </div>
          ))}
        </div>

        <div className="chart-x-axis">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MODEL TABLE                                                                 */
/* -------------------------------------------------------------------------- */

const models = [
  {
    name: "GPT-4.1",
    provider: "OpenAI",
    requests: "482K",
    latency: "182ms",
    success: "99.99%",
    status: "Healthy",
  },
  {
    name: "Claude Sonnet",
    provider: "Anthropic",
    requests: "341K",
    latency: "214ms",
    success: "99.97%",
    status: "Healthy",
  },
  {
    name: "DeepSeek V3",
    provider: "DeepSeek",
    requests: "276K",
    latency: "164ms",
    success: "99.95%",
    status: "Healthy",
  },
  {
    name: "Llama 4",
    provider: "Meta",
    requests: "181K",
    latency: "193ms",
    success: "99.91%",
    status: "Healthy",
  },
];

/* -------------------------------------------------------------------------- */
/* OVERVIEW                                                                    */
/* -------------------------------------------------------------------------- */

export default function WorkspaceOverview() {
  return (
    <div className="overview-page">
      {/* HEADER ------------------------------------------------------------- */}

      <header className="overview-header">
        <div>
          <div className="overview-eyebrow">
            <span className="overview-eyebrow-dot" />
            WORKSPACE
          </div>

          <h1>Overview</h1>

          <p>
            Monitor your AI infrastructure and execution layer.
          </p>
        </div>

        <div className="overview-header-actions">
          <button className="overview-select">
            <span>Last 24 hours</span>
            <span>⌄</span>
          </button>

          <Link
            href="/workspace/playground"
            className="overview-primary-button"
          >
            Open Playground
            <span>↗</span>
          </Link>
        </div>
      </header>

      {/* METRICS ------------------------------------------------------------ */}

      <section className="overview-metrics">
        <MetricCard
          label="TOTAL REQUESTS"
          value="1.28M"
          change="18.2% vs previous period"
        />

        <MetricCard
          label="SUCCESS RATE"
          value="99.97%"
          change="0.04% vs previous period"
        />

        <MetricCard
          label="P95 LATENCY"
          value="182ms"
          change="12ms vs previous period"
          direction="down"
        />

        <MetricCard
          label="EST. COST"
          value="$284.31"
          change="7.8% vs previous period"
        />
      </section>

      {/* TRAFFIC + ROUTING ------------------------------------------------- */}

      <section className="overview-main-grid">
        <div className="overview-panel overview-traffic-panel">
          <div className="overview-panel-header">
            <div>
              <span className="overview-panel-kicker">
                REQUEST VOLUME
              </span>
              <h2>Inference traffic</h2>
            </div>

            <div className="overview-live">
              <span />
              LIVE
            </div>
          </div>

          <div className="overview-chart-summary">
            <strong>52.4K</strong>
            <span>requests / hour</span>
          </div>

          <RequestChart />
        </div>

        <div className="overview-panel routing-panel">
          <div className="overview-panel-header">
            <div>
              <span className="overview-panel-kicker">
                ROUTING
              </span>
              <h2>Current execution</h2>
            </div>

            <Link href="/workspace/routing" className="overview-panel-link">
              View routing →
            </Link>
          </div>

          <div className="routing-flow">
            <div className="routing-node">
              <div className="routing-node-icon">
                <RouteIcon />
              </div>

              <div>
                <span>REQUEST</span>
                <strong>Application API</strong>
              </div>
            </div>

            <div className="routing-connector">
              <span />
            </div>

            <div className="routing-node routing-node-active">
              <div className="routing-node-icon">
                <RouteIcon />
              </div>

              <div>
                <span>NEXUS ROUTER</span>
                <strong>Balanced policy</strong>
              </div>

              <b>2.8ms</b>
            </div>

            <div className="routing-connector">
              <span />
            </div>

            <div className="routing-node">
              <div className="routing-node-icon">
                <ServerIcon />
              </div>

              <div>
                <span>EXECUTION</span>
                <strong>GPT-4.1 · H100</strong>
              </div>
            </div>
          </div>

          <div className="routing-stats">
            <div>
              <span>REGION</span>
              <strong>US-EAST</strong>
            </div>

            <div>
              <span>CAPACITY</span>
              <strong>72%</strong>
            </div>

            <div>
              <span>HEALTH</span>
              <strong className="status-good">
                <i />
                Healthy
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* MODELS ------------------------------------------------------------- */}

      <section className="overview-panel models-panel">
        <div className="overview-panel-header">
          <div>
            <span className="overview-panel-kicker">
              INFERENCE
            </span>
            <h2>Model performance</h2>
          </div>

          <Link href="/workspace/models" className="overview-panel-link">
            View models →
          </Link>
        </div>

        <div className="models-table">
          <div className="models-table-head">
            <span>MODEL</span>
            <span>REQUESTS</span>
            <span>P95 LATENCY</span>
            <span>SUCCESS</span>
            <span>STATUS</span>
          </div>

          {models.map((model) => (
            <div className="models-table-row" key={model.name}>
              <div className="model-name">
                <div className="model-avatar">
                  {model.name.charAt(0)}
                </div>

                <div>
                  <strong>{model.name}</strong>
                  <span>{model.provider}</span>
                </div>
              </div>

              <span>{model.requests}</span>
              <span>{model.latency}</span>
              <span className="success-value">{model.success}</span>

              <span className="model-status">
                <i />
                {model.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM STATUS ----------------------------------------------------- */}

      <section className="overview-bottom-grid">
        <div className="overview-status-card">
          <div className="status-card-icon">
            <ActivityIcon />
          </div>

          <div>
            <span>SYSTEM STATUS</span>
            <strong>All systems operational</strong>
          </div>

          <i className="system-status-dot" />
        </div>

        <div className="overview-status-card">
          <div className="status-card-icon">
            <ServerIcon />
          </div>

          <div>
            <span>WORKERS</span>
            <strong>24 / 24 healthy</strong>
          </div>

          <Link href="/workspace/workers">View →</Link>
        </div>

        <div className="overview-status-card">
          <div className="status-card-icon">
            <RouteIcon />
          </div>

          <div>
            <span>ROUTING POLICY</span>
            <strong>Balanced</strong>
          </div>

          <Link href="/workspace/routing">Configure →</Link>
        </div>
      </section>
    </div>
  );
}