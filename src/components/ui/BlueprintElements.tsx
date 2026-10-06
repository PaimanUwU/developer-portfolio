import React from "react";

/**
 * L-shaped corner registration marks — classic architectural drawing element.
 * Place inside a `relative` container.
 */
export const CornerMarks = ({
  size = 12,
  className = "border-primary/70",
}: {
  size?: number;
  className?: string;
}) => (
  <>
    {/* <span */}
    {/*   className={`absolute top-0 left-0 border-l border-t pointer-events-none ${className}`} */}
    {/*   style={{ width: size, height: size }} */}
    {/*   aria-hidden="true" */}
    {/* /> */}
    {/* <span */}
    {/*   className={`absolute top-0 right-0 border-r border-t pointer-events-none ${className}`} */}
    {/*   style={{ width: size, height: size }} */}
    {/*   aria-hidden="true" */}
    {/* /> */}
    {/* <span */}
    {/*   className={`absolute bottom-0 left-0 border-l border-b pointer-events-none ${className}`} */}
    {/*   style={{ width: size, height: size }} */}
    {/*   aria-hidden="true" */}
    {/* /> */}
    {/* <span */}
    {/*   className={`absolute bottom-0 right-0 border-r border-b pointer-events-none ${className}`} */}
    {/*   style={{ width: size, height: size }} */}
    {/*   aria-hidden="true" */}
    {/* /> */}
  </>
);

/**
 * Crosshair / target marker — adds technical precision feel.
 * Pure SVG vector implementation: perfectly centered hairlines and circle.
 */
export const Crosshair = ({
  size = 24,
  className = "text-primary/10",
}: {
  size?: number;
  className?: string;
}) => {
  const mid = size / 2;
  const r = size * 0.3;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none stroke-current ${className}`}
      aria-hidden="true"
    >
      {/* Horizontal hairline */}
      <line x1={0} y1={mid} x2={size} y2={mid} strokeWidth="1" />
      {/* Vertical hairline */}
      <line x1={mid} y1={0} x2={mid} y2={size} strokeWidth="1" />
      {/* Center target circle */}
      <circle cx={mid} cy={mid} r={r} strokeWidth="1" fill="none" />
    </svg>
  );
};

/** Subtle dot-grid background — graph paper / blueprint paper feel. */
export const dotGridBg: React.CSSProperties = {
  // backgroundImage: `radial-gradient(circle, rgba(43, 127, 255, 0.2) 1px, transparent 1px)`,
  // backgroundSize: "20px 20px",
};
