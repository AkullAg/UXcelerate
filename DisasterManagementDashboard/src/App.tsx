import { useState } from "react"

import AlertsPanel from "./components/AlertsPanel"

import Footer from "./components/Footer"

import FleetPanel from "./components/FleetPanel"

import Header from "./components/Header"

import MapArea from "./components/MapArea"

import ResizeHandle from "./components/ResizeHandle"

import RobotDrawer from "./components/RobotDrawer"

export default function App() {
  const [selectedRobot, setSelectedRobot] = useState<string | null>(null)

  const [selectedSurvivor, setSelectedSurvivor] = useState<string | null>(null)

  const [showSurvivors, setShowSurvivors] = useState(true)

  const [showHazards, setShowHazards] = useState(true)

  const [leftWidth, setLeftWidth] = useState(230)

  const [rightWidth, setRightWidth] = useState(218)

  const [footerHeight, setFooterHeight] = useState(104)

  function selectRobot(id: string | null) {
    setSelectedRobot(id)

    if (id) setSelectedSurvivor(null)
  }

  function selectSurvivor(id: string | null) {
    setSelectedSurvivor(id)

    if (id) setSelectedRobot(null)
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#060a10",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <Header />
      <div
        style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }}
      >
        <FleetPanel
          selectedRobot={selectedRobot}
          onSelect={selectRobot}
          width={leftWidth}
        />
        <ResizeHandle
          direction="vertical"
          onResize={(delta) =>
            setLeftWidth((value) => Math.max(190, Math.min(360, value + delta)))
          }
        />
        {selectedRobot && (
          <RobotDrawer
            robotId={selectedRobot}
            onClose={() => setSelectedRobot(null)}
          />
        )}
        <MapArea
          selectedRobot={selectedRobot}
          onSelectRobot={selectRobot}
          onSelectSurvivor={selectSurvivor}
          showSurvivors={showSurvivors}
          showHazards={showHazards}
          onToggleSurvivors={() => setShowSurvivors((value) => !value)}
          onToggleHazards={() => setShowHazards((value) => !value)}
        />
        <ResizeHandle
          direction="vertical"
          onResize={(delta) =>
            setRightWidth((value) =>
              Math.max(190, Math.min(360, value - delta)),
            )
          }
        />
        <AlertsPanel
          selectedSurvivor={selectedSurvivor}
          onFocusRobot={selectRobot}
          width={rightWidth}
        />
      </div>
      <ResizeHandle
        direction="horizontal"
        onResize={(delta) =>
          setFooterHeight((value) => Math.max(76, Math.min(220, value - delta)))
        }
      />
      <Footer
        onFocusRobot={selectRobot}
        onFocusSurvivor={selectSurvivor}
        height={footerHeight}
      />
    </div>
  )
}
