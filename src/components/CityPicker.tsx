import { useEffect, useState } from 'react'
import type { AppState, TimeZoneId } from '../types'
import { imageSetForContinent, type Continent } from '../utils/images'

/**
 * Shape for a predefined (popular) city option in the picker.
 * Each option includes a name, a valid IANA timezone, and its continent.
 */
type CityOption = { name: string; tz: TimeZoneId; continent: Continent }

/**
 * Popular cities grouped by continent.
 * These are used in the modal list ("Välj storstad").
 */
const POPULAR: CityOption[] = [
  // Europe
  { name: 'Stockholm', tz: 'Europe/Stockholm', continent: 'Europe' },
  { name: 'London', tz: 'Europe/London', continent: 'Europe' },
  { name: 'Paris', tz: 'Europe/Paris', continent: 'Europe' },
  { name: 'Berlin', tz: 'Europe/Berlin', continent: 'Europe' },
  { name: 'Madrid', tz: 'Europe/Madrid', continent: 'Europe' },
  { name: 'Rome', tz: 'Europe/Rome', continent: 'Europe' },
  { name: 'Amsterdam', tz: 'Europe/Amsterdam', continent: 'Europe' },
  { name: 'Brussels', tz: 'Europe/Brussels', continent: 'Europe' },
  { name: 'Zurich', tz: 'Europe/Zurich', continent: 'Europe' },
  { name: 'Vienna', tz: 'Europe/Vienna', continent: 'Europe' },
  { name: 'Prague', tz: 'Europe/Prague', continent: 'Europe' },
  { name: 'Warsaw', tz: 'Europe/Warsaw', continent: 'Europe' },
  { name: 'Athens', tz: 'Europe/Athens', continent: 'Europe' },
  { name: 'Helsinki', tz: 'Europe/Helsinki', continent: 'Europe' },
  { name: 'Copenhagen', tz: 'Europe/Copenhagen', continent: 'Europe' },
  { name: 'Oslo', tz: 'Europe/Oslo', continent: 'Europe' },
  { name: 'Lisbon', tz: 'Europe/Lisbon', continent: 'Europe' },
  { name: 'Reykjavik', tz: 'Atlantic/Reykjavik', continent: 'Europe' },
  { name: 'Istanbul', tz: 'Europe/Istanbul', continent: 'Europe' },

  // North America
  { name: 'New York', tz: 'America/New_York', continent: 'NorthAmerica' },
  { name: 'Chicago', tz: 'America/Chicago', continent: 'NorthAmerica' },
  { name: 'Denver', tz: 'America/Denver', continent: 'NorthAmerica' },
  { name: 'Los Angeles', tz: 'America/Los_Angeles', continent: 'NorthAmerica' },
  { name: 'Toronto', tz: 'America/Toronto', continent: 'NorthAmerica' },
  { name: 'Vancouver', tz: 'America/Vancouver', continent: 'NorthAmerica' },
  { name: 'Mexico City', tz: 'America/Mexico_City', continent: 'NorthAmerica' },
  { name: 'Honolulu', tz: 'Pacific/Honolulu', continent: 'NorthAmerica' },

  // South America
  { name: 'São Paulo', tz: 'America/Sao_Paulo', continent: 'SouthAmerica' },
  { name: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires', continent: 'SouthAmerica' },
  { name: 'Santiago', tz: 'America/Santiago', continent: 'SouthAmerica' },
  { name: 'Lima', tz: 'America/Lima', continent: 'SouthAmerica' },
  { name: 'Bogotá', tz: 'America/Bogota', continent: 'SouthAmerica' },

  // Asia
  { name: 'Tokyo', tz: 'Asia/Tokyo', continent: 'Asia' },
  { name: 'Seoul', tz: 'Asia/Seoul', continent: 'Asia' },
  { name: 'Shanghai', tz: 'Asia/Shanghai', continent: 'Asia' },
  { name: 'Beijing', tz: 'Asia/Shanghai', continent: 'Asia' },
  { name: 'Hong Kong', tz: 'Asia/Hong_Kong', continent: 'Asia' },
  { name: 'Taipei', tz: 'Asia/Taipei', continent: 'Asia' },
  { name: 'Singapore', tz: 'Asia/Singapore', continent: 'Asia' },
  { name: 'Bangkok', tz: 'Asia/Bangkok', continent: 'Asia' },
  { name: 'Jakarta', tz: 'Asia/Jakarta', continent: 'Asia' },
  { name: 'Kuala Lumpur', tz: 'Asia/Kuala_Lumpur', continent: 'Asia' },
  { name: 'Manila', tz: 'Asia/Manila', continent: 'Asia' },
  { name: 'Delhi', tz: 'Asia/Kolkata', continent: 'Asia' },
  { name: 'Karachi', tz: 'Asia/Karachi', continent: 'Asia' },
  { name: 'Dubai', tz: 'Asia/Dubai', continent: 'Asia' },
  { name: 'Doha', tz: 'Asia/Qatar', continent: 'Asia' },
  { name: 'Riyadh', tz: 'Asia/Riyadh', continent: 'Asia' },
  { name: 'Tel Aviv', tz: 'Asia/Jerusalem', continent: 'Asia' },

  // Africa
  { name: 'Cairo', tz: 'Africa/Cairo', continent: 'Africa' },
  { name: 'Nairobi', tz: 'Africa/Nairobi', continent: 'Africa' },
  { name: 'Johannesburg', tz: 'Africa/Johannesburg', continent: 'Africa' },
  { name: 'Lagos', tz: 'Africa/Lagos', continent: 'Africa' },
  { name: 'Casablanca', tz: 'Africa/Casablanca', continent: 'Africa' },
  { name: 'Addis Ababa', tz: 'Africa/Addis_Ababa', continent: 'Africa' },

  // Oceania
  { name: 'Sydney', tz: 'Australia/Sydney', continent: 'Oceania' },
  { name: 'Melbourne', tz: 'Australia/Melbourne', continent: 'Oceania' },
  { name: 'Brisbane', tz: 'Australia/Brisbane', continent: 'Oceania' },
  { name: 'Perth', tz: 'Australia/Perth', continent: 'Oceania' },
  { name: 'Auckland', tz: 'Pacific/Auckland', continent: 'Oceania' },
  { name: 'Wellington', tz: 'Pacific/Auckland', continent: 'Oceania' },
]

/**
 * Display labels for continents (Swedish UI text stays as requested).
 */
const CONTINENT_LABEL: Record<Continent, string> = {
  Europe: 'Europa',
  NorthAmerica: 'Nordamerika',
  SouthAmerica: 'Sydamerika',
  Asia: 'Asien',
  Africa: 'Afrika',
  Oceania: 'Oceanien',
  Antarctica: 'Antarktis',
}

/**
 * Ordering of continent sections in the modal.
 */
const CONTINENT_ORDER: Continent[] = [
  'Europe',
  'NorthAmerica',
  'SouthAmerica',
  'Asia',
  'Africa',
  'Oceania',
  // 'Antarctica',
]

/**
 * CityPicker
 * - Lets the user add cities either from a popular list (modal) or via manual input.
 * - Assigns an automatic image set based on continent to every added city.
 */
export default function CityPicker({
  state,
  setState,
}: {
  state: AppState
  setState: (s: AppState) => void
}) {
  // Controlled inputs for the "custom city" form
  const [name, setName] = useState('')
  const [tz, setTz] = useState<TimeZoneId>('Europe/Stockholm')
  const [continent, setContinent] = useState<Continent>('Europe')

  // Modal open/close state
  const [open, setOpen] = useState(false)

  // Search query for filtering the popular list
  const [q, setQ] = useState('')

  /**
   * Close the modal when ESC is pressed.
   * We add the listener only while the modal is open.
   */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  /**
   * Add a city to the app state.
   * We automatically generate a 4-image set based on the given continent,
   * so the detail page always has valid background images.
   */
  const addCity = (c: { name: string; tz: TimeZoneId; continent: Continent }) => {
    const imageUrl = imageSetForContinent(c.continent)
    setState({
      ...state,
      cities: [...state.cities, { id: crypto.randomUUID(), name: c.name, tz: c.tz, imageUrl }],
    })
  }

  /**
   * Filter the POPULAR array by the current query (q).
   * If q is empty, show all items.
   */
  const filtered = q
    ? POPULAR.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    : POPULAR

  /**
   * Group filtered cities by continent, so the modal can render by sections.
   */
  const groups = filtered.reduce((acc, item) => {
    ;(acc[item.continent] ||= []).push(item)
    return acc
  }, {} as Record<Continent, CityOption[]>)

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="h6 mb-2">Lägg till stad</h3>

        {/* Inline form: open modal, custom city name, timezone, continent */}
        <div className="row g-2">
          <div className="col-12 col-md-3">
            <label className="form-label mb-1">Välj storstad</label>
            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={() => setOpen(true)}
            >
              Öppna lista
            </button>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label mb-1">Egen stad</label>
            <input
              className="form-control"
              placeholder="Egen stad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label mb-1">IANA tidszon</label>
            <input
              className="form-control"
              placeholder="Europe/Stockholm"
              value={tz}
              onChange={(e) => setTz(e.target.value as TimeZoneId)}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label mb-1">Kontinent</label>
            <select
              className="form-select"
              value={continent}
              onChange={(e) => setContinent(e.target.value as Continent)}
            >
              {CONTINENT_ORDER.map((c) => (
                <option key={c} value={c}>
                  {CONTINENT_LABEL[c]}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!name || !tz) return
                addCity({ name, tz, continent })
                // reset controls to defaults after adding
                setName('')
                setTz('Europe/Stockholm')
                setContinent('Europe')
              }}
            >
              Lägg till egen stad
            </button>
          </div>
        </div>
      </div>

      {/* Simple modal (no extra library) */}
      {open && (
        <div className="wc-modal" role="dialog" aria-modal="true" aria-label="Välj storstad">
          <div className="wc-modal-card">
            <div className="wc-modal-header d-flex align-items-center justify-content-between">
              <strong>Välj storstad</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setOpen(false)}
              >
                Stäng
              </button>
            </div>

            <div className="wc-modal-body">
              {/* Search input inside the modal */}
              <input
                className="form-control mb-2"
                placeholder="Sök stad..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoFocus
              />

              {/* Render grouped city buttons by continent, in a fixed order */}
              {CONTINENT_ORDER.map((c) =>
                (groups[c]?.length ?? 0) > 0 ? (
                  <div key={c} className="mb-3">
                    <div className="text-muted small mb-1">{CONTINENT_LABEL[c]}</div>
                    <div className="wc-modal-grid">
                      {groups[c]!.map((p) => (
                        <button
                          key={p.name}
                          className="btn btn-outline-primary"
                          onClick={() => {
                            addCity({ name: p.name, tz: p.tz, continent: p.continent })
                            setOpen(false)
                            setQ('')
                          }}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
