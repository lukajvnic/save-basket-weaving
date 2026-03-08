import { useState, useEffect } from 'react'
import './Input.css'
import gen from '../assets/generate.png';

const isValidPostalCode = (code) => /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(code)

function Input({ onGenerate, onSchoolChange, onNameChange }) {
  const [postalCode, setPostalCode] = useState('')
  const [school, setSchool] = useState('')
  const [name, setName] = useState('')
  const [showError, setShowError] = useState(false)

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
          onChange={(e) => { setSchool(e.target.value); onSchoolChange?.(e.target.value); }}
        />
        <label htmlFor="school">School</label>
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
