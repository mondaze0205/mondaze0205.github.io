import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import './DiaryApp.css'

function DiaryApp() {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [content, setContent] = useState('')

  const modules = import.meta.glob('../../posts/*.md', { query: '?raw', import: 'default' })

  useEffect(() => {
    const postList = Object.keys(modules).map((path) => {
      const id = path.split('/').pop().replace('.md', '')
      return { id, path }
    })
    setPosts(postList)
  }, [])

  const handlePostClick = async (path) => {
    try {
      const rawText = await modules[path]()
      setContent(rawText)
      setSelectedPost(path)
    } catch (err) {
      console.error('파일을 읽는 중 에러 발생:', err)
      setContent('# 에러가 발생했습니다.\n파일을 불러올 수 없습니다.')
      setSelectedPost(path)
    }
  }

  if (selectedPost) {
    return (
      <div className="diary-detail">
        <button className="back-btn" onClick={() => setSelectedPost(null)}>
          ← 목록으로 돌아가기
        </button>
        <div className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    )
  }

  return (
    <div className="diary-list">
      <h3>📁 Posts</h3>
      <div className="file-grid">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="file-item" 
            onDoubleClick={() => handlePostClick(post.path)}
          >
            <div className="file-icon">📄</div>
            <div className="file-name">{post.id}.md</div>
          </div>
        ))}
      </div>
      {posts.length === 0 && <p>작성된 일기가 없습니다.</p>}
    </div>
  )
}

export default DiaryApp
