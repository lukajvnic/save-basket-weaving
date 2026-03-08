import { useState, useEffect, useRef } from 'react'
import './Preview.css'

const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="14" height="16" rx="2" ry="2" />
        <path d="M4 16H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1" />
    </svg>
);

/**
 * @typedef {Object} Representative
 * @property {string} name
 * @property {string} email
 * @property {string} photoUrl
 */

/**
 * @param {{ to: Representative[], cc: Representative[] }} props
 */
function Preview({ to, cc, onRemoveTo, onRemoveCc, onAddTo, onAddCc, onSend, school, name }) {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [baseBody, setBaseBody] = useState("");
    const [removingTo, setRemovingTo] = useState(null);
    const [removingCc, setRemovingCc] = useState(null);
    const [toInput, setToInput] = useState("");
    const [ccInput, setCcInput] = useState("");
    const [copiedEmail, setCopiedEmail] = useState(null);
    const [copiedField, setCopiedField] = useState(null);
    const bodyRef = useRef(null);
    const prevSchoolRef = useRef('');
    const prevNameRef = useRef('');

    function handleCopyField(field, text) {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 1500);
    }

    function handleCopyEmail(email) {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 1500);
    }

    function handleRemoveTo(index) {
        setRemovingTo(index);
        setTimeout(() => {
            onRemoveTo(index);
            setRemovingTo(null);
        }, 250);
    }

    function handleRemoveCc(index) {
        setRemovingCc(index);
        setTimeout(() => {
            onRemoveCc(index);
            setRemovingCc(null);
        }, 250);
    }

    useEffect(() => {
        fetch('/subject.txt')
            .then((res) => res.text())
            .then((text) => setSubject(text.trim()))

        fetch('/body.txt')
            .then((res) => res.text())
            .then((text) => setBaseBody(text.trim()))
    }, [])

    useEffect(() => {
        if (!baseBody) return
        setBody(baseBody)
    }, [baseBody])

    useEffect(() => {
        if (!baseBody) return
        const articleFor = (s) => /^(university|college)/i.test(s) ? 'the ' : ''
        const oldPrefix = prevSchoolRef.current ? `As a student at ${articleFor(prevSchoolRef.current)}${prevSchoolRef.current}, ` : ''
        const newPrefix = school ? `As a student at ${articleFor(school)}${school}, ` : ''
        prevSchoolRef.current = school
        setBody(prev => {
            let updated = (oldPrefix && prev.startsWith(oldPrefix)) ? prev.slice(oldPrefix.length) : prev
            return newPrefix + updated
        })
    }, [school, baseBody])

    useEffect(() => {
        if (!baseBody) return
        const oldSuffix = prevNameRef.current ? `\n\nSincerely,\n${prevNameRef.current}` : ''
        const newSuffix = name ? `\n\nSincerely,\n${name}` : ''
        prevNameRef.current = name
        setBody(prev => {
            let updated = (oldSuffix && prev.endsWith(oldSuffix)) ? prev.slice(0, -oldSuffix.length) : prev
            return updated + newSuffix
        })
    }, [name, baseBody])

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.style.height = 'auto'
            bodyRef.current.style.height = bodyRef.current.scrollHeight + 'px'
        }
    }, [body])

    return (
        <div className="main">
            <div className="container">
                <div className="dots">
                    <span className="dot dot-close"></span>
                    <span className="dot dot-minimize"></span>
                    <span className="dot dot-fullscreen"></span>
                </div>
                <div className="email-area to">
                    <div className="email-area-text">
                        To:
                    </div>
                    <div className="email-area-tags">
                        {to.map((politician, index) => (
                            <span className={`tag ${removingTo === index ? 'tag-removing' : ''}`} key={index} onClick={() => handleCopyEmail(politician.email)}>
                                <span className="tag-tooltip">{politician.email}{copiedEmail === politician.email && ' (copied)'}</span>
                                <span className="tag-pfp">
                                    <img className="tag-pfp-img" src={politician.photoUrl} alt={politician.name} />
                                </span>
                                <span className="tag-text">{politician.name}</span>
                                <span className="tag-close" onClick={(e) => { e.stopPropagation(); handleRemoveTo(index); }}>×</span>
                            </span>
                        ))}
                        <input
                            className="tag-input"
                            type="text"
                            value={toInput}
                            onChange={(e) => setToInput(e.target.value)}
                            onKeyDown={(e) => {
                                if ((e.key === ' ' || e.key === 'Enter') && toInput.trim()) {
                                    e.preventDefault();
                                    onAddTo({ name: toInput.trim(), email: toInput.trim(), photoUrl: '/default-avatar.png' });
                                    setToInput('');
                                }
                                if (e.key === 'Backspace' && !toInput && to.length > 0) {
                                    handleRemoveTo(to.length - 1);
                                }
                            }}
                        />
                    </div>
                    <button className="copy-btn" onClick={() => handleCopyField('to', to.map(p => p.email).join(', '))}>
                        {copiedField === 'to' ? 'Copied!' : <CopyIcon />}
                    </button>
                </div>
                <div className="email-area cc">
                    <div className="email-area-text">
                        Cc:
                    </div>
                    <div className="email-area-tags">
                        {cc.map((politician, index) => (
                            <span className={`tag ${removingCc === index ? 'tag-removing' : ''}`} key={index} onClick={() => handleCopyEmail(politician.email)}>
                                <span className="tag-tooltip">{politician.email}{copiedEmail === politician.email && ' (copied)'}</span>
                                <span className="tag-pfp">
                                    <img className="tag-pfp-img" src={politician.photoUrl} alt={politician.name} />
                                </span>
                                <span className="tag-text">{politician.name}</span>
                                <span className="tag-close" onClick={(e) => { e.stopPropagation(); handleRemoveCc(index); }}>×</span>
                            </span>
                        ))}
                        <input
                            className="tag-input"
                            type="text"
                            value={ccInput}
                            onChange={(e) => setCcInput(e.target.value)}
                            onKeyDown={(e) => {
                                if ((e.key === ' ' || e.key === 'Enter') && ccInput.trim()) {
                                    e.preventDefault();
                                    onAddCc({ name: ccInput.trim(), email: ccInput.trim(), photoUrl: '/default-avatar.png' });
                                    setCcInput('');
                                }
                                if (e.key === 'Backspace' && !ccInput && cc.length > 0) {
                                    handleRemoveCc(cc.length - 1);
                                }
                            }}
                        />
                    </div>
                    <button className="copy-btn" onClick={() => handleCopyField('cc', cc.map(p => p.email).join(', '))}>
                        {copiedField === 'cc' ? 'Copied!' : <CopyIcon />}
                    </button>
                </div>
                <div className="subject">
                    <span>Subject: </span>
                    <input className="subject-input" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    <button className="copy-btn" onClick={() => handleCopyField('subject', subject)}>
                        {copiedField === 'subject' ? 'Copied!' : <CopyIcon />}
                    </button>
                </div>
                <div className="body">
                    <textarea ref={bodyRef} className="body-textarea" value={body} onChange={(e) => setBody(e.target.value)} />
                    <button className="copy-btn copy-btn-body" onClick={() => handleCopyField('body', body)}>
                        {copiedField === 'body' ? 'Copied!' : <CopyIcon />}
                    </button>
                </div>
                <div className="send">
                    <button className="send-button" onClick={() => onSend({ to, cc, subject, body })}>Send</button>
                </div>
            </div>
            <div className="note">
                Note: Opposition members CC'ed to ensure accountability.
            </div>
        </div>
    )
}

export default Preview
