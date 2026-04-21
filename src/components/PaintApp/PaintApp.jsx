import { useRef, useState, useEffect, useCallback } from 'react'
import './PaintApp.css'

function PaintApp() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#1e1e1e')
  const [lineWidth, setLineWidth] = useState(5)
  const [mode, setMode] = useState('brush') // 'brush' or 'eraser'
  const [history, setHistory] = useState([])
  const [historyStep, setHistoryStep] = useState(-1)

  const palette = [
    '#1e1e1e', '#ff3b30', '#ff9500', '#ffcc00', 
    '#34c759', '#007aff', '#5856d6', '#af52de'
  ]

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas resolution (internal size)
    canvas.width = 1400
    canvas.height = 900
    
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Initial history
    saveToHistory()
  }, [])

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL()
    
    setHistory(prev => {
      const newHistory = prev.slice(0, historyStep + 1)
      return [...newHistory, dataUrl]
    })
    setHistoryStep(prev => prev + 1)
  }, [historyStep])

  const undo = () => {
    if (historyStep <= 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    const prevStep = historyStep - 1
    
    img.src = history[prevStep]
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      setHistoryStep(prevStep)
    }
  }

  const startDrawing = ({ nativeEvent }) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const offsetX = (nativeEvent.clientX - rect.left) * scaleX
    const offsetY = (nativeEvent.clientY - rect.top) * scaleY

    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const offsetX = (nativeEvent.clientX - rect.left) * scaleX
    const offsetY = (nativeEvent.clientY - rect.top) * scaleY

    const ctx = canvas.getContext('2d')
    
    if (mode === 'eraser') {
      ctx.strokeStyle = '#ffffff'
    } else {
      ctx.strokeStyle = color
    }
    
    ctx.lineWidth = lineWidth
    ctx.lineTo(offsetX, offsetY)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveToHistory()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveToHistory()
  }

  const saveImage = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'krystal-drawing.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="paint-app">
      {/* --- Floating Toolbar --- */}
      <div className="paint-toolbar">
        {/* Tools Section */}
        <div className="toolbar-section">
          <button 
            className={`tool-btn ${mode === 'brush' ? 'active' : ''}`}
            onClick={() => setMode('brush')}
            title="Brush"
          >
            ✏️
          </button>
          <button 
            className={`tool-btn ${mode === 'eraser' ? 'active' : ''}`}
            onClick={() => setMode('eraser')}
            title="Eraser"
          >
            🧽
          </button>
        </div>

        {/* Colors Section */}
        <div className="toolbar-section">
          <div className="color-palette">
            {palette.map(p => (
              <div 
                key={p} 
                className={`color-swatch ${color === p && mode === 'brush' ? 'active' : ''}`}
                style={{ backgroundColor: p }}
                onClick={() => {
                  setColor(p)
                  setMode('brush')
                }}
              />
            ))}
            <div className="color-picker-wrapper">
              <div className="color-picker-icon"></div>
              <input 
                type="color" 
                className="color-picker-input"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value)
                  setMode('brush')
                }}
              />
            </div>
          </div>
        </div>

        {/* Brush Settings Section */}
        <div className="toolbar-section">
          <div className="brush-preview-container">
            <div className="brush-circle-wrapper">
              <div 
                className="brush-preview-circle"
                style={{ 
                  width: `${lineWidth}px`, 
                  height: `${lineWidth}px`,
                  backgroundColor: mode === 'eraser' ? '#ccc' : color
                }}
              ></div>
            </div>
            <input 
              type="range" 
              className="brush-slider"
              min="1" 
              max="40" 
              value={lineWidth} 
              onChange={(e) => setLineWidth(e.target.value)} 
            />
          </div>
        </div>

        {/* Actions Section */}
        <div className="toolbar-section">
          <button 
            className="action-btn" 
            onClick={undo}
            disabled={historyStep <= 0}
            title="Undo (Ctrl+Z)"
          >
            ↩️ Undo
          </button>
          <button className="action-btn" onClick={clearCanvas}>🗑️ Clear</button>
          <button className="action-btn save-btn" onClick={saveImage}>💾 Save</button>
        </div>
      </div>
      
      {/* --- Canvas Area --- */}
      <div className="canvas-container">
        <canvas 
          ref={canvasRef}
          className="canvas-paper"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  )
}

export default PaintApp
