"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type RequestStatus = "Success" | "Error" | "Rate limited";

type Request = {
  id: string;
  time: string;
  model: string;
  provider: string;
  status: RequestStatus;
  latency: number;
  tokens: number;
  cost: string;
  route: string;
};

const requests: Request[] = [
  {
    id: "req_8f29a1c73d",
    time: "12 sec ago",
    model: "GPT-4.1",
    provider: "OpenAI",
    status: "Success",
    latency: 184,
    tokens: 258,
    cost: "$0.0042",
    route: "US-EAST",
  },
  {
    id: "req_7ac921be42",
    time: "38 sec ago",
    model: "Claude Sonnet 4",
    provider: "Anthropic",
    status: "Success",
    latency: 241,
    tokens: 412,
    cost: "$0.0068",
    route: "US-EAST",
  },
  {
    id: "req_62d81fc921",
    time: "1 min ago",
    model: "DeepSeek V3",
    provider: "DeepSeek",
    status: "Success",
    latency: 146,
    tokens: 337,
    cost: "$0.0019",
    route: "US-EAST",
  },
  {
    id: "req_51a8cfe123",
    time: "2 min ago",
    model: "GPT-4.1",
    provider: "OpenAI",
    status: "Success",
    latency: 197,
    tokens: 184,
    cost: "$0.0037",
    route: "EU-WEST",
  },
  {
    id: "req_44d7aa821f",
    time: "3 min ago",
    model: "Llama 4 Maverick",
    provider: "Meta",
    status: "Rate limited",
    latency: 92,
    tokens: 0,
    cost: "$0.0000",
    route: "US-EAST",
  },
  {
    id: "req_3b91fe712a",
    time: "4 min ago",
    model: "Claude Sonnet 4",
    provider: "Anthropic",
    status: "Success",
    latency: 228,
    tokens: 521,
    cost: "$0.0074",
    route: "EU-WEST",
  },
  {
    id: "req_2c81df903e",
    time: "5 min ago",
    model: "GPT-4.1",
    provider: "OpenAI",
    status: "Error",
    latency: 311,
    tokens: 0,
    cost: "$0.0000",
    route: "US-EAST",
  },
  {
    id: "req_18ac72de91",
    time: "6 min ago",
    model: "DeepSeek V3",
    provider: "DeepSeek",
    status: "Success",
    latency: 153,
    tokens: 294,
    cost: "$0.0017",
    route: "US-EAST",
  },
  {
    id: "req_09bd42af82",
    time: "8 min ago",
    model: "GPT-4.1",
    provider: "OpenAI",
    status: "Success",
    latency: 176,
    tokens: 361,
    cost: "$0.0049",
    route: "US-EAST",
  },
];

const filters = ["All", "Success", "Error", "Rate limited"];

export default function RequestsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [modelFilter, setModelFilter] = useState("All models");

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        request.id.toLowerCase().includes(search.toLowerCase()) ||
        request.model.toLowerCase().includes(search.toLowerCase()) ||
        request.provider.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        activeFilter === "All" ||
        request.status === activeFilter;

      const matchesModel =
        modelFilter === "All models" ||
        request.model === modelFilter;

      return matchesSearch && matchesStatus && matchesModel;
    });
  }, [search, activeFilter, modelFilter]);

  return (
    <div className="requests-page">
      {/* HEADER */}

      <header className="requests-header">
        <div>
          <div className="requests-eyebrow">
            INFERENCE / REQUESTS
          </div>

          <h1>Requests</h1>

          <p>
            Inspect every inference request flowing through
            Nexus.
          </p>
        </div>

        <div className="requests-header-stats">
          <div>
            <span>LAST 24H</span>
            <strong>1.28M</strong>
          </div>

          <div>
            <span>SUCCESS</span>
            <strong>99.97%</strong>
          </div>

          <div>
            <span>P95</span>
            <strong>182ms</strong>
          </div>
        </div>
      </header>

      {/* TRAFFIC OVERVIEW */}

      <section className="requests-overview">
        <div className="requests-overview-heading">
          <div>
            <span>REQUEST VOLUME</span>
            <strong>48,291</strong>
            <small>requests / hour</small>
          </div>

          <div className="traffic-period">
            <button className="active">24H</button>
            <button>7D</button>
            <button>30D</button>
          </div>
        </div>

        <div className="request-chart">
          {Array.from({ length: 42 }).map((_, index) => {
            const heights = [
              24, 31, 28, 42, 37, 51, 44,
              57, 49, 61, 54, 67, 59, 72,
              64, 77, 69, 82, 75, 88, 79,
              68, 84, 73, 91, 76, 85, 69,
              79, 64, 72, 57, 68, 61, 74,
              65, 80, 72, 88, 76, 82, 91,
            ];

            return (
              <span
                key={index}
                style={{
                  height: `${heights[index]}%`,
                }}
              />
            );
          })}
        </div>

        <div className="request-chart-labels">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>NOW</span>
        </div>
      </section>

      {/* FILTER BAR */}

      <section className="requests-explorer">
        <div className="requests-toolbar">
          <div className="request-search">
            <span>⌕</span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search request ID, model, or provider..."
            />

            <kbd>⌘ K</kbd>
          </div>

          <div className="request-filter-group">
            <select
              value={modelFilter}
              onChange={(event) =>
                setModelFilter(event.target.value)
              }
            >
              <option>All models</option>
              <option>GPT-4.1</option>
              <option>Claude Sonnet 4</option>
              <option>DeepSeek V3</option>
              <option>Llama 4 Maverick</option>
            </select>

            <button className="filter-button">
              Region <span>US-EAST</span>⌄
            </button>

            <button className="filter-button">
              Time <span>24 hours</span>⌄
            </button>
          </div>
        </div>

        <div className="request-status-tabs">
          {filters.map((filter) => {
            const count =
              filter === "All"
                ? requests.length
                : requests.filter(
                    (request) => request.status === filter
                  ).length;

            return (
              <button
                key={filter}
                className={
                  activeFilter === filter ? "active" : ""
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
                <span>{count}</span>
              </button>
            );
          })}
        </div>

        {/* TABLE */}

        <div className="requests-table">
          <div className="requests-table-head">
            <span>REQUEST</span>
            <span>MODEL</span>
            <span>STATUS</span>
            <span>LATENCY</span>
            <span>TOKENS</span>
            <span>COST</span>
            <span>REGION</span>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="requests-empty">
              <div>⌕</div>
              <strong>No requests found</strong>
              <span>
                Try changing your search or filters.
              </span>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <Link
                href={`/workspace/requests/${request.id}`}
                key={request.id}
                className="request-row"
              >
                <div className="request-id-cell">
                  <span
                    className={`request-status-indicator ${request.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  />

                  <div>
                    <strong>{request.id}</strong>
                    <span>{request.time}</span>
                  </div>
                </div>

                <div className="request-model-cell">
                  <span className="model-table-icon">
                    {request.model.charAt(0)}
                  </span>

                  <div>
                    <strong>{request.model}</strong>
                    <span>{request.provider}</span>
                  </div>
                </div>

                <div>
                  <span
                    className={`request-status ${request.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    <i />
                    {request.status}
                  </span>
                </div>

                <div className="table-mono">
                  {request.latency}ms
                </div>

                <div className="table-mono">
                  {request.tokens || "—"}
                </div>

                <div className="table-mono">
                  {request.cost}
                </div>

                <div className="region-cell">
                  <span />
                  {request.route}
                </div>

                <div className="row-arrow">→</div>
              </Link>
            ))
          )}
        </div>

        {/* FOOTER */}

        <div className="requests-footer">
          <span>
            Showing {filteredRequests.length} of{" "}
            {requests.length} requests
          </span>

          <div>
            <button disabled>←</button>
            <span>1 / 1</span>
            <button disabled>→</button>
          </div>
        </div>
      </section>
    </div>
  );
}