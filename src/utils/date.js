/**
 * Create a list of string (date in format "hh:mm") from startTime to endtTime
 * @param {*} startTime Dayjs
 * @param {*} endTime Dayjs
 * @param {*} interval Number
 * @returns list of date in format hh:mm
 */
export function listDates(startTime, endTime, interval) {
  let times = []; // time array
  for (let index = 0; startTime < endTime; index += interval) {
    startTime = startTime.clone().add(index === 0 ? 0 : interval, "minute");
    times.push(
      startTime
        .clone()
        .add(index === 0 ? 0 : interval, "minute")
        .format("hh:mm")
    );
  }

  return times;
}

/**
 * Create a list of numbers from start to end
 *
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function range(start, end) {
  var list = [];
  for (var i = start; i <= end; i++) {
    list.push(i);
  }
  return list;
}
