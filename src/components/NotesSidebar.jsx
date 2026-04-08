import { useState, useEffect, useRef } from "react";

const BLUE = "#1a8fd1";
const MONTH_NAMES = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];

export default function NotesSidebar({
  year, month, startDay, endDay,
  saveNote, deleteNote, exportNotes, clearSelection,
  getMonthNotesList, isDark,
}) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const prevKey = useRef(null);

  const monthName = MONTH_NAMES[month];

  const isSingleDay = startDay !== null && (endDay === null || startDay === endDay);
  const isRange     = startDay !== null && endDay !== null && startDay !== endDay;
  const isMonth     = !startDay && !endDay;

  const getLabel = () => {
    if (isMonth)     return `Notes for ${monthName}`;
    if (isSingleDay) return `${startDay} ${monthName}`;
    if (isRange) {
      const s = Math.min(startDay, endDay);
      const e = Math.max(startDay, endDay);
      return `${s}–${e} ${monthName}`;
    }
    return `Notes for ${monthName}`;
  };

  const currentKey = `${year}-${month}-${startDay ?? "x"}-${endDay ?? "x"}`;

  useEffect(() => {
    if (currentKey !== prevKey.current) {
      prevKey.current = currentKey;
      setText("");      
      setSaved(false);
    }
  }, [currentKey]);

  const handleSave = () => {
    if (!text.trim()) return;
    saveNote(year, month, startDay, endDay, text);
    setText("");         
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const notesList = getMonthNotesList(year, month);

  const bg       = isDark ? "#252535" : "#f7f9fb";
  const mutedTxt = isDark ? "#555"    : "#bbb";
  const bodyTxt  = isDark ? "#ccc"    : "#333";
  const ruleLine = isDark ? "#2a2a3a" : "#e8e8e8";
  const labelCol = isDark ? "#7dd3fc" : BLUE;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 0 }}>

      <div style={{ flex: 1, overflowY: "auto", marginBottom: 10 }}>
        {notesList.length === 0
          ? [...Array(7)].map((_, i) => (
              <div key={i} style={{ height: 1, background: ruleLine, marginBottom: 15, marginRight: 2 }} />
            ))
          : notesList.map((item, i) => (
              <div key={i} style={{
                borderBottom: `1px solid ${ruleLine}`,
                paddingBottom: 5, marginBottom: 10, paddingRight: 2,
              }}>
                <div style={{ fontSize: 8, color: labelCol, fontWeight: 700, marginBottom: 1 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 10, color: bodyTxt, lineHeight: 1.4, wordBreak: "break-word" }}>
                  {item.text}
                </div>
              </div>
            ))
        }
      </div>

      <div style={{ fontSize: 8, color: labelCol, fontWeight: 700, marginBottom: 3, letterSpacing: 0.3 }}>
        {getLabel()}
      </div>

      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setSaved(false); }}
        placeholder="Add note…"
        rows={3}
        style={{
          width: "100%", resize: "none", outline: "none",
          fontSize: 10, padding: "5px 6px", borderRadius: 5,
          border: `1px solid ${isDark ? "#333" : "#ddd"}`,
          background: bg, color: bodyTxt, fontFamily: "inherit",
          marginBottom: 5, boxSizing: "border-box",
        }}
      />

      <div style={{ display: "flex", gap: 4 }}>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          style={{
            flex: 1, padding: "4px 0", borderRadius: 5, border: "none",
            fontSize: 10, fontWeight: 700,
            cursor: text.trim() ? "pointer" : "not-allowed",
            background: !text.trim() ? (isDark ? "#2a2a3e" : "#eee") : saved ? "#22c55e" : BLUE,
            color: !text.trim() ? mutedTxt : "#fff",
            transition: "background 0.2s",
          }}>
          {saved ? "✓" : "Save"}
        </button>
        <button
          onClick={() => { clearSelection(); setText(""); setSaved(false); }}
          title="Clear selection"
          style={{
            padding: "4px 7px", borderRadius: 5,
            border: `1px solid ${isDark ? "#333" : "#ddd"}`,
            fontSize: 10, background: "transparent", color: mutedTxt, cursor: "pointer",
          }}>✕</button>
        <button
          onClick={exportNotes}
          title="Export notes"
          style={{
            padding: "4px 7px", borderRadius: 5,
            border: `1px solid ${isDark ? "#333" : "#ddd"}`,
            fontSize: 10, background: "transparent", color: mutedTxt, cursor: "pointer",
          }}>↓</button>
      </div>
    </div>
  );
}