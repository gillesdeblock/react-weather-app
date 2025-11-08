import { useEffect } from 'react'
import { useMap } from '../contexts/MapContext'
import type { City } from '../types'
import { Marker } from 'maplibre-gl'

type CityMarkerProps = {
  city: City | null
}

function CityMarker({ city }: CityMarkerProps) {
  const map = useMap()

  useEffect(() => {
    if (!map || !city) return

    const marker = new Marker().setLngLat([city.longitude, city.latitude]).addTo(map)

    map.setCenter([city.longitude, city.latitude])
    map.zoomTo(8, { duration: 800 })

    return () => {
      marker.remove()
    }
  }, [map, city])

  return null
}

export default CityMarker
