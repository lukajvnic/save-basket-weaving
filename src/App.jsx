import { useState, useRef } from 'react'
import Preview from './components/Preview'
import Input from './components/Input'
import { track } from '@vercel/analytics';
import './App.css'

function App() {
  // const [mppName, setMPPName] = useState('');
  // const [mppEmail, setMPPEmail] = useState('');
  // const [mppParty, setMPPParty] = useState('');
  // const [mppDistrict, setMPPDistrict] = useState('');
  // const [mppPhotoUrl, setMPPPhotoUrl] = useState(null);
  const [school, setSchool] = useState('');
  const [name, setName] = useState('');
  const fetchedCodes = useRef(new Map());
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
  const toMPPsRef = useRef(toMPPs);
  toMPPsRef.current = toMPPs;
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
    const knownEmail = fetchedCodes.current.get(code);
    if (knownEmail !== undefined) {
      const stillPresent = toMPPsRef.current.some(m => m.email === knownEmail);
      if (stillPresent) return;
    }
    try {
      const res = await fetch(`/api/mpp?postal_code=${encodeURIComponent(code)}`)
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      } else {
        fetchedCodes.current.set(code, data.email);
        setToMPPs(prev => [...prev, {
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

  function handleSchoolSelect(mpp) {
    if (!mpp) return
    const alreadyPresent = toMPPsRef.current.some(m => m.email === mpp.email)
    if (!alreadyPresent) {
      setToMPPs(prev => [...prev, mpp])
    }
  }

  function handleSend({ to, cc, subject, body }) {
    const toEmails = to.map((p) => p.email).join(',');
    const ccEmails = cc.map((p) => p.email).join(',');
    const parts = [];
    if (ccEmails) parts.push(`cc=${encodeURIComponent(ccEmails)}`);
    if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
    if (body) parts.push(`body=${encodeURIComponent(body)}`);

    track('send_email_clicked');

    window.location.href = `mailto:${toEmails}?${parts.join('&')}`;
  }

  return (
    <div className="app">
      {/* <div>MPP Name: {mppName}</div>
      <div>MPP Email: {mppEmail}</div>
      <div>MPP Party: {mppParty}</div>
      <div>MPP District: {mppDistrict}</div>
      <img src={mppPhotoUrl} alt="MPP Photo" /> */}

      <div className="heading">
        <div className="heading-title">Doug Ford is cutting OSAP grants.</div>
        <div className="heading-body">
          Students are protesting, but it's not enough without directly pressuring local MPPs.
          <br></br>
          This site intends to make it easy to do exactly that.
        </div>
      </div>
      <div className="wrapper">
        <div className="wrapper-left">
          <Input onGenerate={({ postalCode }) => fetchMpp(postalCode)} onSchoolChange={setSchool} onNameChange={setName} onSchoolSelect={handleSchoolSelect} />
        </div>
        <div className="wrapper-right">
          <Preview
            to={toMPPs}
            cc={ccMPPs}
            school={school}
            name={name}
            onRemoveTo={(index) => setToMPPs(toMPPs.filter((_, i) => i !== index))}
            onRemoveCc={(index) => setCcMPPs(ccMPPs.filter((_, i) => i !== index))}
            onAddTo={(entry) => !toMPPs.some(m => m.email === entry.email) && setToMPPs([...toMPPs, entry])}
            onAddCc={(entry) => !ccMPPs.some(m => m.email === entry.email) && setCcMPPs([...ccMPPs, entry])}
            onSend={handleSend}
          />
        </div>
      </div>
      <div className="footer">
        <p>Email template credits to the <a href="https://wusa.ca/cuts/" target="_blank">Waterloo Undergraduate Student Association (WUSA)</a>
        </p>
        <p>Made by <a href="https://www.linkedin.com/in/luka-j-ovanovic/" target="_blank">Luka Jovanovic</a> & <a href="https://www.linkedin.com/in/elaineqian/" target="_blank">Elaine Qian</a></p>
      </div>
    </div>
  )
}

export default App
