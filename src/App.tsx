import { CityProvider } from './contexts/CityContext'
import WeatherView from './components/WeatherView'

function App() {
  return (
    <div className="w-full h-full bg-sky-50">
      <CityProvider>
        <WeatherView></WeatherView>
      </CityProvider>
    </div>
  )
}

export default App
