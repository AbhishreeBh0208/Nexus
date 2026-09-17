"use client";

import { useMemo, useState } from "react";

type CostModel = {
  model: string;
  provider: string;
  requests: string;
  inputTokens: string;
  outputTokens: string;
  cost: number;
  percentage: number;
  trend: number;
};

type CostRegion = {
  region: string;
  requests: string;
  cost: number;
  percentage: number;
  avgCost: string;
};

type CostDay = {
  day: string;
  cost: number;
};

const costModels: CostModel[] = [
  {
    model: "GPT-4.1",
    provider: "OpenAI",
    requests: "482.4K",
    inputTokens: "12.8M",
    outputTokens: "5.6M",
    cost: 96.42,
    percentage: 39.4,
    trend: 8.4,
  },
  {
    model: "Claude Sonnet 4",
    provider: "Anthropic",
    requests: "361.8K",
    inputTokens: "10.1M",
    outputTokens: "4.6M",
    cost: 81.26,
    percentage: 33.2,
    trend: 4.8,
  },
  {
    model: "DeepSeek V3",
    provider: "DeepSeek",
    requests: "287.2K",
    inputTokens: "8.1M",
    outputTokens: "3.8M",
    cost: 42.18,
    percentage: 17.2,
    trend: 12.7,
  },
  {
    model: "Llama 4 Maverick",
    provider: "Meta",
    requests: "148.6K",
    inputTokens: "4.1M",
    outputTokens: "2.1M",
    cost: 24.61,
    percentage: 10.1,
    trend: -2.1,
  },
];

const regions: CostRegion[] = [
  {
    region: "US-EAST",
    requests: "812.4K",
    cost: 142.38,
    percentage: 58.2,
    avgCost: "$0.175 / 1K",
  },
  {
    region: "EU-WEST",
    requests: "321.8K",
    cost: 67.92,
    percentage: 27.7,
    avgCost: "$0.211 / 1K",
  },
  {
    region: "AP-SOUTH",
    requests: "102.6K",
    cost: 28.41,
    percentage: 11.6,
    avgCost: "$0.277 / 1K",
  },
  {
    region: "US-WEST",
    requests: "43.2K",
    cost: 5.72,
    percentage: 2.3,
    avgCost: "$0.132 / 1K",
  },
];

const dailyCosts: CostDay[] = [
  { day: "Sep 12", cost: 31.2 },
  { day: "Sep 13", cost: 34.8 },
  { day: "Sep 14", cost: 37.4 },
  { day: "Sep 15", cost: 39.1 },
  { day: "Sep 16", cost: 41.6 },
  { day: "Sep 17", cost: 44.7 },
  { day: "Sep 18", cost: 48.3 },
];

const periods = ["24h", "7d", "30d", "90d"];

export default function CostsPage() {
  const [period, setPeriod] = useState("24h");
  const [search, setSearch] = useState("");

  const maxDailyCost = Math.max(...dailyCosts.map((item) => item.cost));

  const totalCost = useMemo(() => {
    return costModels.reduce((sum, model) => sum + model.cost, 0);
  }, []);

  const filteredModels = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return costModels;

    return costModels.filter(
      (model) =>
        model.model.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="costs-page">
      {/* HEADER */}
      <header className="costs-header">
        <div>
          <div className="costs-eyebrow">
            <span className="costs-eyebrow-dot" />
            OBSERVABILITY / COSTS
          </div>

          <h1>Costs</h1>

          <p>
            Track inference spend, token consumption, and cost allocation
            across models, regions, and infrastructure.
          </p>
        </div>

        <div className="costs-header-actions">
          <div className="costs-period">
            {periods.map((item) => (
              <button
                key={item}
                type="button"
                className={period === item ? "active" : ""}
                onClick={() => setPeriod(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <button type="button" className="costs-export-button">
            Export
          </button>

          <button
            type="button"
            className="costs-refresh-button"
            aria-label="Refresh costs"
          >
            ↻
          </button>
        </div>
      </header>

      {/* SPEND SUMMARY */}
      <section className="costs-summary">
        <CostStat
          label="Total Spend"
          value={`$${totalCost.toFixed(2)}`}
          detail="+7.8% vs previous period"
        />

        <CostStat
          label="Projected Monthly"
          value="$284.31"
          detail="Based on current usage"
        />

        <CostStat
          label="Cost / 1K Requests"
          value="$0.19"
          detail="-4.2% vs previous period"
          positive
        />

        <CostStat
          label="Token Usage"
          value="51.2M"
          detail="+5.7% vs previous period"
        />
      </section>

      {/* COST TREND */}
      <section className="costs-panel costs-trend-panel">
        <div className="costs-panel-header">
          <div>
            <span className="costs-panel-kicker">SPEND</span>
            <h2>Cost over time</h2>
            <p>Daily inference spend across all active routes.</p>
          </div>

          <div className="costs-current-spend">
            <span>Today</span>
            <strong>$48.30</strong>
          </div>
        </div>

        <div className="costs-chart">
          <div className="costs-y-axis">
            <span>$60</span>
            <span>$45</span>
            <span>$30</span>
            <span>$15</span>
            <span>$0</span>
          </div>

          <div className="costs-chart-area">
            <div className="costs-grid-lines">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="costs-bars">
              {dailyCosts.map((item) => {
                const height = Math.max(
                  7,
                  (item.cost / maxDailyCost) * 100
                );

                return (
                  <div className="costs-bar-column" key={item.day}>
                    <div
                      className="costs-bar"
                      style={{ height: `${height}%` }}
                      title={`${item.day}: $${item.cost.toFixed(2)}`}
                    />

                    <span>{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="costs-chart-footer">
          <span>Daily spend</span>

          <div>
            <span>7-day total</span>
            <strong>$277.10</strong>
          </div>
        </div>
      </section>

      {/* COST BREAKDOWN */}
      <div className="costs-two-column">
        {/* MODEL BREAKDOWN */}
        <section className="costs-panel">
          <div className="costs-panel-header compact">
            <div>
              <span className="costs-panel-kicker">
                ALLOCATION
              </span>
              <h2>Spend by model</h2>
              <p>Where inference spend is being allocated.</p>
            </div>
          </div>

          <div className="model-cost-list">
            {costModels.map((model) => (
              <div className="model-cost-row" key={model.model}>
                <div className="model-cost-main">
                  <div className="model-cost-icon">
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

                <div className="model-cost-bar-wrap">
                  <div className="model-cost-bar">
                    <div
                      style={{
                        width: `${model.percentage}%`,
                      }}
                    />
                  </div>

                  <span>{model.percentage}%</span>
                </div>

                <strong className="model-cost-value">
                  ${model.cost.toFixed(2)}
                </strong>
              </div>
            ))}
          </div>
        </section>

        {/* TOKEN BREAKDOWN */}
        <section className="costs-panel">
          <div className="costs-panel-header compact">
            <div>
              <span className="costs-panel-kicker">
                CONSUMPTION
              </span>
              <h2>Token economics</h2>
              <p>Input and output token consumption.</p>
            </div>
          </div>

          <div className="token-economics">
            <div className="token-total">
              <span>Total tokens</span>
              <strong>51.2M</strong>
            </div>

            <div className="token-bar">
              <div className="token-input" />
              <div className="token-output" />
            </div>

            <div className="token-legend">
              <div>
                <span className="token-dot input" />
                <div>
                  <strong>35.1M</strong>
                  <span>Input tokens</span>
                </div>
              </div>

              <div>
                <span className="token-dot output" />
                <div>
                  <strong>16.1M</strong>
                  <span>Output tokens</span>
                </div>
              </div>
            </div>

            <div className="token-stats">
              <div>
                <span>Input share</span>
                <strong>68.6%</strong>
              </div>

              <div>
                <span>Output share</span>
                <strong>31.4%</strong>
              </div>

              <div>
                <span>Avg / request</span>
                <strong>39.9K</strong>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MODEL TABLE */}
      <section className="costs-panel costs-model-panel">
        <div className="costs-panel-header">
          <div>
            <span className="costs-panel-kicker">
              MODEL ECONOMICS
            </span>
            <h2>Model cost breakdown</h2>
            <p>
              Detailed spend and token usage for each active model.
            </p>
          </div>

          <div className="costs-search">
            <span>⌕</span>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search models..."
            />
          </div>
        </div>

        <div className="costs-table-wrap">
          <table className="costs-table">
            <thead>
              <tr>
                <th>MODEL</th>
                <th>REQUESTS</th>
                <th>INPUT TOKENS</th>
                <th>OUTPUT TOKENS</th>
                <th>TOTAL COST</th>
                <th>COST / 1K</th>
                <th>TREND</th>
              </tr>
            </thead>

            <tbody>
              {filteredModels.map((model) => {
                const requestCount =
                  parseFloat(model.requests.replace("K", "")) * 1000;

                const costPerThousand =
                  (model.cost / requestCount) * 1000;

                return (
                  <tr key={model.model}>
                    <td>
                      <div className="cost-model-cell">
                        <div className="cost-model-icon">
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
                    <td>{model.inputTokens}</td>
                    <td>{model.outputTokens}</td>

                    <td>
                      <strong className="table-cost">
                        ${model.cost.toFixed(2)}
                      </strong>
                    </td>

                    <td>${costPerThousand.toFixed(3)}</td>

                    <td>
                      <span
                        className={`cost-trend ${
                          model.trend >= 0 ? "up" : "down"
                        }`}
                      >
                        {model.trend >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(model.trend).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* REGIONAL COSTS */}
      <section className="costs-panel costs-region-panel">
        <div className="costs-panel-header">
          <div>
            <span className="costs-panel-kicker">
              REGIONAL ALLOCATION
            </span>
            <h2>Spend by region</h2>
            <p>Regional distribution of inference expenditure.</p>
          </div>

          <span className="costs-total-label">
            Total <strong>$244.43</strong>
          </span>
        </div>

        <div className="region-cost-grid">
          {regions.map((region) => (
            <div className="region-cost-card" key={region.region}>
              <div className="region-cost-top">
                <div>
                  <span className="region-cost-status" />
                  <strong>{region.region}</strong>
                </div>

                <span>{region.percentage}%</span>
              </div>

              <strong className="region-cost-value">
                ${region.cost.toFixed(2)}
              </strong>

              <div className="region-cost-bar">
                <div
                  style={{
                    width: `${region.percentage}%`,
                  }}
                />
              </div>

              <div className="region-cost-meta">
                <span>{region.requests} requests</span>
                <span>{region.avgCost}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div className="costs-footer-note">
        <span className="costs-footer-dot" />
        Costs are calculated from provider usage and Nexus routing telemetry.
        Actual provider billing may vary.
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function CostStat({
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
    <div className="cost-stat">
      <span className="cost-stat-label">{label}</span>

      <strong>{value}</strong>

      <span
        className={`cost-stat-detail ${
          positive ? "positive" : ""
        }`}
      >
        {detail}
      </span>
    </div>
  );
}