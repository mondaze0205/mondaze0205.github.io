import { useState } from 'react'
import './MusicApp.css'

function MusicApp() {
  const playlist = [
    { id: 'VOmIplFAGeg', title: "NewJeans - Cookie", artist: "NewJeans" },
    { id: 'pSUydWEqKwE', title: "NewJeans - Hype Boy", artist: "NewJeans" },
    { id: 'T--6HBX2K_M', title: "NewJeans - Ditto", artist: "NewJeans" },
    { id: 'fCEbV26n2-0', title: "NewJeans - Attention", artist: "NewJeans" },
  ]

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const currentTrack = playlist[currentTrackIndex]

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length)
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
  }

  return (
    <div className="music-player-v2">
      <div className="player-top">
        {/* 앨범 아트 (유튜브 썸네일) */}
        <div className="album-art">
          <img 
            src={`https://img.youtube.com/vi/${currentTrack.id}/mqdefault.jpg`} 
            alt="Album Art" 
          />
        </div>
        <div className="track-info">
          <h3 className="track-title">{currentTrack.title}</h3>
          <p className="track-artist">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="player-controls">
        <button className="control-btn" onClick={prevTrack}>⏮️</button>
        <button className="control-btn play-pause">⏯️</button>
        <button className="control-btn" onClick={nextTrack}>⏭️</button>
      </div>

      {/* 실제 소리가 나오는 유튜브 프레임 (숨김 처리하거나 작게 배치) */}
      <div className="hidden-player">
        <iframe
          width="100%"
          height="120"
          src={`https://www.youtube-nocookie.com/embed/${currentTrack.id}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1&origin=${window.location.origin}`}
          title="Music Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

      <div className="playlist-section">
        <h4>Playlist</h4>
        <ul className="playlist-items">
          {playlist.map((track, index) => (
            <li 
              key={track.id} 
              className={`playlist-item ${index === currentTrackIndex ? 'active' : ''}`}
              onClick={() => setCurrentTrackIndex(index)}
            >
              <span className="track-number">{index + 1}.</span>
              <span className="track-name">{track.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MusicApp
