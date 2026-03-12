import './Dock.css'

function Dock({ apps, openApp, openWindows }) {
  return (
    <div className="dock-container">
      <div className="dock-shelf">
        {apps.map(app => (
          <div 
            key={app.id} 
            className="dock-item-wrapper"
            onClick={() => openApp(app.id)}
          >
            <div className="dock-item" title={app.label}>
              <span className="dock-icon">
                {typeof app.icon === 'string' && !app.icon.includes('/') && !app.icon.includes('.') && !app.icon.startsWith('data:') ? (
                  app.icon
                ) : (
                  <img src={app.icon} alt={app.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                )}
              </span>
            </div>
            {openWindows.includes(app.id) && <div className="dock-indicator"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dock
