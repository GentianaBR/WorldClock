// src/utils/time.ts
import { formatInTimeZone } from 'date-fns-tz'

/**
 * Returns "now" as a Date object.
 * We do NOT shift the Date into the target time zone here — a JS Date
 * always stores an absolute instant (UTC under the hood).
 * Time zone is only applied when formatting or extracting parts.
 */
export function nowInTz(_tz: string): Date {
  // No need to construct a "fake local" date — formatting handles tz
  return new Date()
}

/**
 * Extracts time parts (hours in 24h, minutes, seconds) for a given time zone.
 * Uses date-fns-tz to format the incoming Date as if it's in `tz`,
 * then parses the parts as numbers.
 *
 * @param date - absolute timestamp (UTC-based Date)
 * @param tz   - IANA time zone, e.g. "Europe/Stockholm"
 */
export function timePartsInTz(date: Date, tz: string) {
  // Small helper for formatting with tokens in the given tz.
  // Tokens (date-fns): H=0-23 hour, m=minute, s=second
  const f = (token: string) => formatInTimeZone(date, tz, token)

  const hours24 = Number(f('H'))
  const minutes = Number(f('m'))
  const seconds = Number(f('s'))

  return { hours24, minutes, seconds }
}

/**
 * Computes analog clock hand angles (in degrees) for a given time zone.
 * - Hour hand: 30° per hour + 0.5° per minute + (0.5/60)° per second
 * - Minute hand: 6° per minute + 0.1° per second
 * - Second hand: 6° per second
 *
 * @param date - absolute timestamp (UTC-based Date)
 * @param tz   - IANA time zone
 * @returns { hourAngle, minuteAngle, secondAngle } in degrees
 */
export function analogAngles(date: Date, tz: string) {
  const { hours24, minutes, seconds } = timePartsInTz(date, tz)

  const hourAngle = (hours24 % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60)
  const minuteAngle = minutes * 6 + seconds * 0.1
  const secondAngle = seconds * 6

  return { hourAngle, minuteAngle, secondAngle }
}

/**
 * Formats time for a given time zone with 24h/12h and seconds toggles.
 * Uses date-fns-tz tokens:
 * - 24h: HH:mm or HH:mm:ss
 * - 12h: hh:mm a or hh:mm:ss a   (a = am/pm)
 *
 * @param date      - absolute timestamp (UTC-based Date)
 * @param tz        - IANA time zone
 * @param use24h    - true => 24-hour format, false => 12-hour format
 * @param showSeconds - include seconds in the output
 * @returns formatted time string
 */
export function formatTime(
  date: Date,
  tz: string,
  use24h: boolean,
  showSeconds: boolean
) {
  const mask = use24h
    ? showSeconds
      ? 'HH:mm:ss'
      : 'HH:mm'
    : showSeconds
      ? 'hh:mm:ss a'
      : 'hh:mm a'

  return formatInTimeZone(date, tz, mask)
}
