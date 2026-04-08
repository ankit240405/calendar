import { useCallback } from "react";
import { HOLIDAYS } from "../data/holidays";

function isoKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function useHolidays() {
  const getHoliday = useCallback((year, month, day) => {
    const key = isoKey(year, month, day);
    return HOLIDAYS[key] ?? null;
  }, []);

  const isHoliday = useCallback((year, month, day) => {
    return !!HOLIDAYS[isoKey(year, month, day)];
  }, []);

  return { getHoliday, isHoliday };
}
