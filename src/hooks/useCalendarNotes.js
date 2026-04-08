import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cal-notes-v4";

function isoKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function useCalendarNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {}
  }, [notes]);

  const buildKey = useCallback((year, month, startDay, endDay) => {
    if (!startDay && !endDay) {
      return `MONTH__${year}-${String(month + 1).padStart(2, "0")}`;
    }
    if (startDay && (!endDay || startDay === endDay)) {
      return `DAY__${isoKey(year, month, startDay)}`;
    }
    const s = Math.min(startDay, endDay);
    const e = Math.max(startDay, endDay);
    return `RANGE__${isoKey(year, month, s)}__${isoKey(year, month, e)}`;
  }, []);

  const saveNote = useCallback((year, month, startDay, endDay, text) => {
    const key = buildKey(year, month, startDay, endDay);
    setNotes((prev) => {
      if (!text.trim()) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: text.trim() };
    });
  }, [buildKey]);

  const deleteNote = useCallback((year, month, startDay, endDay) => {
    const key = buildKey(year, month, startDay, endDay);
    setNotes((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, [buildKey]);

  const getSavedNote = useCallback((year, month, startDay, endDay) => {
    const key = buildKey(year, month, startDay, endDay);
    return notes[key] ?? null;
  }, [notes, buildKey]);

  const dayHasNote = useCallback((year, month, day) => {
    const dk = isoKey(year, month, day);
    const dayKey = `DAY__${dk}`;
    if (notes[dayKey]?.trim()) return true;
    return Object.keys(notes).some((k) => {
      if (!k.startsWith("RANGE__")) return false;
      const parts = k.replace("RANGE__", "").split("__");
      return dk >= parts[0] && dk <= parts[1] && notes[k]?.trim();
    });
  }, [notes]);

  const getNoteForDay = useCallback((year, month, day) => {
    const dk = isoKey(year, month, day);
    const dayKey = `DAY__${dk}`;
    if (notes[dayKey]?.trim()) return notes[dayKey];
    const rangeKey = Object.keys(notes).find((k) => {
      if (!k.startsWith("RANGE__")) return false;
      const parts = k.replace("RANGE__", "").split("__");
      return dk >= parts[0] && dk <= parts[1] && notes[k]?.trim();
    });
    return rangeKey ? notes[rangeKey] : null;
  }, [notes]);

  const getMonthNotesList = useCallback((year, month) => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    const monthKey = `MONTH__${prefix}`;
    const MONTH_NAMES = ["January","February","March","April","May","June",
      "July","August","September","October","November","December"];
    const monthName = MONTH_NAMES[month];
    const result = [];

    if (notes[monthKey]?.trim()) {
      result.push({ label: monthName, text: notes[monthKey] });
    }

    Object.entries(notes).forEach(([k, v]) => {
      if (!v?.trim() || k === monthKey) return;

      if (k.startsWith(`DAY__${prefix}`)) {
        const day = parseInt(k.split("-")[2]);
        result.push({ label: `${day} ${monthName}`, text: v });
      } else if (k.startsWith("RANGE__")) {
        const parts = k.replace("RANGE__", "").split("__");
        const [s, e] = parts;
        if (s.startsWith(prefix) || e.startsWith(prefix)) {
          const sDay = parseInt(s.split("-")[2]);
          const eDay = parseInt(e.split("-")[2]);
          result.push({ label: `${sDay}–${eDay} ${monthName}`, text: v });
        }
      }
    });

    result.sort((a, b) => {
      if (a.label === monthName) return -1;
      if (b.label === monthName) return 1;
      return parseInt(a.label) - parseInt(b.label);
    });

    return result;
  }, [notes]);

  const exportNotes = useCallback(() => {
    const lines = Object.entries(notes)
      .filter(([, v]) => v?.trim())
      .map(([k, v]) => {
        if (k.startsWith("MONTH__")) return `[${k.replace("MONTH__", "")}]\n${v}`;
        if (k.startsWith("DAY__"))   return `[${k.replace("DAY__", "")}]\n${v}`;
        if (k.startsWith("RANGE__")) {
          const parts = k.replace("RANGE__", "").split("__");
          return `[${parts[0]} → ${parts[1]}]\n${v}`;
        }
        return `[${k}]\n${v}`;
      })
      .join("\n\n---\n\n");
    const blob = new Blob([lines || "No notes yet."], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "calendar-notes.txt"; a.click();
    URL.revokeObjectURL(url);
  }, [notes]);

  return {
    notes, saveNote, deleteNote, getSavedNote,
    dayHasNote, getNoteForDay, getMonthNotesList, exportNotes,
  };
}