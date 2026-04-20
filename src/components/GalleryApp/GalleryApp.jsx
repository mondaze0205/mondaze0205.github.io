import { useState, useEffect } from 'react'
import './GalleryApp.css'

function GalleryApp({ onClose, onMinimize }) {
  const [images, setImages] = useState([])
  const [activeMenu, setActiveMenu] = useState('Library')

  // src/assets/gallery 폴더 내의 모든 이미지 가져오기
  const imageModules = import.meta.glob('../../assets/gallery/*.{png,jpg,jpeg,gif,webp}', { eager: true, import: 'default' })

  useEffect(() => {
    const imgList = Object.entries(imageModules).map(([path, src]) => {
      const fileName = path.split('/').pop()
      return { src, fileName }
    })
    setImages(imgList)
  }, [])

  return (
    <div className="gallery-container mac-style">
      <aside className="gallery-sidebar mac-vibrant">
        <div className="sidebar-section">
          <p className="section-title">Photos</p>
          <ul className="sidebar-menu">
            <li className={activeMenu === 'Library' ? 'active' : ''} onClick={() => setActiveMenu('Library')}>
              <span className="material-icons-round">photo_library</span>
              <span className="menu-text">Library</span>
            </li>
            <li className={activeMenu === 'Favorites' ? 'active' : ''} onClick={() => setActiveMenu('Favorites')}>
              <span className="material-icons-round">favorite</span>
              <span className="menu-text">Favorites</span>
            </li>
            <li className={activeMenu === 'Recent' ? 'active' : ''} onClick={() => setActiveMenu('Recent')}>
              <span className="material-icons-round">schedule</span>
              <span className="menu-text">Recent</span>
            </li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <p className="section-title">Albums</p>
          <ul className="sidebar-menu">
            <li>
              <span className="material-icons-round">folder</span>
              <span className="menu-text">All Photos</span>
            </li>
            <li>
              <span className="material-icons-round">people</span>
              <span className="menu-text">People</span>
            </li>
          </ul>
        </div>
      </aside>

      <main className="gallery-main">
        <header className="mac-header">
          <h1 className="mac-title">MY ARCHIVE</h1>
          <div className="header-controls">
            <span className="item-count">{images.length} Photos</span>
            <div className="view-toggle">
              <span className="material-icons-round active">grid_view</span>
              <span className="material-icons-round">calendar_today</span>
            </div>
          </div>
        </header>

        <div className="mac-grid">
          {images.map((img, index) => (
            <div key={index} className="mac-grid-item">
              <div className="image-box">
                <img src={img.src} alt={img.fileName} loading="lazy" />
              </div>
              <p className="image-name">{img.fileName}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default GalleryApp
