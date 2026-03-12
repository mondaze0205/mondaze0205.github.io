import { useState, useRef, useEffect } from 'react'
import './StickyNoteApp.css'

function StickyNoteApp({ initialX = 100, initialY = 150 }) {
  const [note, setNote] = useState("Loading today's advice...")
  const [color, setColor] = useState('#FFF48D')
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isLoading, setIsLoading] = useState(true)
  
  const isDragging = useRef(false)
  const dragStartPos = useRef({ x: 0, y: 0 })

  const colors = [
    { name: 'yellow', value: '#FFF48D' },
    { name: 'blue', value: '#B2F2FF' },
    { name: 'green', value: '#B2FFB2' },
    { name: 'pink', value: '#FFB2E6' },
    { name: 'purple', value: '#D9B2FF' }
  ]

  // Fetch advice from Public API
  const fetchAdvice = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('https://api.adviceslip.com/advice')
      const data = await response.json()
      setNote(`Today's Advice: \n\n"${data.slip.advice}"`)
    } catch (error) {
      setNote("Stay hungry, stay foolish. \n\n(Failed to load live data)")
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAdvice()
  }, [])

  const startDragging = (e) => {
    isDragging.current = true
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('mouseup', stopDragging)
  }

  const handleDragMove = (e) => {
    if (!isDragging.current) return
    setPosition({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y
    })
  }

  const stopDragging = () => {
    isDragging.current = false
    document.removeEventListener('mousemove', handleDragMove)
    document.removeEventListener('mouseup', stopDragging)
  }

  return (
    <div 
      className="sticky-note-standalone" 
      style={{ 
        backgroundColor: color,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <div className="sticky-note-header" onMouseDown={startDragging}>
        <div className="sticky-note-dots">
          {colors.map(c => (
            <div 
              key={c.name}
              className="color-dot"
              style={{ backgroundColor: c.value }}
              onClick={() => setColor(c.value)}
            />
          ))}
        </div>
        <button className="refresh-btn" onClick={fetchAdvice} title="New Advice">🔄</button>
      </div>
      <textarea 
        className="sticky-note-textarea"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        spellCheck="false"
        disabled={isLoading}
      />
    </div>
  )
}

export default StickyNoteApp
