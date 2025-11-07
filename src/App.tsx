import WeatherLookup from './components/WeatherLookup'
import { CityProvider } from './contexts/CityContext'

function App() {
  return (
    <div className="w-full h-full bg-sky-50">
      <CityProvider>
        <WeatherLookup></WeatherLookup>
      </CityProvider>
    </div>
  )
}

export default App
