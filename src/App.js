/* eslint-disable no-use-before-define */
import "./assets/App.css";
import { useCalendarEvents } from "./hooks/calendarEvents.hooks";
import { useWindowDimensions } from "./hooks/window.hooks";
import dayjs from "dayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Row from "./components/Row/row";

const queryClient = new QueryClient();

function makeItem(selectedEvent, height, width) {
  const startTime = new Date("01-01-2017 " + selectedEvent.start + ":00");
  const startTimeFull = dayjs(startTime);
  const endTimeFull = dayjs(startTime).add(selectedEvent.duration, "minute");
  const minutePerHeightPixel = height / (12 * 60);
  const hourPerHeightPixel = Math.round(height / 12);
  const positionTop =
    (Math.round(parseFloat(startTimeFull.format("HH.mm").substring(0, 2))) -
      9) *
      hourPerHeightPixel +
    parseInt(startTimeFull.format("HH.mm").substring(3, 5)) *
      minutePerHeightPixel;
  const leftPosition = 0;

  return {
    // startDate: startTimeFull.toDate(),
    // endDate: endTimeFull.toDate(),
    startFloat: parseFloat(startTimeFull.format("HH.mm")).toFixed(2),
    endFloat: parseFloat(endTimeFull.format("HH.mm")).toFixed(2),
    id: selectedEvent.id,
    key: selectedEvent.id,
    height: Math.round(minutePerHeightPixel * selectedEvent.duration),
    positionTop: Math.round(positionTop),
    leftPosition: leftPosition,
    width: width,
  };
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Calendar />
    </QueryClientProvider>
  );
}

function Calendar() {
  const calendarEvents = useCalendarEvents();
  const { height, width } = useWindowDimensions();
  let eventsTransform = calendarEvents.map((calendarEvent) =>
    makeItem(calendarEvent, height, width, calendarEvents)
  );

  return <Row events={eventsTransform} height={height} width={width} />;
}

export default App;
