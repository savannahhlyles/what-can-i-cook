import { useEffect, useState } from "react";

function FloatIcon({
  src, size, delay, durationMs, holdMs, fadeMs,
  startFromPx, centerYOffset,
}) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      requestAnimationFrame(() => setGo(true));
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  const startT = `translate(-50%, calc(-50% + ${startFromPx}px))`;
  const endT   = `translate(-50%, calc(-50% + ${centerYOffset}px))`;
  const totalPerIcon = durationMs + holdMs + fadeMs;

  return (
    <img
      src={src}
      alt={(src.split("/").pop() || "ingredient").replace(".svg", "")}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        objectFit: "contain",
        pointerEvents: "none",
        filter: "drop-shadow(0 2px 2px rgba(0,0,0,.12))",
        transformOrigin: "50% 50%",

        /* ⬇️ Hidden before its personal delay */
        visibility: "hidden",
        opacity: 0,

        /* motion: starts exactly at `delay` */
        transform: go ? endT : startT,
        transition: `transform ${durationMs}ms cubic-bezier(.25,.8,.25,1)`,

        /* opacity + visibility controlled by animation; begins at same delay */
        animation: `flyFadeSeq ${totalPerIcon}ms ${delay}ms forwards`,
      }}
    />
  );
}

export default function IngredientFloat({
  icons = [],
  boxSize,
  size = 100,
  centerYOffset = 0,
  startDelayMs = 0,
  durationMs = 450,
  holdMs = 500,
  fadeMs = 300,
  staggerMs,
  startFromPx = 140,
  loop = false,
}) {
  const [cycle, setCycle] = useState(0);

  const totalPerIcon = durationMs + holdMs + fadeMs;
  const stagger = staggerMs ?? totalPerIcon; // one-at-a-time
  const N = icons.length;
  const totalCycleMs =
    (N > 0 ? (N - 1) * stagger : 0) + totalPerIcon + startDelayMs;

  useEffect(() => {
    if (!loop || N === 0) return;
    const id = setInterval(() => setCycle(c => c + 1), totalCycleMs);
    return () => clearInterval(id);
  }, [loop, N, totalCycleMs]);

  return (
    <div style={{ position: "relative", width: boxSize, height: boxSize }}>
      <style>
        {`
          /* ⬇️ Visibility is hidden before delay; becomes visible exactly at 0% when the animation starts */
          @keyframes flyFadeSeq {
            0%   { opacity: 0; visibility: visible; }
            25%  { opacity: 1; }
            80%  { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
          }
        `}
      </style>

      {icons.map((src, i) => {
        const delay = (cycle === 0 ? startDelayMs : 0) + i * stagger;
        return (
          <FloatIcon
            key={`${src}-${cycle}`}
            src={src}
            size={size}
            delay={delay}
            durationMs={durationMs}
            holdMs={holdMs}
            fadeMs={fadeMs}
            startFromPx={startFromPx}
            centerYOffset={centerYOffset}
          />
        );
      })}
    </div>
  );
}