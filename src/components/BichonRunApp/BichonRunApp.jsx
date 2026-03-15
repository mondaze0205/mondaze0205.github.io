import { useState, useEffect, useCallback, useRef } from 'react'
import bichonImg from '../../assets/bichon.png'
import './BichonRunApp.css'

function BichonRunApp() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [obstacles, setObstacles] = useState([])
  
  const gameRef = useRef(null)
  const bichonRef = useRef(null)
  const requestRef = useRef()
  const lastTimeRef = useRef()

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setObstacles([])
    lastTimeRef.current = undefined
  }

  const jump = useCallback(() => {
    if (!isJumping && gameStarted && !gameOver) {
      setIsJumping(true)
      setTimeout(() => setIsJumping(false), 600)
    }
  }, [isJumping, gameStarted, gameOver])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (!gameStarted || gameOver) {
          startGame()
        } else {
          jump()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameStarted, gameOver, jump])

  const updateGame = useCallback((time) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current

      if (gameStarted && !gameOver) {
        setScore(prev => prev + 1)

        setObstacles(prev => {
          const newObstacles = prev
            .map(obs => ({ ...obs, left: obs.left - (0.3 * deltaTime) }))
            .filter(obs => obs.left > -50)

          if (newObstacles.length === 0 || (newObstacles[newObstacles.length - 1].left < 400 && Math.random() < 0.02)) {
            newObstacles.push({ id: Date.now(), left: 800 })
          }

          const bichonRect = bichonRef.current?.getBoundingClientRect()
          if (bichonRect) {
            newObstacles.forEach(obs => {
              const obsElement = document.getElementById(`obs-${obs.id}`)
              const obsRect = obsElement?.getBoundingClientRect()
              
              if (obsRect && 
                  bichonRect.right > obsRect.left + 15 && 
                  bichonRect.left < obsRect.right - 15 && 
                  bichonRect.bottom > obsRect.top + 10) {
                setGameOver(true)
                if (score > highScore) setHighScore(score)
              }
            })
          }

          return newObstacles
        })
      }
    }
    lastTimeRef.current = time
    requestRef.current = requestAnimationFrame(updateGame)
  }, [gameStarted, gameOver, score, highScore])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame)
    return () => cancelAnimationFrame(requestRef.current)
  }, [updateGame])

  return (
    <div className="bichon-run-container" ref={gameRef} onClick={!gameStarted || gameOver ? startGame : jump}>
      <div className="score-board">
        <span>HI {highScore.toString().padStart(5, '0')}</span>
        <span> {score.toString().padStart(5, '0')}</span>
      </div>

      {!gameStarted && (
        <div className="game-overlay">
          <h3>Bichon Run</h3>
          <p>Press Space or Click to Jump</p>
          <button className="start-btn">Game Start</button>
        </div>
      )}

      {gameOver && (
        <div className="game-overlay">
          <h3>GAME OVER</h3>
          <p>Score: {score}</p>
          <button className="start-btn">Retry</button>
        </div>
      )}

      <div className="game-world">
        <div 
          ref={bichonRef}
          className={`bichon-player ${isJumping ? 'jumping' : ''}`}
        >
          <img src={bichonImg} alt="Bichon" />
        </div>

        {obstacles.map(obs => (
          <div 
            key={obs.id}
            id={`obs-${obs.id}`}
            className="obstacle"
            style={{ left: `${obs.left}px` }}
          >
            🌵
          </div>
        ))}
        <div className="ground"></div>
      </div>
    </div>
  )
}

export default BichonRunApp
