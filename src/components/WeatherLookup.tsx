import { FocusEventHandler, useEffect, useRef, useState } from 'react'
import type { LocationSearchResult } from '../types'
import { twMerge } from 'tailwind-merge'
import GeocodingApi from '../api/GeocodingApi'
import Button from './Button'
import SearchInput from './SearchInput'
import useDebounce from '../hooks/useDebounce'
import useMousedownOutside from '../hooks/useMousedownOutside'

function WeatherLookup() {
  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const inputRef = useRef<HTMLElement>(null)
  const api = new GeocodingApi()
  const isResultsVisible = results.length > 0

  const handleSearch = async () => {
    if (loading) {
      return
    }
    try {
      setLoading(true)
      const response = await api.fetchLocation(input)
      if (!response.ok) {
        throw new Error('Response status: ' + response.status)
      }
      const result = await response.json()
      setResults(result?.results || [])
    } finally {
      setLoading(false)
    }
  }

  const onCloseResults = () => setResults([])
  const onSelectResult = (result: LocationSearchResult) => {
    console.log('selected result', result.name)
    onCloseResults()
  }

  const onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation()
    if (!isResultsVisible) {
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
            ref={inputRef}
            className="w-full text-2xl"
            name="city-search"
            placeholder="Enter a city"
            value={input}
            onInput={setInput}
            onFocus={onFocus}
            onEnter={handleSearch}
          ></SearchInput>
          {isResultsVisible && (
            <WeatherLookupResults
              className="absolute w-full top-full left-0 -translate-y-px max-h-48 overflow-y-auto"
              results={results}
              onSelect={onSelectResult}
              onClose={onCloseResults}
            ></WeatherLookupResults>
          )}
        </div>
        <Button
          className="self-stretch flex items-center"
          disabled={loading}
          onClick={handleSearch}
        >
          <span className="material-symbols-outlined">search</span>
        </Button>
      </div>
    </div>
  )
}

function WeatherLookupResults({
  className = '',
  results,
  onSelect,
  onClose,
}: {
  className?: string
  results: LocationSearchResult[]
  onSelect: (result: LocationSearchResult) => void
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
          {result.name}
        </div>
      ))}
    </div>
  )
}

export default WeatherLookup
