import { createContext, ReactNode, useReducer, Dispatch, useContext } from 'react'
import { Map, AddLayerObject, Marker } from 'maplibre-gl'

type MapState = Map | null
type MapDispatch = Dispatch<MapReducerAction>
type MapReducerAction = {
  type: 'set' | 'addLayer' | 'addMarker' | 'addSource'
  map?: MapState
  layer?: AddLayerObject
  marker?: Marker
  beforeId?: string
}

export const MapContext = createContext<MapState>(null)
export const MapDispatchContext = createContext<MapDispatch | null>(null)

export const useMap = () => useContext(MapContext)
export const useMapDispatch = () => useContext(MapDispatchContext)

export function mapReducer(state: MapState, action: MapReducerAction): MapState {
  switch (action.type) {
    case 'set': {
      return action.map ?? null
    }
    default: {
      return state
    }
  }
}

export function MapProvider({ children }: { children: ReactNode }) {
  const [map, dispatch] = useReducer(mapReducer, null)

  return (
    <>
      <MapContext value={map}>
        <MapDispatchContext value={dispatch}>{children}</MapDispatchContext>
      </MapContext>
    </>
  )
}
