import { useCity } from '../contexts/CityContext'
import CitySearch from './CitySearch'
import CityWeather from './CityWeather'

function WeatherView() {
  const city = useCity()
  return city ? <CityWeather></CityWeather> : <CitySearch></CitySearch>
}

export default WeatherView
