import { useRef, useState, useEffect } from 'react'
import './PaintApp.css'

function PaintApp() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(5)

  const palette = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', 
    '#0000ff', '#ffff00', '#ff00ff', '#00ffff'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = nativeEvent
    const ctx = canvasRef.current.getContext('2d')
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.lineTo(offsetX, offsetY)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const saveImage = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'krystal-paint.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="paint-app">
      <div className="paint-toolbar">
        <div className="color-palette">
          {palette.map(p => (
            <div 
              key={p} 
              className={`color-swatch ${color === p ? 'active' : ''}`}
              style={{ backgroundColor: p }}
              onClick={() => setColor(p)}
            />
          ))}
        </div>
        <div className="brush-settings">
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={lineWidth} 
            onChange={(e) => setLineWidth(e.target.value)} 
          />
          <span>{lineWidth}px</span>
        </div>
        <div className="paint-actions">
          <button onClick={clearCanvas}>Clear</button>
          <button className="save-btn" onClick={saveImage}>Save</button>
        </div>
      </div>
      
      <div className="canvas-container">
        <canvas 
          ref={canvasRef}
          width={500}
          height={300}
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
