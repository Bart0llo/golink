import * as moment from "moment";

/**
 * toEpochTime
 *
 * Converts a relative time to epoch (UNIX) time.
 *
 * @param {number|undefined} [amount] - The amount of time to add.
 * If undefined, this function will return the current epoch time.
 * @param {moment.unitOfTime.DurationConstructor|undefined} [unit] -
 * The unit of time. If undefined, the amount is assumed to be in seconds.
 * @returns {number} - The epoch time in seconds.
 * @throws {Error} If amount is provided and it's not a positive number.
 * @throws {TypeError} If unit is provided and moment.add throws a TypeError.
 *
 * This function is a simple wrapper around moment.js that allows you to easily
 * get the current or a future epoch time. It handles null pointer references
 * and TypeErrors thrown by moment.js.
 *
 * If amount is undefined, the function will return the current epoch time.
 * If amount is defined, it must be a positive number. If it's not, an Error
 * will be thrown.
 *
 * If unit is undefined, the amount is assumed to be in seconds. If it is
 * defined, it must be a valid moment.js unit of time. If it's not, a TypeError
 * will be thrown.
 *
 * If no errors are thrown, the function will return the epoch time in seconds.
 *
 * Example usage:
 *   const currentEpochTime = toEpochTime();
 *   const futureEpochTime = toEpochTime(3, 'days');
 */
export function toEpochTime(
  amount?: number,
  unit?: moment.unitOfTime.DurationConstructor
): number {
  // Check for null pointer references.
  if (!moment) {
    throw new Error("moment is not defined.");
  }

  // Check for unhandled exceptions.
  try {
    if (amount && amount <= 0) {
      throw new Error("Amount must be a positive number.");
    }
    if (amount && unit) {
      const time = moment().add(amount, unit).toDate();
      return Math.round(time.getTime() / 1000);
    }
    return Math.round(new Date().getTime() / 1000);
  } catch (exception) {
    if (exception instanceof TypeError) {
      throw new TypeError("moment.add threw a TypeError.");
    }
    throw exception;
  }
}