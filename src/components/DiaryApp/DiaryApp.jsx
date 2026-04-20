import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import './DiaryApp.css'

function DiaryApp() {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [content, setContent] = useState('')

  const modules = import.meta.glob('../../posts/*.md', { query: '?raw', import: 'default' })

  // 간단한 마크다운 메타데이터 파싱 함수
  const parseMetadata = (rawText) => {
    const metaRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
    const match = rawText.match(metaRegex)
    const metadata = {}
    
    if (match) {
      const lines = match[1].split('\n')
      lines.forEach(line => {
        const [key, ...value] = line.split(':')
        if (key && value) {
          metadata[key.trim()] = value.join(':').trim()
        }
      })
      return { metadata, content: rawText.replace(metaRegex, '') }
    }
    return { metadata: {}, content: rawText }
  }

  useEffect(() => {
    const loadPosts = async () => {
      const postList = await Promise.all(
        Object.keys(modules).map(async (path) => {
          const id = path.split('/').pop().replace('.md', '')
          const rawText = await modules[path]()
          const { metadata } = parseMetadata(rawText)
          return { 
            id, 
            path, 
            title: metadata.title || id, 
            date: metadata.date || 'unknown'
          }
        })
      )
      
      // 날짜순 정렬 (최신순)
      postList.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(postList)
      
      // 첫 번째 포스트 자동 선택
      if (postList.length > 0 && !selectedPost) {
        handlePostClick(postList[0].path)
      }
    }
    loadPosts()
  }, [])

  const handlePostClick = async (path) => {
    try {
      const rawText = await modules[path]()
      const { content } = parseMetadata(rawText)
      setContent(content)
      setSelectedPost(path)
    } catch (err) {
      console.error('파일을 읽는 중 에러 발생:', err)
      setContent('# 에러가 발생했습니다.\n파일을 불러올 수 없습니다.')
      setSelectedPost(path)
    }
  }

  return (
    <div className="diary-container">
      {/* 왼쪽 사이드바: 탐색기 스타일 */}
      <aside className="diary-sidebar">
        <div className="sidebar-header">
          <span className="folder-icon">📂</span>
          <span className="folder-name">Posts</span>
        </div>
        <ul className="post-list">
          {posts.map((post) => (
            <li 
              key={post.id} 
              className={`post-item ${selectedPost === post.path ? 'active' : ''}`}
              onClick={() => handlePostClick(post.path)}
            >
              <div className="post-icon">📄</div>
              <div className="post-info">
                <div className="post-title">{post.title}</div>
                <div className="post-date">{post.date}</div>
              </div>
            </li>
          ))}
        </ul>
        {posts.length === 0 && <p className="empty-msg">No posts found.</p>}
      </aside>

      {/* 오른쪽 메인: 본문 영역 */}
      <main className="diary-main">
        {selectedPost ? (
          <div className="markdown-body">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <div className="empty-state">
            <p>Select a post to read</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default DiaryApp
