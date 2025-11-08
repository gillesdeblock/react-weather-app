export type Position = {
  lng: number
  lat: number
}

export type City = {
  id: string
  name: string
  longitude: number
  latitude: number
}

export type Weather = {
  current_weather: CurrentWeather
  current_weather_units: Record<keyof CurrentWeather, string>
  latitude: string
  longitude: string
  generationtime_ms: string
  utc_offset_seconds: string
  timezone: string
  timezone_abbreviation: string
  elevation: string
}

export type CurrentWeather = {
  time: string
  interval: number
  temperature: number
  windspeed: number
  winddirection: number
  is_day: number
  weathercode: number
}
