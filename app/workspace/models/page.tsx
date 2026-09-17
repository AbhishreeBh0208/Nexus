"use client";

import { useMemo, useState } from "react";

type ModelStatus = "Active" | "Degraded" | "Disabled";

type Model = {
  id: string;
  name: string;
  provider: string;
  family: string;
  context: string;
  requests: string;
  latency: number;
  success: number;
  throughput: string;
  inputPrice: string;
  outputPrice: string;
  capacity: number;
  status: ModelStatus;
  region: string;
  routed: boolean;
};

const models: Model[] = [
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    family: "GPT",
    context: "1M",
    requests: "482K",
    latency: 182,
    success: 99.98,
    throughput: "2.8K/s",
    inputPrice: "$2.00",
    outputPrice: "$8.00",
    capacity: 72,
    status: "Active",
    region: "US-EAST",
    routed: true,
  },
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    family: "Claude",
    context: "200K",
    requests: "319K",
    latency: 241,
    success: 99.96,
    throughput: "2.1K/s",
    inputPrice: "$3.00",
    outputPrice: "$15.00",
    capacity: 64,
    status: "Active",
    region: "US-EAST",
    routed: true,
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    family: "DeepSeek",
    context: "128K",
    requests: "276K",
    latency: 146,
    success: 99.91,
    throughput: "3.4K/s",
    inputPrice: "$0.27",
    outputPrice: "$1.10",
    capacity: 81,
    status: "Active",
    region: "US-EAST",
    routed: true,
  },
  {
    id: "llama-4-maverick",
    name: "Llama 4 Maverick",
    provider: "Meta",
    family: "Llama",
    context: "1M",
    requests: "142K",
    latency: 198,
    success: 99.84,
    throughput: "1.7K/s",
    inputPrice: "$0.24",
    outputPrice: "$0.97",
    capacity: 54,
    status: "Degraded",
    region: "US-EAST",
    routed: false,
  },
  {
    id: "gpt-4.1-mini",
    name: "GPT-4.1 mini",
    provider: "OpenAI",
    family: "GPT",
    context: "1M",
    requests: "93K",
    latency: 112,
    success: 99.99,
    throughput: "4.2K/s",
    inputPrice: "$0.40",
    outputPrice: "$1.60",
    capacity: 61,
    status: "Active",
    region: "EU-WEST",
    routed: true,
  },
  {
    id: "claude-haiku-3.5",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    family: "Claude",
    context: "200K",
    requests: "48K",
    latency: 97,
    success: 99.97,
    throughput: "3.9K/s",
    inputPrice: "$0.80",
    outputPrice: "$4.00",
    capacity: 43,
    status: "Active",
    region: "EU-WEST",
    routed: false,
  },
];

const providers = [
  "All providers",
  "OpenAI",
  "Anthropic",
  "DeepSeek",
  "Meta",
];

const statuses = ["All statuses", "Active", "Degraded", "Disabled"];

export default function ModelsPage() {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState("All providers");
  const [status, setStatus] = useState("All statuses");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const query = search.toLowerCase();

      const matchesSearch =
        model.name.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query) ||
        model.family.toLowerCase().includes(query);

      const matchesProvider =
        provider === "All providers" ||
        model.provider === provider;

      const matchesStatus =
        status === "All statuses" ||
        model.status === status;

      return matchesSearch && matchesProvider && matchesStatus;
    });
  }, [search, provider, status]);

  const activeModels = models.filter(
    (model) => model.status === "Active"
  ).length;

  const routedModels = models.filter(
    (model) => model.routed
  ).length;

  return (
    <div className="models-page">
      {/* HEADER */}

      <header className="models-header">
        <div>
          <div className="models-eyebrow">
            INFERENCE / MODELS
          </div>

          <h1>Models</h1>

          <p>
            Manage the models available to Nexus and control
            how inference traffic reaches them.
          </p>
        </div>

        <button className="models-add-button">
          <span>+</span>
          Add model
        </button>
      </header>

      {/* OVERVIEW */}

      <section className="models-overview">
        <div className="model-overview-main">
          <span>MODEL REGISTRY</span>

          <div className="model-overview-number">
            <strong>{models.length}</strong>
            <small>configured models</small>
          </div>

          <div className="registry-health">
            <span className="health-dot" />
            Registry synchronized
          </div>
        </div>

        <div className="model-overview-stat">
          <span>ACTIVE</span>
          <strong>{activeModels}</strong>
          <small>models online</small>
        </div>

        <div className="model-overview-stat">
          <span>ROUTED</span>
          <strong>{routedModels}</strong>
          <small>receiving traffic</small>
        </div>

        <div className="model-overview-stat">
          <span>AVG P95</span>
          <strong>182ms</strong>
          <small>last 24 hours</small>
        </div>

        <div className="model-overview-stat">
          <span>SUCCESS</span>
          <strong>99.97%</strong>
          <small>last 24 hours</small>
        </div>
      </section>

      {/* PERFORMANCE STRIP */}

      <section className="models-performance">
        <div className="performance-title">
          <span>PERFORMANCE</span>
          <strong>Model latency</strong>
        </div>

        <div className="latency-bars">
          {models.slice(0, 6).map((model) => {
            const width = Math.min(
              100,
              (model.latency / 300) * 100
            );

            return (
              <div
                className="latency-model"
                key={model.id}
              >
                <div className="latency-label">
                  <span>{model.name}</span>
                  <strong>{model.latency}ms</strong>
                </div>

                <div className="latency-track">
                  <span
                    style={{
                      width: `${width}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* REGISTRY */}

      <section className="models-registry">
        <div className="models-toolbar">
          <div className="models-search">
            <span>⌕</span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search models or providers..."
            />

            <kbd>⌘ K</kbd>
          </div>

          <div className="models-filters">
            <select
              value={provider}
              onChange={(event) =>
                setProvider(event.target.value)
              }
            >
              {providers.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              {statuses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button className="models-filter-icon">
              ⋯
            </button>
          </div>
        </div>

        {/* TABLE */}

        <div className="models-table">
          <div className="models-table-head">
            <span>MODEL</span>
            <span>STATUS</span>
            <span>REQUESTS</span>
            <span>LATENCY</span>
            <span>SUCCESS</span>
            <span>THROUGHPUT</span>
            <span>CONTEXT</span>
            <span>CAPACITY</span>
          </div>

          {filteredModels.map((model) => {
            const isExpanded = expanded === model.id;

            return (
              <div
                className={`model-row-wrapper ${
                  isExpanded ? "expanded" : ""
                }`}
                key={model.id}
              >
                <button
                  className="model-row"
                  onClick={() =>
                    setExpanded(
                      isExpanded ? null : model.id
                    )
                  }
                >
                  <div className="model-primary">
                    <span className="model-provider-icon">
                      {model.provider.charAt(0)}
                    </span>

                    <div>
                      <strong>{model.name}</strong>

                      <span>
                        {model.provider} · {model.family}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`model-status ${model.status.toLowerCase()}`}
                    >
                      <i />
                      {model.status}
                    </span>
                  </div>

                  <div className="model-table-value">
                    {model.requests}
                  </div>

                  <div className="model-table-value">
                    <strong>{model.latency}ms</strong>
                  </div>

                  <div className="model-table-value success-value">
                    {model.success}%
                  </div>

                  <div className="model-table-value">
                    {model.throughput}
                  </div>

                  <div className="model-table-value">
                    {model.context}
                  </div>

                  <div className="capacity-cell">
                    <div className="capacity-bar">
                      <span
                        style={{
                          width: `${model.capacity}%`,
                        }}
                      />
                    </div>

                    <small>
                      {model.capacity}%
                    </small>
                  </div>

                  <span className="model-expand">
                    {isExpanded ? "⌃" : "›"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="model-expanded">
                    <div className="expanded-section">
                      <span>ROUTING</span>

                      <strong>
                        {model.routed
                          ? "Receiving production traffic"
                          : "Not currently routed"}
                      </strong>

                      <small>
                        Nexus Router · Balanced policy
                      </small>
                    </div>

                    <div className="expanded-section">
                      <span>REGION</span>

                      <strong>{model.region}</strong>

                      <small>
                        Primary inference region
                      </small>
                    </div>

                    <div className="expanded-section">
                      <span>PRICING / 1M TOKENS</span>

                      <strong>
                        {model.inputPrice} input
                      </strong>

                      <small>
                        {model.outputPrice} output
                      </small>
                    </div>

                    <div className="expanded-section">
                      <span>CONFIGURATION</span>

                      <button className="configure-button">
                        Configure →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredModels.length === 0 && (
            <div className="models-empty">
              <div>⌕</div>
              <strong>No models found</strong>
              <span>
                Try another model, provider, or status.
              </span>
            </div>
          )}
        </div>

        <div className="models-footer">
          <span>
            {filteredModels.length} of {models.length} models
          </span>

          <span>
            Last synchronized&nbsp; 12 seconds ago
          </span>
        </div>
      </section>
    </div>
  );
}