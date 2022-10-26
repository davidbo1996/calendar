import { useEffect, useState } from "react";

export function useCalendarEvents() {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    fetch("/data/input.json")
      .then((res) => res.json())
      .then((res) => setCalendarEvents(res));
  }, []);

  return calendarEvents;
}
