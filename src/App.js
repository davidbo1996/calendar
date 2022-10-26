/* eslint-disable no-use-before-define */
import "./assets/App.css";
import { useCalendarEvents } from "./hooks/calendarEvents.hooks";
import { useWindowDimensions } from "./hooks/window.hooks";
import dayjs from "dayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import _, { orderBy } from "lodash";
var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);
const queryClient = new QueryClient();

function makeItem(event, height, width) {
  const startTime = new Date("01-01-2017 " + event.start + ":00");
  const startTimeFull = dayjs(startTime);
  const endTimeFull = dayjs(startTime).add(event.duration, "minute");
  const minutePerHeightPixel = height / (12 * 60);
  const hourPerHeightPixel = Math.round(height / 12);
  const positionTop =
    (Math.round(parseFloat(startTimeFull.format("HH.mm")).toFixed(2)) - 9) *
      hourPerHeightPixel +
    parseInt(startTimeFull.format("HH.mm").substring(3, 5)) *
      minutePerHeightPixel;
  const leftPosition = 0;
  return {
    startTime: startTimeFull,
    endTime: endTimeFull,
    startDate: startTimeFull.toDate(),
    endDate: endTimeFull.toDate(),
    startFloat: parseFloat(startTimeFull.format("HH.mm")).toFixed(2),
    endFloat: parseFloat(endTimeFull.format("HH.mm")).toFixed(2),
    id: event.id,
    key: event.id,
    height: Math.round(minutePerHeightPixel * event.duration),
    positionTop: positionTop,
    leftPosition: leftPosition,
  };
}

function checkIfOverlapOrNot(events, selectedEvent) {
  let list = [];
  if (events.length === 0) {
    return false;
  }
  for (let event of events) {
    let isBetweenStartTimeAndEndTime =
      (event.startFloat < selectedEvent.startFloat &&
        selectedEvent.endFloat < event.endFloat) ||
      (event.startFloat < selectedEvent.endFloat &&
        selectedEvent.startFloat < event.endFloat);

    list.push({
      isOverlap: isBetweenStartTimeAndEndTime,
      key: event.key,
    });
  }

  return list.filter((e) => e.isOverlap === true).length !== 0 ? true : false;
}

function filterEvents(events) {
  let list = [];
  for (let index = 0; index < events.length; index++) {
    let checkIfOverlap = checkIfOverlapOrNot(list, events[index]);
    if (!checkIfOverlap) {
      list = _.concat(list, events[index]);
    }
  }
  return list;
}

function dispatchEventsInDifferentBlocks(orderedEventsByKey) {
  let countEvents = orderedEventsByKey.length;
  let list = [];
  while (_.sum(list.map((e) => e.length)) < countEvents) {
    let filteredEvents = filterEvents(orderedEventsByKey);
    console.log(filteredEvents);
    list = _.concat(list, [filteredEvents]);
    let excludeKeys = filteredEvents.map((event) => event.key);
    let eventsWithoutPreviousOne = orderedEventsByKey.filter(
      (event) => !excludeKeys.includes(event.key)
    );
    orderedEventsByKey = eventsWithoutPreviousOne;
  }

  return list;
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
  console.log("Height", height);
  console.log("width", width);

  let eventsTransform = calendarEvents.map((calendarEvent) =>
    makeItem(calendarEvent, height, width)
  );

  return <Test2 events={eventsTransform} height={height} width={width} />;
}

function Test2({ events, height, width }) {
  let orderedEventsByKey = orderBy(events, "key");
  let eventsDispatchInBlocks =
    dispatchEventsInDifferentBlocks(orderedEventsByKey);
  let countEventsDispatchInBlocks = eventsDispatchInBlocks.length;
  let widthByBlocks = Math.round(width / countEventsDispatchInBlocks);

  return (
    <div className="flex">
      {eventsDispatchInBlocks.map((blocks) => (
        <Test3
          events={blocks}
          numberBlocks={eventsDispatchInBlocks.length}
          height={height}
          width={width}
          widthByBlocks={widthByBlocks}
        />
      ))}
    </div>
  );
}

function Test3({ events, numberBlocks, height, width, widthByBlocks }) {
  let orderedByDate = _.orderBy(events, "startDate", ["asc"]);

  return (
    <div style={{ width: widthByBlocks, height: height }}>
      {orderedByDate.map((event) => (
        <div
          style={{
            height: event.height,
            top: event.positionTop,
            // left: event.leftPosition,
          }}
          className=" absolute flex justify-center items-center rounded border-2 bg-green-500 text-white w-full"
          key={event.key}
        >
          {event.startFloat + "-" + event.endFloat}
        </div>
      ))}

      {/* <div
        style={{
          height: orderedByDate[0].height,
          top: orderedByDate[0].positionTop,
          left: orderedByDate[0].leftPosition,
        }}
        className="absolute flex justify-center items-center rounded border-2 bg-blue-500 text-white w-full"
        key={orderedByDate[0].key}
      >
        {orderedByDate[0].id}
      </div> */}
    </div>
  );
}
export default App;
