import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS, fetchData } from '../config/apiConfig'
import './LocationSelector.css'

const LocationSelector: React.FC = () => {
  const [countries, setCountries] = useState<string[]>([])
  const [states, setStates] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [selection, setSelection] = useState<string>('')

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true)
      try {
        const data = await fetchData(API_ENDPOINTS.GET_COUNTRIES)
        setCountries(data)
      } catch (error) {
        console.error('Failed to load countries')
      }
      setLoading(false)
    }
    loadCountries()
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      const loadStates = async () => {
        setLoading(true)
        setStates([])
        setSelectedState('')
        setCities([])
        setSelectedCity('')
        try {
          const data = await fetchData(API_ENDPOINTS.GET_STATES(selectedCountry))
          setStates(data)
        } catch (error) {
          console.error('Failed to load states')
        }
        setLoading(false)
      }
      loadStates()
    }
  }, [selectedCountry])

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const loadCities = async () => {
        setLoading(true)
        setCities([])
        setSelectedCity('')
        try {
          const data = await fetchData(API_ENDPOINTS.GET_CITIES(selectedCountry, selectedState))
          setCities(data)
        } catch (error) {
          console.error('Failed to load cities')
        }
        setLoading(false)
      }
      loadCities()
    }
  }, [selectedCountry, selectedState])

  useEffect(() => {
    if (selectedCity && selectedState && selectedCountry) {
      setSelection(`You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`)
    } else {
      setSelection('')
    }
  }, [selectedCity, selectedState, selectedCountry])

  return (
    <div className="location-selector-container">
      <h1>Location Selector</h1>
      <div className="dropdowns-wrapper">
        <div className="dropdown-group">
          <label htmlFor="country">Select Country</label>
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            disabled={loading}
          >
            <option value="">-- Choose a Country --</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-group">
          <label htmlFor="state">Select State</label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry || loading}
          >
            <option value="">-- Choose a State --</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-group">
          <label htmlFor="city">Select City</label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState || loading}
          >
            <option value="">-- Choose a City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selection && <div className="selection-display"><p>{selection}</p></div>}
      {loading && <p className="loading">Loading...</p>}
    </div>
  )
}

export default LocationSelector