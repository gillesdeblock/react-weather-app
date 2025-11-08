import { FocusEventHandler, useEffect, useRef, useState } from 'react'
import type { City } from '../types'
import { twMerge } from 'tailwind-merge'
import GeocodingApi from '../api/GeocodingApi'
import SearchInput from './SearchInput'
import useDebounce from '../hooks/useDebounce'
import useMousedownOutside from '../hooks/useMousedownOutside'
import Icon from './Icon'
import { useCityDispatch } from '../contexts/CityContext'

function CitySearch() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [resultsVisible, setResultsVisible] = useState(false)
  const debouncedInput = useDebounce(input, 200)
  const api = new GeocodingApi()
  const cityDispatch = useCityDispatch()

  const handleSearch = async () => {
    if (loading) {
      return
    }
    if (!input.length) {
      setResultsVisible(false)
      setResults([])
      return
    }
    try {
      setLoading(true)
      setResultsVisible(false)
      const response = await api.fetchLocation(input)
      if (!response.ok) {
        throw new Error('Response status: ' + response.status)
      }
      const result = await response.json()
      setResults(result?.results || [])
      setResultsVisible(true)
    } catch (error) {
      setResultsVisible(false)
    } finally {
      setLoading(false)
    }
  }

  const onCloseResults = () => {
    setResultsVisible(false)
    setResults([])
  }
  const onSelectResult = (result: City) => {
    if (cityDispatch) {
      cityDispatch({ type: 'select', city: result })
    }
    onCloseResults()
  }

  const onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation()
    if (!resultsVisible) {
      handleSearch()
    }
  }

  useEffect(() => {
    handleSearch()
  }, [debouncedInput])

  return (
    <div className="flex flex-col gap-2 w-1/2 p-4 rounded absolute-center border bg-white">
      <span className="text-xl font-semibold">What's the weather in</span>
      <div className="flex gap-2 items-center relative">
        <div className="w-full relative">
          <SearchInput
            className="w-full text-2xl"
            name="city-search"
            placeholder="Enter a city"
            value={input}
            onInput={setInput}
            onFocus={onFocus}
          ></SearchInput>
          {resultsVisible &&
            (results.length > 0 ? (
              <CitySearchResults
                className="absolute w-full top-full left-0 -translate-y-px max-h-48 overflow-y-auto"
                results={results}
                onSelect={onSelectResult}
                onClose={onCloseResults}
              ></CitySearchResults>
            ) : (
              <div className="mt-2 flex items-center">
                <Icon className="mr-1 text-red-400" fill={1}>
                  error
                </Icon>
                <span>No places found with this name</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

function CitySearchResults({
  className = '',
  results,
  onSelect,
  onClose,
}: {
  className?: string
  results: City[]
  onSelect: (result: City) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useMousedownOutside({ ref, callback: onClose })

  return (
    <div ref={ref} className={twMerge('flex flex-col border bg-white', className)}>
      {results.map((result) => (
        <div
          key={result.id}
          className="px-2 py-1 hover:bg-sky-50/40 active:bg-sky-50/50 hover:cursor-pointer"
          onClick={() => onSelect(result)}
        >
          {result.name} ({result.country})
        </div>
      ))}
    </div>
  )
}

export default CitySearch
