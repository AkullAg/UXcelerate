import { useState } from "react"

import { LIVE_EVENTS } from "../data"

import type { LiveEvent } from "../types"

import { severityColor } from "../utils"

export default function Footer({
  onFocusRobot,
  onFocusSurvivor,
  height,
}: {
  onFocusRobot: (id: string) => void
  onFocusSurvivor: (id: string) => void
  height: number
}) {
  const [page, setPage] = useState(0)

  const [activeId, setActiveId] = useState<string | null>(null)

  const pageSize = 4

  const pageCount = Math.ceil(LIVE_EVENTS.length / pageSize)

  const events = LIVE_EVENTS.slice(page * pageSize, page * pageSize + pageSize)

  function focus(event: LiveEvent) {
    setActiveId(event.id)

    if (event.robotId) onFocusRobot(event.robotId)

    if (event.survivorId) onFocusSurvivor(event.survivorId)
  }

  return (
    <footer
      style={{
        height,
        background: "#07101a",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          height: 20,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            fontFamily: "'Barlow Condensed'",
            fontWeight: 700,
            fontSize: 8.5,
            color: "#4a5568",
            letterSpacing: "0.18em",
          }}
        >
          LIVE ACTIVITY
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
              aria-label="View newer activity"
              style={{
                width: 22,
                height: 18,
                padding: 0,
                border: "1px solid rgba(255,255,255,0.1)",
                background:
                  page === 0 ? "transparent" : "rgba(34,211,238,0.08)",
                color: page === 0 ? "#263342" : "#22d3ee",
                cursor: page === 0 ? "default" : "pointer",
              }}
            >
              ‹
            </button>
            <span
              style={{
                fontFamily: "'JetBrains Mono'",
                fontSize: 7,
                color: "#4a5568",
                minWidth: 32,
                textAlign: "center",
              }}
            >
              {page + 1}/{pageCount}
            </span>
            <button
              onClick={() =>
                setPage((current) => Math.min(pageCount - 1, current + 1))
              }
              disabled={page === pageCount - 1}
              aria-label="View older activity"
              style={{
                width: 22,
                height: 18,
                padding: 0,
                border: "1px solid rgba(255,255,255,0.1)",
                background:
                  page === pageCount - 1
                    ? "transparent"
                    : "rgba(34,211,238,0.08)",
                color: page === pageCount - 1 ? "#263342" : "#22d3ee",
                cursor: page === pageCount - 1 ? "default" : "pointer",
              }}
            >
              ›
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span
              className="blink"
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#22d3ee",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono'",
                fontSize: 8,
                color: "#22d3ee",
              }}
            >
              LIVE
            </span>
          </div>
        </div>
      </div>
      <div
        className="timeline-strip"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 4,
          overflow: "hidden",
          padding: "5px 12px",
        }}
      >
        {events.map((event) => {
          const color = severityColor(event.severity)
          const active = event.id === activeId
          return (
            <button
              key={event.id}
              onClick={() => focus(event)}
              style={{
                minWidth: 0,
                width: "100%",
                background: active ? `${color}0c` : "#0b1522",
                border: `1px solid ${
                  active ? color + "30" : "rgba(255,255,255,0.05)"
                }`,
                borderTop: `2px solid ${color}`,
                borderRadius: 1,
                padding: "4px 7px",
                cursor:
                  event.robotId || event.survivorId ? "pointer" : "default",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "'JetBrains Mono'",
                    fontSize: 7.5,
                    color: "#3a4a5a",
                  }}
                >
                  {event.time}
                </span>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed'",
                    fontWeight: 700,
                    fontSize: 8.5,
                    color,
                  }}
                >
                  {event.unit}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed'",
                  fontWeight: 700,
                  fontSize: 9.5,
                  color: active ? "#e8edf4" : "#8a9ab0",
                  lineHeight: 1.2,
                }}
              >
                {event.type}
              </div>
              {(event.robotId || event.survivorId) && (
                <div
                  style={{
                    fontFamily: "'Barlow Condensed'",
                    fontSize: 7.5,
                    color,
                    opacity: 0.6,
                  }}
                >
                  CLICK TO FOCUS
                </div>
              )}
            </button>
          )
        })}
      </div>
    </footer>
  )
}
