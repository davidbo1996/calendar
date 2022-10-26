import _ from "lodash";
import { getListOfOverlappedEventsBySelectedEvent } from "../../utils/events";
import { getEventsWhichAreNotOverlaped } from "../../utils/events";

function Col({
  events,
  calendarEvents,
  height,
  widthByBlocks,
  dispatchEventsInDifferentBlocks,
}) {
  let orderedEventsByDate = _.orderBy(events, "startDate", ["asc"]);

  return (
    <div style={{ width: widthByBlocks, height: height }}>
      {events.map((currentEvent, index) => (
        <Event
          key={index}
          selectedEvent={currentEvent}
          widthByBlocks={widthByBlocks}
          events={calendarEvents}
          blocks={orderedEventsByDate}
          dispatchEventsInDifferentBlocks={dispatchEventsInDifferentBlocks}
        />
      ))}
    </div>
  );
}

function Event({
  selectedEvent,
  events,
  widthByBlocks,
  dispatchEventsInDifferentBlocks,
}) {
  let overlappedEventsBySelectedEvent =
    getListOfOverlappedEventsBySelectedEvent(events, selectedEvent);
  let width;
  let countEventsOverlappedBySelectedEvent =
    overlappedEventsBySelectedEvent.filter((e) => e.isOverlap === true);
  let countBlocks = dispatchEventsInDifferentBlocks.length;

  let first = getEventsWhichAreNotOverlaped(events);
  let excludeId = first.map((e) => e.id);

  if (countEventsOverlappedBySelectedEvent.length === 0) {
    width = selectedEvent.width;
  } else if (
    countEventsOverlappedBySelectedEvent.length === 1 &&
    !_.includes(excludeId, selectedEvent.id)
  ) {
    width = widthByBlocks * (countBlocks - 1);
  }
  // else if (countEventsOverlappedBySelectedEvent.length ===2 && !_.includes()) {
  //   width = widthByBlocks * (countBlocks - 1);
  // }
  else {
    width = widthByBlocks;
  }

  return (
    <div
      style={{
        height: selectedEvent.height,
        top: selectedEvent.positionTop,
        width: width,
      }}
      className=" absolute flex justify-center items-center rounded border-2  bg-blue-400  text-white shadow-lg "
      key={selectedEvent.key}
    >
      {selectedEvent.id +
        ": " +
        selectedEvent.startFloat +
        "-" +
        selectedEvent.endFloat}
    </div>
  );
}

export default Col;
