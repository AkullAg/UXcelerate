import { useRef, type PointerEvent } from "react"

type ResizeDirection = "vertical" | "horizontal"

export default function ResizeHandle({
  direction,
  onResize,
}: {
  direction: ResizeDirection
  onResize: (delta: number) => void
}) {
  const start = useRef(0)

  const active = useRef(false)

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    active.current = true

    start.current = direction === "vertical" ? event.clientX : event.clientY

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!active.current) return

    const position = direction === "vertical" ? event.clientX : event.clientY

    onResize(position - start.current)

    start.current = position
  }

  function stopResize(event: PointerEvent<HTMLDivElement>) {
    active.current = false

    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <div
      role="separator"
      aria-orientation={direction}
      title="Drag to resize"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopResize}
      onPointerCancel={stopResize}
      style={{
        flexShrink: 0,

        width: direction === "vertical" ? 7 : "100%",

        height: direction === "horizontal" ? 7 : "100%",

        cursor: direction === "vertical" ? "col-resize" : "row-resize",

        background: "rgba(255,255,255,0.025)",

        borderTop:
          direction === "horizontal"
            ? "1px solid rgba(255,255,255,0.08)"
            : "none",

        borderLeft:
          direction === "vertical"
            ? "1px solid rgba(255,255,255,0.08)"
            : "none",

        position: "relative",

        zIndex: 30,
      }}
    />
  )
}
