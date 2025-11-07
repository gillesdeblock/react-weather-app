import { Position } from '../types'

class WeatherApi {
  baseUrl: string

  constructor() {
    this.baseUrl = 'https://api.open-meteo.com/v1'
  }

  fetchForecast({ lng, lat }: Position) {
    const url = new URL(this.baseUrl + `/forecast`)
    url.searchParams.append('longitude', lng.toString())
    url.searchParams.append('latitude', lat.toString())
    url.searchParams.append('current_weather', 'true')
    return fetch(url)
  }
}

export default WeatherApi
