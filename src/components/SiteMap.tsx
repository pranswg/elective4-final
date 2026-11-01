interface SiteMapProps {
  cities: readonly string[]
  onChooseCity: (city: string) => void
}

export default function SiteMap({ cities, onChooseCity }: SiteMapProps) {
  return (
    <div className="site-map">
      <header>
        <h1>Craigslist Site Map</h1>
        <p>Browse Craigslist sites by location</p>
      </header>

      <section className="site-map-section">
        <h2>Metro Manila</h2>
        <div className="cities-grid">
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              className="city-link"
              onClick={() => onChooseCity(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
