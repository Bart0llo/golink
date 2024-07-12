import * as moment from 'moment';

export function dataToEpochTime(data: Date): number {
  const time = moment(new Date(data));
  return Math.round(time.toDate().getTime() / 1000);
}
