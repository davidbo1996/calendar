import Col from "../Col/col";
import { dispatchEventsInDifferentBlocks } from "../../utils/events";

function Row({ events, height, width }) {
  let eventsDispatchInBlocks = dispatchEventsInDifferentBlocks(events);
  let countEventsDispatchInBlocks = eventsDispatchInBlocks.length;
  let widthByBlocks = Math.round(width / countEventsDispatchInBlocks);

  return (
    <div className="flex flex-row">
      {eventsDispatchInBlocks.map((blocks, index) => (
        <Col
          key={index}
          calendarEvents={events}
          events={blocks}
          numberBlocks={eventsDispatchInBlocks.length}
          dispatchEventsInDifferentBlocks={eventsDispatchInBlocks}
          height={height}
          width={width}
          widthByBlocks={widthByBlocks}
          index={index}
        />
      ))}
    </div>
  );
}

export default Row;
