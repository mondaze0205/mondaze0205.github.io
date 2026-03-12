import { useState, useRef, useEffect } from 'react'
import './DesktopIcon.css'

function DesktopIcon({ icon, label, onDoubleClick, initialX, initialY, isMobile }) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const isDragging = useRef(false)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const iconRef = useRef(null)

  useEffect(() => {
    if (!isMobile) {
      setPosition({ x: initialX, y: initialY })
    }
  }, [initialX, initialY, isMobile])

  const onMouseDown = (e) => {
    if (isMobile) return
    isDragging.current = true
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    e.preventDefault()
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return
    setPosition({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y
    })
  }

  const onMouseUp = () => {
    isDragging.current = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  return (
    <div 
      ref={iconRef}
      className={`desktop-icon ${isMobile ? 'ios-icon' : ''}`} 
      onDoubleClick={!isMobile ? onDoubleClick : undefined}
      onClick={isMobile ? onDoubleClick : undefined}
      onMouseDown={onMouseDown}
      style={{
        left: isMobile ? 'auto' : `${position.x}px`,
        top: isMobile ? 'auto' : `${position.y}px`,
        position: isMobile ? 'relative' : 'absolute'
      }}
    >
      <div className="icon-image">
        {typeof icon === 'string' && !icon.includes('/') && !icon.includes('.') && !icon.startsWith('data:') ? (
          icon
        ) : (
          <img src={icon} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        )}
      </div>
      <div className="icon-label">{label}</div>
    </div>
  )
}

export default DesktopIcon
