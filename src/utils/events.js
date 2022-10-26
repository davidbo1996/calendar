import _, { orderBy } from "lodash";

/**
 * Compare the selected event with other events
 * if startTime or endTime between event.startTime and event.endTime
 *  return object with {isOverlap : true, key: 1}
 * else return object with {isOverlap: false, key: 2}
 * And then we push everything in list and we check at the end,
 * if a list has at least one true in object parameter, selectedEvent.startTime
 * or selectedEvent.endTime s is in the list, so is overlapped with some events from list
 *
 * @param {*} events
 * @param {*} selectedEvent
 * @returns boolean
 */

// TODO improve algo to check if overlap or not because it's not work well...
export function checkIfOverlapOrNot(events, selectedEvent) {
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

  return list.filter((e) => e.isOverlap === true).length > 0 ? true : false;
}

// TODO algorithm not okay for this moment
/**
 *
 * Get width for differents events
 *
 * @param {*} selectedEvent
 * @param {*} events
 * @param {*} dispatchEventsInDifferentBlocks
 * @param {*} widthByBlocks
 * @returns
 */

export function getWidth(
  selectedEvent,
  events,
  dispatchEventsInDifferentBlocks,
  widthByBlocks
) {
  let width;
  let overlappedEventsBySelectedEvent =
    getListOfOverlappedEventsBySelectedEvent(events, selectedEvent);
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
  } else {
    width = widthByBlocks;
  }

  return width;
}

/**
 * Get list of events who are overlapped with the selectedEvent
 *
 * @param {*} events
 * @param {*} selectedEvent
 * @returns list
 */

export function getListOfOverlappedEventsBySelectedEvent(
  events,
  selectedEvent
) {
  let list = [];
  if (events.length === 0) {
    return false;
  }
  events = events.filter((e) => e.id !== selectedEvent.id);
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

  // console.log("test", list);

  return list;
}

/**
 * Take list of event as input and create list of events
 * without events which are overlapped
 *
 * @param {*} events
 * @returns list of events who are not overlapped
 */
export function getEventsWhichAreNotOverlaped(events) {
  let eventsWhichArenotOverlapped = [];
  for (let index = 0; index < events.length; index++) {
    let checkIfOverlap = checkIfOverlapOrNot(
      eventsWhichArenotOverlapped,
      events[index]
    );
    if (!checkIfOverlap) {
      eventsWhichArenotOverlapped = _.concat(
        eventsWhichArenotOverlapped,
        events[index]
      );
    }
  }
  return eventsWhichArenotOverlapped;
}

/**
 * Put list of events without events overlapped in another list
 *
 * @param {*} events
 * @returns @Array<Array<Events>>
 */

export function dispatchEventsInDifferentBlocks(events) {
  let countEvents = events.length;
  let orderedEventsByKey = orderBy(events, "key");

  let blocks = [];
  while (_.sum(blocks.map((e) => e.length)) < countEvents) {
    let filteredEvents = getEventsWhichAreNotOverlaped(orderedEventsByKey);
    blocks = _.concat(blocks, [filteredEvents]);
    let eventsAlreadyAdded = filteredEvents.map((event) => event.key);
    let eventsWithoutPreviousOne = orderedEventsByKey.filter(
      (event) => !eventsAlreadyAdded.includes(event.key)
    );
    orderedEventsByKey = eventsWithoutPreviousOne;
  }

  return blocks;
}
