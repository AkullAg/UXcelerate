import { ROBOTS } from "../data"

import type { Robot } from "../types"

import { batteryColor, statusColor, statusLabel } from "../utils"

export default function RobotDrawer({
  robotId,
  onClose,
}: {
  robotId: string
  onClose: () => void
}) {
  const robot = ROBOTS.find((item) => item.id === robotId)

  if (!robot) return null

  const statusColorValue = statusColor(robot.status)

  const communicationLabel =
    robot.signal > 70
      ? "STRONG"
      : robot.signal > 40
        ? "MODERATE"
        : robot.signal > 10
          ? "WEAK"
          : "LOST"

  const communicationColor =
    robot.signal > 70
      ? "#22d3ee"
      : robot.signal > 40
        ? "#3b82f6"
        : robot.signal > 10
          ? "#f59e0b"
          : "#ef4444"

  const details = [
    ["COMMUNICATION", communicationLabel, communicationColor],

    ["BATTERY", `${robot.battery}%`, batteryColor(robot.battery)],

    ["LAST UPDATE", robot.lastUpdate.toUpperCase(), "#c8d3e0"],

    ["CURRENT TASK", robot.task.toUpperCase(), "#c8d3e0"],

    ["AUTONOMY", robot.autonomy, statusColorValue],
  ]

  return (
    <aside
      style={{
        position: "absolute",
        left: 230,
        top: 0,
        bottom: 0,
        width: 268,
        zIndex: 2000,
        background: "#0d1a28",
        borderRight: "1px solid rgba(255,255,255,0.09)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 24px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "#0a1420",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed'",
                fontWeight: 700,
                fontSize: 22,
                color: "#e8edf4",
                lineHeight: 1,
              }}
            >
              {robot.id}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono'",
                fontSize: 8.5,
                color: "#4a5568",
                marginTop: 2,
              }}
            >
              {robot.sector.toUpperCase()}
              {robot.building ? ` · ${robot.building.toUpperCase()}` : ""}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                fontFamily: "'Barlow Condensed'",
                fontWeight: 700,
                fontSize: 9.5,
                letterSpacing: "0.12em",
                color: statusColorValue,
                background: `${statusColorValue}18`,
                border: `1px solid ${statusColorValue}44`,
                padding: "3px 8px",
                borderRadius: 2,
              }}
            >
              {statusLabel(robot.status)}
            </div>
            <button
              onClick={onClose}
              aria-label="Close robot details"
              style={{
                background: "transparent",
                border: 0,
                color: "#4a5568",
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
                padding: "2px 4px",
              }}
            >
              ×
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "8px 0",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {details.map(([label, value, color]) => (
          <div
            key={label}
            style={{
              padding: "6px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed'",
                fontSize: 8.5,
                color: "#4a5568",
                letterSpacing: "0.12em",
                fontWeight: 600,
              }}
            >
              {label}
            </span>
            <span
              style={{ fontFamily: "'JetBrains Mono'", fontSize: 9.5, color }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "10px 14px 8px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {[
          {
            label: "POWER LEVEL",
            value: robot.battery,
            color: batteryColor(robot.battery),
          },
          {
            label: "SIGNAL STRENGTH",
            value: robot.signal,
            color: communicationColor,
          },
        ].map((item) => (
          <div key={item.label} style={{ marginBottom: 8 }}>
            <div className="flex justify-between" style={{ marginBottom: 3 }}>
              <span
                style={{
                  fontFamily: "'Barlow Condensed'",
                  fontSize: 8,
                  color: "#4a5568",
                  letterSpacing: "0.1em",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono'",
                  fontSize: 9,
                  color: item.color,
                }}
              >
                {item.value}%
              </span>
            </div>
            <div
              style={{
                height: 4,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${item.value}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 14px", flex: 1 }}>
        <div
          style={{
            fontFamily: "'Barlow Condensed'",
            fontSize: 8,
            color: "#4a5568",
            letterSpacing: "0.12em",
            marginBottom: 8,
          }}
        >
          COMMAND
        </div>
        <div className="flex flex-col gap-2">
          {[
            {
              label:
                robot.status === "offline"
                  ? "ATTEMPT RECONNECT"
                  : "REDIRECT MISSION",
              color: "#3b82f6",
            },
            { label: "PAUSE", color: "#f59e0b" },
            { label: "EMERGENCY STOP", color: "#ef4444" },
          ].map((action) => (
            <button
              key={action.label}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontFamily: "'Barlow Condensed'",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.12em",
                color: action.color,
                background: `${action.color}0f`,
                border: `1px solid ${action.color}35`,
                borderRadius: 2,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
