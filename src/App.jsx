import { useState, useEffect } from 'react'
import DesktopIcon from './components/DesktopIcon/DesktopIcon'
import Window from './components/Window/Window'
import DiaryApp from './components/DiaryApp/DiaryApp'
import MusicApp from './components/MusicApp/MusicApp'
import MenuBar from './components/MenuBar/MenuBar'
import MailApp from './components/MailApp/MailApp'
import PaintApp from './components/PaintApp/PaintApp'
import ProfileApp from './components/ProfileApp/ProfileApp'
import BichonApp from './components/BichonApp/BichonApp'
import StickyNoteApp from './components/StickyNoteApp/StickyNoteApp'
import Dock from './components/Dock/Dock'
import folderIcon from './assets/folder_icon.png'
import musicIcon from './assets/music.png'
import galleryIcon from './assets/gallery.png'
import profileIcon from './assets/profile.png'
import paintIcon from './assets/paint.png'
import mailIcon from './assets/mail.png'
import bichonIcon from './assets/bichon.png'
import './App.css'

function App() {
  const [openWindows, setOpenWindows] = useState([])
  const [minimizedWindows, setMinimizedWindows] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 })
  const recipientEmail = "mondaze0205@gmail.com"

  const handleMouseMove = (e) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    // Subtler movement (divisor 20 instead of 12)
    const x = (e.clientX - (rect.left + rect.width / 2)) / 20
    const y = (e.clientY - (rect.top + rect.height / 2)) / 20
    // Tiny rotation for more natural feel
    const rotateX = -y * 0.5
    const rotateY = x * 0.5
    setMousePos({ x, y, rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, rotateX: 0, rotateY: 0 })
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const initialIcons = [
    { id: 'profile', icon: profileIcon, label: 'Profile' },
    { id: 'diary', icon: folderIcon, label: 'Diary' },
    { id: 'bichon', icon: bichonIcon, label: 'Bichon' },
    { id: 'gallery', icon: galleryIcon, label: 'Gallery' },
    { id: 'paint', icon: paintIcon, label: 'Paint' },
    { id: 'music', icon: musicIcon, label: 'Music' },
    { id: 'mail', icon: mailIcon, label: 'Mail' },
  ]

  const openWindow = (appId) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows([...openWindows, appId])
    }
    if (minimizedWindows.includes(appId)) {
      setMinimizedWindows(minimizedWindows.filter(id => id !== appId))
    }
  }

  const closeWindow = (appId) => {
    setOpenWindows(openWindows.filter(id => id !== appId))
    setMinimizedWindows(minimizedWindows.filter(id => id !== appId))
  }

  const minimizeWindow = (appId) => {
    if (!minimizedWindows.includes(appId)) {
      setMinimizedWindows([...minimizedWindows, appId])
    }
  }

  return (
    <div className={`mac-desktop ${isMobile ? 'iphone-mode' : ''}`}>
      <MenuBar isMobile={isMobile} />
      
      {!isMobile && <StickyNoteApp initialX={window.innerWidth - 300} initialY={100} />}

      {!isMobile && (
        <div 
          className="desktop-center-text"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) rotateX(${mousePos.rotateX}deg) rotateY(${mousePos.rotateY}deg)`
          }}
        >
          <h1>안녕하세요?</h1>
          <p>Welcome to my Portfolio</p>
        </div>
      )}

      <div className="desktop-icons-container">
        {initialIcons.map((icon, index) => {
          const iconsPerCol = Math.floor((window.innerHeight - 100) / 100);
          const initialX = 30 + Math.floor(index / iconsPerCol) * 100;
          const initialY = 60 + (index % iconsPerCol) * 100;

          return (
            <DesktopIcon 
              key={icon.id}
              icon={icon.icon} 
              label={icon.label} 
              onDoubleClick={() => openWindow(icon.id)} 
              initialX={initialX}
              initialY={initialY}
              isMobile={isMobile}
            />
          );
        })}
      </div>

      {openWindows.map(appId => {
        if (minimizedWindows.includes(appId)) return null;
        const appData = initialIcons.find(icon => icon.id === appId);
        let content = null;
        switch(appId) {
          case 'profile': content = <ProfileApp />; break;
          case 'diary': content = <DiaryApp />; break;
          case 'bichon': content = <BichonApp />; break;
          case 'paint': content = <PaintApp />; break;
          case 'music': content = <MusicApp />; break;
          case 'mail': content = <MailApp recipientEmail={recipientEmail} />; break;
          case 'gallery': content = (
            <div className="gallery-placeholder">
              <h2>사진첩</h2>
              <p>준비 중입니다...</p>
            </div>
          ); break;
          default: content = null;
        }

        return (
          <Window 
            key={appId}
            title={appData?.label || 'App'} 
            onClose={() => closeWindow(appId)} 
            onMinimize={() => minimizeWindow(appId)}
            isMobile={isMobile}
          >
            {content}
          </Window>
        );
      })}

      {!isMobile && (
        <Dock 
          apps={initialIcons} 
          openApp={openWindow} 
          openWindows={openWindows} 
        />
      )}
    </div>
  )
}

export default App
