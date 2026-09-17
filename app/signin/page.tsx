"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

function NexusMark() {
  return (
    <span className="auth-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Arrow() {
  return <span className="auth-arrow">↗</span>;
}

function StatusDot() {
  return <span className="auth-status-dot" />;
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    // Connect your authentication endpoint here.
    // Example:
    // await fetch("/api/auth/signin", {...})

    setTimeout(() => {
      setLoading(false);
    }, 900);
  }

  return (
    <main className="auth-page">
      <div className="auth-grid" />
      <div className="auth-glow" />

      {/* TOP BAR */}
      <header className="auth-header">
        <Link href="/" className="auth-brand">
          <NexusMark />
          <span>NEXUS</span>
        </Link>

        <div className="auth-header-status">
          <StatusDot />
          ALL SYSTEMS OPERATIONAL
        </div>
      </header>

      {/* CONTENT */}
      <div className="auth-layout">
        {/* LEFT — FORM */}
        <section className="auth-form-side">
          <div className="auth-form-wrapper">
            <div className="auth-eyebrow">
              <span />
              NEXUS / AUTHENTICATION
            </div>

            <h1>
              Welcome
              <br />
              <em>back.</em>
            </h1>

            <p className="auth-intro">
              Sign in to access your Nexus workspace and manage your
              AI infrastructure.
            </p>

            {/* SOCIAL */}
            <div className="auth-social">
              <button type="button" className="auth-social-button">
                <span className="auth-social-icon">G</span>
                Continue with Google
              </button>

              <button type="button" className="auth-social-button">
                <span className="auth-social-icon">⌘</span>
                Continue with GitHub
              </button>
            </div>

            {/* DIVIDER */}
            <div className="auth-divider">
              <span>OR CONTINUE WITH EMAIL</span>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="email">WORK EMAIL</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="password">PASSWORD</label>

                  <button
                    type="button"
                    className="auth-forgot"
                    onClick={() => {
                      // Connect forgot-password flow here.
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="auth-password">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                <span>
                  {loading ? "Signing in..." : "Sign in"}
                </span>

                {!loading && <Arrow />}
              </button>
            </form>

            <p className="auth-switch">
              Don&apos;t have a Nexus account?{" "}
              <Link href="/signup">Create one</Link>
            </p>
          </div>
        </section>

        {/* RIGHT — PRODUCT CONTEXT */}
        <section className="auth-product-side">
          <div className="auth-product-content">
            <div className="auth-product-label">
              <StatusDot />
              NEXUS EXECUTION LAYER
            </div>

            <h2>
              One API.
              <br />
              <span>Every execution path.</span>
            </h2>

            <p>
              Nexus intelligently connects your application to models,
              workers and distributed compute.
            </p>

            <div className="auth-mini-pipeline">
              <div className="auth-pipeline-line" />

              <div className="auth-mini-node">
                <span>01</span>

                <strong>APPLICATION</strong>

                <small>POST /v1/inference</small>
              </div>

              <div className="auth-mini-node auth-mini-active">
                <span>02</span>

                <strong>NEXUS ROUTER</strong>

                <small>SCORE · ROUTE</small>
              </div>

              <div className="auth-mini-node">
                <span>03</span>

                <strong>MODEL WORKER</strong>

                <small>EXECUTE · STREAM</small>
              </div>
            </div>

            <div className="auth-product-footer">
              <div>
                <span>ROUTING</span>
                <strong>ADAPTIVE</strong>
              </div>

              <div>
                <span>EXECUTION</span>
                <strong>DISTRIBUTED</strong>
              </div>

              <div>
                <span>OBSERVABILITY</span>
                <strong>REAL-TIME</strong>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="auth-footer">
        <span>© 2026 NEXUS</span>

        <div>
          <Link href="/">Home</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </footer>
    </main>
  );
}