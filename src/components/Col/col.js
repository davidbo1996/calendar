import _ from "lodash";

function Col({ events, height, widthByBlocks }) {
  let orderedEventsByDate = _.orderBy(events, "startDate", ["asc"]);

  return (
    <div style={{ width: widthByBlocks, height: height }}>
      {orderedEventsByDate.map((event) => (
        <div
          style={{
            height: event.height,
            top: event.positionTop,
            width: widthByBlocks,
          }}
          className=" absolute flex justify-center items-center rounded border-2  bg-blue-400  text-white shadow-lg "
          key={event.key}
        >
          {event.id + ": " + event.startFloat + "-" + event.endFloat}
        </div>
      ))}
    </div>
  );
}

export default Col;
