"use client";

import { useMemo, useState } from "react";

type MetricPoint = {
  time: string;
  requests: number;
  latency: number;
  errors: number;
};

type ModelMetric = {
  model: string;
  provider: string;
  requests: string;
  p50: string;
  p95: string;
  success: string;
  tokens: string;
  cost: string;
  trend: number;
};

type RegionMetric = {
  region: string;
  requests: string;
  percentage: number;
  latency: string;
  status: "Healthy" | "Degraded";
};

const metricData: MetricPoint[] = [
  { time: "00:00", requests: 38, latency: 161, errors: 1 },
  { time: "02:00", requests: 44, latency: 169, errors: 1 },
  { time: "04:00", requests: 31, latency: 154, errors: 0 },
  { time: "06:00", requests: 52, latency: 177, errors: 1 },
  { time: "08:00", requests: 68, latency: 184, errors: 2 },
  { time: "10:00", requests: 74, latency: 191, errors: 2 },
  { time: "12:00", requests: 89, latency: 198, errors: 3 },
  { time: "14:00", requests: 94, latency: 205, errors: 2 },
  { time: "16:00", requests: 101, latency: 212, errors: 2 },
  { time: "18:00", requests: 96, latency: 207, errors: 1 },
  { time: "20:00", requests: 84, latency: 194, errors: 2 },
  { time: "22:00", requests: 71, latency: 182, errors: 1 },
];

const modelMetrics: ModelMetric[] = [
  {
    model: "GPT-4.1",
    provider: "OpenAI",
    requests: "482.4K",
    p50: "142ms",
    p95: "231ms",
    success: "99.98%",
    tokens: "18.4M",
    cost: "$96.42",
    trend: 8.4,
  },
  {
    model: "Claude Sonnet 4",
    provider: "Anthropic",
    requests: "361.8K",
    p50: "158ms",
    p95: "248ms",
    success: "99.96%",
    tokens: "14.7M",
    cost: "$81.26",
    trend: 4.8,
  },
  {
    model: "DeepSeek V3",
    provider: "DeepSeek",
    requests: "287.2K",
    p50: "119ms",
    p95: "198ms",
    success: "99.94%",
    tokens: "11.9M",
    cost: "$42.18",
    trend: 12.7,
  },
  {
    model: "Llama 4 Maverick",
    provider: "Meta",
    requests: "148.6K",
    p50: "131ms",
    p95: "219ms",
    success: "99.91%",
    tokens: "6.2M",
    cost: "$24.61",
    trend: -2.1,
  },
];

const regionMetrics: RegionMetric[] = [
  {
    region: "US-EAST",
    requests: "812.4K",
    percentage: 63,
    latency: "176ms",
    status: "Healthy",
  },
  {
    region: "EU-WEST",
    requests: "321.8K",
    percentage: 25,
    latency: "188ms",
    status: "Healthy",
  },
  {
    region: "AP-SOUTH",
    requests: "102.6K",
    percentage: 8,
    latency: "211ms",
    status: "Healthy",
  },
  {
    region: "US-WEST",
    requests: "43.2K",
    percentage: 4,
    latency: "194ms",
    status: "Degraded",
  },
];

const latencyBuckets = [
  { label: "<100ms", value: 18 },
  { label: "100–150ms", value: 31 },
  { label: "150–200ms", value: 27 },
  { label: "200–300ms", value: 17 },
  { label: "300ms+", value: 7 },
];

export default function MetricsPage() {
  const [range, setRange] = useState("24h");
  const [metric, setMetric] = useState<"requests" | "latency">("requests");

  const maxValue = useMemo(() => {
    return Math.max(
      ...metricData.map((item) =>
        metric === "requests" ? item.requests : item.latency
      )
    );
  }, [metric]);

  const totalRequests = "1.28M";
  const throughput = "14.8K";
  const p95Latency = "182ms";
  const errorRate = "0.03%";
  const tokenUsage = "51.2M";

  return (
    <div className="metrics-page">
      {/* HEADER */}
      <header className="metrics-header">
        <div>
          <div className="metrics-eyebrow">
            <span className="metrics-eyebrow-dot" />
            OBSERVABILITY / METRICS
          </div>

          <h1>Metrics</h1>

          <p>
            Monitor inference traffic, latency, reliability, and resource
            consumption across your Nexus deployment.
          </p>
        </div>

        <div className="metrics-header-actions">
          <div className="metrics-range">
            {["1h", "6h", "24h", "7d", "30d"].map((item) => (
              <button
                key={item}
                type="button"
                className={range === item ? "active" : ""}
                onClick={() => setRange(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <button type="button" className="metrics-filter-button">
            <span>⌁</span>
            Filters
          </button>

          <button type="button" className="metrics-refresh">
            ↻
          </button>
        </div>
      </header>

      {/* KPI GRID */}
      <section className="metrics-kpis">
        <MetricCard
          label="Total Requests"
          value={totalRequests}
          change="+8.2%"
          detail="vs previous period"
        />

        <MetricCard
          label="Throughput"
          value={throughput}
          suffix=" req/min"
          change="+12.4%"
          detail="peak 18.9K req/min"
        />

        <MetricCard
          label="P95 Latency"
          value={p95Latency}
          change="-6.8%"
          detail="vs previous period"
          positive
        />

        <MetricCard
          label="Error Rate"
          value={errorRate}
          change="-0.01%"
          detail="1,284 failed requests"
          positive
        />

        <MetricCard
          label="Token Usage"
          value={tokenUsage}
          change="+5.7%"
          detail="input + output tokens"
        />
      </section>

      {/* MAIN CHART */}
      <section className="metrics-panel metrics-traffic-panel">
        <div className="metrics-panel-header">
          <div>
            <span className="metrics-panel-kicker">TRAFFIC</span>
            <h2>Inference activity</h2>
            <p>Requests processed by the Nexus inference layer.</p>
          </div>

          <div className="metrics-chart-controls">
            <button
              type="button"
              className={metric === "requests" ? "active" : ""}
              onClick={() => setMetric("requests")}
            >
              Requests
            </button>

            <button
              type="button"
              className={metric === "latency" ? "active" : ""}
              onClick={() => setMetric("latency")}
            >
              Latency
            </button>
          </div>
        </div>

        <div className="metrics-chart">
          <div className="metrics-y-axis">
            <span>{metric === "requests" ? "120K" : "250ms"}</span>
            <span>{metric === "requests" ? "90K" : "200ms"}</span>
            <span>{metric === "requests" ? "60K" : "150ms"}</span>
            <span>{metric === "requests" ? "30K" : "100ms"}</span>
            <span>0</span>
          </div>

          <div className="metrics-chart-area">
            <div className="metrics-grid-lines">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="metrics-bars">
              {metricData.map((item) => {
                const value =
                  metric === "requests" ? item.requests : item.latency;

                const height = Math.max(8, (value / maxValue) * 100);

                return (
                  <div className="metrics-bar-column" key={item.time}>
                    <div
                      className="metrics-bar"
                      style={{ height: `${height}%` }}
                      title={`${item.time}: ${value}${
                        metric === "requests" ? "K requests" : "ms"
                      }`}
                    />

                    <span>{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="metrics-chart-footer">
          <div>
            <span className="metrics-legend-dot" />
            <span>
              {metric === "requests"
                ? "Requests / 2 hour interval"
                : "Average latency"}
            </span>
          </div>

          <span>Last updated 18 seconds ago</span>
        </div>
      </section>

      {/* SECONDARY GRID */}
      <div className="metrics-two-column">
        {/* LATENCY DISTRIBUTION */}
        <section className="metrics-panel">
          <div className="metrics-panel-header compact">
            <div>
              <span className="metrics-panel-kicker">LATENCY</span>
              <h2>Response distribution</h2>
              <p>Percentage of requests by response time.</p>
            </div>

            <span className="metrics-live-badge">
              <i />
              LIVE
            </span>
          </div>

          <div className="latency-distribution">
            {latencyBuckets.map((bucket) => (
              <div className="latency-row" key={bucket.label}>
                <div className="latency-label">
                  <span>{bucket.label}</span>
                  <strong>{bucket.value}%</strong>
                </div>

                <div className="latency-track">
                  <div
                    className="latency-fill"
                    style={{ width: `${bucket.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="latency-summary">
            <div>
              <span>p50</span>
              <strong>142ms</strong>
            </div>
            <div>
              <span>p90</span>
              <strong>176ms</strong>
            </div>
            <div>
              <span>p95</span>
              <strong>182ms</strong>
            </div>
            <div>
              <span>p99</span>
              <strong>241ms</strong>
            </div>
          </div>
        </section>

        {/* RELIABILITY */}
        <section className="metrics-panel">
          <div className="metrics-panel-header compact">
            <div>
              <span className="metrics-panel-kicker">RELIABILITY</span>
              <h2>Request health</h2>
              <p>Successful versus failed inference requests.</p>
            </div>
          </div>

          <div className="reliability-content">
            <div className="reliability-ring">
              <div className="reliability-ring-inner">
                <strong>99.97%</strong>
                <span>success</span>
              </div>
            </div>

            <div className="reliability-breakdown">
              <div className="reliability-item">
                <span className="reliability-indicator success" />
                <div>
                  <strong>1.279M</strong>
                  <span>Successful</span>
                </div>
                <em>99.97%</em>
              </div>

              <div className="reliability-item">
                <span className="reliability-indicator error" />
                <div>
                  <strong>1,284</strong>
                  <span>Errors</span>
                </div>
                <em>0.03%</em>
              </div>

              <div className="reliability-item">
                <span className="reliability-indicator retry" />
                <div>
                  <strong>3,814</strong>
                  <span>Retries</span>
                </div>
                <em>0.29%</em>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MODEL PERFORMANCE */}
      <section className="metrics-panel metrics-model-panel">
        <div className="metrics-panel-header">
          <div>
            <span className="metrics-panel-kicker">INFERENCE</span>
            <h2>Model performance</h2>
            <p>
              Performance metrics aggregated across all active model routes.
            </p>
          </div>

          <button type="button" className="metrics-view-button">
            View models →
          </button>
        </div>

        <div className="metrics-table-wrap">
          <table className="metrics-table">
            <thead>
              <tr>
                <th>MODEL</th>
                <th>REQUESTS</th>
                <th>P50</th>
                <th>P95</th>
                <th>SUCCESS</th>
                <th>TOKENS</th>
                <th>COST</th>
                <th>TREND</th>
              </tr>
            </thead>

            <tbody>
              {modelMetrics.map((model) => (
                <tr key={model.model}>
                  <td>
                    <div className="model-cell">
                      <div className="model-icon">
                        {model.model
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div>
                        <strong>{model.model}</strong>
                        <span>{model.provider}</span>
                      </div>
                    </div>
                  </td>

                  <td>{model.requests}</td>
                  <td>{model.p50}</td>
                  <td>{model.p95}</td>

                  <td>
                    <span className="success-value">{model.success}</span>
                  </td>

                  <td>{model.tokens}</td>
                  <td>{model.cost}</td>

                  <td>
                    <span
                      className={`trend-value ${
                        model.trend >= 0 ? "up" : "down"
                      }`}
                    >
                      {model.trend >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(model.trend).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* BOTTOM GRID */}
      <div className="metrics-bottom-grid">
        {/* REGIONS */}
        <section className="metrics-panel">
          <div className="metrics-panel-header compact">
            <div>
              <span className="metrics-panel-kicker">DISTRIBUTION</span>
              <h2>Regional traffic</h2>
              <p>Requests distributed across active regions.</p>
            </div>
          </div>

          <div className="region-list">
            {regionMetrics.map((region) => (
              <div className="region-row" key={region.region}>
                <div className="region-main">
                  <div className="region-name">
                    <span className="region-status" />
                    <strong>{region.region}</strong>
                  </div>

                  <span>{region.requests} requests</span>
                </div>

                <div className="region-bar">
                  <div
                    className="region-bar-fill"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>

                <div className="region-meta">
                  <strong>{region.percentage}%</strong>
                  <span>{region.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SYSTEM HEALTH */}
        <section className="metrics-panel">
          <div className="metrics-panel-header compact">
            <div>
              <span className="metrics-panel-kicker">SYSTEM</span>
              <h2>Infrastructure health</h2>
              <p>Current state of the inference control plane.</p>
            </div>
          </div>

          <div className="system-health">
            <HealthRow
              label="Router"
              value="Healthy"
              detail="99.99% uptime"
            />

            <HealthRow
              label="Worker pool"
              value="Healthy"
              detail="72% capacity"
            />

            <HealthRow
              label="Cache"
              value="Healthy"
              detail="91.8% hit rate"
            />

            <HealthRow
              label="US-WEST"
              value="Degraded"
              detail="Elevated latency"
              degraded
            />

            <HealthRow
              label="Database"
              value="Healthy"
              detail="18ms p95"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  suffix,
  change,
  detail,
  positive = false,
}: {
  label: string;
  value: string;
  suffix?: string;
  change: string;
  detail: string;
  positive?: boolean;
}) {
  return (
    <div className="metrics-kpi">
      <div className="metrics-kpi-top">
        <span>{label}</span>
        <button type="button" aria-label={`More information about ${label}`}>
          ···
        </button>
      </div>

      <div className="metrics-kpi-value">
        {value}
        {suffix && <small>{suffix}</small>}
      </div>

      <div className="metrics-kpi-bottom">
        <span className={positive ? "positive" : ""}>{change}</span>
        <em>{detail}</em>
      </div>
    </div>
  );
}

function HealthRow({
  label,
  value,
  detail,
  degraded = false,
}: {
  label: string;
  value: string;
  detail: string;
  degraded?: boolean;
}) {
  return (
    <div className="health-row">
      <div className="health-row-left">
        <span className={`health-dot ${degraded ? "degraded" : ""}`} />
        <strong>{label}</strong>
      </div>

      <span className={`health-status ${degraded ? "degraded" : ""}`}>
        {value}
      </span>

      <span className="health-detail">{detail}</span>
    </div>
  );
}