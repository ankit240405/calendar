import { useMemo } from "react";
import { useHolidays } from "../hooks/useHolidays";

const BLUE = "#1a8fd1";
const BLUE_LIGHT = "#e0f2fb";
const BLUE_DARK = "#0e6fa3";
const DAYS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

export default function CalendarGrid({ year, month, startDay, endDay, onDateClick, dayHasNote, getNoteForDay, isDark }) {
  const { getHoliday } = useHolidays();
  const today = new Date();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const mondayFirst = (firstDay + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < mondayFirst; i++) cells.push(null);
    for (let i = 1; i <= totalDays; i++) cells.push(i);
    return cells;
  }, [year, month]);

  const isStart = (d) => d === startDay;
  const isEnd   = (d) => d !== null && d === endDay;
  const inRange = (d) => startDay && endDay && d > Math.min(startDay, endDay) && d < Math.max(startDay, endDay);
  const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const getDow = (day) => {
    const firstDay = new Date(year, month, 1).getDay();
    return ((firstDay + 6) % 7 + day - 1) % 7; 
  };

  const getCellStyle = (day) => {
    if (!day) return { opacity: 0, pointerEvents: "none" };
    const dow = getDow(day);
    const isWeekend = dow >= 5;
    const isHol = !!getHoliday(year, month, day);

    if (isStart(day) || isEnd(day))
      return { background: BLUE, color: "#fff", borderRadius: 6, fontWeight: 700 };
    if (inRange(day))
      return { background: isDark ? "#0a3a52" : BLUE_LIGHT, color: isDark ? "#7dd3fc" : BLUE_DARK, borderRadius: 0 };
    if (isToday(day))
      return { border: `2px solid ${BLUE}`, borderRadius: 6, fontWeight: 600, color: isDark ? "#7dd3fc" : BLUE_DARK };
    if (isHol)
      return { color: isDark ? "#f87171" : "#e53e3e" };
    if (isWeekend)
      return { color: BLUE };
    return { color: isDark ? "#ccc" : "#333" };
  };

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <div key={d} className="text-center font-bold"
            style={{ fontSize: 9, letterSpacing: "0.5px", paddingBottom: 4,
              color: i >= 5 ? BLUE : (isDark ? "#555" : "#aaa") }}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7" style={{ gap: "1px 0" }}>
        {days.map((day, idx) => {
          const holiday = day ? getHoliday(year, month, day) : null;
          const hasNote = day ? dayHasNote(year, month, day) : false;
          const style = getCellStyle(day);
          return (
            <div key={idx}
              onClick={() => day && onDateClick(day)}
              role={day ? "button" : undefined}
              tabIndex={day ? 0 : undefined}
              onKeyDown={(e) => { if (day && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onDateClick(day); }}}
              className="relative flex items-center justify-center"
              style={{ height: 28, fontSize: 12, cursor: day ? "pointer" : "default", ...style }}
              title={holiday || undefined}
            >
              {day}
              {day && (hasNote || !!holiday) && !isStart(day) && !isEnd(day) && (
                <span className="absolute rounded-full"
                  style={{ width: 3, height: 3, bottom: 1, left: "50%", transform: "translateX(-50%)",
                    background: holiday ? "#e53e3e" : BLUE }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}