import { useState } from "react";
import MonthHeader from "./MonthHeader";
import CalendarGrid from "./CalendarGrid";
import NotesSidebar from "./NotesSidebar";
import ThemeToggle from "./ThemeToggle";
import { useCalendarState } from "../hooks/useCalendarState";
import { useCalendarNotes } from "../hooks/useCalendarNotes";

export default function CalendarContainer() {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";
  const isWarm = theme === "warm";

  const {
    year, month, startDay, endDay, flipDir,
    changeMonth, handleDateClick, clearSelection,
  } = useCalendarState();

  const {
    saveNote, deleteNote, getSavedNote,
    dayHasNote, getNoteForDay, getMonthNotesList, exportNotes,
  } = useCalendarNotes();

  const cardBg  = isDark ? "#1e1e2e" : "#fefaf5";
  const divider = isDark ? "#2e2e2e" : "#e8e0d5";
  const wallBg  = isDark ? "#1a1a2a" : isWarm ? "#d6c9b8" : "#c8d0d8";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: wallBg,
      padding: "40px 16px 60px",
      transition: "background 0.3s",
      backgroundImage: isDark
        ? "none"
        : "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
      backgroundSize: "24px 24px",
      position: "relative",
    }}>

      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 100,
        display: "flex",
        gap: 12,
        background: isDark ? "rgba(30,30,46,0.95)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        padding: "10px 18px",
        borderRadius: "40px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.05)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
        fontFamily: "system-ui, -apple-system, sans-serif",
        pointerEvents: "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ 
            background: "#1a8fd1", 
            color: "white", 
            width: 20, 
            height: 20, 
            borderRadius: "50%", 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontSize: 12,
            fontWeight: "bold",
          }}>✕</span>
          <span style={{ fontSize: 12, color: isDark ? "#ccc" : "#444", fontWeight: 500 }}>
            Clear selection
          </span>
        </div>
        <div style={{ width: 1, background: isDark ? "#444" : "#ddd" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ 
            background: "#1a8fd1", 
            color: "white", 
            width: 20, 
            height: 20, 
            borderRadius: "50%", 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontSize: 11,
            fontWeight: "bold",
          }}>↓</span>
          <span style={{ fontSize: 12, color: isDark ? "#ccc" : "#444", fontWeight: 500 }}>
            Export notes
          </span>
        </div>
      </div>

      <div style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #f0f0f0, #999, #666)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.6)",
        marginBottom: -7,
        zIndex: 10,
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.2s",
      }} />

      <div style={{
        width: 2.5,
        height: 22,
        background: "linear-gradient(to bottom, #8B7355, #D2B48C, #8B7355)",
        marginBottom: -3,
        zIndex: 9,
        position: "relative",
        borderRadius: "1px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
      }} />

      <div style={{
        width: "100%",
        maxWidth: 480,
        background: cardBg,
        borderRadius: "2px 2px 6px 6px",
        overflow: "hidden",
        position: "relative",
        transform: "rotate(0.5deg)",
        boxShadow: isDark
          ? "0 35px 80px rgba(0,0,0,0.6), 0 15px 35px rgba(0,0,0,0.4), 8px 8px 0 rgba(0,0,0,0.2), -4px 4px 0 rgba(0,0,0,0.1)"
          : "0 35px 80px rgba(0,0,0,0.25), 0 15px 35px rgba(0,0,0,0.15), 8px 8px 0 rgba(0,0,0,0.08), -4px 4px 0 rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s, transform 0.3s",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          backgroundImage: isDark
            ? "none"
            : "repeating-linear-gradient(45deg, rgba(0,0,0,0.01) 0px, rgba(0,0,0,0.01) 2px, transparent 2px, transparent 8px)",
          zIndex: 1,
        }} />

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          padding: "0 12px",
          height: 32,
          background: isDark
            ? "linear-gradient(to bottom, #3a3a4a, #1a1a2a, #2a2a3a)"
            : "linear-gradient(to bottom, #e8e0d5, #c8bfb0, #d8cfc0)",
          borderBottom: `2px solid ${isDark ? "#111" : "#a89f90"}`,
          position: "relative",
          zIndex: 2,
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.1)",
        }}>
          {[...Array(22)].map((_, i) => (
            <div key={i} style={{
              width: 16,
              height: 24,
              borderRadius: "50%",
              border: isDark ? "2.5px solid #666" : "2.5px solid #a09080",
              background: isDark
                ? "linear-gradient(135deg, #4a4a5e 0%, #2a2a3e 30%, #1a1a2a 50%, #2a2a3e 70%, #4a4a5e 100%)"
                : "linear-gradient(135deg, #f0e8d8 0%, #d8cfc0 30%, #b8af9f 50%, #d8cfc0 70%, #f0e8d8 100%)",
              boxShadow: isDark
                ? "inset 0 1px 2px rgba(255,255,255,0.15), 0 2px 3px rgba(0,0,0,0.4)"
                : "inset 0 1px 2px rgba(255,255,255,0.6), 0 2px 3px rgba(0,0,0,0.2)",
              flexShrink: 0,
              marginLeft: i === 0 ? 0 : -2,
              transform: "rotateX(5deg)",
            }} />
          ))}
        </div>

        <MonthHeader
          year={year} month={month} flipDir={flipDir}
          onPrev={() => changeMonth(-1)} onNext={() => changeMonth(1)}
        />

        <div style={{
          display: "flex",
          minHeight: 320,
          position: "relative",
          background: cardBg,
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), rgba(0,0,0,0.15), rgba(0,0,0,0.08), transparent)",
            zIndex: 3,
          }} />

          <div style={{
            width: 150,
            borderRight: `2px solid ${divider}`,
            padding: "14px 10px 14px 14px",
            display: "flex",
            flexDirection: "column",
            background: isDark ? "none" : "rgba(250,245,235,0.5)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: 2,
                textTransform: "uppercase",
                color: isDark ? "#666" : "#b0a090",
                fontFamily: "monospace",
              }}>✎ Notes</span>
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>

            <NotesSidebar
              year={year} month={month}
              startDay={startDay} endDay={endDay}
              saveNote={saveNote}
              deleteNote={deleteNote}
              exportNotes={exportNotes}
              clearSelection={clearSelection}
              getMonthNotesList={getMonthNotesList}
              isDark={isDark}
            />
          </div>

          <div style={{
            flex: 1,
            padding: "14px 12px 14px 10px",
            background: isDark ? "none" : "rgba(255,255,255,0.3)",
          }}>
            <CalendarGrid
              year={year} month={month}
              startDay={startDay} endDay={endDay}
              onDateClick={handleDateClick}
              dayHasNote={dayHasNote}
              getNoteForDay={getNoteForDay}
              isDark={isDark}
            />
          </div>
        </div>

        <div style={{
          height: 8,
          background: isDark
            ? "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.06), transparent)",
          pointerEvents: "none",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 30,
            height: 30,
            background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.03) 50%)",
            pointerEvents: "none",
          }} />
        </div>
      </div>

      <div style={{
        width: "90%",
        maxWidth: 440,
        height: 25,
        marginTop: -10,
        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, transparent 80%)",
        filter: "blur(12px)",
        pointerEvents: "none",
        transform: "scaleX(0.95)",
      }} />

      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        background: "linear-gradient(to top, rgba(0,0,0,0.08), transparent)",
        pointerEvents: "none",
      }} />
    </div>
  );
}