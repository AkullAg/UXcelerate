import type L from "leaflet"

export type RobotStatus = "searching" | "en_route" | "weak_signal" | "offline" | "survivor_detected" | "standby"

export type EventSeverity = "info" | "warn" | "critical" | "success"

export type HazardType = "fire" | "gas" | "structural" | "electrical"

export type AlertSeverity = "critical" | "warn" | "info"

export interface Robot {
  id: string

  status: RobotStatus

  sector: string

  building?: string

  battery: number

  signal: number

  lastUpdate: string

  task: string

  autonomy: string

  mc: number

  mr: number
}

export interface Survivor {
  id: string

  col: number

  row: number

  priority: "critical" | "high" | "medium"

  confidence: number

  lastConfirmedSec: number

  detectedBy: string
}

export interface Hazard {
  id: string

  col: number

  row: number

  type: HazardType
}

export interface PriorityAlert {
  id: string

  type: string

  title: string

  detail: string

  time: string

  severity: AlertSeverity

  robotId?: string

  survivorId?: string
}

export interface LiveEvent {
  id: string

  time: string

  unit: string

  type: string

  severity: EventSeverity

  robotId?: string

  survivorId?: string
}

export interface RescuePlan {
  survivorId: string

  access: string

  nearestRobot: string

  recRobot: string

  recRoute: string

  reason: string

  confidence: number
}

export type MapPoint = L.LatLngExpression
