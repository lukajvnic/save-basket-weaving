import { useState, useEffect, useRef } from 'react'
import './Preview.css'

/**
 * @typedef {Object} Representative
 * @property {string} name
 * @property {string} email
 * @property {string} photoUrl
 */

/**
 * @param {{ to: Representative[], cc: Representative[] }} props
 */
function Preview({ to, cc, onRemoveTo, onRemoveCc, onAddTo, onAddCc, onSend }) {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const bodyRef = useRef(null);
    const [removingTo, setRemovingTo] = useState(null);
    const [removingCc, setRemovingCc] = useState(null);
    const [toInput, setToInput] = useState("");
    const [ccInput, setCcInput] = useState("");

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
            .then((text) => setBody(text.trim()))
    }, [])

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.style.height = 'auto'
            bodyRef.current.style.height = bodyRef.current.scrollHeight + 'px'
        }
    }, [body])

    return (
        <div className="container">
            <div className="dots">
                <span className="dot dot-close"></span>
                <span className="dot dot-minimize"></span>
                <span className="dot dot-fullscreen"></span>
            </div>
            <div className="email-area to">
                <div className="email-area-text">
                    To
                </div>
                <div className="email-area-tags">
                    {to.map((politician, index) => (
                        <span className={`tag ${removingTo === index ? 'tag-removing' : ''}`} key={index}>
                            <span className="tag-pfp">
                                <img className="tag-pfp-img" src={politician.photoUrl} alt={politician.name} />
                            </span>
                            <span className="tag-text">{politician.name}</span>
                            <span className="tag-close" onClick={() => handleRemoveTo(index)}>×</span>
                            {/* <div>{politician.email}</div> */}
                        </span>
                    ))}
                    <input
                        className="tag-input"
                        type="text"
                        value={toInput}
                        onChange={(e) => setToInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === ' ' && toInput.trim()) {
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
            </div>
            <div className="email-area cc">
                <div className="email-area-text">
                    Cc
                </div>
                <div className="email-area-tags">
                    {cc.map((politician, index) => (
                        <span className={`tag ${removingCc === index ? 'tag-removing' : ''}`} key={index}>
                            <span className="tag-pfp">
                                <img className="tag-pfp-img" src={politician.photoUrl} alt={politician.name} />
                            </span>
                            <span className="tag-text">{politician.name}</span>
                            <span className="tag-close" onClick={() => handleRemoveCc(index)}>×</span>
                            {/* <div>{politician.email}</div> */}
                        </span>
                    ))}
                    <input
                        className="tag-input"
                        type="text"
                        value={ccInput}
                        onChange={(e) => setCcInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === ' ' && ccInput.trim()) {
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
            </div>
            <div className="subject">
                <span>Subject: </span> <input className="subject-input" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="body">
                <textarea ref={bodyRef} className="body-textarea" value={body} onChange={(e) => setBody(e.target.value)} />
            </div>
            <div className="send">
                <button className="send-button" onClick={() => onSend({ to, cc, subject, body })}>Send</button>
            </div>
        </div>
    )
}

export default Preview
