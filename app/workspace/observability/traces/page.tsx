"use client";

import { useMemo, useState } from "react";

type TraceStatus = "Success" | "Error" | "Running";

type Trace = {
  id: string;
  operation: string;
  model: string;
  region: string;
  duration: number;
  status: TraceStatus;
  timestamp: string;
  tokens: string;
  cost: string;
};

type Span = {
  id: string;
  name: string;
  service: string;
  start: number;
  duration: number;
  status: "success" | "error";
  detail: string;
};

const traces: Trace[] = [
  {
    id: "tr_8f3a91c2",
    operation: "chat.completions",
    model: "GPT-4.1",
    region: "US-EAST",
    duration: 184,
    status: "Success",
    timestamp: "18:42:31.842",
    tokens: "1,842",
    cost: "$0.018",
  },
  {
    id: "tr_71b92ae4",
    operation: "responses.create",
    model: "Claude Sonnet 4",
    region: "EU-WEST",
    duration: 247,
    status: "Success",
    timestamp: "18:42:29.174",
    tokens: "2,314",
    cost: "$0.021",
  },
  {
    id: "tr_c31e82fa",
    operation: "chat.completions",
    model: "DeepSeek V3",
    region: "US-EAST",
    duration: 119,
    status: "Success",
    timestamp: "18:42:26.731",
    tokens: "1,104",
    cost: "$0.008",
  },
  {
    id: "tr_44a12d90",
    operation: "chat.completions",
    model: "Llama 4 Maverick",
    region: "US-WEST",
    duration: 382,
    status: "Error",
    timestamp: "18:42:24.118",
    tokens: "982",
    cost: "$0.011",
  },
  {
    id: "tr_a91c772e",
    operation: "responses.create",
    model: "GPT-4.1",
    region: "US-EAST",
    duration: 161,
    status: "Success",
    timestamp: "18:42:20.552",
    tokens: "1,673",
    cost: "$0.016",
  },
  {
    id: "tr_62d8e1bc",
    operation: "chat.completions",
    model: "Claude Sonnet 4",
    region: "EU-WEST",
    duration: 219,
    status: "Success",
    timestamp: "18:42:18.927",
    tokens: "1,927",
    cost: "$0.019",
  },
  {
    id: "tr_b41f93de",
    operation: "chat.completions",
    model: "DeepSeek V3",
    region: "US-EAST",
    duration: 143,
    status: "Success",
    timestamp: "18:42:15.341",
    tokens: "1,241",
    cost: "$0.009",
  },
  {
    id: "tr_92d7aa61",
    operation: "responses.create",
    model: "GPT-4.1",
    region: "US-EAST",
    duration: 194,
    status: "Running",
    timestamp: "18:42:12.804",
    tokens: "—",
    cost: "—",
  },
];

const spans: Span[] = [
  {
    id: "sp_001",
    name: "HTTP Request",
    service: "api-gateway",
    start: 0,
    duration: 18,
    status: "success",
    detail: "POST /v1/chat/completions",
  },
  {
    id: "sp_002",
    name: "Authentication",
    service: "auth-service",
    start: 18,
    duration: 9,
    status: "success",
    detail: "API key validated",
  },
  {
    id: "sp_003",
    name: "Cache Lookup",
    service: "cache",
    start: 29,
    duration: 13,
    status: "success",
    detail: "Cache miss · prod-gpt41",
  },
  {
    id: "sp_004",
    name: "Route Resolution",
    service: "nexus-router",
    start: 42,
    duration: 21,
    status: "success",
    detail: "Policy: balanced",
  },
  {
    id: "sp_005",
    name: "Model Inference",
    service: "worker-h100-07",
    start: 63,
    duration: 96,
    status: "success",
    detail: "GPT-4.1 · 1,842 tokens",
  },
  {
    id: "sp_006",
    name: "Cache Write",
    service: "cache",
    start: 159,
    duration: 11,
    status: "success",
    detail: "Stored response · TTL 30m",
  },
  {
    id: "sp_007",
    name: "HTTP Response",
    service: "api-gateway",
    start: 170,
    duration: 14,
    status: "success",
    detail: "200 OK",
  },
];

const traceFilters = ["All", "Success", "Error", "Running"];

export default function TracesPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(traces[0].id);

  const filteredTraces = useMemo(() => {
    return traces.filter((trace) => {
      const matchesFilter =
        filter === "All" || trace.status === filter;

      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        trace.id.toLowerCase().includes(query) ||
        trace.operation.toLowerCase().includes(query) ||
        trace.model.toLowerCase().includes(query) ||
        trace.region.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const selectedTrace =
    traces.find((trace) => trace.id === selectedId) ?? traces[0];

  return (
    <div className="traces-page">
      {/* HEADER */}
      <header className="traces-header">
        <div>
          <div className="traces-eyebrow">
            <span className="traces-eyebrow-dot" />
            OBSERVABILITY / TRACES
          </div>

          <h1>Traces</h1>

          <p>
            Inspect individual inference requests and follow their execution
            across the Nexus control plane.
          </p>
        </div>

        <div className="traces-header-actions">
          <div className="traces-time-range">
            <button type="button">15m</button>
            <button type="button">1h</button>
            <button type="button" className="active">
              24h
            </button>
            <button type="button">7d</button>
          </div>

          <button type="button" className="traces-action-button">
            Export
          </button>

          <button
            type="button"
            className="traces-refresh-button"
            aria-label="Refresh traces"
          >
            ↻
          </button>
        </div>
      </header>

      {/* SUMMARY */}
      <section className="traces-summary">
        <TraceStat
          label="Traces"
          value="1.28M"
          detail="+8.2% from previous period"
        />

        <TraceStat
          label="Error Rate"
          value="0.03%"
          detail="1,284 failed traces"
          positive
        />

        <TraceStat
          label="Average Duration"
          value="164ms"
          detail="-7.1% from previous period"
          positive
        />

        <TraceStat
          label="Active Spans"
          value="18,421"
          detail="Across 42 workers"
        />
      </section>

      {/* TRACE EXPLORER */}
      <section className="traces-panel traces-explorer">
        <div className="traces-panel-header">
          <div>
            <span className="traces-panel-kicker">TRACE EXPLORER</span>
            <h2>Recent traces</h2>
          </div>

          <span className="traces-count">
            {filteredTraces.length} traces
          </span>
        </div>

        <div className="traces-toolbar">
          <div className="traces-search">
            <span>⌕</span>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search trace ID, model, operation..."
            />

            <kbd>⌘ K</kbd>
          </div>

          <div className="traces-filter-group">
            {traceFilters.map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="traces-table-wrap">
          <table className="traces-table">
            <thead>
              <tr>
                <th>TRACE</th>
                <th>OPERATION</th>
                <th>MODEL</th>
                <th>REGION</th>
                <th>DURATION</th>
                <th>STATUS</th>
                <th>TIME</th>
              </tr>
            </thead>

            <tbody>
              {filteredTraces.map((trace) => (
                <tr
                  key={trace.id}
                  className={
                    selectedId === trace.id ? "selected" : ""
                  }
                  onClick={() => setSelectedId(trace.id)}
                >
                  <td>
                    <div className="trace-id-cell">
                      <span className="trace-row-icon">⌁</span>
                      <span>{trace.id}</span>
                    </div>
                  </td>

                  <td>
                    <span className="trace-operation">
                      {trace.operation}
                    </span>
                  </td>

                  <td>
                    <span className="trace-model">
                      {trace.model}
                    </span>
                  </td>

                  <td>{trace.region}</td>

                  <td>
                    <span
                      className={
                        trace.duration > 300
                          ? "duration-warning"
                          : ""
                      }
                    >
                      {trace.duration}ms
                    </span>
                  </td>

                  <td>
                    <TraceStatus status={trace.status} />
                  </td>

                  <td>{trace.timestamp}</td>
                </tr>
              ))}

              {filteredTraces.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="traces-empty">
                      No traces match the current filters.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SELECTED TRACE */}
      <section className="traces-detail">
        <div className="traces-panel traces-detail-main">
          <div className="traces-detail-header">
            <div>
              <span className="traces-panel-kicker">
                SELECTED TRACE
              </span>

              <div className="traces-detail-title">
                <h2>{selectedTrace.id}</h2>
                <TraceStatus status={selectedTrace.status} />
              </div>

              <p>
                {selectedTrace.operation} · {selectedTrace.model} ·{" "}
                {selectedTrace.region}
              </p>
            </div>

            <button type="button" className="traces-copy-button">
              Copy trace ID
            </button>
          </div>

          <div className="traces-metadata">
            <TraceMeta
              label="Duration"
              value={`${selectedTrace.duration}ms`}
            />

            <TraceMeta
              label="Model"
              value={selectedTrace.model}
            />

            <TraceMeta
              label="Tokens"
              value={selectedTrace.tokens}
            />

            <TraceMeta
              label="Cost"
              value={selectedTrace.cost}
            />

            <TraceMeta
              label="Region"
              value={selectedTrace.region}
            />
          </div>

          {/* TIMELINE */}
          <div className="trace-timeline-header">
            <div>
              <span className="traces-panel-kicker">
                EXECUTION TIMELINE
              </span>
              <h3>Request lifecycle</h3>
            </div>

            <span>0ms — {selectedTrace.duration}ms</span>
          </div>

          <div className="trace-timeline">
            <div className="trace-timeline-axis">
              <span>0ms</span>
              <span>50ms</span>
              <span>100ms</span>
              <span>150ms</span>
              <span>200ms</span>
            </div>

            <div className="trace-span-list">
              {spans.map((span) => {
                const left = `${(span.start / 200) * 100}%`;
                const width = `${Math.max(
                  3,
                  (span.duration / 200) * 100
                )}%`;

                return (
                  <div className="trace-span-row" key={span.id}>
                    <div className="trace-span-info">
                      <span
                        className={`trace-span-status ${
                          span.status === "error"
                            ? "error"
                            : ""
                        }`}
                      />

                      <div>
                        <strong>{span.name}</strong>
                        <span>{span.service}</span>
                      </div>
                    </div>

                    <div className="trace-span-track">
                      <div
                        className={`trace-span-bar ${
                          span.status === "error"
                            ? "error"
                            : ""
                        }`}
                        style={{
                          left,
                          width,
                        }}
                        title={`${span.name} · ${span.duration}ms`}
                      />
                    </div>

                    <span className="trace-span-duration">
                      {span.duration}ms
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SPAN DETAILS */}
        <aside className="traces-panel traces-span-panel">
          <div className="traces-panel-header">
            <div>
              <span className="traces-panel-kicker">
                TRACE DETAILS
              </span>
              <h2>Request context</h2>
            </div>
          </div>

          <div className="trace-detail-section">
            <span className="trace-detail-label">TRACE ID</span>
            <strong>{selectedTrace.id}</strong>
          </div>

          <div className="trace-detail-section">
            <span className="trace-detail-label">OPERATION</span>
            <strong>{selectedTrace.operation}</strong>
          </div>

          <div className="trace-detail-section">
            <span className="trace-detail-label">TIMESTAMP</span>
            <strong>2026-09-18 {selectedTrace.timestamp}</strong>
          </div>

          <div className="trace-detail-section">
            <span className="trace-detail-label">ROUTING POLICY</span>
            <strong>Balanced</strong>
          </div>

          <div className="trace-detail-section">
            <span className="trace-detail-label">WORKER</span>
            <strong>worker-h100-07</strong>
          </div>

          <div className="trace-detail-section">
            <span className="trace-detail-label">CACHE</span>
            <strong>prod-gpt41</strong>
          </div>

          <div className="trace-detail-section">
            <span className="trace-detail-label">HTTP STATUS</span>

            <strong className="trace-http-success">
              {selectedTrace.status === "Error" ? "500" : "200"}
            </strong>
          </div>

          <div className="trace-detail-section trace-detail-code">
            <span className="trace-detail-label">
              REQUEST ATTRIBUTES
            </span>

            <pre>{`{
  "environment": "production",
  "region": "${selectedTrace.region.toLowerCase()}",
  "stream": true,
  "temperature": 0.7,
  "max_tokens": 2048
}`}</pre>
          </div>
        </aside>
      </section>
    </div>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function TraceStat({
  label,
  value,
  detail,
  positive = false,
}: {
  label: string;
  value: string;
  detail: string;
  positive?: boolean;
}) {
  return (
    <div className="trace-stat">
      <span className="trace-stat-label">{label}</span>

      <strong>{value}</strong>

      <span
        className={`trace-stat-detail ${
          positive ? "positive" : ""
        }`}
      >
        {detail}
      </span>
    </div>
  );
}

function TraceStatus({
  status,
}: {
  status: TraceStatus;
}) {
  return (
    <span
      className={`trace-status trace-status-${status.toLowerCase()}`}
    >
      <i />
      {status}
    </span>
  );
}

function TraceMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="trace-meta">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}   