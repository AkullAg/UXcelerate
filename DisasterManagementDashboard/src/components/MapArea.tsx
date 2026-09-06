import { useEffect, useRef } from "react"

import L from "leaflet"

import "leaflet/dist/leaflet.css"

import { HAZARDS, ROBOTS, SURVIVORS } from "../data"

import type { MapPoint } from "../types"

import { formatAge, hazardColor, robotConfidence, statusLabel } from "../utils"

const MAP_CENTER: MapPoint = [28.462, 77.066]

const MAP_BOUNDS = L.latLngBounds([28.425, 77.025], [28.5, 77.105])

const EARTHQUAKE_ZONE: MapPoint[] = [
  [28.495, 77.028],
  [28.495, 77.102],
  [28.432, 77.102],
  [28.432, 77.028],
]

function gurugramPoint(col: number, row: number): MapPoint {
  return [28.49 - row * 0.006, 77.03 + col * 0.008]
}

function markerIcon(className: string, label: string) {
  return L.divIcon({
    className: "map-marker-wrapper",
    html: `<span class="map-marker ${className}">${label}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

export default function MapArea({
  selectedRobot,
  onSelectRobot,
  onSelectSurvivor,
  showSurvivors,
  showHazards,
  onToggleSurvivors,
  onToggleHazards,
}: {
  selectedRobot: string | null

  onSelectRobot: (id: string | null) => void

  onSelectSurvivor: (id: string | null) => void

  showSurvivors: boolean

  showHazards: boolean

  onToggleSurvivors: () => void

  onToggleHazards: () => void
}) {
  const mapElement = useRef<HTMLDivElement>(null)

  const map = useRef<L.Map | null>(null)

  const hazardLayer = useRef(L.layerGroup())

  const survivorLayer = useRef(L.layerGroup())

  const robotLayer = useRef(L.layerGroup())

  const impactLayer = useRef(L.layerGroup())

  useEffect(() => {
    if (!mapElement.current || map.current) return

    const instance = L.map(mapElement.current, {
      zoomControl: false,
      center: MAP_CENTER,
      zoom: 13,
      minZoom: 12,
      maxZoom: 18,
      maxBounds: MAP_BOUNDS,
      maxBoundsViscosity: 0.92,
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(instance)

    L.polygon(EARTHQUAKE_ZONE, {
      color: "#ef4444",
      weight: 2,
      opacity: 0.85,
      fillColor: "#ef4444",
      fillOpacity: 0.1,
      dashArray: "8 6",
    })
      .bindTooltip("EARTHQUAKE IMPACT ZONE · GURUGRAM RESPONSE AREA", {
        sticky: true,
      })
      .addTo(impactLayer.current)

    ;[
      impactLayer.current,
      hazardLayer.current,
      survivorLayer.current,
      robotLayer.current,
    ].forEach((layer) => layer.addTo(instance))

    instance.fitBounds(MAP_BOUNDS, { padding: [18, 18] })

    map.current = instance

    const observer = new ResizeObserver(() => instance.invalidateSize())

    observer.observe(mapElement.current)

    return () => {
      observer.disconnect()
      instance.remove()
      map.current = null
    }
  }, [])

  useEffect(() => {
    hazardLayer.current.clearLayers()

    if (!showHazards) return

    HAZARDS.forEach((hazard) => {
      const marker = L.marker(gurugramPoint(hazard.col, hazard.row), {
        icon: markerIcon("hazard-marker", hazard.type === "fire" ? "▲" : "!"),
      })

      marker
        .bindTooltip(`${hazard.id} · ${hazard.type.toUpperCase()}`, {
          direction: "top",
        })
        .addTo(hazardLayer.current)

      marker
        .getElement()
        ?.style.setProperty("--marker-color", hazardColor(hazard.type))
    })
  }, [showHazards])

  useEffect(() => {
    survivorLayer.current.clearLayers()

    if (!showSurvivors) return

    SURVIVORS.forEach((survivor) => {
      const certainty =
        survivor.confidence >= 80
          ? "confirmed-marker"
          : survivor.confidence >= 60
            ? "uncertain-marker"
            : "stale-marker"

      const marker = L.marker(gurugramPoint(survivor.col, survivor.row), {
        icon: markerIcon(
          `survivor-marker ${survivor.priority} ${certainty}`,
          survivor.id.replace("S-", ""),
        ),
      })

      marker.on("click", () => {
        onSelectSurvivor(survivor.id)
        onSelectRobot(null)
        map.current?.setView(gurugramPoint(survivor.col, survivor.row), 16, {
          animate: true,
        })
      })

      marker
        .bindTooltip(
          `${survivor.id} · ${survivor.priority.toUpperCase()} PRIORITY · ${survivor.confidence}% CONFIDENCE · ${formatAge(survivor.lastConfirmedSec)}`,
        )
        .addTo(survivorLayer.current)
    })
  }, [showSurvivors, onSelectRobot, onSelectSurvivor])

  useEffect(() => {
    robotLayer.current.clearLayers()

    ROBOTS.forEach((robot) => {
      const confidence = robotConfidence(robot)

      const marker = L.marker(gurugramPoint(robot.mc, robot.mr), {
        icon: markerIcon(
          `robot-marker ${robot.status} ${confidence}-marker`,
          robot.id.replace("R-", ""),
        ),
      })

      marker.on("click", () => {
        onSelectRobot(robot.id)
        onSelectSurvivor(null)
        map.current?.setView(gurugramPoint(robot.mc, robot.mr), 16, {
          animate: true,
        })
      })

      marker
        .bindTooltip(
          `${robot.id} · ${statusLabel(robot.status)} · ${confidence.toUpperCase()} TELEMETRY · ${robot.lastUpdate.toUpperCase()}`,
        )
        .addTo(robotLayer.current)
    })
  }, [onSelectRobot, onSelectSurvivor])

  useEffect(() => {
    const robot = ROBOTS.find((item) => item.id === selectedRobot)

    if (robot)
      map.current?.setView(gurugramPoint(robot.mc, robot.mr), 16, {
        animate: true,
      })
  }, [selectedRobot])

  return (
    <main
      style={{
        flex: 1,
        position: "relative",
        minWidth: 0,
        background: "#dbe7ef",
        overflow: "hidden",
      }}
    >
      <div ref={mapElement} style={{ position: "absolute", inset: 0 }} />
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 500,
          display: "flex",
          gap: 4,
        }}
      >
        {[
          {
            label: "SURV",
            color: "#f59e0b",
            active: showSurvivors,
            onClick: onToggleSurvivors,
          },
          {
            label: "HAZ",
            color: "#ef4444",
            active: showHazards,
            onClick: onToggleHazards,
          },
        ].map((layer) => (
          <button
            key={layer.label}
            onClick={layer.onClick}
            style={{
              padding: "3px 8px",
              border: `1px solid ${layer.active ? layer.color : "#64748b"}`,
              borderRadius: 3,
              background: layer.active ? `${layer.color}dd` : "#0f172acc",
              color: layer.active ? "#07111d" : "#cbd5e1",
              fontFamily: "'Barlow Condensed'",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            {layer.label}
          </button>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 500,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {[
          { label: "+", action: () => map.current?.zoomIn(), name: "Zoom in" },
          {
            label: "−",
            action: () => map.current?.zoomOut(),
            name: "Zoom out",
          },
          {
            label: "⊡",
            action: () => map.current?.setView(MAP_CENTER, 12),
            name: "Reset map view",
          },
        ].map((control) => (
          <button
            key={control.name}
            onClick={control.action}
            aria-label={control.name}
            style={{
              width: 28,
              height: 28,
              border: "1px solid #94a3b8",
              background: "#0f172acc",
              color: "#e2e8f0",
              fontSize: control.label === "⊡" ? 13 : 16,
              cursor: "pointer",
            }}
          >
            {control.label}
          </button>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          zIndex: 500,
          padding: "5px 8px",
          background: "#07111dcc",
          border: "1px solid #ef444477",
          color: "#fecaca",
          fontFamily: "'JetBrains Mono'",
          fontSize: 8,
          letterSpacing: "0.05em",
        }}
      >
        GURUGRAM · GOLF COURSE / 23A / 43 · EARTHQUAKE ZONE
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 500,
          padding: "6px 8px 18px",
          background: "#07111de8",
          borderTop: "1px solid #ffffff1c",
          borderLeft: "1px solid #ffffff1c",
          color: "#cbd5e1",
          fontFamily: "'Barlow Condensed'",
          fontSize: 8,
          letterSpacing: "0.08em",
          lineHeight: 1.6,
        }}
      >
        <div style={{ color: "#64748b", marginBottom: 2 }}>
          TELEMETRY CONFIDENCE
        </div>
        <div>
          <span style={{ color: "#22d3ee" }}>●</span> CONFIRMED{" "}
          <span style={{ color: "#f59e0b", marginLeft: 7 }}>◌</span> UNCERTAIN{" "}
          <span style={{ color: "#64748b", marginLeft: 7 }}>■</span> STALE
        </div>
      </div>
    </main>
  )
}
