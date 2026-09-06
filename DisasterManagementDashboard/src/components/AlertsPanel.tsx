import { useEffect, useState } from "react"

import { PRIORITY_ALERTS, RESCUE_PLANS, SURVIVORS } from "../data"

import type { PriorityAlert } from "../types"

import { formatAge, priorityColor, severityColor } from "../utils"

function AlertIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    survivor_detected: "●",
    route_blocked: "⊘",
    structural: "▲",
    comm_degraded: "⚡",
    aftershock: "~",
    route_confirmed: "✓",
  }

  return <>{icons[type] || "·"}</>
}

function AlertRow({
  alert,
  expanded,
  onToggle,
  onFocus,
}: {
  alert: PriorityAlert
  expanded: boolean
  onToggle: () => void
  onFocus: () => void
}) {
  const color = severityColor(alert.severity)

  const explanation = {
    route_blocked:
      "Golf Course Extension access is obstructed. Stage units at the Sector 43 service road.",

    structural:
      "Structural assessment required before robot entry into the Sector 43 tower cluster.",

    comm_degraded:
      "Relay node BRAVO attempting signal boost between Sector 23A and Golf Course Road.",

    survivor_detected:
      "Dispatching the nearest available unit from the Gurugram response area. Maintain telemetry.",

    aftershock:
      "Magnitude 2.3. Structural reassessment is in progress across Sector 23A and Sector 43.",

    route_confirmed:
      "Sector 23A service-road access confirmed for emergency movement.",
  }[alert.type]

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        borderLeft: `2px solid ${color}`,
      }}
    >
      <button
        onClick={() => {
          onToggle()
          onFocus()
        }}
        style={{
          width: "100%",
          padding: "7px 10px 6px",
          background: "transparent",
          border: 0,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 2 }}
        >
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 7, color }}>
              <AlertIcon type={alert.type} />
            </span>
            <span
              style={{
                fontFamily: "'Barlow Condensed'",
                fontWeight: 700,
                fontSize: 10,
                color,
                letterSpacing: "0.06em",
              }}
            >
              {alert.title}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono'",
              fontSize: 7,
              color: "#4a5568",
            }}
          >
            {expanded ? "▲" : "▼"}
          </span>
        </div>
        <div style={{ fontFamily: "'Barlow'", fontSize: 9, color: "#4a5568" }}>
          {alert.detail} · {alert.time}
        </div>
      </button>
      {expanded && (
        <div style={{ padding: "0 10px 8px", background: `${color}08` }}>
          <div
            style={{
              fontFamily: "'Barlow'",
              fontSize: 9,
              color: "#6b7a8d",
              lineHeight: 1.55,
              marginBottom: 6,
            }}
          >
            {explanation}
          </div>
          {alert.robotId && (
            <div
              style={{
                fontFamily: "'Barlow Condensed'",
                fontSize: 8,
                fontWeight: 700,
                color,
                letterSpacing: "0.1em",
                padding: "2px 6px",
                background: `${color}12`,
                borderRadius: 2,
                display: "inline-block",
              }}
            >
              FOCUS · {alert.robotId}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function RescuePlanning({ survivorId }: { survivorId: string | null }) {
  const id = survivorId || "S-01"

  const survivor = SURVIVORS.find((item) => item.id === id) || SURVIVORS[0]

  const plan = RESCUE_PLANS[id] || RESCUE_PLANS["S-01"]

  const [actionIndex, setActionIndex] = useState(0)

  useEffect(() => setActionIndex(0), [id])

  const actions = [
    { title: `SEND ${plan.recRobot} → ${plan.recRoute}`, detail: plan.reason },

    {
      title: `SECURE ${survivor.id} PERIMETER`,
      detail: `Establish a safety perimeter around the ${survivor.id} location before responders enter the affected Gurugram block.`,
    },

    {
      title: "DEPLOY RELAY SUPPORT",
      detail: `Position a communications relay between ${plan.recRobot} and the Sector 43 command post to preserve telemetry.`,
    },

    {
      title: "RUN STRUCTURAL CHECK",
      detail:
        "Scan surrounding structures for secondary damage before extraction.",
    },

    {
      title: `HAND OFF ${survivor.id} TO EXTRACTION TEAM`,
      detail: `Coordinate medical pickup from the ${plan.recRoute} access point and keep the survivor location monitored.`,
    },
  ]

  const complete = actionIndex >= actions.length

  const currentAction = actions[actionIndex]

  const accessColor =
    plan.access === "BLOCKED"
      ? "#ef4444"
      : plan.access === "PARTIAL"
        ? "#f59e0b"
        : "#22c55e"

  return (
    <section>
      <div
        style={{
          padding: "7px 12px 6px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "'Barlow Condensed'",
            fontWeight: 700,
            fontSize: 9,
            color: "#4a5568",
            letterSpacing: "0.16em",
          }}
        >
          RESCUE PLANNING
        </div>
        <div
          style={{
            fontFamily: "'Barlow Condensed'",
            fontSize: 7.5,
            color: "#2a3545",
          }}
        >
          AUTO
        </div>
      </div>
      <div
        style={{
          padding: "7px 12px 6px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "#090f1c",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 5 }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed'",
              fontWeight: 700,
              fontSize: 13,
              color: "#e8edf4",
            }}
          >
            SURVIVOR {survivor.id}
          </div>
          <div
            style={{
              fontFamily: "'Barlow Condensed'",
              fontSize: 8,
              fontWeight: 700,
              color: priorityColor(survivor.priority),
              background: `${priorityColor(survivor.priority)}18`,
              padding: "2px 5px",
            }}
          >
            {survivor.priority.toUpperCase()}
          </div>
        </div>
        {[
          ["ACCESS", plan.access, accessColor],
          ["NEAREST ROBOT", plan.nearestRobot, "#c8d3e0"],
          [
            "CONFIDENCE",
            `${plan.confidence}%`,
            plan.confidence > 75 ? "#22d3ee" : "#f59e0b",
          ],
        ].map(([label, value, color]) => (
          <div
            key={label}
            className="flex justify-between"
            style={{
              marginBottom: 3,
              fontFamily: "'Barlow Condensed'",
              fontSize: 8,
              color: "#4a5568",
            }}
          >
            <span>{label}</span>
            <span style={{ color, fontFamily: "'JetBrains Mono'" }}>
              {value}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "7px 12px 6px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 5 }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed'",
              fontSize: 8,
              color: "#4a5568",
              letterSpacing: "0.14em",
            }}
          >
            RECOMMENDED ACTION
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono'",
              fontSize: 7.5,
              color: complete ? "#22c55e" : "#22d3ee",
            }}
          >
            {complete ? "5/5 COMPLETE" : `${actionIndex + 1}/5`}
          </div>
        </div>
        <div
          style={{
            background: complete
              ? "rgba(34,197,94,0.06)"
              : "rgba(34,211,238,0.05)",
            borderLeft: `2px solid ${complete ? "#22c55e" : "#22d3ee"}`,
            padding: "5px 8px",
            marginBottom: 5,
          }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed'",
              fontWeight: 700,
              fontSize: 10,
              color: complete ? "#22c55e" : "#22d3ee",
            }}
          >
            {complete ? "ALL ACTIONS ACCEPTED" : currentAction.title}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Barlow'",
            fontSize: 8.5,
            color: "#5a6a7d",
            lineHeight: 1.5,
          }}
        >
          {complete
            ? `Five-step rescue sequence accepted for ${survivor.id}. Monitor extraction status.`
            : currentAction.detail}
        </div>
      </div>
      <div
        style={{
          padding: "5px 12px 6px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="flex justify-between"
          style={{
            fontFamily: "'Barlow Condensed'",
            fontSize: 8,
            color: "#4a5568",
          }}
        >
          <span>PLAN CONFIDENCE</span>
          <span style={{ color: plan.confidence > 75 ? "#22d3ee" : "#f59e0b" }}>
            {plan.confidence}%
          </span>
        </div>
        <div
          style={{
            height: 2,
            background: "rgba(255,255,255,0.06)",
            marginTop: 3,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${plan.confidence}%`,
              background: plan.confidence > 75 ? "#22d3ee" : "#f59e0b",
            }}
          />
        </div>
      </div>
      <div style={{ padding: "7px 10px", display: "flex", gap: 4 }}>
        <button
          disabled={complete}
          onClick={() =>
            setActionIndex((index) => Math.min(actions.length, index + 1))
          }
          style={{
            flex: 2,
            padding: "6px 4px",
            color: complete ? "#22c55e" : "#22d3ee",
            background: "rgba(34,211,238,0.08)",
            border: "1px solid rgba(34,211,238,0.3)",
            borderRadius: 1,
            cursor: complete ? "default" : "pointer",
            fontFamily: "'Barlow Condensed'",
            fontWeight: 700,
            fontSize: 9.5,
          }}
        >
          {complete ? "✓ SEQUENCE COMPLETE" : "ACCEPT & NEXT"}
        </button>
        <button
          style={{
            flex: 1,
            padding: "6px 4px",
            color: "#f59e0b",
            background: "transparent",
            border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: 1,
            fontFamily: "'Barlow Condensed'",
            fontWeight: 700,
            fontSize: 9.5,
          }}
        >
          MODIFY
        </button>
        <button
          style={{
            flex: 1,
            padding: "6px 4px",
            color: "#4a5568",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 1,
            fontFamily: "'Barlow Condensed'",
            fontWeight: 700,
            fontSize: 9.5,
          }}
        >
          REVIEW
        </button>
      </div>
    </section>
  )
}

export default function AlertsPanel({
  selectedSurvivor,
  onFocusRobot,
  width,
}: {
  selectedSurvivor: string | null
  onFocusRobot: (id: string) => void
  width: number
}) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const shown = PRIORITY_ALERTS.slice(0, 3)

  const criticalCount = PRIORITY_ALERTS.filter(
    (alert) => alert.severity === "critical",
  ).length

  return (
    <aside
      style={{
        width,
        background: "#0c1520",
        borderLeft: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "9px 12px 8px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "'Barlow Condensed'",
            fontWeight: 700,
            fontSize: 9.5,
            color: "#4a5568",
            letterSpacing: "0.16em",
          }}
        >
          PRIORITY ALERTS
        </div>
        <span
          style={{
            fontFamily: "'Barlow Condensed'",
            fontSize: 8,
            color: "#ef4444",
          }}
        >
          ● {criticalCount} CRITICAL
        </span>
      </div>
      <div style={{ overflowY: "auto", flexShrink: 0 }}>
        {shown.map((alert) => (
          <AlertRow
            key={alert.id}
            alert={alert}
            expanded={expanded === alert.id}
            onToggle={() =>
              setExpanded(expanded === alert.id ? null : alert.id)
            }
            onFocus={() => {
              if (alert.robotId) onFocusRobot(alert.robotId)
            }}
          />
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <RescuePlanning survivorId={selectedSurvivor} />
      </div>
    </aside>
  )
}
