"use client";

import { useState } from "react";

const models = [
  {
    name: "GPT-4.1",
    provider: "OpenAI",
    context: "1M",
    latency: "182ms",
    icon: "O",
  },
  {
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    context: "200K",
    latency: "241ms",
    icon: "A",
  },
  {
    name: "DeepSeek V3",
    provider: "DeepSeek",
    context: "128K",
    latency: "146ms",
    icon: "D",
  },
  {
    name: "Llama 4 Maverick",
    provider: "Meta",
    context: "1M",
    latency: "198ms",
    icon: "M",
  },
];

const initialMessages = [
  {
    role: "user",
    content:
      "Explain how distributed AI inference platforms improve reliability and latency.",
  },
];

export default function PlaygroundPage() {
  const [selectedModel, setSelectedModel] = useState("GPT-4.1");
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [jsonMode, setJsonMode] = useState(false);
  const [streaming, setStreaming] = useState(true);
  const [running, setRunning] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState("curl");

  const model = models.find((item) => item.name === selectedModel)!;

  function addMessage() {
    if (!input.trim()) return;

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: input.trim(),
      },
    ]);

    setInput("");
  }

  function runRequest() {
    if (running) return;

    setRunning(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Distributed AI inference platforms improve reliability by routing requests across multiple models, providers, and compute workers. Nexus can dynamically select an execution path based on latency, availability, cost, and capacity. This reduces dependency on a single provider while allowing workloads to move toward healthy infrastructure in real time.",
        },
      ]);

      setRunning(false);
    }, 900);
  }

  const code = {
    curl: `curl https://api.nexus.ai/v1/chat/completions \\
  -H "Authorization: Bearer nx_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${selectedModel}",
    "messages": ${JSON.stringify(messages, null, 2)},
    "temperature": ${temperature},
    "max_tokens": ${maxTokens}
  }'`,

    python: `from nexus import Nexus

client = Nexus(api_key="nx_live_...")

response = client.chat.completions.create(
    model="${selectedModel}",
    messages=${JSON.stringify(messages, null, 2)},
    temperature=${temperature},
    max_tokens=${maxTokens},
)`,

    typescript: `import { Nexus } from "@nexus/sdk";

const nexus = new Nexus({
  apiKey: "nx_live_..."
});

const response = await nexus.chat.completions.create({
  model: "${selectedModel}",
  messages: ${JSON.stringify(messages, null, 2)},
  temperature: ${temperature},
  max_tokens: ${maxTokens},
});`,
  };

  return (
    <div className="playground-page">
      {/* HEADER */}

      <header className="playground-header">
        <div>
          <div className="playground-eyebrow">INFERENCE / PLAYGROUND</div>

          <h1>Playground</h1>

          <p>
            Explore inference paths, test models, and inspect requests before
            they reach production.
          </p>
        </div>

        <div className="playground-header-actions">
          <button className="playground-secondary-button">
            <span>⌘</span>
            Save request
          </button>

          <button
            className={`playground-run-button ${
              running ? "is-running" : ""
            }`}
            onClick={runRequest}
          >
            <span>{running ? "◌" : "▶"}</span>
            {running ? "Running..." : "Run request"}
            <kbd>⌘ ↵</kbd>
          </button>
        </div>
      </header>

      {/* CONTROL STRIP */}

      <div className="playground-control-strip">
        <div className="playground-control">
          <span className="control-label">MODEL</span>

          <div className="control-value">
            <span className="model-mini-icon">{model.icon}</span>
            {selectedModel}
          </div>
        </div>

        <div className="control-separator" />

        <div className="playground-control">
          <span className="control-label">ROUTING</span>

          <div className="control-value">
            <span className="control-status-dot" />
            Balanced
          </div>
        </div>

        <div className="control-separator" />

        <div className="playground-control">
          <span className="control-label">REGION</span>

          <div className="control-value">US-EAST</div>
        </div>

        <div className="control-separator" />

        <div className="playground-control">
          <span className="control-label">MODE</span>

          <button
            className={`control-toggle ${streaming ? "active" : ""}`}
            onClick={() => setStreaming(!streaming)}
          >
            <span />
            {streaming ? "Streaming" : "Buffered"}
          </button>
        </div>

        <div className="control-spacer" />

        <div className="control-ready">
          <span />
          System operational
        </div>
      </div>

      {/* MAIN EDITOR */}

      <div className="playground-workspace">
        {/* REQUEST */}

        <section className="playground-editor-panel">
          <div className="playground-panel-toolbar">
            <div className="playground-panel-title">
              <span className="panel-dot" />
              Request
            </div>

            <div className="playground-toolbar-actions">
              <button onClick={() => setMessages(initialMessages)}>
                Reset
              </button>

              <button>•••</button>
            </div>
          </div>

          <div className="playground-editor-content">
            {/* MODEL */}

            <div className="playground-field">
              <div className="field-label-row">
                <label>MODEL</label>
                <span>AVAILABLE</span>
              </div>

              <div className="model-select-wrapper">
                <div className="model-select-icon">{model.icon}</div>

                <select
                  value={selectedModel}
                  onChange={(event) =>
                    setSelectedModel(event.target.value)
                  }
                >
                  {models.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>

                <span className="select-arrow">⌄</span>
              </div>

              <div className="model-meta">
                <span>{model.provider}</span>
                <span>·</span>
                <span>{model.context} context</span>
                <span>·</span>
                <span>{model.latency} avg latency</span>
              </div>
            </div>

            <div className="playground-divider" />

            {/* SYSTEM */}

            <div className="playground-field">
              <div className="field-label-row">
                <label>SYSTEM PROMPT</label>
                <span>INSTRUCTION</span>
              </div>

              <textarea
                className="system-prompt"
                defaultValue="You are a helpful AI infrastructure assistant. Give precise, technical answers with practical examples."
              />
            </div>

            {/* MESSAGES */}

            <div className="playground-field">
              <div className="field-label-row">
                <label>MESSAGES</label>
                <span>{messages.length} messages</span>
              </div>

              <div className="message-stack">
                {messages.map((message, index) => (
                  <div
                    className={`message-card ${message.role}`}
                    key={`${message.role}-${index}`}
                  >
                    <div className="message-card-header">
                      <span
                        className={`message-role-dot ${message.role}`}
                      />

                      <span>{message.role}</span>

                      <button
                        onClick={() =>
                          setMessages((current) =>
                            current.filter((_, i) => i !== index)
                          )
                        }
                      >
                        ×
                      </button>
                    </div>

                    <textarea
                      value={message.content}
                      onChange={(event) => {
                        const value = event.target.value;

                        setMessages((current) =>
                          current.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  content: value,
                                }
                              : item
                          )
                        );
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="message-input">
                <textarea
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      (event.metaKey || event.ctrlKey)
                    ) {
                      event.preventDefault();
                      addMessage();
                    }
                  }}
                  placeholder="Add a message..."
                />

                <button onClick={addMessage}>+</button>
              </div>
            </div>

            {/* ADVANCED */}

            <button
              className="advanced-trigger"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>{showAdvanced ? "⌄" : "›"}</span>
              Advanced parameters
            </button>

            {showAdvanced && (
              <div className="advanced-content">
                <div className="parameter">
                  <div className="parameter-header">
                    <label>Temperature</label>
                    <span>{temperature}</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={temperature}
                    onChange={(event) =>
                      setTemperature(
                        Number(event.target.value)
                      )
                    }
                  />
                </div>

                <div className="parameter">
                  <div className="parameter-header">
                    <label>Max tokens</label>
                    <span>{maxTokens}</span>
                  </div>

                  <input
                    type="range"
                    min="128"
                    max="4096"
                    step="128"
                    value={maxTokens}
                    onChange={(event) =>
                      setMaxTokens(
                        Number(event.target.value)
                      )
                    }
                  />
                </div>

                <div className="parameter-toggle">
                  <div>
                    <label>JSON mode</label>
                    <span>Force structured output</span>
                  </div>

                  <button
                    className={`toggle ${
                      jsonMode ? "active" : ""
                    }`}
                    onClick={() =>
                      setJsonMode(!jsonMode)
                    }
                  >
                    <span />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RESPONSE */}

        <section className="playground-response-panel">
          <div className="playground-panel-toolbar">
            <div className="playground-panel-title">
              <span className="response-status-dot" />
              Response
            </div>

            <div className="response-meta">
              <span className="status-code">200 OK</span>
              <span>184ms</span>
              <span>1.2k tokens</span>
            </div>
          </div>

          <div className="response-content">
            {/* ROUTING */}

            <div className="routing-section">
              <div className="response-section-header">
                <div>
                  <span className="section-kicker">
                    EXECUTION
                  </span>

                  <h3>Routing path</h3>
                </div>

                <span className="execution-time">
                  184ms total
                </span>
              </div>

              <div className="execution-path">
                <div className="path-node">
                  <div className="path-icon">API</div>

                  <div>
                    <strong>Application</strong>
                    <span>incoming request</span>
                  </div>
                </div>

                <div className="path-line">
                  <span />
                </div>

                <div className="path-node active">
                  <div className="path-icon router">
                    N
                  </div>

                  <div>
                    <strong>Nexus Router</strong>
                    <span>Balanced policy</span>
                  </div>
                </div>

                <div className="path-line">
                  <span />
                </div>

                <div className="path-node">
                  <div className="path-icon worker">
                    H
                  </div>

                  <div>
                    <strong>worker-us-east-03</strong>
                    <span>H100 · 72% capacity</span>
                  </div>
                </div>

                <div className="path-line">
                  <span />
                </div>

                <div className="path-node">
                  <div className="path-icon model">
                    {model.icon}
                  </div>

                  <div>
                    <strong>{selectedModel}</strong>
                    <span>{model.provider}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* OUTPUT */}

            <div className="output-section">
              <div className="response-section-header">
                <div>
                  <span className="section-kicker">
                    OUTPUT
                  </span>

                  <h3>Generated response</h3>
                </div>

                <button className="response-action">
                  Copy
                </button>
              </div>

              <div className="output-card">
                {running ? (
                  <div className="output-loading">
                    <div />
                    <div />
                    <div />
                    <span>
                      Executing request through Nexus...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="output-card-top">
                      <span>assistant</span>

                      <span>
                        {streaming
                          ? "stream.complete"
                          : "response.complete"}
                      </span>
                    </div>

                    <p>
                      {messages.length > 1
                        ? messages[messages.length - 1]
                            .content
                        : "Run the request to generate a response."}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* METRICS */}

            <div className="response-metrics">
              <div>
                <span>REQUEST ID</span>
                <strong>req_8f29a1c73d</strong>
              </div>

              <div>
                <span>INPUT</span>
                <strong>72 tokens</strong>
              </div>

              <div>
                <span>OUTPUT</span>
                <strong>186 tokens</strong>
              </div>

              <div>
                <span>EST. COST</span>
                <strong>$0.0042</strong>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* INTEGRATION */}

      <section className="playground-integration">
        <div className="integration-heading">
          <div>
            <span className="section-kicker">
              DEVELOPER TOOLS
            </span>

            <h2>Use this request</h2>

            <p>
              Copy the generated request directly into your
              application.
            </p>
          </div>

          <div className="code-tabs">
            {["curl", "python", "typescript"].map(
              (tab) => (
                <button
                  key={tab}
                  className={
                    activeCodeTab === tab
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveCodeTab(tab)
                  }
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        <div className="code-block">
          <button
            className="copy-code"
            onClick={() =>
              navigator.clipboard?.writeText(
                code[
                  activeCodeTab as keyof typeof code
                ]
              )
            }
          >
            Copy
          </button>

          <pre>
            <code>
              {
                code[
                  activeCodeTab as keyof typeof code
                ]
              }
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
}