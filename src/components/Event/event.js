import { getWidth } from "../../utils/events";
import {} from "../../utils/events";

function Event({
  selectedEvent,
  events,
  widthByBlocks,
  dispatchEventsInDifferentBlocks,
}) {
  let width = getWidth(
    selectedEvent,
    events,
    dispatchEventsInDifferentBlocks,
    widthByBlocks
  );

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

export default Event;
