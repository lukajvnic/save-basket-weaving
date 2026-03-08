import { useState, useEffect } from 'react'
import './Input.css'
import gen from '../assets/generate.png';
import { schoolMppMap } from '../data/schoolMppMap';

const isValidPostalCode = (code) => /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(code)
const schoolNames = Object.keys(schoolMppMap)

function highlightMatch(text, query) {
  if (!query.trim()) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <span>
      {text.slice(0, idx)}
      <span className="match-bold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </span>
  )
}

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,4 6,8 10,4" />
  </svg>
)

function Input({ onGenerate, onSchoolChange, onNameChange, onSchoolSelect }) {
  const [postalCode, setPostalCode] = useState('')
  const [school, setSchool] = useState('')
  const [name, setName] = useState('')
  const [showError, setShowError] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    if (!postalCode || isValidPostalCode(postalCode)) {
      setShowError(false)
      return
    }
    const timer = setTimeout(() => setShowError(true), 800)
    return () => clearTimeout(timer)
  }, [postalCode])

  function handleGenerate() {
    if (!isValidPostalCode(postalCode)) {
      setShowError(true)
      return
    }
    setShowError(false)
    onGenerate({ postalCode, school, name })
  }

  function handleSchoolChange(value) {
    setSchool(value)
    onSchoolChange?.(value)
    if (value.trim()) {
      const filtered = schoolNames.filter(s =>
        s.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
      setShowDropdown(filtered.length > 0)
    } else {
      setSuggestions(schoolNames)
      setShowDropdown(true)
    }
  }

  function selectSchool(schoolName) {
    setSchool(schoolName)
    onSchoolChange?.(schoolName)
    onSchoolSelect?.(schoolMppMap[schoolName])
    setSuggestions([])
    setShowDropdown(false)
  }

  function handleSchoolBlur() {
    setTimeout(() => {
      if (schoolMppMap[school]) {
        onSchoolSelect?.(schoolMppMap[school])
      }
      setShowDropdown(false)
    }, 150)
  }

  function handleSchoolKeyDown(e) {
    if (e.key === 'Enter') {
      if (suggestions.length === 1) {
        selectSchool(suggestions[0])
      } else if (schoolMppMap[school]) {
        onSchoolSelect?.(schoolMppMap[school])
        setShowDropdown(false)
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  function handleArrowMouseDown(e) {
    e.preventDefault()
    if (showDropdown) {
      setSuggestions([])
      setShowDropdown(false)
    } else {
      const filtered = school.trim()
        ? schoolNames.filter(s => s.toLowerCase().includes(school.toLowerCase()))
        : schoolNames
      setSuggestions(filtered)
      setShowDropdown(filtered.length > 0)
    }
  }

  return (
    <div className="input-container">

      <div className="field-row">
        <div className="field">
          <input
            type="text"
            id="postalCode"
            placeholder=" "
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value.replace(/\s/g, '').toUpperCase())}
          />
          <label htmlFor="postalCode">Postal code</label>
          <div className={`postal-error${showError ? ' visible' : ''}`}>
            Please input a valid postal code in Ontario
          </div>
        </div>
        <div className="button-container">
          <button
            className={`generate-btn${postalCode ? ' visible' : ''}`}
            onClick={handleGenerate}
          >
            <img src={gen} className="generate-icon" alt="Generate" />
          </button>
        </div>
      </div>

      <div className="field">
        <input
          type="text"
          id="school"
          placeholder=" "
          value={school}
          onChange={(e) => handleSchoolChange(e.target.value)}
          onBlur={handleSchoolBlur}
          onKeyDown={handleSchoolKeyDown}
          autoComplete="off"
        />
        <label htmlFor="school">School</label>
        <button
          className={`school-arrow${showDropdown ? ' open' : ''}`}
          onMouseDown={handleArrowMouseDown}
          tabIndex={-1}
        >
          <ChevronIcon />
        </button>
        {showDropdown && (
          <div className="school-dropdown">
            {suggestions.map(s => (
              <div key={s} className="school-option" onMouseDown={() => selectSchool(s)}>
                {highlightMatch(s, school)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="field">
        <input
          type="text"
          id="name"
          placeholder=" "
          value={name}
          onChange={(e) => { setName(e.target.value); onNameChange?.(e.target.value); }}
        />
        <label htmlFor="name">Name</label>
      </div>

      <div className="disclaimer">
        Privacy Notice:<br></br>None of the information you input is shared or seen by us.<br></br>???? what to write
      </div>

    </div>
  )
}

export default Input
