import _ from "lodash";
import { test2 } from "../../utils/events";

function Col({ events, calendarEvents, height, widthByBlocks }) {
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
        />
      ))}
    </div>
  );
}

function Event({ selectedEvent, events, widthByBlocks }) {
  let test = test2(events, selectedEvent);
  let width;
  let countTrue = test.filter((e) => e.isOverlap === true);

  if (countTrue.length === 1) {
    width = selectedEvent.width;
  } else {
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
