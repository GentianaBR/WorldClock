import { Link } from 'react-router-dom'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useNow } from './hooks/useNow'
import { formatTime } from './utils/time'
import type { AppState } from './types'
import CityPicker from './components/CityPicker'
import ClockAnalog from './components/ClockAnalog'

// Default data: initial cities and settings
// NOTE: If you change DEFAULT and don't see the update in the app,
// clear the "wc-state" localStorage key or click the Reset button below.
const DEFAULT: AppState = {
  cities: [
    {
      id: crypto.randomUUID(),
      name: 'Stockholm',
      tz: 'Europe/Stockholm',
      imageUrl: `
        https://picsum.photos/seed/stockholm-forest/1600/900,
        https://picsum.photos/seed/stockholm-lake/1600/900,
        https://picsum.photos/seed/stockholm-nature/1600/900
      `,
    },
    {
      id: crypto.randomUUID(),
      name: 'New York',
      tz: 'America/New_York',
      imageUrl: `
        https://picsum.photos/seed/catskills/1600/900,
        https://picsum.photos/seed/hudson-valley/1600/900,
        https://picsum.photos/seed/finger-lakes/1600/900
      `,
    },
    {
      id: crypto.randomUUID(),
      name: 'Tokyo',
      tz: 'Asia/Tokyo',
      imageUrl: `
        https://picsum.photos/seed/japan-forest/1600/900,
        https://picsum.photos/seed/japan-river/1600/900,
        https://picsum.photos/seed/cherry-blossoms/1600/900
      `,
    },
  ],
  settings: { style: 'digital', showSeconds: true, use24h: true },
}

export default function App() {
  // Load state from localStorage or use default
  const [state, setState] = useLocalStorage<AppState>('wc-state', DEFAULT)

  // Determine update interval based on whether seconds are shown
  const interval = state.settings.showSeconds ? 1000 : 60000
  const now = useNow(interval)

  // Remove a city from the list
  const removeCity = (id: string) =>
    setState({ ...state, cities: state.cities.filter((c) => c.id !== id) })

  // Toggle between digital and analog clock styles
  const switchStyle = () =>
    setState({
      ...state,
      settings: {
        ...state.settings,
        style: state.settings.style === 'digital' ? 'analog' : 'digital',
      },
    })

  // Toggle between 24-hour and 12-hour format
  const toggle24h = () =>
    setState({
      ...state,
      settings: { ...state.settings, use24h: !state.settings.use24h },
    })

  // Toggle visibility of seconds
  const toggleSeconds = () =>
    setState({
      ...state,
      settings: { ...state.settings, showSeconds: !state.settings.showSeconds },
    })

  // Reset all settings and cities to default
  const resetAll = () => {
    localStorage.removeItem('wc-state')
    setState(DEFAULT)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fb',
        // Want a background image on the homepage? Uncomment and customize below:
        // backgroundImage: `linear-gradient(rgba(255,255,255,.25), rgba(255,255,255,.25)), url('/bg.jpg')`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'scroll',
      }}
    >
      {/* Navigation bar with settings controls */}
      <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom">
        <div className="container">
          <span className="navbar-brand fw-semibold">World Clock</span>
          <div className="ms-auto d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={switchStyle}>
              {state.settings.style === 'digital' ? 'Analog' : 'Digital'}
            </button>
            <button className="btn btn-outline-primary btn-sm" onClick={toggle24h}>
              {state.settings.use24h ? '12h' : '24h'}
            </button>
            <button className="btn btn-outline-primary btn-sm" onClick={toggleSeconds}>
              {state.settings.showSeconds ? 'Hide sec' : 'Show sec'}
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={resetAll}>
              Reset
            </button>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        {/* Clock display section: horizontal scrollable row */}
        <section className="mt-2" aria-label="Clocks">
          <div className="d-flex flex-row flex-nowrap gap-3 overflow-auto pb-2">
            {state.cities.map((city) => (
              <article
                key={city.id}
                className="card shadow-sm"
                style={{ width: 320, flex: '0 0 auto', background: 'rgba(255,255,255,.95)' }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-start gap-2">
                    <div className="flex-grow-1">
                      <h2 className="h6 mb-1">{city.name}</h2>
                      {state.settings.style === 'digital' ? (
                        <p className="fs-3 tabular-nums mb-0">
                          {formatTime(
                            now,
                            city.tz,
                            state.settings.use24h,
                            state.settings.showSeconds
                          )}
                        </p>
                      ) : (
                        <div className="mt-2">
                          <ClockAnalog
                            now={now}
                            tz={city.tz}
                            showSeconds={state.settings.showSeconds}
                          />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeCity(city.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-2">
                    <Link to={`/city/${city.id}`}>Detail view</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* City picker: add new cities */}
        <div className="mt-3">
          <CityPicker state={state} setState={setState} />
        </div>
      </main>
    </div>
  )
}
