"use client";

import { useEffect, useState } from "react";

/* =========================================================
   ICONS
========================================================= */

function NexusMark() {
  return (
    <span className="nx-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Arrow({ direction = "↗" }: { direction?: string }) {
  return <span className="nx-arrow">{direction}</span>;
}

function StatusDot() {
  return <span className="nx-status-dot" aria-hidden="true" />;
}

/* =========================================================
   HERO — REQUEST PIPELINE
========================================================= */

function RequestPipeline() {
  return (
    <div className="nx-request-panel">
      <div className="nx-request-top">
        <div className="nx-request-endpoint">
          <span className="nx-method">POST</span>
          <span>/v1/inference</span>
        </div>

        <div className="nx-live">
          <StatusDot />
          LIVE REQUEST
        </div>
      </div>

      <div className="nx-request-content">
        <div className="nx-request-code">
          <span>
            <em>model</em>: <strong>&quot;auto&quot;</strong>
          </span>

          <span>
            <em>strategy</em>: <strong>&quot;balanced&quot;</strong>
          </span>

          <span>
            <em>stream</em>: <strong>true</strong>
          </span>
        </div>

        <div className="nx-pipeline">
          {/* API */}
          <div className="nx-pipeline-node">
            <span className="nx-node-number">01</span>

            <div className="nx-node-icon">
              <span>&lt;/&gt;</span>
            </div>

            <div>
              <h3>API Gateway</h3>
              <p>AUTH · VALIDATE</p>
            </div>
          </div>

          <div className="nx-pipeline-link">
            <span />
          </div>

          {/* ROUTER */}
          <div className="nx-pipeline-node nx-pipeline-node-active">
            <span className="nx-node-number">02</span>

            <div className="nx-node-icon nx-router-icon">
              <i />
              <i />
              <i />
            </div>

            <div>
              <h3>Nexus Router</h3>
              <p>SCORE · ROUTE</p>
            </div>
          </div>

          <div className="nx-pipeline-link">
            <span />
          </div>

          {/* WORKER */}
          <div className="nx-pipeline-node">
            <span className="nx-node-number">03</span>

            <div className="nx-node-icon nx-worker-icon">
              <i />
              <i />
              <i />
              <i />
            </div>

            <div>
              <h3>Model Worker</h3>
              <p>EXECUTE · STREAM</p>
            </div>
          </div>
        </div>

        {/* DECISION */}
        <div className="nx-decision">
          <div className="nx-decision-top">
            <span>ROUTING DECISION</span>
            <strong>2.8ms</strong>
          </div>

          <div className="nx-decision-grid">
            <div>
              <span>MODEL</span>
              <strong>GPT-4.1</strong>
            </div>

            <div>
              <span>WORKER</span>
              <strong>H100 · US-EAST</strong>
            </div>

            <div>
              <span>POLICY</span>
              <strong>Balanced</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong className="nx-selected">
                <StatusDot />
                Selected
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="nx-request-footer">
        <div>
          <span>LATENCY</span>
          <strong>31ms</strong>
        </div>

        <div>
          <span>CAPACITY</span>
          <strong>72%</strong>
        </div>

        <div>
          <span>COST</span>
          <strong>$0.004</strong>
        </div>

        <div className="nx-footer-scan" />
      </div>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="nx-hero" id="top">
      <div className="nx-hero-grid" />
      <div className="nx-hero-glow" />

      <div className="nx-container nx-hero-inner">
        <div className="nx-hero-copy">
          <div className="nx-eyebrow">
            <span />
            DISTRIBUTED AI INFRASTRUCTURE
          </div>

          <h1>
            Infrastructure for
            <br />
            <span>intelligent AI execution.</span>
          </h1>

          <p className="nx-hero-description">
            Nexus is the execution layer between your applications and
            distributed AI compute — intelligently routing every request
            across models, workers and infrastructure.
          </p>

          <div className="nx-hero-actions">
            <a href="/signup" className="nx-primary-button">
              <span>Start building</span>
              <Arrow />
            </a>

            <a href="#lifecycle" className="nx-secondary-button">
              See how it works
              <Arrow />
            </a>
          </div>

          <div className="nx-hero-meta">
            <div>
              <StatusDot />
              SYSTEMS OPERATIONAL
            </div>

            <span>ONE API</span>
            <i />
            <span>DYNAMIC ROUTING</span>
            <i />
            <span>DISTRIBUTED EXECUTION</span>
          </div>
        </div>

        <div className="nx-hero-visual">
          <RequestPipeline />
        </div>
      </div>

      <div className="nx-container nx-hero-bottom">
        <div>
          <span>01</span>
          <strong>UNIFIED API</strong>
          <p>One interface across models and providers.</p>
        </div>

        <div>
          <span>02</span>
          <strong>ADAPTIVE ROUTING</strong>
          <p>Execution decisions based on live signals.</p>
        </div>

        <div>
          <span>03</span>
          <strong>FAULT TOLERANCE</strong>
          <p>Retries, queues and failover built into execution.</p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  scrolled,
  open,
  setOpen,
}: {
  scrolled: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const links = [
    ["Platform", "#platform"],
    ["Lifecycle", "#lifecycle"],
    ["Architecture", "#architecture"],
    ["Developers", "#developers"],
    ["Pricing", "#pricing"],
  ];

  return (
    <nav className={`nx-navbar ${scrolled ? "nx-navbar-scrolled" : ""}`}>
      <a href="#top" className="nx-brand">
        <NexusMark />
        <span>NEXUS</span>
      </a>

      <div className={`nx-nav-links ${open ? "nx-nav-open" : ""}`}>
        {links.map(([label, href]) => (
          <a href={href} key={label} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </div>

      <div className="nx-nav-actions">
        <a href="/signin" className="nx-sign-in">
            Sign in
        </a>

        <a href="/signup" className="nx-nav-button">
          Start building
          <Arrow />
        </a>
      </div>

      <button
        className="nx-mobile-menu"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? "×" : "☰"}
      </button>
    </nav>
  );
}

/* =========================================================
   PROBLEM
========================================================= */

function ProblemSection() {
  const problems = [
    {
      number: "01",
      title: "Every provider behaves differently.",
      description:
        "Different APIs, SDKs, authentication systems and response formats force engineering teams to maintain provider-specific integrations.",
      visual: (
        <div className="nx-problem-visual nx-provider-visual">
          <div className="nx-app-box">YOUR APP</div>

          <div className="nx-provider-list">
            <div>
              <strong>OpenAI</strong>
              <span>/v1/chat</span>
            </div>

            <div>
              <strong>Anthropic</strong>
              <span>/messages</span>
            </div>

            <div>
              <strong>Google</strong>
              <span>/generate</span>
            </div>
          </div>

          <div className="nx-problem-count">3 PROVIDER APIS</div>
        </div>
      ),
    },
    {
      number: "02",
      title: "A model choice is not a routing strategy.",
      description:
        "The model that looks best during development may not be the best choice when traffic changes, latency rises or a region becomes overloaded.",
      visual: (
        <div className="nx-problem-visual nx-routing-visual">
          <div className="nx-route-request">REQUEST</div>

          <div className="nx-route-options">
            <div>
              <span>GPT-4.1</span>
              <strong>31ms</strong>
            </div>

            <div className="nx-route-selected">
              <span>CLAUDE</span>
              <strong>38ms</strong>
            </div>

            <div>
              <span>DEEPSEEK</span>
              <strong>44ms</strong>
            </div>
          </div>

          <div className="nx-route-signal">
            <span>LIVE SIGNALS</span>
            <strong>LATENCY · LOAD · COST · HEALTH</strong>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: "Compute is distributed. Requests are not.",
      description:
        "GPU capacity and workloads fluctuate independently. Without coordination, one worker can be overloaded while another remains underutilized.",
      visual: (
        <div className="nx-problem-visual nx-compute-visual">
          <div className="nx-gpu-row">
            <span>GPU 01</span>
            <div>
              <i style={{ width: "32%" }} />
            </div>
            <strong>32%</strong>
          </div>

          <div className="nx-gpu-row">
            <span>GPU 02</span>
            <div>
              <i style={{ width: "94%" }} />
            </div>
            <strong>94%</strong>
          </div>

          <div className="nx-gpu-row">
            <span>GPU 03</span>
            <div>
              <i style={{ width: "51%" }} />
            </div>
            <strong>51%</strong>
          </div>

          <div className="nx-compute-warning">
            UNEVEN WORKLOAD
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="nx-problem-section" id="platform">
      <div className="nx-container">
        <div className="nx-section-intro">
          <div className="nx-eyebrow">
            <span />
            THE INFRASTRUCTURE GAP
          </div>

          <h2>
            AI applications are
            <br />
            becoming <em>distributed.</em>
          </h2>

          <p>
            But the infrastructure connecting applications to models,
            providers and compute is still fragmented.
          </p>
        </div>

        <div className="nx-problem-grid">
          {problems.map((problem) => (
            <article className="nx-problem-card" key={problem.number}>
              <div className="nx-card-top">
                <span>{problem.number}</span>
                <i />
              </div>

              {problem.visual}

              <div className="nx-problem-copy">
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </div>

              <div className="nx-card-bottom">
                <span>INFRASTRUCTURE PROBLEM</span>
                <Arrow />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SOLUTION
========================================================= */

function SolutionSection() {
  return (
    <section className="nx-solution-section">
      <div className="nx-container">
        <div className="nx-solution-heading">
          <div>
            <span className="nx-section-index">02 / THE SOLUTION</span>

            <h2>
              One intelligent layer
              <br />
              between <em>you and compute.</em>
            </h2>
          </div>

          <p>
            Nexus sits between your application and distributed AI
            infrastructure. You send one standardized request. Nexus decides
            how, where and through which model it should execute.
          </p>
        </div>

        <div className="nx-solution-diagram">
          <div className="nx-solution-node">
            <span>APPLICATION</span>
            <strong>YOUR REQUEST</strong>
            <small>One API interface</small>
          </div>

          <div className="nx-solution-arrow">
            <span />
          </div>

          <div className="nx-solution-core">
            <div className="nx-core-mark">
              <NexusMark />
            </div>

            <strong>NEXUS</strong>
            <span>ROUTE · OPTIMIZE · OBSERVE</span>
          </div>

          <div className="nx-solution-arrow">
            <span />
          </div>

          <div className="nx-solution-targets">
            <div>
              <span>MODEL</span>
              <strong>GPT-4.1</strong>
            </div>

            <div>
              <span>MODEL</span>
              <strong>CLAUDE</strong>
            </div>

            <div>
              <span>WORKER</span>
              <strong>H100 / EU</strong>
            </div>

            <div>
              <span>WORKER</span>
              <strong>vLLM / GPU</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   LIFECYCLE
========================================================= */

function LifecycleSection() {
  const steps = [
    {
      number: "01",
      title: "Request",
      subtitle: "Your application sends one API call.",
      detail:
        "Nexus accepts a standardized inference request so your application does not need to understand every downstream provider.",
      code: "POST /v1/inference",
    },
    {
      number: "02",
      title: "Validate",
      subtitle: "The gateway authenticates and normalizes it.",
      detail:
        "Authentication, schema validation, rate limits and request normalization happen before the request enters the execution layer.",
      code: "AUTH → VALIDATE → NORMALIZE",
    },
    {
      number: "03",
      title: "Observe",
      subtitle: "Nexus reads the current infrastructure state.",
      detail:
        "Latency, worker health, model availability, queue depth, cost and capacity become routing signals.",
      code: "LATENCY + LOAD + COST + HEALTH",
    },
    {
      number: "04",
      title: "Route",
      subtitle: "The router scores possible execution paths.",
      detail:
        "Nexus dynamically selects the model and worker combination that best matches the current request and routing policy.",
      code: "SCORE → RANK → SELECT",
    },
    {
      number: "05",
      title: "Execute",
      subtitle: "The request reaches the selected worker.",
      detail:
        "Requests can be sent to hosted providers or Nexus-managed distributed workers, with retries and failover when required.",
      code: "WORKER → MODEL → INFERENCE",
    },
    {
      number: "06",
      title: "Respond",
      subtitle: "The result streams back through Nexus.",
      detail:
        "The response returns through the same API boundary while telemetry is recorded for the complete execution trace.",
      code: "MODEL → NEXUS → APPLICATION",
    },
  ];

  return (
    <section className="nx-lifecycle-section" id="lifecycle">
      <div className="nx-container">
        <div className="nx-two-column-heading">
          <div>
            <span className="nx-section-index">03 / API LIFECYCLE</span>

            <h2>
              From request
              <br />
              to <em>response.</em>
            </h2>
          </div>

          <p>
            Nexus transforms a simple API call into an intelligent distributed
            execution process. Every stage has a defined responsibility.
          </p>
        </div>

        <div className="nx-lifecycle">
          <div className="nx-lifecycle-line" />

          {steps.map((step, index) => (
            <article
              className={`nx-lifecycle-step ${
                index % 2 === 1 ? "nx-step-right" : ""
              }`}
              key={step.number}
            >
              <div className="nx-step-marker">{step.number}</div>

              <div className="nx-step-content">
                <div className="nx-step-label">
                  <span>STAGE {step.number}</span>
                  <StatusDot />
                </div>

                <h3>{step.title}</h3>

                <strong>{step.subtitle}</strong>

                <p>{step.detail}</p>

                <code>{step.code}</code>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ROUTER
========================================================= */

function RouterSection() {
  const models = [
    ["GPT-4.1", "31ms", "$0.004", "96"],
    ["Claude", "38ms", "$0.003", "91"],
    ["DeepSeek", "44ms", "$0.001", "87"],
  ];

  return (
    <section className="nx-router-section">
      <div className="nx-container">
        <div className="nx-two-column-heading">
          <div>
            <span className="nx-section-index">
              04 / INTELLIGENT ROUTING
            </span>

            <h2>
              The route is
              <br />
              <em>never static.</em>
            </h2>
          </div>

          <p>
            Nexus continuously evaluates available execution paths. Routing
            policies can balance latency, cost, model capability and
            infrastructure health.
          </p>
        </div>

        <div className="nx-router-interface">
          <aside className="nx-router-sidebar">
            <span>ROUTING POLICY</span>

            <div className="nx-policy nx-policy-active">
              <i />
              <strong>Balanced</strong>
              <small>Latency + Cost</small>
            </div>

            <div className="nx-policy">
              <i />
              <strong>Lowest latency</strong>
              <small>Performance first</small>
            </div>

            <div className="nx-policy">
              <i />
              <strong>Cost optimized</strong>
              <small>Spend first</small>
            </div>
          </aside>

          <div className="nx-router-main">
            <div className="nx-router-header">
              <span>NEXUS / ROUTER</span>

              <strong>
                <StatusDot />
                LIVE
              </strong>
            </div>

            <div className="nx-incoming-request">
              <span>INCOMING REQUEST</span>
              <strong>customer-support / summarize</strong>
            </div>

            <div className="nx-route-table">
              <div className="nx-route-table-head">
                <span>PATH</span>
                <span>LATENCY</span>
                <span>COST</span>
                <span>SCORE</span>
              </div>

              {models.map(([model, latency, cost, score], index) => (
                <div
                  className={`nx-route-row ${
                    index === 0 ? "nx-route-row-selected" : ""
                  }`}
                  key={model}
                >
                  <strong>
                    <span>0{index + 1}</span>
                    {model}
                  </strong>

                  <span>{latency}</span>
                  <span>{cost}</span>
                  <b>{score}</b>
                </div>
              ))}
            </div>

            <div className="nx-selected-route">
              <span>SELECTED EXECUTION PATH</span>
              <strong>GPT-4.1 → H100 / US-EAST</strong>
              <small>
                Policy score 96 · healthy · available capacity 72%
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CAPABILITIES
========================================================= */

function CapabilitiesSection() {
  const capabilities = [
    [
      "01",
      "Unified inference API",
      "One consistent interface across hosted models and distributed workers.",
    ],
    [
      "02",
      "Dynamic routing",
      "Make execution decisions using live infrastructure and request signals.",
    ],
    [
      "03",
      "Distributed workers",
      "Run inference across containers, GPUs, regions and model servers.",
    ],
    [
      "04",
      "Semantic cache",
      "Detect equivalent requests and reduce unnecessary inference work.",
    ],
    [
      "05",
      "Resilience",
      "Health checks, retries, failover and graceful degradation keep requests moving.",
    ],
    [
      "06",
      "Observability",
      "Trace requests, routing decisions, model performance and infrastructure health.",
    ],
  ];

  return (
    <section className="nx-capabilities-section">
      <div className="nx-container">
        <span className="nx-section-index">05 / PLATFORM CAPABILITIES</span>

        <div className="nx-capabilities-heading">
          <h2>
            Infrastructure
            <br />
            that <em>thinks ahead.</em>
          </h2>

          <p>
            Nexus is designed as an execution platform rather than another
            model wrapper.
          </p>
        </div>

        <div className="nx-capability-grid">
          {capabilities.map(([number, title, description]) => (
            <article className="nx-capability-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Arrow />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ARCHITECTURE
========================================================= */

function ArchitectureSection() {
  const layers = [
    ["01", "API Gateway", "Auth · validation · rate limiting"],
    ["02", "Intelligent Router", "Scoring · policy · model selection"],
    ["03", "Request Queue", "Backpressure · scheduling · priority"],
    ["04", "Semantic Cache", "Embeddings · similarity · reuse"],
    ["05", "Model Workers", "vLLM · containers · GPU execution"],
    ["06", "Observability", "Traces · metrics · health · cost"],
  ];

  return (
    <section className="nx-architecture-section" id="architecture">
      <div className="nx-container">
        <div className="nx-two-column-heading">
          <div>
            <span className="nx-section-index">06 / ARCHITECTURE</span>

            <h2>
              A control plane
              <br />
              for <em>AI execution.</em>
            </h2>
          </div>

          <p>
            Each layer has a focused responsibility. Together they form the
            execution fabric between applications and distributed AI compute.
          </p>
        </div>

        <div className="nx-architecture-stack">
          {layers.map(([number, title, description], index) => (
            <div className="nx-architecture-layer" key={number}>
              <span className="nx-layer-number">{number}</span>

              <div className="nx-layer-copy">
                <strong>{title}</strong>
                <span>{description}</span>
              </div>

              <div className="nx-layer-bar">
                <i style={{ width: `${48 + index * 8}%` }} />
              </div>

              <span className="nx-layer-status">
                <StatusDot />
                READY
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DEVELOPER
========================================================= */

function DeveloperSection() {
  return (
    <section className="nx-developer-section" id="developers">
      <div className="nx-container nx-developer-layout">
        <div className="nx-developer-copy">
          <span className="nx-section-index">
            07 / DEVELOPER EXPERIENCE
          </span>

          <h2>
            One endpoint.
            <br />
            <em>Less infrastructure.</em>
          </h2>

          <p>
            Your application talks to Nexus. Nexus handles the complexity
            underneath — routing, execution, resilience and observability.
          </p>

          <a href="#lifecycle" className="nx-outline-button">
            Explore the lifecycle
            <Arrow />
          </a>
        </div>

        <div className="nx-code-window">
          <div className="nx-code-header">
            <span>NEXUS / API</span>

            <span>
              <StatusDot />
              POST /v1/inference
            </span>
          </div>

          <pre>{`const response = await nexus.inference({
  model: "auto",

  messages: [
    {
      role: "user",
      content: "Summarize this document"
    }
  ],

  routing: {
    strategy: "balanced"
  }
});

console.log(response.output);`}</pre>

          <div className="nx-code-footer">
            <span>MODEL AUTO-SELECTED</span>
            <span>ROUTE 28ms</span>
            <span>STREAMING</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   USE CASES
========================================================= */

function UseCasesSection() {
  const useCases = [
    ["01", "AI SaaS", "Scale inference without rebuilding your infrastructure."],
    [
      "02",
      "Enterprise",
      "Centralize access, governance and observability.",
    ],
    [
      "03",
      "Research",
      "Experiment across models and compute environments.",
    ],
    [
      "04",
      "AI Agents",
      "Route high-volume, variable workloads intelligently.",
    ],
  ];

  return (
    <section className="nx-use-case-section" id="pricing">
      <div className="nx-container">
        <span className="nx-section-index">08 / BUILT FOR</span>

        <div className="nx-use-case-heading">
          <h2>
            Whatever you&apos;re
            <br />
            building with <em>AI.</em>
          </h2>

          <p>
            Nexus becomes the infrastructure layer beneath applications,
            agents, experiments and production AI systems.
          </p>
        </div>

        <div className="nx-use-case-grid">
          {useCases.map(([number, title, description]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Arrow />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CTA
========================================================= */

function FinalCTA() {
  return (
    <section className="nx-final-section" id="start">
      <div className="nx-final-grid" />

      <div className="nx-container nx-final-content">
        <span className="nx-section-index">09 / NEXUS</span>

        <h2>
          Build the AI
          <br />
          <em>systems of tomorrow.</em>
        </h2>

        <p>
          One API. Intelligent routing. Distributed execution.
          <br />
          Everything your AI infrastructure needs to move.
        </p>

        <div className="nx-final-actions">
          <a href="/signup" className="nx-primary-button">
            Start building with Nexus
            <Arrow />
          </a>

          <a href="#architecture" className="nx-secondary-button">
            Explore architecture
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="nx-footer" id="company">
      <div className="nx-container nx-footer-grid">
        <a href="#top" className="nx-brand">
          <NexusMark />
          <span>NEXUS</span>
        </a>

        <span className="nx-footer-tagline">
          INTELLIGENT INFRASTRUCTURE FOR AI
        </span>

        <div className="nx-footer-links">
          <a href="#platform">Platform</a>
          <a href="#lifecycle">Lifecycle</a>
          <a href="#architecture">Architecture</a>
          <a href="#developers">Developers</a>
        </div>

        <small>© 2026 NEXUS</small>
      </div>
    </footer>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="nx-page">
      <Navbar
        scrolled={scrolled}
        open={menuOpen}
        setOpen={setMenuOpen}
      />

      <Hero />

      <ProblemSection />

      <SolutionSection />

      <LifecycleSection />

      <RouterSection />

      <CapabilitiesSection />

      <ArchitectureSection />

      <DeveloperSection />

      <UseCasesSection />

      <FinalCTA />

      <Footer />
    </main>
  );
}