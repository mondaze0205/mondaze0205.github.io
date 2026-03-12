import { useState, useEffect } from 'react'
import './MenuBar.css'

function MenuBar({ isMobile }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    })
  }

  const formatTimeMobile = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: false
    })
  }

  if (isMobile) {
    return (
      <div className="ios-statusbar">
        <div className="status-left">
          <span className="mobile-time">{formatTimeMobile(currentTime)}</span>
        </div>
        <div className="status-right">
          <span className="status-icon">📶</span>
          <span className="status-icon">🔋</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mac-menubar">
      <div className="menu-left">
        <span className="apple-logo"></span>
        <span className="menu-item">Finder</span>
        <span className="menu-item">File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Go</span>
      </div>
      <div className="menu-right">
        <span className="menu-item time-display">{formatTime(currentTime)}</span>
      </div>
    </div>
  )
}

export default MenuBar
