import { useReducer, useCallback } from "react";

const init = (year, month) => ({ year, month, startDay: null, endDay: null, flipDir: "next" });

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_MONTH": {
      let m = state.month + action.dir;
      let y = state.year;
      if (m > 11) { m = 0; y += 1; }
      if (m < 0)  { m = 11; y -= 1; }
      return { ...state, year: y, month: m, startDay: null, endDay: null, flipDir: action.dir > 0 ? "next" : "prev" };
    }
    case "CLICK_DAY": {
      const { day } = action;
      const { startDay, endDay } = state;
      if (!startDay)        return { ...state, startDay: day, endDay: null };
      if (endDay !== null)  return { ...state, startDay: day, endDay: null };
      if (day < startDay)   return { ...state, startDay: day, endDay: startDay };
      return { ...state, endDay: day };
    }
    case "CLEAR":
      return { ...state, startDay: null, endDay: null };
    default:
      return state;
  }
}

export function useCalendarState(initialYear = new Date().getFullYear(), initialMonth = new Date().getMonth()) {
  const [state, dispatch] = useReducer(reducer, init(initialYear, initialMonth));
  const changeMonth    = useCallback((dir) => dispatch({ type: "CHANGE_MONTH", dir }), []);
  const handleDateClick = useCallback((day) => dispatch({ type: "CLICK_DAY", day }), []);
  const clearSelection  = useCallback(() => dispatch({ type: "CLEAR" }), []);
  return { ...state, changeMonth, handleDateClick, clearSelection };
}