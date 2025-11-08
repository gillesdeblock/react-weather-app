import type { City, CurrentWeather, Weather } from '../types'
import { ReactNode, useEffect, useState } from 'react'
import { useCity } from '../contexts/CityContext'
import Card from './Card'
import WeatherApi from '../api/WeatherApi'
import Icon from './Icon'
import { humanizeWindDirection } from '../utils'

function CityWeather() {
  const city = useCity()
  const [weather, setWeather] = useState<Weather | null>(null)

  const getStatisticDisplayValue = (key: keyof CurrentWeather): string | undefined => {
    if (!weather?.current_weather || !Object.hasOwn(weather.current_weather, key)) {
      return undefined
    }
    if (!weather?.current_weather_units || !Object.hasOwn(weather.current_weather_units, key)) {
      return `${weather.current_weather[key]}`
    }
    return `${weather.current_weather[key]} ${weather.current_weather_units[key]}`
  }

  useEffect(() => {
    let ignore = false

    fetchWeather(city).then((result) => {
      if (!ignore && result) {
        setWeather(result)
      }
    })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="absolute-center w-3/4 h-3/4 flex flex-col gap-3">
      <div className="text-3xl font-semibold text-center">
        Weather in <span className="font-bold">{city?.name}</span>
      </div>
      {weather ? (
        <>
          <span className="text-sm text-center text-slate-700">
            Last updated: <i>{weather?.current_weather.time}</i>
          </span>
          <div className="grid grid-cols-3 gap-6">
            <CityWeatherStatistic>
              <span className="text-xl font-semibold">Temperature</span>
              <span>{getStatisticDisplayValue('temperature')}</span>
            </CityWeatherStatistic>
            <CityWeatherStatistic>
              <span className="text-xl font-semibold">Wind speed</span>
              <span>{getStatisticDisplayValue('windspeed')}</span>
            </CityWeatherStatistic>
            <CityWeatherStatistic>
              <span className="text-xl font-semibold">Wind direction</span>
              <WindDirection degrees={weather.current_weather.winddirection}></WindDirection>
            </CityWeatherStatistic>
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  )
}

function CityWeatherStatistic({ children }: { children: ReactNode }) {
  return (
    <Card className="relative min-h-64">
      <div className="absolute-center flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center">{children}</div>
      </div>
    </Card>
  )
}

function WindDirection({ degrees }: { degrees: number }) {
  return (
    <div className="flex flex-col gap-2">
      <span style={{ scale: 1.25, rotate: `${degrees}deg` }}>
        <Icon>arrow_warm_up</Icon>
      </span>
      <span>{humanizeWindDirection(degrees)}</span>
    </div>
  )
}

async function fetchWeather(city: City | null) {
  if (!city) {
    return
  }
  const api = new WeatherApi()
  const response = await api.fetchForecast({ lng: city.longitude, lat: city.latitude })
  const result: Weather = await response.json()
  return result
}

export default CityWeather
