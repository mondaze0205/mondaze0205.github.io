import { useState, useRef, useEffect } from 'react'
import './MusicApp.css'

function MusicApp() {
  const playlist = [
    { id: 'VOmIplFAGeg', title: "Cookie", artist: "NewJeans" },
    { id: 'ghrlZIMDzbM', title: "Hype Boy", artist: "NewJeans" },
    { id: 'jOTfBlKSQYY', title: "Super Shy", artist: "NewJeans" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const playerRef = useRef(null)
  const timerRef = useRef(null)

  const currentTrack = playlist[currentIndex]

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }

    window.onYouTubeIframeAPIReady = () => {
      loadVideo(currentTrack.id)
    }

    if (window.YT && window.YT.Player) {
      loadVideo(currentTrack.id)
    }

    return () => stopTimer()
  }, [])

  const loadVideo = (videoId) => {
    if (playerRef.current && playerRef.current.destroy) {
      playerRef.current.destroy()
    }

    playerRef.current = new window.YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: (event) => {
          setDuration(event.target.getDuration())
          if (isPlaying) {
            event.target.playVideo()
            startTimer()
          }
        },
        onStateChange: (event) => {
          if (event.data === 1) {
            setIsPlaying(true)
            startTimer()
          } else {
            setIsPlaying(false)
            stopTimer()
          }
          if (event.data === 0) {
            handleNext()
          }
        }
      }
    })
  }

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      loadVideo(currentTrack.id)
    }
  }, [currentIndex])

  const startTimer = () => {
    stopTimer()
    timerRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime()
        const totalTime = playerRef.current.getDuration()
        setProgress((currentTime / totalTime) * 100)
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const handlePlayPause = () => {
    if (!playerRef.current) return
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value)
    setProgress(newProgress)
    if (playerRef.current) {
      const time = (newProgress / 100) * duration
      playerRef.current.seekTo(time, true)
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length)
    setIsPlaying(true)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
    setIsPlaying(true)
  }

  const formatTime = (seconds) => {
    if (!seconds) return "0:00"
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="music-app">
      <div className="player-main">
        <div className="album-section">
          <div className="album-card">
            {/* 1. 실제 유튜브 플레이어 (배경에 깔림) */}
            <div id="youtube-player" className="youtube-iframe"></div>
            
            {/* 2. 앨범 아트 썸네일 (영상 위에 덮음) */}
            <img 
              src={`https://img.youtube.com/vi/${currentTrack.id}/maxresdefault.jpg`} 
              alt={currentTrack.title}
              className="album-thumbnail-overlay"
              onError={(e) => { 
                e.target.src = `https://img.youtube.com/vi/${currentTrack.id}/mqdefault.jpg` 
              }}
            />

            {/* 3. 클릭 차단 레이어 */}
            <div className="player-overlay"></div>

            {isPlaying && (
              <div className="playing-bars">
                <span></span><span></span><span></span><span></span>
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2 className="title">{currentTrack.title}</h2>
          <p className="artist">{currentTrack.artist}</p>
        </div>

        <div className="controls-section">
          <div className="progress-group">
            <input
              type="range" min="0" max="100" step="0.1"
              value={progress || 0}
              onChange={handleSeek}
              className="seek-bar"
              style={{
                background: `linear-gradient(to right, #0071e3 ${progress}%, #e5e5e5 ${progress}%)`
              }}
            />
            <div className="time-labels">
              <span>{formatTime((progress / 100) * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="button-group">
            <button onClick={handlePrev} className="btn-icon">
              <span className="material-icons-round">skip_previous</span>
            </button>
            <button onClick={handlePlayPause} className="btn-play">
              <span className="material-icons-round">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <button onClick={handleNext} className="btn-icon">
              <span className="material-icons-round">skip_next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="playlist-drawer">
        <header>Playlist</header>
        <div className="track-list">
          {playlist.map((track, index) => (
            <div 
              key={track.id} 
              className={`track-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index)
                setIsPlaying(true)
              }}
            >
              <img src={`https://img.youtube.com/vi/${track.id}/mqdefault.jpg`} alt="" />
              <div className="track-meta">
                <span className="track-title">{track.title}</span>
                <span className="track-artist">{track.artist}</span>
              </div>
              {index === currentIndex && isPlaying && (
                <span className="material-icons-round active-icon">volume_up</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MusicApp
