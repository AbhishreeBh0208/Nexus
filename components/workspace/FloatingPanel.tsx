// components/workspace/FloatingPanel.tsx

"use client";

import React, {
  ReactNode,
  useRef,
  useState,
} from "react";

interface FloatingPanelProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function FloatingPanel({
  title,
  children,
  onClose,
}: FloatingPanelProps) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const dragStart = useRef({
    x: 0,
    y: 0,
  });

  const positionStart = useRef({
    x: 0,
    y: 0,
  });

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
    };

    positionStart.current = {
      ...position,
    };

    const move = (moveEvent: PointerEvent) => {
      setPosition({
        x:
          positionStart.current.x +
          moveEvent.clientX -
          dragStart.current.x,

        y:
          positionStart.current.y +
          moveEvent.clientY -
          dragStart.current.y,
      });
    };

    const up = () => {
      window.removeEventListener(
        "pointermove",
        move
      );

      window.removeEventListener(
        "pointerup",
        up
      );

      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    window.addEventListener(
      "pointermove",
      move
    );

    window.addEventListener(
      "pointerup",
      up
    );
  };

  return (
    <div
      className="nexus-floating-panel"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className="nexus-floating-header"
        onPointerDown={handlePointerDown}
      >
        <span>{title}</span>

        <button
          onPointerDown={(event) =>
            event.stopPropagation()
          }
          onClick={onClose}
          aria-label="Close panel"
        >
          ×
        </button>
      </div>

      <div className="nexus-floating-body">
        {children}
      </div>
    </div>
  );
}