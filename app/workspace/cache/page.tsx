"use client";

import { useMemo, useState } from "react";

type CacheStatus = "Healthy" | "Warming" | "Pressure";

type CacheNamespace = {
  id: string;
  name: string;
  model: string;
  region: string;
  entries: string;
  hitRate: number;
  memory: number;
  ttl: string;
  evictions: string;
  status: CacheStatus;
};

type CacheEvent = {
  time: string;
  request: string;
  namespace: string;
  type: "HIT" | "MISS" | "WRITE" | "EVICTION";
  tokens: string;
  latency: string;
};

const namespaces: CacheNamespace[] = [
  {
    id: "prod-gpt41",
    name: "prod-gpt41",
    model: "GPT-4.1",
    region: "US-EAST",
    entries: "2.84M",
    hitRate: 91.8,
    memory: 68,
    ttl: "30 min",
    evictions: "18.2K",
    status: "Healthy",
  },
  {
    id: "prod-claude",
    name: "prod-claude",
    model: "Claude Sonnet 4",
    region: "US-EAST",
    entries: "1.92M",
    hitRate: 88.4,
    memory: 61,
    ttl: "30 min",
    evictions: "12.7K",
    status: "Healthy",
  },
  {
    id: "prod-deepseek",
    name: "prod-deepseek",
    model: "DeepSeek V3",
    region: "US-EAST",
    entries: "1.47M",
    hitRate: 94.2,
    memory: 74,
    ttl: "20 min",
    evictions: "21.4K",
    status: "Healthy",
  },
  {
    id: "prod-llama",
    name: "prod-llama",
    model: "Llama 4 Maverick",
    region: "US-EAST",
    entries: "884K",
    hitRate: 79.1,
    memory: 86,
    ttl: "15 min",
    evictions: "31.8K",
    status: "Pressure",
  },
  {
    id: "eu-fast",
    name: "eu-fast",
    model: "GPT-4.1 mini",
    region: "EU-WEST",
    entries: "721K",
    hitRate: 92.7,
    memory: 49,
    ttl: "45 min",
    evictions: "7.1K",
    status: "Healthy",
  },
  {
    id: "shared-haiku",
    name: "shared-haiku",
    model: "Claude 3.5 Haiku",
    region: "EU-WEST",
    entries: "468K",
    hitRate: 86.3,
    memory: 57,
    ttl: "30 min",
    evictions: "6.4K",
    status: "Warming",
  },
];

const events: CacheEvent[] = [
  {
    time: "12:41:08",
    request: "req_8f29a1c73d",
    namespace: "prod-gpt41",
    type: "HIT",
    tokens: "1,284",
    latency: "7ms",
  },
  {
    time: "12:41:06",
    request: "req_7ac921be42",
    namespace: "prod-claude",
    type: "MISS",
    tokens: "842",
    latency: "11ms",
  },
  {
    time: "12:41:03",
    request: "req_62d81fc921",
    namespace: "prod-deepseek",
    type: "HIT",
    tokens: "2,104",
    latency: "5ms",
  },
  {
    time: "12:40:58",
    request: "req_51a8cfe123",
    namespace: "prod-gpt41",
    type: "WRITE",
    tokens: "976",
    latency: "9ms",
  },
  {
    time: "12:40:52",
    request: "req_44d7aa821f",
    namespace: "prod-llama",
    type: "EVICTION",
    tokens: "612",
    latency: "14ms",
  },
];

const cacheTabs = ["Overview", "Namespaces", "Keys", "Events"] as const;

type CacheTab = (typeof cacheTabs)[number];

export default function CachePage() {
  const [activeTab, setActiveTab] = useState<CacheTab>("Overview");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filteredNamespaces = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return namespaces;
    }

    return namespaces.filter(
      (namespace) =>
        namespace.name.toLowerCase().includes(query) ||
        namespace.model.toLowerCase().includes(query) ||
        namespace.region.toLowerCase().includes(query),
    );
  }, [search]);

  const avgHitRate =
    namespaces.reduce((total, namespace) => total + namespace.hitRate, 0) /
    namespaces.length;

  const avgMemory =
    namespaces.reduce((total, namespace) => total + namespace.memory, 0) /
    namespaces.length;

  const totalEntries = namespaces.reduce((total, namespace) => {
    const value = namespace.entries.toUpperCase();

    if (value.endsWith("M")) {
      return total + Number.parseFloat(value.replace("M", "")) * 1_000_000;
    }

    if (value.endsWith("K")) {
      return total + Number.parseFloat(value.replace("K", "")) * 1_000;
    }

    return total + Number.parseFloat(value);
  }, 0);

  const totalEntriesFormatted =
    totalEntries >= 1_000_000
      ? `${(totalEntries / 1_000_000).toFixed(1)}M`
      : `${Math.round(totalEntries / 1_000)}K`;

  const handleFlush = () => {
    // Mock action for now.
    console.log("Cache flush requested");
  };

  const handleCreateNamespace = () => {
    // Mock action for now.
    console.log("Create namespace requested");
  };

  return (
    <div className="cache-page">
      {/* =========================================================
          HEADER
          ========================================================= */}

      <header className="cache-header">
        <div>
          <div className="cache-eyebrow">INFRASTRUCTURE / CACHE</div>

          <h1>Cache</h1>

          <p>
            Inspect KV cache performance, memory pressure, and token reuse
            across inference workloads.
          </p>
        </div>

        <div className="cache-header-actions">
          <button
            type="button"
            className="cache-action-secondary"
            onClick={handleFlush}
          >
            Flush cache
          </button>

          <button
            type="button"
            className="cache-action-primary"
            onClick={handleCreateNamespace}
          >
            + Create namespace
          </button>
        </div>
      </header>

      {/* =========================================================
          TABS
          ========================================================= */}

      <nav className="cache-tabs" aria-label="Cache sections">
        {cacheTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}

            {tab === "Events" && (
              <span className="cache-tab-count">24</span>
            )}
          </button>
        ))}
      </nav>

      {/* =========================================================
          OVERVIEW
          ========================================================= */}

      {activeTab === "Overview" && (
        <>
          {/* TOP METRICS */}

          <section className="cache-metrics">
            <div className="cache-metric cache-metric-primary">
              <span>GLOBAL HIT RATE</span>

              <div className="cache-metric-value">
                <strong>{avgHitRate.toFixed(1)}%</strong>

                <span className="metric-up">+2.4%</span>
              </div>

              <small>vs previous 24 hours</small>

              <div className="metric-sparkline" aria-hidden="true">
                {[42, 47, 44, 53, 58, 56, 62, 66, 63, 72, 76, 81].map(
                  (height, index) => (
                    <i
                      key={index}
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="cache-metric">
              <span>CACHED TOKENS</span>

              <strong>18.7M</strong>

              <small>served without model execution</small>
            </div>

            <div className="cache-metric">
              <span>CACHE MEMORY</span>

              <strong>{Math.round(avgMemory)}%</strong>

              <div className="metric-progress">
                <span
                  style={{
                    width: `${avgMemory}%`,
                  }}
                />
              </div>

              <small>122 GB allocated</small>
            </div>

            <div className="cache-metric">
              <span>LOOKUP LATENCY</span>

              <strong>6.8ms</strong>

              <small>p95 · last 24 hours</small>
            </div>

            <div className="cache-metric">
              <span>EST. SAVINGS</span>

              <strong>$74.82</strong>

              <small>from cache reuse</small>
            </div>
          </section>

          {/* CACHE PIPELINE */}

          <section className="cache-flow-card">
            <div className="cache-section-header">
              <div>
                <span>CACHE PIPELINE</span>

                <h2>Request lifecycle</h2>
              </div>

              <span className="cache-live">
                <i />
                Processing normally
              </span>
            </div>

            {/*
              IMPORTANT:
              This is intentionally ONE .cache-flow.
              Do not nest another .cache-flow inside it.
            */}

            <div className="cache-flow">
              {/* REQUEST */}

              <div className="cache-flow-node">
                <div className="cache-flow-icon">API</div>

                <div>
                  <strong>Request</strong>
                  <span>Incoming prompt</span>
                </div>
              </div>

              {/* CONNECTOR */}

              <div className="cache-flow-arrow" aria-hidden="true">
                <span />
              </div>

              {/* LOOKUP */}

              <div className="cache-flow-node cache-check">
                <div className="cache-flow-icon">?</div>

                <div>
                  <strong>Cache lookup</strong>
                  <span>Key resolution</span>
                </div>
              </div>

              {/* CONNECTOR */}

              <div className="cache-flow-arrow" aria-hidden="true">
                <span />
              </div>

              {/* MODEL */}

              <div className="cache-flow-node">
                <div className="cache-flow-icon">M</div>

                <div>
                  <strong>Model</strong>
                  <span>Inference execution</span>
                </div>
              </div>

              {/* CONNECTOR */}

              <div className="cache-flow-arrow" aria-hidden="true">
                <span />
              </div>

              {/* CACHE WRITE */}

              <div className="cache-flow-node cache-write">
                <div className="cache-flow-icon">+</div>

                <div>
                  <strong>Cache write</strong>
                  <span>Store response</span>
                </div>
              </div>
            </div>
          </section>

          {/* HIT / MISS */}

          <section className="cache-outcome-card">
            <div className="cache-outcome-header">
              <div>
                <span>CACHE OUTCOME</span>

                <h2>Hit / miss distribution</h2>
              </div>

              <span className="cache-outcome-period">Last 24 hours</span>
            </div>

            <div className="cache-outcome-grid">
              {/* HIT */}

              <div className="cache-outcome-item hit">
                <div className="cache-outcome-top">
                  <div className="cache-outcome-label">
                    <i />

                    <strong>Cache HIT</strong>
                  </div>

                  <strong className="cache-outcome-percent">91.8%</strong>
                </div>

                <div className="cache-outcome-bar">
                  <span style={{ width: "91.8%" }} />
                </div>

                <div className="cache-outcome-stats">
                  <div>
                    <span>REQUESTS</span>
                    <strong>1.17M</strong>
                  </div>

                  <div>
                    <span>TOKENS SERVED</span>
                    <strong>18.7M</strong>
                  </div>

                  <div>
                    <span>AVG LOOKUP</span>
                    <strong>6.8ms</strong>
                  </div>
                </div>
              </div>

              {/* MISS */}

              <div className="cache-outcome-item miss">
                <div className="cache-outcome-top">
                  <div className="cache-outcome-label">
                    <i />

                    <strong>Cache MISS</strong>
                  </div>

                  <strong className="cache-outcome-percent">8.2%</strong>
                </div>

                <div className="cache-outcome-bar">
                  <span style={{ width: "8.2%" }} />
                </div>

                <div className="cache-outcome-stats">
                  <div>
                    <span>REQUESTS</span>
                    <strong>104K</strong>
                  </div>

                  <div>
                    <span>TOKENS PROCESSED</span>
                    <strong>4.2M</strong>
                  </div>

                  <div>
                    <span>AVG LOOKUP</span>
                    <strong>11.4ms</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN GRID */}

          <div className="cache-main-grid">
            {/* NAMESPACE REGISTRY */}

            <section className="cache-registry">
              <div className="cache-card-header">
                <div>
                  <span>CACHE REGISTRY</span>

                  <h2>Namespaces</h2>
                </div>

                <span className="cache-count">
                  {namespaces.length} active
                </span>
              </div>

              {/* SEARCH */}

              <div className="cache-search">
                <span aria-hidden="true">⌕</span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search namespaces..."
                  aria-label="Search namespaces"
                />
              </div>

              {/* TABLE HEADER */}

              <div className="namespace-table">
                <div className="namespace-table-head">
                  <span>NAMESPACE</span>
                  <span>MODEL</span>
                  <span>HIT RATE</span>
                  <span>MEMORY</span>
                  <span>TTL</span>
                  <span>STATUS</span>
                </div>

                {/* ROWS */}

                {filteredNamespaces.map((namespace) => {
                  const isExpanded = expanded === namespace.id;

                  return (
                    <div
                      className={`namespace-wrapper ${
                        isExpanded ? "expanded" : ""
                      }`}
                      key={namespace.id}
                    >
                      <button
                        type="button"
                        className="namespace-row"
                        onClick={() =>
                          setExpanded(isExpanded ? null : namespace.id)
                        }
                        aria-expanded={isExpanded}
                      >
                        {/* NAME */}

                        <div className="namespace-name">
                          <div className="namespace-icon">K</div>

                          <div>
                            <strong>{namespace.name}</strong>

                            <span>{namespace.region}</span>
                          </div>
                        </div>

                        {/* MODEL */}

                        <div className="namespace-model">
                          {namespace.model}
                        </div>

                        {/* HIT RATE */}

                        <div className="namespace-hit">
                          <strong>{namespace.hitRate}%</strong>

                          <div>
                            <span
                              style={{
                                width: `${namespace.hitRate}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* MEMORY */}

                        <div className="namespace-memory">
                          <strong>{namespace.memory}%</strong>

                          <div>
                            <span
                              className={
                                namespace.memory >= 80 ? "pressure" : ""
                              }
                              style={{
                                width: `${namespace.memory}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* TTL */}

                        <div className="namespace-ttl">{namespace.ttl}</div>

                        {/* STATUS */}

                        <div
                          className={`namespace-status ${namespace.status.toLowerCase()}`}
                        >
                          <i />

                          {namespace.status}
                        </div>

                        {/* EXPAND */}

                        <span className="namespace-expand" aria-hidden="true">
                          {isExpanded ? "⌃" : "›"}
                        </span>
                      </button>

                      {/* EXPANDED DETAILS */}

                      {isExpanded && (
                        <div className="namespace-expanded">
                          <div>
                            <span>ENTRIES</span>

                            <strong>{namespace.entries}</strong>
                          </div>

                          <div>
                            <span>EVICTIONS</span>

                            <strong>{namespace.evictions}</strong>
                          </div>

                          <div>
                            <span>REGION</span>

                            <strong>{namespace.region}</strong>
                          </div>

                          <div>
                            <span>MODEL</span>

                            <strong>{namespace.model}</strong>
                          </div>

                          <button type="button">Configure →</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FOOTER */}

              <div className="cache-table-footer">
                <span>
                  {filteredNamespaces.length} of {namespaces.length}{" "}
                  namespaces
                </span>

                <span>{totalEntriesFormatted} total entries</span>
              </div>
            </section>

            {/* MEMORY DISTRIBUTION */}

            <section className="cache-distribution">
              <div className="cache-card-header">
                <div>
                  <span>MEMORY DISTRIBUTION</span>

                  <h2>Cache utilization</h2>
                </div>

                <button
                  type="button"
                  className="cache-more"
                  aria-label="More cache utilization options"
                >
                  ⋯
                </button>
              </div>

              {/* DONUT */}

              <div className="cache-donut">
                <div className="cache-donut-inner">
                  <strong>68%</strong>

                  <span>USED</span>
                </div>
              </div>

              {/* MEMORY SUMMARY */}

              <div className="cache-memory-summary">
                <div>
                  <span>
                    <i className="cache-legend-blue" />

                    Active cache
                  </span>

                  <strong>83 GB</strong>
                </div>

                <div>
                  <span>
                    <i className="cache-legend-gray" />

                    Available
                  </span>

                  <strong>39 GB</strong>
                </div>
              </div>

              {/* DISTRIBUTION */}

              <div className="cache-distribution-list">
                {namespaces.slice(0, 4).map((namespace) => (
                  <div key={namespace.id}>
                    <div>
                      <span>{namespace.model}</span>

                      <strong>{namespace.memory}%</strong>
                    </div>

                    <div className="distribution-track">
                      <span
                        style={{
                          width: `${namespace.memory}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* EVENTS */}

          <section className="cache-events">
            <div className="cache-card-header">
              <div>
                <span>RECENT ACTIVITY</span>

                <h2>Cache events</h2>
              </div>

              <button
                type="button"
                className="cache-more"
                onClick={() => setActiveTab("Events")}
              >
                View all →
              </button>
            </div>

            <div className="cache-event-head">
              <span>TIME</span>
              <span>REQUEST</span>
              <span>NAMESPACE</span>
              <span>EVENT</span>
              <span>TOKENS</span>
              <span>LATENCY</span>
            </div>

            {events.map((event) => (
              <div
                className="cache-event-row"
                key={`${event.time}-${event.request}`}
              >
                <span>{event.time}</span>

                <strong>{event.request}</strong>

                <span>{event.namespace}</span>

                <span
                  className={`cache-event-type ${event.type.toLowerCase()}`}
                >
                  <i />

                  {event.type}
                </span>

                <span>{event.tokens}</span>

                <span>{event.latency}</span>
              </div>
            ))}
          </section>
        </>
      )}

      {/* =========================================================
          NAMESPACES TAB
          ========================================================= */}

      {activeTab === "Namespaces" && (
        <section className="cache-registry">
          <div className="cache-card-header">
            <div>
              <span>CACHE REGISTRY</span>

              <h2>Namespaces</h2>
            </div>

            <span className="cache-count">
              {namespaces.length} active
            </span>
          </div>

          <div className="cache-search">
            <span aria-hidden="true">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search namespaces..."
              aria-label="Search namespaces"
            />
          </div>

          <div className="namespace-table">
            <div className="namespace-table-head">
              <span>NAMESPACE</span>
              <span>MODEL</span>
              <span>HIT RATE</span>
              <span>MEMORY</span>
              <span>TTL</span>
              <span>STATUS</span>
            </div>

            {filteredNamespaces.map((namespace) => {
              const isExpanded = expanded === namespace.id;

              return (
                <div
                  className={`namespace-wrapper ${
                    isExpanded ? "expanded" : ""
                  }`}
                  key={namespace.id}
                >
                  <button
                    type="button"
                    className="namespace-row"
                    onClick={() =>
                      setExpanded(isExpanded ? null : namespace.id)
                    }
                    aria-expanded={isExpanded}
                  >
                    <div className="namespace-name">
                      <div className="namespace-icon">K</div>

                      <div>
                        <strong>{namespace.name}</strong>
                        <span>{namespace.region}</span>
                      </div>
                    </div>

                    <div className="namespace-model">
                      {namespace.model}
                    </div>

                    <div className="namespace-hit">
                      <strong>{namespace.hitRate}%</strong>

                      <div>
                        <span
                          style={{
                            width: `${namespace.hitRate}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="namespace-memory">
                      <strong>{namespace.memory}%</strong>

                      <div>
                        <span
                          className={
                            namespace.memory >= 80 ? "pressure" : ""
                          }
                          style={{
                            width: `${namespace.memory}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="namespace-ttl">{namespace.ttl}</div>

                    <div
                      className={`namespace-status ${namespace.status.toLowerCase()}`}
                    >
                      <i />
                      {namespace.status}
                    </div>

                    <span className="namespace-expand" aria-hidden="true">
                      {isExpanded ? "⌃" : "›"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="namespace-expanded">
                      <div>
                        <span>ENTRIES</span>
                        <strong>{namespace.entries}</strong>
                      </div>

                      <div>
                        <span>EVICTIONS</span>
                        <strong>{namespace.evictions}</strong>
                      </div>

                      <div>
                        <span>REGION</span>
                        <strong>{namespace.region}</strong>
                      </div>

                      <div>
                        <span>MODEL</span>
                        <strong>{namespace.model}</strong>
                      </div>

                      <button type="button">Configure →</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="cache-table-footer">
            <span>
              {filteredNamespaces.length} of {namespaces.length} namespaces
            </span>

            <span>{totalEntriesFormatted} total entries</span>
          </div>
        </section>
      )}

      {/* =========================================================
          KEYS TAB
          ========================================================= */}

      {activeTab === "Keys" && (
        <section className="cache-registry">
          <div className="cache-card-header">
            <div>
              <span>CACHE KEYSPACE</span>

              <h2>Key inspection</h2>
            </div>

            <span className="cache-count">Live</span>
          </div>

          <div className="cache-search">
            <span aria-hidden="true">⌕</span>

            <input
              type="text"
              placeholder="Search cache keys..."
              aria-label="Search cache keys"
            />
          </div>

          <div className="namespace-table">
            <div className="namespace-table-head">
              <span>KEY</span>
              <span>NAMESPACE</span>
              <span>MODEL</span>
              <span>MEMORY</span>
              <span>TTL</span>
              <span>STATUS</span>
            </div>

            {[
              {
                key: "prompt:8f29a1c73d",
                namespace: "prod-gpt41",
                model: "GPT-4.1",
                memory: "68%",
                ttl: "24 min",
                status: "Healthy",
              },
              {
                key: "prompt:7ac921be42",
                namespace: "prod-claude",
                model: "Claude Sonnet 4",
                memory: "61%",
                ttl: "17 min",
                status: "Healthy",
              },
              {
                key: "prompt:62d81fc921",
                namespace: "prod-deepseek",
                model: "DeepSeek V3",
                memory: "74%",
                ttl: "12 min",
                status: "Healthy",
              },
              {
                key: "prompt:51a8cfe123",
                namespace: "prod-llama",
                model: "Llama 4 Maverick",
                memory: "86%",
                ttl: "7 min",
                status: "Pressure",
              },
            ].map((item) => (
              <div className="namespace-row" key={item.key}>
                <div className="namespace-name">
                  <div className="namespace-icon">#</div>

                  <div>
                    <strong>{item.key}</strong>
                    <span>SHA-256 key</span>
                  </div>
                </div>

                <div className="namespace-model">
                  {item.namespace}
                </div>

                <div className="namespace-model">{item.model}</div>

                <div className="namespace-memory">
                  <strong>{item.memory}</strong>

                  <div>
                    <span
                      className={
                        Number.parseInt(item.memory, 10) >= 80
                          ? "pressure"
                          : ""
                      }
                      style={{
                        width: item.memory,
                      }}
                    />
                  </div>
                </div>

                <div className="namespace-ttl">{item.ttl}</div>

                <div
                  className={`namespace-status ${item.status.toLowerCase()}`}
                >
                  <i />
                  {item.status}
                </div>
              </div>
            ))}
          </div>

          <div className="cache-table-footer">
            <span>4 sample keys</span>

            <span>Key values are hashed</span>
          </div>
        </section>
      )}

      {/* =========================================================
          EVENTS TAB
          ========================================================= */}

      {activeTab === "Events" && (
        <section className="cache-events">
          <div className="cache-card-header">
            <div>
              <span>RECENT ACTIVITY</span>

              <h2>Cache events</h2>
            </div>

            <span className="cache-count">24 events</span>
          </div>

          <div className="cache-event-head">
            <span>TIME</span>
            <span>REQUEST</span>
            <span>NAMESPACE</span>
            <span>EVENT</span>
            <span>TOKENS</span>
            <span>LATENCY</span>
          </div>

          {events.map((event) => (
            <div
              className="cache-event-row"
              key={`${event.time}-${event.request}`}
            >
              <span>{event.time}</span>

              <strong>{event.request}</strong>

              <span>{event.namespace}</span>

              <span
                className={`cache-event-type ${event.type.toLowerCase()}`}
              >
                <i />

                {event.type}
              </span>

              <span>{event.tokens}</span>

              <span>{event.latency}</span>
            </div>
          ))}

          <div className="cache-table-footer">
            <span>Showing latest 5 events</span>

            <span>Streaming normally</span>
          </div>
        </section>
      )}
    </div>
  );
}