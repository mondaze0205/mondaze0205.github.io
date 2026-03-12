import { Link } from 'react-router-dom'

function Home() {
  // 나중에 마크다운 목록을 여기서 불러올 거예요!
  const posts = [
    { id: 1, title: '첫 번째 블로그 포스트', date: '2024-03-21' },
    { id: 2, title: '리액트 공부 기록', date: '2024-03-22' }
  ]

  return (
    <div className="home-container">
      <h1>Krystal's Blog</h1>
      <p>공부한 내용들을 기록하는 공간입니다.</p>
      
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <span>{post.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
