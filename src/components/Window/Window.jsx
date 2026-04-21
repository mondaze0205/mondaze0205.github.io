import { useState, useRef } from 'react'
import './Window.css'

function Window({ title, onClose, onMinimize, children, initialWidth = 600, initialHeight = 400, isMobile }) {
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight })
  const [position, setPosition] = useState({ 
    x: Math.random() * 50 + 100,
    y: Math.random() * 50 + 100 
  })
  const [zIndex, setZIndex] = useState(10)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevSizePos, setPrevSizePos] = useState(null)

  const isResizing = useRef(false)
  const isDragging = useRef(false)
  const dragStartPos = useRef({ x: 0, y: 0 })

  const handleMaximize = (e) => {
    if (isMobile) return
    e.stopPropagation()
    if (!isMaximized) {
      setPrevSizePos({ size, position })
      setSize({ width: window.innerWidth, height: window.innerHeight - 24 })
      setPosition({ x: 0, y: 24 })
    } else {
      if (prevSizePos) {
        setSize(prevSizePos.size)
        setPosition(prevSizePos.position)
      }
    }
    setIsMaximized(!isMaximized)
  }

  const startDragging = (e) => {
    if (isMaximized || isMobile) return
    isDragging.current = true
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('mouseup', stopDragging)
    setZIndex(prev => prev + 1)
  }

  const handleDragMove = (e) => {
    if (!isDragging.current) return
    
    let newX = e.clientX - dragStartPos.current.x
    let newY = e.clientY - dragStartPos.current.y

    // --- Strict Viewport Constraints ---
    // 1. Horizontal: 0 ~ (Window Width - App Width)
    const maxX = window.innerWidth - size.width
    if (newX < 0) newX = 0
    if (newX > maxX) newX = maxX

    // 2. Vertical: 24 (MenuBar) ~ (Window Height - App Height)
    const maxY = window.innerHeight - size.height
    if (newY < 24) newY = 24
    if (newY > maxY) newY = maxY

    // If window is larger than screen, prioritize top-left visibility
    if (newY < 24) newY = 24
    if (newX < 0) newX = 0

    setPosition({ x: newX, y: newY })
  }

  const stopDragging = () => {
    isDragging.current = false
    document.removeEventListener('mousemove', handleDragMove)
    document.removeEventListener('mouseup', stopDragging)
  }

  const startResizing = (e) => {
    if (isMaximized || isMobile) return
    isResizing.current = true
    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', stopResizing)
    e.preventDefault()
    e.stopPropagation()
  }

  const handleResizeMove = (e) => {
    if (!isResizing.current) return
    const newWidth = Math.max(300, e.clientX - position.x)
    const newHeight = Math.max(200, e.clientY - position.y)
    setSize({ width: newWidth, height: newHeight })
  }

  const stopResizing = () => {
    isResizing.current = false
    document.removeEventListener('mousemove', handleResizeMove)
    document.removeEventListener('mouseup', stopResizing)
  }

  return (
    <div 
      className={`mac-window ${isMaximized ? 'maximized' : ''} ${isMobile ? 'mobile-window' : ''}`} 
      onMouseDown={() => !isMobile && setZIndex(prev => prev + 1)}
      style={{ 
        width: isMobile ? '100vw' : (isMaximized ? '100vw' : `${size.width}px`), 
        height: isMobile ? '100vh' : (isMaximized ? 'calc(100vh - 24px)' : `${size.height}px`),
        left: isMobile ? '0' : (isMaximized ? '0' : `${position.x}px`),
        top: isMobile ? '0' : (isMaximized ? '24px' : `${position.y}px`),
        zIndex: isMobile ? 5000 : zIndex,
        transform: 'none',
        borderRadius: (isMaximized || isMobile) ? '0' : '6px'
      }}
    >
      <div className="title-bar" onMouseDown={!isMobile ? startDragging : undefined} style={{ cursor: isMobile ? 'default' : (isMaximized ? 'default' : 'move') }}>
        <div className="title-bar-controls">
          <button className="close-btn" onClick={onClose}></button>
          {!isMobile && <button className="min-btn" onClick={onMinimize}></button>}
          {!isMobile && <button className="max-btn" onClick={handleMaximize}></button>}
        </div>
        <div className="title-text">{title}</div>
      </div>
      <div className="window-content">
        {children}
      </div>
      
      {!isMaximized && !isMobile && (
        <div 
          className="resizer" 
          onMouseDown={startResizing}
        ></div>
      )}
    </div>
  )
}

export default Window
