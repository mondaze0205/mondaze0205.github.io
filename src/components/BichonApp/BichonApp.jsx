import { useState } from 'react'
import bichonImg from '../../assets/bichon.png'
import './BichonApp.css'

function BichonApp() {
  const [showBichon, setShowBichon] = useState(false)

  const handleLikeDogs = () => {
    setShowBichon(true)
    // 6초 후에 비숑이 사라지게 함 (애니메이션 속도에 맞춰 연장)
    setTimeout(() => {
      setShowBichon(false)
    }, 6000)
  }

  return (
    <div className="bichon-app">
      <div className="question-box">
        <h3>🐶 Do you like dogs?</h3>
        <p>비숑은 사랑입니다! 🐩✨</p>
        <div className="button-group">
          <button className="yes-btn" onClick={handleLikeDogs}>Yes</button>
          <button className="yes-btn" onClick={handleLikeDogs}>Yes, I do!</button>
        </div>
      </div>

      {/* 비숑 애니메이션 효과 */}
      {showBichon && (
        <div className="bichon-runner">
          <div className="bichon-sprite">
            <img src={bichonImg} alt="Bichon" className="bichon-img" />
          </div>
          {/* <div className="bichon-msg">Woof! Woof! ❤️</div> */}
        </div>
      )}
    </div>
  )
}

export default BichonApp
