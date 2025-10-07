import { useParams, useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useNow } from '../hooks/useNow'
import { formatTime } from '../utils/time'
import type { AppState } from '../types'
import ClockAnalog from '../components/ClockAnalog'

// Component that displays detailed information about a selected city
export default function CityDetailPage() {
  // Get the city ID from the URL parameters
  const { id } = useParams()

  // Hook to programmatically navigate between routes
  const navigate = useNavigate()

  // Load app state from localStorage, or use default values if not found
  const [state, setState] = useLocalStorage<AppState>('wc-state', {
    cities: [],
    settings: { style: 'digital', showSeconds: true, use24h: true }
  })

  // Determine update interval based on whether seconds should be shown
  const interval = state.settings.showSeconds ? 1000 : 60000

  // Get the current time, updated at the chosen interval
  const now = useNow(interval)

  // Find the city object that matches the ID from the URL
  const city = state.cities.find(c => c.id === id)

  // If no city is found, show a fallback message and a button to go back
  if (!city) return (
    <div className="container py-4">
      City not found. <button className="btn btn-link p-0" onClick={() => navigate('/')}>Back</button>
    </div>
  )

  // Use the first valid image URL if available, otherwise generate a fallback Unsplash image
  const first =
    (city.imageUrl ?? '')
      .split(/[,|\n]+/)
      .map(s => s.trim())
      .filter(Boolean)[0]
  const fallback = `https://source.unsplash.com/1600x900/?${encodeURIComponent(city.name)},city&sig=${encodeURIComponent(city.id)}`
  const src = first || fallback

  // Render the city detail page with background image and clock
  return (
    <div className="min-vh-100 position-relative" style={{
      backgroundImage: `url("${src}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="min-vh-100" style={{ backgroundColor: 'rgba(35,32,32,.45)' }}>
        <div className="container py-4 text-white">
          <button onClick={() => navigate('/')} className="btn btn-outline-light btn-sm">← Back</button>
          <h1 className="display-6 mt-3">{city.name}</h1>

          {/* Show either a digital or analog clock based on settings */}
          {state.settings.style === 'digital'
            ? <p className="display-3 tabular-nums">
                {formatTime(now, city.tz, state.settings.use24h, state.settings.showSeconds)}
              </p>
            : <div className="mt-3">
                <ClockAnalog
                  now={now}
                  tz={city.tz}
                  showSeconds={state.settings.showSeconds}
                />
              </div>}

          {/* Button to remove the city from the list and go back */}
          <div className="mt-4">
            <button className="btn btn-outline-light" onClick={() => {
              setState({
                ...state,
                cities: state.cities.filter(c => c.id !== city.id)
              })
              navigate('/')
            }}>Remove City</button>
          </div>
        </div>
      </div>
    </div>
  )
}
