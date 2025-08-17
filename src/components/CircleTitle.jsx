// src/components/CircleTitle.jsx
import React, { useMemo, useState, useEffect } from "react";

export default function CircleTitle({
  text = "What Can I Cook With This?",
  radius = 170,
  arcDeg = 260,
  fontSize = 36,
  weight = 800,
  fontFamily = "'Poppins Medium', Poppins, sans-serif",
  // animation controls
  staggerMs = 35,        // delay between letters
  flyInPx = 24,          // how far past the circle they start from
  durationMs = 450,      // fly-in duration
}) {
  const chars = useMemo(() => Array.from(text), [text]);

  // Measure widths so spacing is visually even
  const widths = useMemo(() => {
    if (typeof document === "undefined") return chars.map(() => 10);
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
    return chars.map((ch) => ctx.measureText(ch).width || 10);
  }, [chars, fontSize, weight, fontFamily]);

  const totalWidth = widths.reduce((a, b) => a + b, 0);

  // Map each letter's center along baseline → angle on arc
  const start = -90 - arcDeg / 2;
  let run = 0;
  const angles = widths.map((w) => {
    const center = run + w / 2;
    run += w;
    const t = totalWidth ? center / totalWidth : 0.5; // 0..1
    return start + t * arcDeg;
  });

  // animate: mount → transition to final transform
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const box = radius * 2;

  const wrap = { display: "flex", justifyContent: "center", margin: "24px 0" };
  const dial = { position: "relative", width: `${box}px`, height: `${box}px` };
  const base = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transformOrigin: "0 0",
    fontSize: `${fontSize}px`,
    fontWeight: weight,
    lineHeight: 1,
    whiteSpace: "pre",
    fontFamily,
    willChange: "transform, opacity",
  };

  const ease = "cubic-bezier(.2,.7,.2,1)";

  return (
    <div style={wrap}>
      <div style={dial} aria-label={text}>
        {chars.map((ch, i) => {
          // final transform (on the circle)
          const finalT = `
            rotate(${angles[i]}deg)
            translate(${radius}px, 0)
            rotate(90deg)
            translate(${-widths[i] / 2}px, 0)
          `;
          // initial transform (a bit outside the circle)
          const startT = `
            rotate(${angles[i]}deg)
            translate(${radius + flyInPx}px, 0)
            rotate(90deg)
            translate(${-widths[i] / 2}px, 0)
          `;

          const delay = i * staggerMs;

          return (
            <span
              key={i}
              style={{
                ...base,
                opacity: mounted ? 1 : 0,
                transform: mounted ? finalT : startT,
                transition: `
                  transform ${durationMs}ms ${ease} ${delay}ms,
                  opacity ${Math.min(durationMs, 400)}ms ease ${delay}ms
                `,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </div>
  );
}