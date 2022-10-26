import _, { orderBy } from "lodash";

/**
 *
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

  return list.filter((e) => e.isOverlap === true).length !== 0 ? true : false;
}

/**
 * Take list of event as input and create list of events
 * without events which are overlapped
 *
 * @param {*} events
 * @returns list of events who are not overlapped
 */
export function getEventsWhichAreNotOverlaped(events) {
  let list = [];
  for (let index = 0; index < events.length; index++) {
    let checkIfOverlap = checkIfOverlapOrNot(list, events[index]);
    if (!checkIfOverlap) {
      list = _.concat(list, events[index]);
    }
  }
  return list;
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

  let list = [];
  while (_.sum(list.map((e) => e.length)) < countEvents) {
    let filteredEvents = getEventsWhichAreNotOverlaped(orderedEventsByKey);
    list = _.concat(list, [filteredEvents]);
    let excludeKeys = filteredEvents.map((event) => event.key);
    let eventsWithoutPreviousOne = orderedEventsByKey.filter(
      (event) => !excludeKeys.includes(event.key)
    );
    orderedEventsByKey = eventsWithoutPreviousOne;
  }

  return list;
}
