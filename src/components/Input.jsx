import { useState, useEffect, useRef } from 'react'
import './Input.css'
import gen from '../assets/generate.png';
import { schoolMppMap } from '../../public/schoolMppMap';

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
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [apiError, setApiError] = useState(false)
  const dropdownRef = useRef(null)

  // Reset keyboard cursor when the suggestion list changes
  useEffect(() => { setHighlightedIndex(-1) }, [suggestions])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      dropdownRef.current.children[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  useEffect(() => {
    if (!postalCode || isValidPostalCode(postalCode)) {
      setShowError(false)
      return
    }
    const timer = setTimeout(() => setShowError(true), 800)
    return () => clearTimeout(timer)
  }, [postalCode])

  async function handleGenerate() {
    if (!isValidPostalCode(postalCode)) {
      setShowError(true)
      return
    }
    setShowError(false)
    setApiError(false)
    setIsGenerating(true)
    try {
      await onGenerate({ postalCode, school, name })
    } catch {
      setApiError(true)
    } finally {
      setIsGenerating(false)
    }
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
    setHighlightedIndex(-1)
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
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!showDropdown) {
        const filtered = school.trim()
          ? schoolNames.filter(s => s.toLowerCase().includes(school.toLowerCase()))
          : schoolNames
        setSuggestions(filtered)
        setShowDropdown(filtered.length > 0)
      } else {
        setHighlightedIndex(prev => Math.min(prev + 1, suggestions.length - 1))
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        selectSchool(suggestions[highlightedIndex])
      } else if (suggestions.length === 1) {
        selectSchool(suggestions[0])
      } else if (schoolMppMap[school]) {
        onSchoolSelect?.(schoolMppMap[school])
        setShowDropdown(false)
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
      setHighlightedIndex(-1)
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

      <div className="disclaimer">
        The fields below are optional,
        <br></br>
        but help you get your email to the right people.
        <br></br>
        Don't worry, nothing is being saved.
      </div>

      <div className="field-row">
        <div className="field">
          <input
            type="text"
            id="postalCode"
            placeholder=" "
            value={postalCode}
            onChange={(e) => { setPostalCode(e.target.value.replace(/\s/g, '').toUpperCase()); setApiError(false) }}
          />
          <label htmlFor="postalCode">Postal code</label>
          <div className={`postal-error${(showError || apiError) ? ' visible' : ''}`}>
            {apiError ? 'Error fetching postal code' : 'Please input a valid postal code in Ontario'}
          </div>
        </div>
        <div className="button-container">
          <button
            className={`generate-btn${postalCode ? ' visible' : ''}`}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <div className="spinner"></div>
            ) : (
              <img src={gen} className="generate-icon" alt="Generate" />
            )}
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
          <div className="school-dropdown" ref={dropdownRef}>
            {suggestions.map((s, i) => (
              <div
                key={s}
                className={`school-option${i === highlightedIndex ? ' highlighted' : ''}`}
                onMouseDown={() => selectSchool(s)}
                onMouseEnter={() => setHighlightedIndex(i)}
              >
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

    </div>
  )
}

export default Input
