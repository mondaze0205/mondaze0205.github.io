import './ProfileApp.css'

function ProfileApp() {
  return (
    <div className="profile-app">
      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="profile-photo-placeholder">👤</div>
          <h2 className="profile-name">이수정 (Lee Soo Jung)</h2>
          <p className="profile-title">Backend Developer</p>
          <div className="profile-contacts">
            <p>📧 mondaze0205@gmail.com</p>
            <p>📍 Seoul, Korea</p>
          </div>
          <a 
            href="https://mondaze0205.notion.site/LEE-SOO-JUNG-405d339ee62c48daa67cd01c247b46db?pvs=74" 
            target="_blank" 
            rel="noopener noreferrer"
            className="notion-link-btn"
          >
            Full Resume (Notion) ↗
          </a>
        </aside>

        <main className="profile-main-content">
          <section className="profile-section">
            <h3>👋 About Me</h3>
            <p>
              안정적이고 효율적인 시스템 아키텍처를 설계하는 백엔드 개발자입니다. 
              데이터의 흐름을 파악하고 최적화된 비즈니스 로직을 구축하는 데 열정이 있습니다.
            </p>
          </section>

          <section className="profile-section">
            <h3>🛠️ Tech Stack</h3>
            <div className="skill-tags">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>MySQL</span>
              <span>PostgreSQL</span>
              <span>Redis</span>
              <span>Docker</span>
              <span>AWS</span>
            </div>
          </section>

          <section className="profile-section">
            <h3>💼 Experience</h3>
            <div className="experience-item">
              <h4>백엔드 개발자로서의 경력을 쌓아가고 있습니다.</h4>
              <p className="exp-role">Backend Developer</p>
              <ul>
                <li>API 설계 및 고도화</li>
                <li>데이터베이스 스키마 설계 및 성능 최적화</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default ProfileApp
