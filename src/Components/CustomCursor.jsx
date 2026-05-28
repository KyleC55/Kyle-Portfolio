import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const circleRef = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    let rafId;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12);
      circle.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        circle.style.width = "52px";
        circle.style.height = "52px";
        circle.style.borderColor = "rgba(168,85,247,0.8)";
        circle.style.boxShadow = "0 0 12px rgba(168,85,247,0.5), inset 0 0 12px rgba(168,85,247,0.1)";
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        circle.style.width = "36px";
        circle.style.height = "36px";
        circle.style.borderColor = "rgba(34,211,238,0.8)";
        circle.style.boxShadow = "0 0 10px rgba(34,211,238,0.4), inset 0 0 10px rgba(34,211,238,0.08)";
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={circleRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1.5px solid rgba(34,211,238,0.8)",
        boxShadow: "0 0 10px rgba(34,211,238,0.4), inset 0 0 10px rgba(34,211,238,0.08)",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        transition: "width 0.15s, height 0.15s, border-color 0.15s, box-shadow 0.15s",
      }}
    />
  );
}
