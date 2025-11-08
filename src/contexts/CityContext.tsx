import { createContext, ReactNode, useReducer, Dispatch, useContext } from 'react'
import { City } from '../types'

type CityReducerAction = {
  type: 'select' | 'unselect'
  city?: City
}

export const CityContext = createContext<City | null>(null)
export const CityDispatchContext = createContext<Dispatch<CityReducerAction> | null>(null)

export const useCity = () => useContext(CityContext)
export const useCityDispatch = () => useContext(CityDispatchContext)

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, dispatch] = useReducer(cityReducer, null)

  return (
    <>
      <CityContext value={city}>
        <CityDispatchContext value={dispatch}>{children}</CityDispatchContext>
      </CityContext>
    </>
  )
}

export function cityReducer(city: City | null, action: CityReducerAction) {
  switch (action.type) {
    case 'select': {
      if (!action.city) {
        return null
      }
      return action.city
    }
    case 'unselect': {
      return null
    }
    default:
      throw new Error('action not supported: ' + action.type)
  }
}
