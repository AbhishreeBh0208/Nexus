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

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    // Connect your registration endpoint here.

    setTimeout(() => {
      setLoading(false);
    }, 900);
  }

  return (
    <main className="auth-page">
      <div className="auth-grid" />
      <div className="auth-glow auth-glow-signup" />

      {/* HEADER */}
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

      <div className="auth-layout auth-layout-signup">
        {/* PRODUCT SIDE */}
        <section className="auth-product-side">
          <div className="auth-product-content">
            <div className="auth-product-label">
              <StatusDot />
              BUILD WITH NEXUS
            </div>

            <h2>
              Your AI stack.
              <br />
              <span>One execution layer.</span>
            </h2>

            <p>
              Start with one API and let Nexus handle the complexity of
              routing, execution, resilience and observability.
            </p>

            <div className="auth-feature-list">
              <div>
                <span>01</span>

                <div>
                  <strong>Unified inference API</strong>
                  <p>One interface across your AI infrastructure.</p>
                </div>
              </div>

              <div>
                <span>02</span>

                <div>
                  <strong>Intelligent routing</strong>
                  <p>Make execution decisions using live signals.</p>
                </div>
              </div>

              <div>
                <span>03</span>

                <div>
                  <strong>Distributed execution</strong>
                  <p>Connect models, workers and compute environments.</p>
                </div>
              </div>

              <div>
                <span>04</span>

                <div>
                  <strong>Built-in observability</strong>
                  <p>Understand every request from route to response.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className="auth-form-side">
          <div className="auth-form-wrapper auth-signup-wrapper">
            <div className="auth-eyebrow">
              <span />
              NEXUS / CREATE ACCOUNT
            </div>

            <h1>
              Start
              <br />
              <em>building.</em>
            </h1>

            <p className="auth-intro">
              Create your Nexus account and start building on the
              intelligent execution layer.
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

            <div className="auth-divider">
              <span>OR CREATE WITH EMAIL</span>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="name">FULL NAME</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>

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
                <label htmlFor="workspace">WORKSPACE</label>

                <input
                  id="workspace"
                  name="workspace"
                  type="text"
                  placeholder="your-company"
                  autoComplete="organization"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="password">PASSWORD</label>

                <div className="auth-password">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
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

                <small className="auth-helper">
                  Minimum 8 characters.
                </small>
              </div>

              <label className="auth-checkbox">
                <input type="checkbox" required />

                <span>
                  I agree to the Nexus{" "}
                  <Link href="/terms">Terms of Service</Link>{" "}
                  and <Link href="/privacy">Privacy Policy</Link>.
                </span>
              </label>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                <span>
                  {loading ? "Creating account..." : "Create account"}
                </span>

                {!loading && <Arrow />}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link href="/signin">Sign in</Link>
            </p>
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