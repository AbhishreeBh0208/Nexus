// components/workspace/ResizeHandle.tsx

"use client";

import React, { useRef } from "react";

interface ResizeHandleProps {
  direction: "horizontal" | "vertical";
  onResize: (delta: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

export default function ResizeHandle({
  direction,
  onResize,
  onResizeStart,
  onResizeEnd,
}: ResizeHandleProps) {
  const lastPosition = useRef(0);

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    lastPosition.current =
      direction === "horizontal"
        ? event.clientX
        : event.clientY;

    onResizeStart?.();

    document.body.style.cursor =
      direction === "horizontal"
        ? "col-resize"
        : "row-resize";

    document.body.style.userSelect = "none";

    const handleMove = (moveEvent: PointerEvent) => {
      const currentPosition =
        direction === "horizontal"
          ? moveEvent.clientX
          : moveEvent.clientY;

      const delta = currentPosition - lastPosition.current;

      lastPosition.current = currentPosition;

      onResize(delta);
    };

    const handleUp = () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";

      window.removeEventListener(
        "pointermove",
        handleMove
      );

      window.removeEventListener(
        "pointerup",
        handleUp
      );

      onResizeEnd?.();
    };

    window.addEventListener(
      "pointermove",
      handleMove
    );

    window.addEventListener(
      "pointerup",
      handleUp,
      { once: true }
    );
  };

  return (
    <div
      className={`nexus-resize-handle nexus-resize-${direction}`}
      onPointerDown={handlePointerDown}
      role="separator"
      aria-orientation={
        direction === "horizontal"
          ? "vertical"
          : "horizontal"
      }
    />
  );
}