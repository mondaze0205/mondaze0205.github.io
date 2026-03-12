import { useState } from 'react'
import './MailApp.css'

function MailApp({ recipientEmail }) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    window.location.href = mailtoLink
  }

  return (
    <div className="mail-app">
      <div className="mail-header-info">
        <div className="info-row">
          <label>To:</label>
          <span>Krystal</span>
        </div>
        <div className="info-row">
          <label>Subject:</label>
          <input 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            placeholder="제목을 입력하세요"
          />
        </div>
      </div>
      
      <div className="mail-body">
        <textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="여기에 내용을 작성해 주세요..."
        ></textarea>
      </div>
      
      <div className="mail-footer-controls">
        <button className="send-btn" onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default MailApp
