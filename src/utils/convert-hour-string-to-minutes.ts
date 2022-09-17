/**
 *
 * @param hourString 18:00 --> 1080
 * ["18", "00"] --> [18, 00]
 */

export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(':').map(Number);

  const minutesAmount = hours * 60 + minutes;

  return minutesAmount;
}
