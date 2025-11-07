class GeocodingApi {
  baseUrl: string

  constructor() {
    this.baseUrl = 'https://geocoding-api.open-meteo.com/v1'
  }

  fetchLocation(name: string) {
    const url = new URL(this.baseUrl + `/search`)
    url.searchParams.append('name', name)
    return fetch(url)
  }
}

export default GeocodingApi
