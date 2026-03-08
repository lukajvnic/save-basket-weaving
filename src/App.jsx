import { useState } from 'react'
import Preview from './components/Preview'
import './App.css'

function App() {
  const [postalCode, setPostalCode] = useState('');
  // const [mppName, setMPPName] = useState('');
  // const [mppEmail, setMPPEmail] = useState('');
  // const [mppParty, setMPPParty] = useState('');
  // const [mppDistrict, setMPPDistrict] = useState('');
  // const [mppPhotoUrl, setMPPPhotoUrl] = useState(null);
  const [toMPPs, setToMPPs] = useState([
    {
      name: "Douggie",
      email: "doug.fordco@pc.ola.org",
      photoUrl: "https://www.ola.org/sites/default/files/member/profile-photo/doug_ford.jpg"
    },
    {
      name: "Nolan Quinn",
      email: "nolan.quinn@pc.ola.org",
      photoUrl: "https://www.ola.org/sites/default/files/member/profile-photo/Nolan_Quinn_original.jpg"
    }
  ]);
  const [ccMPPs, setCcMPPs] = useState([
    {
      name: "Marit Stiles",
      email: "mstiles-qp@ndp.on.ca",
      photoUrl: "https://www.ola.org/sites/default/files/member/profile-photo/Marit%20Stiles.png"
    },
    {
      name: "Peggy Sattler",
      email: "psattler-qp@ndp.on.ca",
      photoUrl: "https://www.ola.org/sites/default/files/member/profile-photo/peggy_sattler.jpg"
    }
  ]);

  async function fetchMpp(code) {
    try {
      const res = await fetch(`/api/mpp?postal_code=${encodeURIComponent(code)}`)
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      } else {
        setToMPPs([...toMPPs, {
          name: data.name,
          email: data.email,
          photoUrl: data.photo_url
        }]);
      }
    } catch (err) {
      console.log("Error fetching postal code");
      // include popup error logic here
    }
  }

  function handleSend({ to, cc, subject, body }) {
    const toEmails = to.map((p) => p.email).join(',');
    const ccEmails = cc.map((p) => p.email).join(',');
    const parts = [];
    if (ccEmails) parts.push(`cc=${encodeURIComponent(ccEmails)}`);
    if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
    if (body) parts.push(`body=${encodeURIComponent(body)}`);
    window.location.href = `mailto:${toEmails}?${parts.join('&')}`;
  }

  return (
    <div>
      {/* <div>MPP Name: {mppName}</div>
      <div>MPP Email: {mppEmail}</div>
      <div>MPP Party: {mppParty}</div>
      <div>MPP District: {mppDistrict}</div>
      <img src={mppPhotoUrl} alt="MPP Photo" /> */}

      <div className="heading">
        <h1>Save Basket Weaving</h1>
        <p>Doug Ford is moving to cut OSAP grants. Students have protested, but it will not be enough without directly pressuring local MPPs to publicly oppose the cuts.
          This site intends to reduce friction for speaking up and ultimately flood our politicians' inboxes, giving them no choice but to stand with us.
          We have CCed opposition members for accountability.
        </p>
      </div>
      <div className="wrapper">
        <div className="wrapper-left">
          <input
            type="text"
            placeholder="Enter postal code"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <button onClick={() => fetchMpp(postalCode)}>Get MPP</button>
        </div>
        <div className="wrapper-right">
          <Preview
            to={toMPPs}
            cc={ccMPPs}
            onRemoveTo={(index) => setToMPPs(toMPPs.filter((_, i) => i !== index))}
            onRemoveCc={(index) => setCcMPPs(ccMPPs.filter((_, i) => i !== index))}
            onAddTo={(entry) => setToMPPs([...toMPPs, entry])}
            onAddCc={(entry) => setCcMPPs([...ccMPPs, entry])}
            onSend={handleSend}
          />
        </div>
      </div>


    </div>
  )
}

export default App
