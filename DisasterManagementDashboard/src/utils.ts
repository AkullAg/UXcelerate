import type {
  AlertSeverity,
  EventSeverity,
  HazardType,
  Robot,
  RobotStatus,
} from "./types"

export function statusColor(status: RobotStatus): string {
  const colors: Record<RobotStatus, string> = {
    searching: "#3b82f6",

    en_route: "#22d3ee",

    weak_signal: "#f59e0b",

    offline: "#4a5568",

    survivor_detected: "#f97316",

    standby: "#6b7a8d",
  }

  return colors[status]
}

export function statusLabel(status: RobotStatus): string {
  const labels: Record<RobotStatus, string> = {
    searching: "SEARCHING",

    en_route: "EN ROUTE",

    weak_signal: "WEAK SIGNAL",

    offline: "OFFLINE",

    survivor_detected: "SURVIVOR DETECTED",

    standby: "STANDBY",
  }

  return labels[status]
}

export function batteryColor(battery: number): string {
  return battery > 50 ? "#14b8a6" : battery > 25 ? "#f59e0b" : "#ef4444"
}

export function hazardColor(type: HazardType): string {
  return {
    fire: "#ef4444",
    gas: "#f59e0b",
    structural: "#fb923c",
    electrical: "#a78bfa",
  }[type]
}

export function severityColor(severity: EventSeverity | AlertSeverity): string {
  return {
    critical: "#ef4444",
    warn: "#f59e0b",
    success: "#22d3ee",
    info: "#3b82f6",
  }[severity]
}

export function priorityColor(
  priority: "critical" | "high" | "medium",
): string {
  return priority === "critical"
    ? "#ef4444"
    : priority === "high"
      ? "#f59e0b"
      : "#3b82f6"
}

export function formatAge(seconds: number): string {
  return seconds < 60 ? `${seconds}s AGO` : `${Math.floor(seconds / 60)}m AGO`
}

export function robotConfidence(
  robot: Robot,
): "confirmed" | "uncertain" | "stale" {
  if (robot.status === "offline" || robot.signal === 0) return "stale"

  if (robot.signal < 50 || robot.lastUpdate.includes("min")) return "uncertain"

  return "confirmed"
}
