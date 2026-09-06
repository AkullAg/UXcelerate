import type {
  Hazard,
  LiveEvent,
  PriorityAlert,
  RescuePlan,
  Robot,
  Survivor,
} from "./types"

export const ROBOTS: Robot[] = [
  {
    id: "R-01",
    status: "searching",
    sector: "Golf Course Road",
    battery: 82,
    signal: 88,
    lastUpdate: "8 sec ago",
    task: "Search Sector 43 towers",
    autonomy: "EXPLORING",
    mc: 6,
    mr: 2.5,
  },

  {
    id: "R-02",
    status: "en_route",
    sector: "Sector 43",
    building: "DLF Park Place",
    battery: 71,
    signal: 76,
    lastUpdate: "5 sec ago",
    task: "Reach survivor near Sector 43",
    autonomy: "NAVIGATING",
    mc: 2,
    mr: 1.3,
  },

  {
    id: "R-03",
    status: "weak_signal",
    sector: "Sector 23A",
    battery: 63,
    signal: 28,
    lastUpdate: "14 sec ago",
    task: "Search Sector 23A residential block",
    autonomy: "EXPLORING",
    mc: 9.2,
    mr: 5.5,
  },

  {
    id: "R-04",
    status: "survivor_detected",
    sector: "Golf Course Road",
    building: "High-rise cluster",
    battery: 58,
    signal: 62,
    lastUpdate: "2 sec ago",
    task: "Survivor extraction near Golf Course Road",
    autonomy: "ASSISTING",
    mc: 6,
    mr: 6.5,
  },

  {
    id: "R-05",
    status: "offline",
    sector: "Last: Sector 23A",
    battery: 12,
    signal: 0,
    lastUpdate: "4 min ago",
    task: "Signal Lost",
    autonomy: "UNKNOWN",
    mc: 4.8,
    mr: 4.1,
  },

  {
    id: "R-06",
    status: "standby",
    sector: "Sector 43 command post",
    battery: 100,
    signal: 97,
    lastUpdate: "1 sec ago",
    task: "Awaiting Deployment",
    autonomy: "STANDBY",
    mc: 6,
    mr: 9.2,
  },

  {
    id: "R-07",
    status: "searching",
    sector: "Sector 43",
    battery: 74,
    signal: 81,
    lastUpdate: "3 sec ago",
    task: "Perimeter scan around Sector 43",
    autonomy: "EXPLORING",
    mc: 2,
    mr: 8.5,
  },

  {
    id: "R-08",
    status: "en_route",
    sector: "Sector 23A",
    battery: 89,
    signal: 73,
    lastUpdate: "6 sec ago",
    task: "Relay supply drop to Sector 23A",
    autonomy: "NAVIGATING",
    mc: 0.5,
    mr: 4.5,
  },

  {
    id: "R-09",
    status: "weak_signal",
    sector: "Golf Course Extension",
    battery: 45,
    signal: 22,
    lastUpdate: "31 sec ago",
    task: "Assess debris near Golf Course Extension",
    autonomy: "EXPLORING",
    mc: 9,
    mr: 3.3,
  },

  {
    id: "R-10",
    status: "standby",
    sector: "Sector 43 command post",
    battery: 97,
    signal: 95,
    lastUpdate: "1 sec ago",
    task: "Awaiting Deployment",
    autonomy: "STANDBY",
    mc: 2,
    mr: 9.2,
  },

  {
    id: "R-11",
    status: "survivor_detected",
    sector: "Golf Course Road",
    battery: 67,
    signal: 59,
    lastUpdate: "4 sec ago",
    task: "Assist survivor near Golf Course Road",
    autonomy: "ASSISTING",
    mc: 3.5,
    mr: 6.3,
  },

  {
    id: "R-12",
    status: "searching",
    sector: "Sector 23A",
    battery: 55,
    signal: 44,
    lastUpdate: "12 sec ago",
    task: "Sweep Sector 23A north edge",
    autonomy: "EXPLORING",
    mc: 4,
    mr: 0.5,
  },
]

export const SURVIVORS: Survivor[] = [
  {
    id: "S-01",
    col: 7.4,
    row: 3.3,
    priority: "critical",
    confidence: 97,
    lastConfirmedSec: 24,
    detectedBy: "R-04",
  },

  {
    id: "S-02",
    col: 4.4,
    row: 3.3,
    priority: "high",
    confidence: 84,
    lastConfirmedSec: 67,
    detectedBy: "R-01",
  },

  {
    id: "S-03",
    col: 3.4,
    row: 6.4,
    priority: "medium",
    confidence: 71,
    lastConfirmedSec: 132,
    detectedBy: "R-11",
  },

  {
    id: "S-04",
    col: 8.3,
    row: 7.2,
    priority: "high",
    confidence: 89,
    lastConfirmedSec: 48,
    detectedBy: "R-04",
  },

  {
    id: "S-05",
    col: 0.7,
    row: 3.4,
    priority: "medium",
    confidence: 63,
    lastConfirmedSec: 203,
    detectedBy: "R-08",
  },

  {
    id: "S-06",
    col: 4.5,
    row: 1.2,
    priority: "high",
    confidence: 78,
    lastConfirmedSec: 91,
    detectedBy: "R-12",
  },

  {
    id: "S-07",
    col: 9.2,
    row: 7.5,
    priority: "medium",
    confidence: 55,
    lastConfirmedSec: 340,
    detectedBy: "R-03",
  },

  {
    id: "S-08",
    col: 1.4,
    row: 6.5,
    priority: "high",
    confidence: 82,
    lastConfirmedSec: 58,
    detectedBy: "R-07",
  },
]

export const HAZARDS: Hazard[] = [
  { id: "H-01", col: 7.6, row: 4.5, type: "fire" },

  { id: "H-02", col: 4.7, row: 3.9, type: "gas" },

  { id: "H-03", col: 3.4, row: 3.5, type: "structural" },

  { id: "H-04", col: 7.6, row: 2.4, type: "electrical" },

  { id: "H-05", col: 8.2, row: 3.2, type: "structural" },

  { id: "H-06", col: 5.3, row: 4.1, type: "gas" },
]

export const PRIORITY_ALERTS: PriorityAlert[] = [
  {
    id: "A-01",
    type: "survivor_detected",
    title: "SURVIVOR DETECTED",
    detail: "Golf Course Road high-rise",
    time: "24 sec ago",
    severity: "critical",
    robotId: "R-04",
    survivorId: "S-01",
  },

  {
    id: "A-02",
    type: "route_blocked",
    title: "ACCESS BLOCKED",
    detail: "Golf Course Extension",
    time: "2 min ago",
    severity: "warn",
  },

  {
    id: "A-03",
    type: "structural",
    title: "STRUCTURAL INSTABILITY",
    detail: "Sector 43 tower cluster",
    time: "4 min ago",
    severity: "warn",
  },

  {
    id: "A-04",
    type: "comm_degraded",
    title: "COMM DEGRADED",
    detail: "R-03 · 28% signal",
    time: "14 sec ago",
    severity: "warn",
    robotId: "R-03",
  },

  {
    id: "A-05",
    type: "route_confirmed",
    title: "ACCESS CONFIRMED",
    detail: "Sector 23A service road",
    time: "58 sec ago",
    severity: "info",
  },

  {
    id: "A-06",
    type: "aftershock",
    title: "AFTERSHOCK DETECTED",
    detail: "Magnitude 2.3",
    time: "3 min ago",
    severity: "warn",
  },

  {
    id: "A-07",
    type: "survivor_detected",
    title: "SURVIVOR DETECTED",
    detail: "Sector 23A perimeter",
    time: "1 min ago",
    severity: "critical",
    survivorId: "S-05",
  },
]

export const LIVE_EVENTS: LiveEvent[] = [
  {
    id: "L1",
    time: "14:32",
    unit: "R-04",
    type: "SURVIVOR CONFIRMED",
    severity: "critical",
    robotId: "R-04",
    survivorId: "S-01",
  },

  {
    id: "L2",
    time: "14:31",
    unit: "R-07",
    type: "SECTOR 43 ACCESS OPEN",
    severity: "success",
    robotId: "R-07",
  },

  {
    id: "L3",
    time: "14:30",
    unit: "D-02",
    type: "STRUCTURAL HAZARD",
    severity: "warn",
  },

  {
    id: "L4",
    time: "14:28",
    unit: "R-03",
    type: "COMM DEGRADED",
    severity: "warn",
    robotId: "R-03",
  },

  {
    id: "L5",
    time: "14:27",
    unit: "R-04",
    type: "POSSIBLE SURVIVOR",
    severity: "warn",
    robotId: "R-04",
  },

  {
    id: "L6",
    time: "14:25",
    unit: "R-01",
    type: "THERMAL SIGNATURE",
    severity: "info",
    robotId: "R-01",
  },

  {
    id: "L7",
    time: "14:23",
    unit: "R-11",
    type: "GOLF COURSE ACCESS CLEAR",
    severity: "success",
    robotId: "R-11",
  },

  {
    id: "L8",
    time: "14:21",
    unit: "D-01",
    type: "AERIAL SURVEY DONE",
    severity: "info",
  },

  {
    id: "L9",
    time: "14:19",
    unit: "R-05",
    type: "SIGNAL LOST",
    severity: "critical",
    robotId: "R-05",
  },

  {
    id: "L10",
    time: "14:17",
    unit: "R-08",
    type: "SECTOR 23A SUPPLY DROP",
    severity: "info",
    robotId: "R-08",
  },

  {
    id: "L11",
    time: "14:15",
    unit: "D-01",
    type: "AFTERSHOCK 2.3",
    severity: "warn",
  },

  {
    id: "L12",
    time: "14:12",
    unit: "R-02",
    type: "BUILDING SEARCH STARTED",
    severity: "info",
    robotId: "R-02",
  },

  {
    id: "L13",
    time: "14:09",
    unit: "R-09",
    type: "DEBRIS FIELD MARKED",
    severity: "warn",
    robotId: "R-09",
  },

  {
    id: "L14",
    time: "14:06",
    unit: "R-06",
    type: "COMMAND POST READY",
    severity: "success",
    robotId: "R-06",
  },

  {
    id: "L15",
    time: "14:03",
    unit: "D-02",
    type: "SECTOR 43 SURVEY STARTED",
    severity: "info",
  },

  {
    id: "L16",
    time: "13:59",
    unit: "R-12",
    type: "NORTH EDGE SCAN",
    severity: "info",
    robotId: "R-12",
  },

  {
    id: "L17",
    time: "13:55",
    unit: "R-10",
    type: "STANDBY UNIT CHECKED",
    severity: "success",
    robotId: "R-10",
  },

  {
    id: "L18",
    time: "13:51",
    unit: "D-01",
    type: "EARTHQUAKE RESPONSE OPEN",
    severity: "critical",
  },
]

export const RESCUE_PLANS: Record<string, RescuePlan> = {
  "S-01": {
    survivorId: "S-01",
    access: "BLOCKED",
    nearestRobot: "R-06",
    recRobot: "R-06",
    recRoute: "GOLF COURSE EXTENSION ACCESS",
    reason:
      "Golf Course Road access is obstructed near Sector 43. Use the eastern service road from the Sector 43 command post.",
    confidence: 89,
  },

  "S-02": {
    survivorId: "S-02",
    access: "PARTIAL",
    nearestRobot: "R-02",
    recRobot: "R-02",
    recRoute: "SECTOR 43 SERVICE ROAD",
    reason:
      "R-02 is already en route from Sector 43. The service road remains partially passable after the aftershock.",
    confidence: 76,
  },

  "S-03": {
    survivorId: "S-03",
    access: "CLEAR",
    nearestRobot: "R-11",
    recRobot: "R-11",
    recRoute: "GOLF COURSE ROAD",
    reason:
      "R-11 has active contact. Golf Course Road is open for emergency extraction near the high-rise cluster.",
    confidence: 94,
  },

  "S-04": {
    survivorId: "S-04",
    access: "PARTIAL",
    nearestRobot: "R-03",
    recRobot: "R-03",
    recRoute: "SECTOR 23A ACCESS ROAD",
    reason:
      "Sector 23A access is partially mapped. Signal is weak, so keep the unit within relay range.",
    confidence: 55,
  },
}
