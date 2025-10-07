import { analogAngles } from '../utils/time'

type ClockAnalogProps = {
  /** Current date/time (usually from a ticking hook) */
  now: Date
  /** IANA timezone string, used by analogAngles to compute hands */
  tz: string
  /** Whether to render the second hand */
  showSeconds: boolean
  /** Pixel size of the SVG (width = height = size). Default 180. */
  size?: number
  /** Optional color overrides */
  colors?: {
    face?: string
    ring?: string
    tick?: string
    hourHand?: string
    minuteHand?: string
    secondHand?: string
    pivot?: string
  }
}

/**
 * Analog clock rendered as an SVG (viewBox 0..100).
 * Strokes use vectorEffect="non-scaling-stroke" so widths look good at any size.
 */
export default function ClockAnalog({
  now,
  tz,
  showSeconds,
  size = 180,
  colors,
}: ClockAnalogProps) {
  // Resolve angles for the hands based on "now" and "tz"
  const { hourAngle, minuteAngle, secondAngle } = analogAngles(now, tz)

  // Palette (can be overridden via props)
  const C = {
    face: colors?.face ?? '#111',          // dial fill
    ring: colors?.ring ?? '#6c757d',       // outer ring + ticks
    tick: colors?.tick ?? '#6c757d',       // minute/hour marks
    hourHand: colors?.hourHand ?? '#f8f9fa',
    minuteHand: colors?.minuteHand ?? '#f8f9fa',
    secondHand: colors?.secondHand ?? '#dc3545',
    pivot: colors?.pivot ?? '#f8f9fa',
  }

  // Accessibility label
  const label = `Analog clock showing local time in ${tz}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={label}
    >
      <title>{label}</title>

      {/* Clock face */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={C.face}
        stroke={C.ring}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />

      {/* Minute/Hour ticks (60 total, thicker every 5th) */}
      {Array.from({ length: 60 }).map((_, i) => {
        const isHour = i % 5 === 0
        const a = (i * 6 * Math.PI) / 180 // 360/60 = 6 degrees per tick
        const inner = isHour ? 40 : 43    // hour ticks are longer
        const x1 = 50 + Math.sin(a) * inner
        const y1 = 50 - Math.cos(a) * inner
        const x2 = 50 + Math.sin(a) * 46
        const y2 = 50 - Math.cos(a) * 46
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={C.tick}
            strokeWidth={isHour ? 2 : 1}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={isHour ? 1 : 0.7}
          />
        )
      })}

      {/* Hour hand */}
      <g transform={`rotate(${hourAngle} 50 50)`}>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          stroke={C.hourHand}
          strokeWidth="3.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {/* Minute hand */}
      <g transform={`rotate(${minuteAngle} 50 50)`}>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="22"
          stroke={C.minuteHand}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {/* Second hand (optional) */}
      {showSeconds && (
        <g transform={`rotate(${secondAngle} 50 50)`}>
          <line
            x1="50"
            y1="52"  // small tail past pivot for visual balance
            x2="50"
            y2="18"
            stroke={C.secondHand}
            strokeWidth="1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      )}

      {/* Pivot cap */}
      <circle cx="50" cy="50" r="2" fill={C.pivot} />
    </svg>
  )
}
