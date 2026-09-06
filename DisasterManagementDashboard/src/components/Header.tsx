import { useEffect, useState } from "react"

export default function Header() {
  const [time, setTime] = useState("14:32:08")

  useEffect(() => {
    const timer = window.setInterval(
      () => setTime(new Date().toTimeString().slice(0, 8)),
      1000,
    )

    return () => window.clearInterval(timer)
  }, [])

  const stats = [
    ["08", "SURVIVORS"],

    ["12", "ROBOTS"],

    ["06", "HAZARDS"],
  ]

  return (
    <header
      style={{
        height: 44,
        background: "#060a10",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        flexShrink: 0,
      }}
    >
      <div
        className="flex items-center gap-2.5 shrink-0"
        style={{ marginRight: 16 }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="11,2 20,19 2,19"
            stroke="#f59e0b"
            strokeWidth="1.5"
            fill="rgba(245,158,11,0.08)"
          />
          <line
            x1="11"
            y1="8"
            x2="11"
            y2="13"
            stroke="#f59e0b"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="11" cy="16" r="0.9" fill="#f59e0b" />
        </svg>
        <div>
          <div
            style={{
              fontFamily: "'Barlow Condensed'",
              fontWeight: 700,
              fontSize: 12.5,
              color: "#e8edf4",
              letterSpacing: "0.12em",
            }}
          >
            DISASTER MANAGEMENT AUTHORITY
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono'",
              fontSize: 8.5,
              color: "#4a5568",
              marginTop: -1,
            }}
          >
            EARTHQUAKE RESPONSE — GOLF COURSE / 23A / 43
          </div>
        </div>
      </div>
      <div
        style={{
          width: 1,
          height: 22,
          background: "rgba(255,255,255,0.07)",
          marginRight: 16,
        }}
      />
      {stats.map(([value, label]) => (
        <div
          key={label}
          className="flex items-baseline gap-1.5"
          style={{ marginRight: 16 }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed'",
              fontWeight: 700,
              fontSize: 18,
              color: "#e8edf4",
              lineHeight: 1,
            }}
          >
            {value}
          </span>
          <span
            style={{
              fontFamily: "'Barlow Condensed'",
              fontSize: 9,
              color: "#4a5568",
              letterSpacing: "0.1em",
            }}
          >
            {label}
          </span>
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <div className="flex items-center gap-4">
        <div
          style={{
            fontFamily: "'JetBrains Mono'",
            fontSize: 9,
            color: "#4a5568",
          }}
        >
          NETWORK <span style={{ color: "#14b8a6" }}>87%</span>
        </div>
        <div
          style={{ width: 1, height: 16, background: "rgba(255,255,255,0.07)" }}
        />
        <div
          style={{
            fontFamily: "'JetBrains Mono'",
            fontSize: 9,
            color: "#4a5568",
          }}
        >
          LAST SYNC <span style={{ color: "#6b7a8d" }}>{time}</span>
        </div>
        <div
          style={{ width: 1, height: 16, background: "rgba(255,255,255,0.07)" }}
        />
        <div className="flex items-center gap-1.5">
          <span
            className="pulse"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#14b8a6",
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed'",
              fontWeight: 700,
              fontSize: 10.5,
              color: "#14b8a6",
              letterSpacing: "0.12em",
            }}
          >
            LIVE
          </span>
        </div>
        <div
          style={{ width: 1, height: 16, background: "rgba(255,255,255,0.07)" }}
        />
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#1a2535",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed'",
              fontWeight: 700,
              fontSize: 9.5,
              color: "#c8d3e0",
            }}
          >
            OP
          </span>
        </div>
      </div>
    </header>
  )
}
