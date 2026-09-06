import { useState } from "react"

import { ROBOTS } from "../data"

import type { Robot, RobotStatus } from "../types"

import { batteryColor, statusColor, statusLabel } from "../utils"

type FleetFilter = "all" | "searching" | "en_route" | "weak_signal" | "offline"

const FILTERS: { key: FleetFilter label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "searching", label: "SEARCHING" },
  { key: "en_route", label: "EN ROUTE" },
  { key: "weak_signal", label: "LOW SIGNAL" },
  { key: "offline", label: "OFFLINE" },
]

function RobotRow({
  robot,
  selected,
  onClick,
}: {
  robot: Robot
  selected: boolean
  onClick: () => void
}) {
  const color = statusColor(robot.status)

  const isLive = !["offline", "standby"].includes(robot.status)

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "block",
        padding: "8px 12px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: selected ? "rgba(59,130,246,0.07)" : "transparent",
        borderLeft: `2px solid ${selected ? "#3b82f6" : "transparent"}`,
        borderRight: 0,
        borderTop: 0,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 3 }}
      >
        <div className="flex items-center gap-1.5">
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: color,
              display: "inline-block",
              animation: isLive
                ? "pulse-dot 1.5s ease-in-out infinite"
                : "none",
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed'",
              fontWeight: 700,
              fontSize: 12,
              color: "#e8edf4",
              letterSpacing: "0.05em",
            }}
          >
            {robot.id}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Barlow Condensed'",
            fontSize: 7.5,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color,
            background: `${color}18`,
            padding: "1px 5px",
            borderRadius: 2,
          }}
        >
          {statusLabel(robot.status)}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'Barlow'",
          fontSize: 9.5,
          color: "#4a5568",
          marginBottom: 5,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {robot.building || robot.sector}
        {robot.status === "offline" && (
          <span style={{ color: "#ef4444", marginLeft: 4 }}>
            · {robot.lastUpdate}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5" style={{ flex: 1 }}>
          <div
            style={{
              flex: 1,
              height: 3,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${robot.battery}%`,
                background: batteryColor(robot.battery),
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono'",
              fontSize: 8,
              color: batteryColor(robot.battery),
              minWidth: 24,
            }}
          >
            {robot.battery}%
          </span>
        </div>
        <div className="flex items-end gap-px" style={{ height: 8 }}>
          {[0, 1, 2, 3].map((level) => (
            <div
              key={level}
              style={{
                width: 2.5,
                height: `${(level + 1) * 25}%`,
                background:
                  robot.signal > level * 25 ? color : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </div>
    </button>
  )
}

export default function FleetPanel({
  selectedRobot,
  onSelect,
  width,
}: {
  selectedRobot: string | null
  onSelect: (id: string | null) => void
  width: number
}) {
  const [filter, setFilter] = useState<FleetFilter>("all")

  const filtered =
    filter === "all"
      ? ROBOTS
      : filter === "en_route"
        ? ROBOTS.filter(
            (robot) =>
              robot.status === "en_route" ||
              robot.status === "survivor_detected",
          )
        : ROBOTS.filter((robot) => robot.status === filter)

  const visible = filtered.slice(0, 5)

  const remaining = filtered.length - visible.length

  return (
    <aside
      style={{
        width,
        background: "#0c1520",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "10px 12px 0",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            fontFamily: "'Barlow Condensed'",
            fontWeight: 700,
            fontSize: 10,
            color: "#4a5568",
            letterSpacing: "0.16em",
            marginBottom: 8,
          }}
        >
          ROBOT FLEET
        </div>
        <div className="flex flex-wrap gap-1 pb-2">
          {FILTERS.map((item) => {
            const active = filter === item.key
            const color = statusColor(
              item.key === "all" ? "searching" : item.key as RobotStatus,
            )
            return (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                style={{
                  fontFamily: "'Barlow Condensed'",
                  fontSize: 8.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "2px 6px",
                  border: `1px solid ${
                    active ? `${color}55` : "rgba(255,255,255,0.07)"
                  }`,
                  background: active ? `${color}14` : "transparent",
                  color: active ? "#c8d3e0" : "#4a5568",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {visible.length === 0 && (
          <div
            style={{
              padding: 16,
              fontFamily: "'Barlow Condensed'",
              fontSize: 10,
              color: "#4a5568",
              textAlign: "center",
            }}
          >
            NO UNITS MATCHING FILTER
          </div>
        )}
        {visible.map((robot) => (
          <RobotRow
            key={robot.id}
            robot={robot}
            selected={selectedRobot === robot.id}
            onClick={() =>
              onSelect(selectedRobot === robot.id ? null : robot.id)
            }
          />
        ))}
        {remaining > 0 && (
          <button
            onClick={() => setFilter("all")}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "transparent",
              border: 0,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              fontFamily: "'Barlow Condensed'",
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#3b82f6",
              cursor: "pointer",
            }}
          >
            +{remaining} MORE ROBOTS
          </button>
        )}
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "8px 12px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 4,
            marginBottom: 6,
          }}
        >
          {[
            {
              n: ROBOTS.filter((robot) =>
                ["searching", "en_route", "survivor_detected"].includes(
                  robot.status,
                ),
              ).length,
              label: "ACTIVE",
              color: "#22d3ee",
            },
            {
              n: ROBOTS.filter((robot) => robot.status === "weak_signal")
                .length,
              label: "LOW SIG",
              color: "#f59e0b",
            },
            {
              n: ROBOTS.filter((robot) => robot.status === "offline").length,
              label: "OFFLINE",
              color: "#ef4444",
            },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Barlow Condensed'",
                  fontWeight: 700,
                  fontSize: 16,
                  color: item.color,
                  lineHeight: 1,
                }}
              >
                {item.n}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed'",
                  fontSize: 7.5,
                  color: "#4a5568",
                  letterSpacing: "0.1em",
                  marginTop: 1,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.05)",
            marginBottom: 6,
          }}
        />
        <div
          style={{
            fontFamily: "'JetBrains Mono'",
            fontSize: 8.5,
            color: "#4a5568",
          }}
        >
          SURVIVORS DETECTED: <span style={{ color: "#f59e0b" }}>08</span>
        </div>
      </div>
    </aside>
  )
}
