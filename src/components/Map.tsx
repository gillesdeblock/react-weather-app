import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, type ReactNode } from 'react'
import maplibregl from 'maplibre-gl'
import { useMap, useMapDispatch } from '../contexts/MapContext'
import { twMerge } from 'tailwind-merge'

export type MapProps = {
  id?: string
  className?: string
}

function Map({ id = 'map', className }: MapProps) {
  const map = useMap()
  const dispatch = useMapDispatch()

  useEffect(() => {
    if (!map && dispatch) {
      dispatch({
        type: 'set',
        map: new maplibregl.Map({
          container: id,
          style: {
            version: 8,
            sources: {
              osm: {
                type: 'raster',
                tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '&copy; OpenStreetMap Contributors',
                maxzoom: 19,
              },
            },
            layers: [
              {
                id: 'osm',
                type: 'raster',
                source: 'osm',
              },
            ],
          },
          center: [5, 40],
          zoom: 8,
        }),
      })
    }
  })

  return (
    <div className={twMerge('map-container', className)}>
      <div id={id} className="h-full"></div>
    </div>
  )
}

export default Map
