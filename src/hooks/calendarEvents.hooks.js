/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function useCalendarEvents() {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    fetch("/data/input.json")
      .then((res) => res.json())
      .then((res) => setCalendarEvents(res));
  }, []);

  return calendarEvents;
}
