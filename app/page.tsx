"use client";

import { useState } from "react";

const FEATURES = [
  { icon: "🚚", label: "Real-time freight matching" },
  { icon: "📊", label: "Smart load optimization" },
  { icon: "🔗", label: "Direct carrier connections" },
  { icon: "📍", label: "Live route tracking" },
];

const STATS = [
  { value: "40%", label: "Avg. cost reduction" },
  { value: "3×", label: "Faster booking" },
  { value: "98%", label: "Load fulfillment rate" },
];

function TruckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7 text-emerald-300"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

type FormState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || formState === "loading") return;

    setFormState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company }),
      });

      const data = await res.json();

      if (res.ok) {
        setFormState("success");
        setMessage(data.message);
      } else {
        setFormState("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormState("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <main
      style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
    >
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        {/* Logo / Nav */}
        <div
          style={{
            position: "absolute",
            top: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 3v5h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            MyHaulier
          </span>
        </div>

        {/* Hero section */}
        <div
          style={{
            maxWidth: "700px",
            width: "100%",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          {/* Badge */}
          <div
            style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}
          >
            <div className="badge">
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  background: "#60a5fa",
                  borderRadius: "50%",
                  display: "inline-block",
                  boxShadow: "0 0 6px #60a5fa",
                }}
              />
              Now accepting early access
            </div>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 72px)",
              fontWeight: "800",
              lineHeight: "1.05",
              letterSpacing: "-0.04em",
              marginBottom: "20px",
              color: "white",
            }}
          >
            Freight meets{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #93c5fd 50%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              intelligence
            </span>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "rgba(255,255,255,0.6)",
              lineHeight: "1.6",
              marginBottom: "36px",
              maxWidth: "520px",
              margin: "0 auto 36px",
            }}
          >
            The marketplace connecting freight forwarders and carriers in real
            time. Smarter loads. Lower costs. Zero empty trucks.
          </p>

          {/* Feature pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {FEATURES.map((f) => (
              <div key={f.label} className="feature-pill">
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sign-up card */}
        <div
          className="glass-card"
          style={{ maxWidth: "480px", width: "100%", padding: "40px" }}
        >
          {formState === "success" ? (
            /* Success state */
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div className="success-icon">
                <CheckIcon />
              </div>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "white",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                You&apos;re on the list!
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              >
                {message || "We'll notify you the moment we launch."}
              </p>
              <div
                style={{
                  marginTop: "24px",
                  padding: "14px 20px",
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "12px",
                  color: "#6ee7b7",
                  fontSize: "14px",
                }}
              >
                📣 Share with colleagues and jump the queue!
              </div>
            </div>
          ) : (
            /* Form state */
            <>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "white",
                  marginBottom: "6px",
                  letterSpacing: "-0.02em",
                }}
              >
                Join the waitlist
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  marginBottom: "28px",
                }}
              >
                Be first to access MyHaulier when we launch.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Work email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />

                {formState === "error" && message && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: "10px",
                      color: "#fca5a5",
                      fontSize: "14px",
                    }}
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading" || !email}
                  className="cta-button"
                  style={{ marginTop: "4px" }}
                >
                  <span>
                    {formState === "loading"
                      ? "Securing your spot…"
                      : "Request Early Access →"}
                  </span>
                </button>
              </form>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "12px",
                }}
              >
                No spam. No credit card. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>

        {/* Stats bar */}
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="stat-number">{s.value}</div>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ maxWidth: "400px", width: "100%", margin: "48px auto 24px" }}>
          <div className="divider" />
        </div>

        {/* Footer */}
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", textAlign: "center" }}>
          © {new Date().getFullYear()} MyHaulier · Built by{" "}
          <a
            href="https://simplysolutions.dk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(96,165,250,0.6)", textDecoration: "none" }}
          >
            Simply Solutions
          </a>
        </p>
      </div>
    </main>
  );
}
