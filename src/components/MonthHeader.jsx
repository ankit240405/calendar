import { useEffect, useRef, useState } from "react";
import { MONTH_NAMES, MONTH_IMAGES } from "../data/holidays";

export default function MonthHeader({ year, month, flipDir, onPrev, onNext }) {
  const [display, setDisplay] = useState({ month, year });
  const [isFlipping, setIsFlipping] = useState(false);
  const [incoming, setIncoming] = useState(null);
  const prevRef = useRef(month);

  useEffect(() => {
    if (month === prevRef.current) return;
    prevRef.current = month;
    setIncoming({ month, year });
    setIsFlipping(true);
    const t = setTimeout(() => {
      setDisplay({ month, year });
      setIsFlipping(false);
      setIncoming(null);
    }, 600);
    return () => clearTimeout(t);
  }, [month, year]);

  const shown = isFlipping && incoming ? incoming : display;

  return (
    <div style={{ position: "relative", width: "100%", height: 240, overflow: "hidden", background: "#f5f0e8" }}>
      <style>{`
        .flip-container {
          perspective: 2000px;
          width: 100%;
          height: 100%;
          position: relative;
        }
        .flipper {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
        }
        .flipper.flip-next {
          transform: rotateX(-180deg);
        }
        .flipper.flip-prev {
          transform: rotateX(180deg);
        }
        .front, .back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .front {
          transform: rotateX(0deg);
        }
        .back {
          transform: rotateX(180deg);
        }
        .page-shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 10;
        }
        .flip-next .page-shadow {
          background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 30%);
        }
        .page-curl {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.08) 50%);
          pointer-events: none;
          z-index: 5;
        }
      `}</style>

      <div className="flip-container">
        <div className={`flipper ${isFlipping ? (flipDir === "next" ? "flip-next" : "flip-prev") : ""}`}>
          <div className="front">
            <img
              src={MONTH_IMAGES[shown.month]}
              alt={MONTH_NAMES[shown.month]}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div className="page-shadow"></div>
            <div className="page-curl"></div>
          </div>
          <div className="back">
            <img
              src={MONTH_IMAGES[flipDir === "next" ? (shown.month + 1) % 12 : (shown.month - 1 + 12) % 12]}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.7)" }}
            />
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        background: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 6px)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none" }}>
        <svg
          viewBox="0 0 480 120"
          preserveAspectRatio="none"
          style={{ width: "100%", height: 120, display: "block" }}
        >
          <polygon points="0,120 0,10 260,120" fill="#1a8fd1" />
          <polygon points="0,120 0,10 260,120" fill="url(#blueGradient)" />
          <polygon points="480,120 480,0 220,120" fill="#1a8fd1" />
          <polygon points="480,120 480,0 220,120" fill="url(#blueGradient2)" />
          <line x1="0" y1="10" x2="260" y2="120" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
          <line x1="480" y1="0" x2="220" y2="120" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>
            <linearGradient id="blueGradient2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div style={{
        position: "absolute", bottom: 18, right: 24,
        textAlign: "right", color: "#fff", pointerEvents: "none", zIndex: 10,
        textShadow: "0 1px 4px rgba(0,0,0,0.3)",
        maxWidth: "220px",
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, opacity: 0.9, fontWeight: 400 }}>
          {shown.year}
        </div>
        <div style={{ 
          fontSize: 30, 
          fontWeight: 800, 
          letterSpacing: 2, 
          textTransform: "uppercase", 
          lineHeight: 1.1,
          wordBreak: "break-word",
        }}>
          {MONTH_NAMES[shown.month]}
        </div>
      </div>

      <button
        onClick={onPrev}
        style={{
          position: "absolute", bottom: 28, left: 18, zIndex: 20,
          background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.5)", color: "#fff",
          width: 32, height: 32, borderRadius: "4px", cursor: "pointer",
          fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)",
          transition: "all 0.2s",
          fontFamily: "serif",
          fontWeight: "bold",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(255,255,255,0.5)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(255,255,255,0.3)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >‹</button>
      <button
        onClick={onNext}
        style={{
          position: "absolute", bottom: 28, left: 56, zIndex: 20,
          background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.5)", color: "#fff",
          width: 32, height: 32, borderRadius: "4px", cursor: "pointer",
          fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)",
          transition: "all 0.2s",
          fontFamily: "serif",
          fontWeight: "bold",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(255,255,255,0.5)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(255,255,255,0.3)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >›</button>
    </div>
  );
}