"use client";

import { useMemo, useState } from "react";

type WorkerStatus = "Healthy" | "Draining" | "Degraded";

type Worker = {
  id: string;
  name: string;
  region: string;
  zone: string;
  gpu: string;
  gpuCount: number;
  utilization: number;
  memory: number;
  requests: string;
  latency: number;
  uptime: string;
  models: string[];
  status: WorkerStatus;
};

const workers: Worker[] = [
  {
    id: "worker-us-east-03",
    name: "worker-us-east-03",
    region: "US-EAST",
    zone: "us-east-1a",
    gpu: "H100",
    gpuCount: 8,
    utilization: 72,
    memory: 68,
    requests: "18.4K",
    latency: 182,
    uptime: "14d 08h",
    models: ["GPT-4.1", "DeepSeek V3"],
    status: "Healthy",
  },
  {
    id: "worker-us-east-07",
    name: "worker-us-east-07",
    region: "US-EAST",
    zone: "us-east-1b",
    gpu: "H100",
    gpuCount: 8,
    utilization: 84,
    memory: 79,
    requests: "21.7K",
    latency: 194,
    uptime: "11d 03h",
    models: ["GPT-4.1", "Claude Sonnet 4"],
    status: "Healthy",
  },
  {
    id: "worker-us-east-11",
    name: "worker-us-east-11",
    region: "US-EAST",
    zone: "us-east-1c",
    gpu: "A100",
    gpuCount: 8,
    utilization: 91,
    memory: 88,
    requests: "16.2K",
    latency: 231,
    uptime: "7d 19h",
    models: ["Llama 4 Maverick"],
    status: "Degraded",
  },
  {
    id: "worker-eu-west-02",
    name: "worker-eu-west-02",
    region: "EU-WEST",
    zone: "eu-west-1a",
    gpu: "H100",
    gpuCount: 8,
    utilization: 61,
    memory: 57,
    requests: "13.9K",
    latency: 176,
    uptime: "21d 02h",
    models: ["GPT-4.1 mini", "Claude 3.5 Haiku"],
    status: "Healthy",
  },
  {
    id: "worker-eu-west-05",
    name: "worker-eu-west-05",
    region: "EU-WEST",
    zone: "eu-west-1b",
    gpu: "L40S",
    gpuCount: 8,
    utilization: 48,
    memory: 43,
    requests: "8.7K",
    latency: 203,
    uptime: "19d 14h",
    models: ["Claude 3.5 Haiku"],
    status: "Healthy",
  },
  {
    id: "worker-ap-south-01",
    name: "worker-ap-south-01",
    region: "AP-SOUTH",
    zone: "ap-south-1a",
    gpu: "H100",
    gpuCount: 8,
    utilization: 67,
    memory: 62,
    requests: "11.3K",
    latency: 188,
    uptime: "9d 06h",
    models: ["DeepSeek V3", "GPT-4.1"],
    status: "Draining",
  },
];

const regions = [
  "All regions",
  "US-EAST",
  "EU-WEST",
  "AP-SOUTH",
];

const statuses = [
  "All statuses",
  "Healthy",
  "Degraded",
  "Draining",
];

export default function WorkersPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All regions");
  const [status, setStatus] = useState("All statuses");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const query = search.toLowerCase();

      const matchesSearch =
        worker.name.toLowerCase().includes(query) ||
        worker.gpu.toLowerCase().includes(query) ||
        worker.region.toLowerCase().includes(query);

      const matchesRegion =
        region === "All regions" ||
        worker.region === region;

      const matchesStatus =
        status === "All statuses" ||
        worker.status === status;

      return (
        matchesSearch &&
        matchesRegion &&
        matchesStatus
      );
    });
  }, [search, region, status]);

  const healthy = workers.filter(
    (worker) => worker.status === "Healthy"
  ).length;

  const degraded = workers.filter(
    (worker) => worker.status === "Degraded"
  ).length;

  const draining = workers.filter(
    (worker) => worker.status === "Draining"
  ).length;

  const totalGpu = workers.reduce(
    (total, worker) => total + worker.gpuCount,
    0
  );

  const avgUtilization = Math.round(
    workers.reduce(
      (total, worker) => total + worker.utilization,
      0
    ) / workers.length
  );

  return (
    <div className="workers-page">
      {/* HEADER */}

      <header className="workers-header">
        <div>
          <div className="workers-eyebrow">
            INFRASTRUCTURE / WORKERS
          </div>

          <h1>Workers</h1>

          <p>
            Monitor compute capacity, worker health, and
            inference workloads across your infrastructure.
          </p>
        </div>

        <div className="workers-header-actions">
          <button className="workers-refresh-button">
            ↻ Refresh
          </button>

          <button className="workers-add-button">
            <span>+</span>
            Add worker
          </button>
        </div>
      </header>

      {/* INFRASTRUCTURE SUMMARY */}

      <section className="workers-summary">
        <div className="workers-summary-primary">
          <div className="summary-icon">N</div>

          <div>
            <span>COMPUTE CLUSTER</span>

            <strong>Production</strong>

            <small>
              {workers.length} workers · {totalGpu} GPUs
            </small>
          </div>
        </div>

        <div className="workers-summary-stat">
          <span>HEALTHY</span>

          <strong>{healthy}</strong>

          <small>workers online</small>
        </div>

        <div className="workers-summary-stat">
          <span>DEGRADED</span>

          <strong>{degraded}</strong>

          <small>require attention</small>
        </div>

        <div className="workers-summary-stat">
          <span>DRAINING</span>

          <strong>{draining}</strong>

          <small>leaving rotation</small>
        </div>

        <div className="workers-summary-stat">
          <span>AVG UTILIZATION</span>

          <strong>{avgUtilization}%</strong>

          <small>GPU utilization</small>
        </div>
      </section>

      {/* CAPACITY */}

      <section className="workers-capacity">
        <div className="capacity-heading">
          <div>
            <span>CLUSTER CAPACITY</span>

            <strong>GPU utilization</strong>
          </div>

          <div className="capacity-legend">
            <span>
              <i className="healthy" />
              Healthy
            </span>

            <span>
              <i className="warning" />
              High utilization
            </span>
          </div>
        </div>

        <div className="capacity-grid">
          {workers.map((worker) => (
            <div
              className="worker-capacity"
              key={worker.id}
            >
              <div className="worker-capacity-top">
                <span>{worker.name}</span>

                <strong>
                  {worker.utilization}%
                </strong>
              </div>

              <div className="worker-capacity-track">
                <span
                  className={
                    worker.utilization >= 85
                      ? "high"
                      : ""
                  }
                  style={{
                    width: `${worker.utilization}%`,
                  }}
                />
              </div>

              <div className="worker-capacity-bottom">
                <span>
                  {worker.gpuCount}× {worker.gpu}
                </span>

                <span>{worker.region}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKER REGISTRY */}

      <section className="workers-registry">
        <div className="workers-toolbar">
          <div className="workers-search">
            <span>⌕</span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search workers, GPU, or region..."
            />

            <kbd>⌘ K</kbd>
          </div>

          <div className="workers-filters">
            <select
              value={region}
              onChange={(event) =>
                setRegion(event.target.value)
              }
            >
              {regions.map((item) => (
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

            <button className="worker-filter-button">
              Filters
            </button>
          </div>
        </div>

        {/* TABLE HEADER */}

        <div className="workers-table-head">
          <span>WORKER</span>
          <span>STATUS</span>
          <span>COMPUTE</span>
          <span>UTILIZATION</span>
          <span>MEMORY</span>
          <span>REQUESTS</span>
          <span>LATENCY</span>
          <span>UPTIME</span>
        </div>

        {/* WORKERS */}

        <div className="workers-table">
          {filteredWorkers.map((worker) => {
            const isExpanded =
              expanded === worker.id;

            return (
              <div
                className={`worker-row-wrapper ${
                  isExpanded ? "expanded" : ""
                }`}
                key={worker.id}
              >
                <button
                  className="worker-row"
                  onClick={() =>
                    setExpanded(
                      isExpanded ? null : worker.id
                    )
                  }
                >
                  {/* WORKER */}

                  <div className="worker-primary">
                    <div className="worker-status-icon">
                      <span
                        className={
                          worker.status
                            .toLowerCase()
                            .replace(" ", "-")
                        }
                      />

                      <strong>H</strong>
                    </div>

                    <div>
                      <strong>{worker.name}</strong>

                      <span>
                        {worker.region} · {worker.zone}
                      </span>
                    </div>
                  </div>

                  {/* STATUS */}

                  <div>
                    <span
                      className={`worker-status ${worker.status.toLowerCase()}`}
                    >
                      <i />
                      {worker.status}
                    </span>
                  </div>

                  {/* COMPUTE */}

                  <div className="worker-compute">
                    <strong>
                      {worker.gpuCount}× {worker.gpu}
                    </strong>

                    <span>NVIDIA GPU</span>
                  </div>

                  {/* UTILIZATION */}

                  <div className="worker-utilization">
                    <div className="utilization-bar">
                      <span
                        className={
                          worker.utilization >= 85
                            ? "high"
                            : ""
                        }
                        style={{
                          width: `${worker.utilization}%`,
                        }}
                      />
                    </div>

                    <strong>
                      {worker.utilization}%
                    </strong>
                  </div>

                  {/* MEMORY */}

                  <div className="worker-memory">
                    <strong>
                      {worker.memory}%
                    </strong>

                    <span>allocated</span>
                  </div>

                  {/* REQUESTS */}

                  <div className="worker-table-value">
                    {worker.requests}
                  </div>

                  {/* LATENCY */}

                  <div className="worker-table-value">
                    {worker.latency}ms
                  </div>

                  {/* UPTIME */}

                  <div className="worker-table-value">
                    {worker.uptime}
                  </div>

                  <span className="worker-expand">
                    {isExpanded ? "⌃" : "›"}
                  </span>
                </button>

                {/* EXPANDED */}

                {isExpanded && (
                  <div className="worker-expanded">
                    <div className="worker-detail">
                      <span>DEPLOYED MODELS</span>

                      <div className="worker-model-list">
                        {worker.models.map((model) => (
                          <span key={model}>
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="worker-detail">
                      <span>GPU MEMORY</span>

                      <strong>
                        {worker.memory}% allocated
                      </strong>

                      <div className="detail-progress">
                        <span
                          style={{
                            width: `${worker.memory}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="worker-detail">
                      <span>NETWORK</span>

                      <strong>18.4 Gbps</strong>

                      <small>
                        2.1 Gbps ingress · 16.3 Gbps
                        egress
                      </small>
                    </div>

                    <div className="worker-detail">
                      <span>HEALTH</span>

                      <strong>
                        All systems operational
                      </strong>

                      <small>
                        Last heartbeat 4 seconds ago
                      </small>
                    </div>

                    <div className="worker-detail-actions">
                      <button>
                        View metrics
                      </button>

                      <button>
                        Worker logs
                      </button>

                      {worker.status !==
                        "Draining" && (
                        <button className="danger">
                          Drain worker
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredWorkers.length === 0 && (
            <div className="workers-empty">
              <div>⌕</div>

              <strong>No workers found</strong>

              <span>
                Try changing your search or filters.
              </span>
            </div>
          )}
        </div>

        <div className="workers-footer">
          <span>
            {filteredWorkers.length} of{" "}
            {workers.length} workers
          </span>

          <span>
            Cluster state updated 8 seconds ago
          </span>
        </div>
      </section>
    </div>
  );
}