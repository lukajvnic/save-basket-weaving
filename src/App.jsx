import { useState } from 'react'

function App() {
  const [postalCode, setPostalCode] = useState('');
  const [mppName, setMPPName] = useState('');
  const [mppEmail, setMPPEmail] = useState('');
  const [mppParty, setMPPParty] = useState('');
  const [mppDistrict, setMPPDistrict] = useState('');
  const [mppPhotoUrl, setMPPPhotoUrl] = useState('');

  async function fetchMpp(code) {
    try {
      const res = await fetch(`/api/mpp?postal_code=${encodeURIComponent(code)}`)
      const data = await res.json()
      if (data.error) {
        setMPPName(data.error)
        setMPPEmail('')
        setMPPParty('')
        setMPPDistrict('')
        setMPPPhotoUrl('')
      } else {
        setMPPName(data.name)
        setMPPEmail(data.email)
        setMPPParty(data.party_name)
        setMPPDistrict(data.district_name)
        setMPPPhotoUrl(data.photo_url)
      }
    } catch (err) {
      setMPPName('Error: ' + err.message)
      setMPPEmail('')
      setMPPParty('')
      setMPPDistrict('')
      setMPPPhotoUrl('')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter postal code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <button onClick={() => fetchMpp(postalCode)}>Get MPP</button>
      <div>MPP Name: {mppName}</div>
      <div>MPP Email: {mppEmail}</div>
      <div>MPP Party: {mppParty}</div>
      <div>MPP District: {mppDistrict}</div>
      <img src={mppPhotoUrl} alt="MPP Photo" />
    </div>
  )
}

export default App
