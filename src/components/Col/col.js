import _ from "lodash";
import Event from "../Event/event";

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

export default Col;
