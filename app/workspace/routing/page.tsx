"use client";

import { useState } from "react";

type Strategy =
  | "Balanced"
  | "Lowest latency"
  | "Lowest cost"
  | "Highest availability";

type RoutingDecision = {
  id: string;
  model: string;
  provider: string;
  worker: string;
  region: string;
  latency: string;
  reason: string;
  status: "Selected" | "Fallback";
};

const decisions: RoutingDecision[] = [
  {
    id: "req_8f29a1c73d",
    model: "GPT-4.1",
    provider: "OpenAI",
    worker: "worker-us-east-03",
    region: "US-EAST",
    latency: "184ms",
    reason: "Lowest weighted score",
    status: "Selected",
  },
  {
    id: "req_7ac921be42",
    model: "Claude Sonnet 4",
    provider: "Anthropic",
    worker: "worker-us-east-07",
    region: "US-EAST",
    latency: "241ms",
    reason: "Capacity available",
    status: "Selected",
  },
  {
    id: "req_62d81fc921",
    model: "DeepSeek V3",
    provider: "DeepSeek",
    worker: "worker-us-east-03",
    region: "US-EAST",
    latency: "146ms",
    reason: "Cost optimized",
    status: "Selected",
  },
  {
    id: "req_51a8cfe123",
    model: "GPT-4.1",
    provider: "OpenAI",
    worker: "worker-eu-west-02",
    region: "EU-WEST",
    latency: "197ms",
    reason: "Regional affinity",
    status: "Selected",
  },
  {
    id: "req_44d7aa821f",
    model: "Claude Sonnet 4",
    provider: "Anthropic",
    worker: "worker-us-east-07",
    region: "US-EAST",
    latency: "263ms",
    reason: "Primary unavailable",
    status: "Fallback",
  },
];

const strategies: Strategy[] = [
  "Balanced",
  "Lowest latency",
  "Lowest cost",
  "Highest availability",
];

export default function RoutingPage() {
  const [strategy, setStrategy] =
    useState<Strategy>("Balanced");

  const [fallbacks, setFallbacks] = useState(true);
  const [regionalAffinity, setRegionalAffinity] =
    useState(true);

  const [activeRule, setActiveRule] = useState<
    string | null
  >(null);

  return (
    <div className="routing-page">
      {/* HEADER */}

      <header className="routing-header">
        <div>
          <div className="routing-eyebrow">
            INFRASTRUCTURE / ROUTING
          </div>

          <h1>Routing</h1>

          <p>
            Define how Nexus selects models, workers, and
            regions for every inference request.
          </p>
        </div>

        <div className="routing-header-actions">
          <button className="routing-history-button">
            Routing history
          </button>

          <button className="routing-save-button">
            Save changes
          </button>
        </div>
      </header>

      {/* ACTIVE POLICY */}

      <section className="routing-policy-banner">
        <div className="policy-identity">
          <div className="policy-icon">N</div>

          <div>
            <span>ACTIVE ROUTING POLICY</span>

            <strong>Production / Balanced</strong>

            <small>
              Last updated 12 minutes ago · 4 models · 3
              regions
            </small>
          </div>
        </div>

        <div className="policy-health">
          <span />

          <div>
            <strong>Healthy</strong>
            <small>99.97% routing success</small>
          </div>
        </div>
      </section>

      {/* FLOW */}

      <section className="routing-flow-card">
        <div className="routing-section-heading">
          <div>
            <span>DECISION PIPELINE</span>

            <h2>How Nexus routes a request</h2>
          </div>

          <span className="live-indicator">
            <i />
            Live policy
          </span>
        </div>

        <div className="routing-flow">
          <div className="routing-node request">
            <div className="routing-node-icon">
              API
            </div>

            <div>
              <strong>Request</strong>
              <span>Incoming inference</span>
            </div>
          </div>

          <div className="routing-connector">
            <span />
          </div>

          <div className="routing-node router">
            <div className="routing-node-icon">
              N
            </div>

            <div>
              <strong>Nexus Router</strong>
              <span>Policy evaluation</span>
            </div>
          </div>

          <div className="routing-connector">
            <span />
          </div>

          <div className="routing-node">
            <div className="routing-node-icon">
              M
            </div>

            <div>
              <strong>Model selection</strong>
              <span>4 candidates</span>
            </div>
          </div>

          <div className="routing-connector">
            <span />
          </div>

          <div className="routing-node">
            <div className="routing-node-icon">
              R
            </div>

            <div>
              <strong>Region</strong>
              <span>Affinity aware</span>
            </div>
          </div>

          <div className="routing-connector">
            <span />
          </div>

          <div className="routing-node selected">
            <div className="routing-node-icon">
              W
            </div>

            <div>
              <strong>Worker</strong>
              <span>worker-us-east-03</span>
            </div>
          </div>
        </div>

        <div className="routing-flow-result">
          <span>SELECTED PATH</span>

          <div>
            <strong>
              Request → Nexus Router → GPT-4.1 →
              worker-us-east-03
            </strong>

            <small>
              Balanced score: 0.92 · 184ms observed
            </small>
          </div>

          <span className="result-status">
            <i />
            Selected
          </span>
        </div>
      </section>

      {/* CONFIGURATION */}

      <div className="routing-config-grid">
        {/* POLICY */}

        <section className="routing-config-card">
          <div className="routing-card-header">
            <div>
              <span>ROUTING POLICY</span>

              <h2>Selection strategy</h2>
            </div>

            <span className="config-badge">
              Production
            </span>
          </div>

          <div className="strategy-list">
            {strategies.map((item) => (
              <button
                key={item}
                className={`strategy-option ${
                  strategy === item ? "active" : ""
                }`}
                onClick={() => setStrategy(item)}
              >
                <span className="strategy-radio">
                  <i />
                </span>

                <div>
                  <strong>{item}</strong>

                  <small>
                    {item === "Balanced" &&
                      "Optimize latency, cost, capacity, and availability."}

                    {item === "Lowest latency" &&
                      "Prefer the fastest healthy execution path."}

                    {item === "Lowest cost" &&
                      "Prefer the lowest estimated inference cost."}

                    {item ===
                      "Highest availability" &&
                      "Prioritize capacity and provider health."}
                  </small>
                </div>

                {strategy === item && (
                  <span className="strategy-active">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* RULES */}

        <section className="routing-config-card">
          <div className="routing-card-header">
            <div>
              <span>ROUTING RULES</span>

              <h2>Traffic controls</h2>
            </div>

            <button className="add-rule">
              + Add rule
            </button>
          </div>

          <div className="routing-rules">
            <div
  className={`routing-rule ${
    activeRule === "fallback" ? "expanded" : ""
  }`}
  onClick={() =>
    setActiveRule(
      activeRule === "fallback" ? null : "fallback"
    )
  }
>
  <div className="rule-icon">↪</div>

  <div className="rule-content">
    <strong>Automatic fallback</strong>

    <small>
      Fail over when a provider or worker becomes
      unavailable.
    </small>
  </div>

  <button
    type="button"
    className={`rule-toggle ${
      fallbacks ? "active" : ""
    }`}
    onClick={(event) => {
      event.stopPropagation();
      setFallbacks(!fallbacks);
    }}
    aria-label="Toggle automatic fallback"
    aria-pressed={fallbacks}
  >
    <span />
  </button>
</div>

            <div
  className={`routing-rule ${
    activeRule === "region" ? "expanded" : ""
  }`}
  onClick={() =>
    setActiveRule(
      activeRule === "region" ? null : "region"
    )
  }
>
              <div className="rule-icon">◎</div>

              <div className="rule-content">
                <strong>Regional affinity</strong>

                <small>
                  Prefer workers closest to the request
                  origin.
                </small>
              </div>

              <button
                className={`rule-toggle ${
                  regionalAffinity ? "active" : ""
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  setRegionalAffinity(
                    !regionalAffinity
                  );
                }}
              >
                <span />
              </button>
            </div>

            <div className="routing-rule static">
              <div className="rule-icon">⌁</div>

              <div className="rule-content">
                <strong>Capacity protection</strong>

                <small>
                  Remove workers from rotation above 90%
                  utilization.
                </small>
              </div>

              <span className="rule-value">
                90%
              </span>
            </div>

            <div className="routing-rule static">
              <div className="rule-icon">◷</div>

              <div className="rule-content">
                <strong>Latency threshold</strong>

                <small>
                  Trigger fallback when latency exceeds the
                  configured threshold.
                </small>
              </div>

              <span className="rule-value">
                800ms
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* FALLBACK CHAIN */}

      <section className="fallback-card">
        <div className="routing-card-header">
          <div>
            <span>FAILOVER CONFIGURATION</span>

            <h2>Fallback chain</h2>
          </div>

          <button className="edit-chain">
            Edit chain
          </button>
        </div>

        <div className="fallback-chain">
          <div className="fallback-node primary">
            <span>01</span>

            <div className="fallback-model-icon">
              O
            </div>

            <div>
              <strong>GPT-4.1</strong>

              <small>
                OpenAI · Primary
              </small>
            </div>
          </div>

          <div className="fallback-line">
            <span>IF UNAVAILABLE</span>
          </div>

          <div className="fallback-node">
            <span>02</span>

            <div className="fallback-model-icon">
              A
            </div>

            <div>
              <strong>Claude Sonnet 4</strong>

              <small>
                Anthropic · Secondary
              </small>
            </div>
          </div>

          <div className="fallback-line">
            <span>IF UNAVAILABLE</span>
          </div>

          <div className="fallback-node">
            <span>03</span>

            <div className="fallback-model-icon">
              D
            </div>

            <div>
              <strong>DeepSeek V3</strong>

              <small>
                DeepSeek · Tertiary
              </small>
            </div>
          </div>

          <div className="fallback-line">
            <span>IF UNAVAILABLE</span>
          </div>

          <div className="fallback-node final">
            <span>04</span>

            <div className="fallback-model-icon">
              L
            </div>

            <div>
              <strong>Llama 4 Maverick</strong>

              <small>
                Meta · Final fallback
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT DECISIONS */}

      <section className="routing-decisions">
        <div className="routing-card-header">
          <div>
            <span>RECENT ACTIVITY</span>

            <h2>Routing decisions</h2>
          </div>

          <button className="view-all">
            View all →
          </button>
        </div>

        <div className="decision-table">
          <div className="decision-table-head">
            <span>REQUEST</span>
            <span>SELECTED MODEL</span>
            <span>WORKER</span>
            <span>REASON</span>
            <span>LATENCY</span>
            <span>RESULT</span>
          </div>

          {decisions.map((decision) => (
            <div
              className="decision-row"
              key={decision.id}
            >
              <div className="decision-request">
                <span />

                <strong>{decision.id}</strong>
              </div>

              <div className="decision-model">
                <span>
                  {decision.model.charAt(0)}
                </span>

                <div>
                  <strong>{decision.model}</strong>

                  <small>{decision.provider}</small>
                </div>
              </div>

              <div className="decision-worker">
                {decision.worker}
              </div>

              <div className="decision-reason">
                {decision.reason}
              </div>

              <div className="decision-latency">
                {decision.latency}
              </div>

              <div
                className={`decision-result ${
                  decision.status === "Fallback"
                    ? "fallback"
                    : ""
                }`}
              >
                <i />

                {decision.status}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}